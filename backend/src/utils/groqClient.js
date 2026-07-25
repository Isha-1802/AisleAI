const Groq = require('groq-sdk');

// Single shared Groq client. maxRetries lets the SDK auto-retry transient
// failures (429 / 5xx / network) on top of our own retry+fallback layer below.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    maxRetries: 3,
    timeout: 60 * 1000, // 60s per request
});

// Primary + fallback models. If the primary is rate-limited or temporarily
// overloaded, we transparently fall back so the user still gets a response.
const PRIMARY_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const FALLBACK_MODEL = process.env.GROQ_FALLBACK_MODEL || 'llama-3.1-8b-instant';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (err) => {
    const status = err?.status || err?.response?.status;
    if ([408, 409, 429, 500, 502, 503, 504].includes(status)) return true;
    return ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'EPIPE'].includes(err?.code);
};

/**
 * Create a chat completion with retry + model fallback.
 * Works for both streaming (stream: true) and normal calls, because failures
 * that matter happen at creation time, before the stream starts flowing.
 *
 * @param {object} params  - groq.chat.completions.create params (model optional)
 * @param {object} options - { retries }
 */
async function createCompletion(params, { retries = 2 } = {}) {
    if (!process.env.GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is not configured');
    }

    const requested = params.model || PRIMARY_MODEL;
    // De-duplicate in case the caller already asked for the fallback model.
    const models = [...new Set([requested, FALLBACK_MODEL])];

    let lastError;
    for (const model of models) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await groq.chat.completions.create({ ...params, model });
            } catch (err) {
                lastError = err;
                const status = err?.status || err?.response?.status;
                if (!isRetryable(err) || attempt === retries) {
                    console.warn(`⚠️ Groq "${model}" failed (${status || err.code || err.message}).`);
                    break; // move on to fallback model (or throw after last one)
                }
                const wait = Math.min(1000 * 2 ** attempt, 8000);
                console.warn(`⚠️ Groq "${model}" attempt ${attempt + 1} failed (${status || err.code}); retrying in ${wait}ms…`);
                await sleep(wait);
            }
        }
        if (model !== models[models.length - 1]) {
            console.warn(`↪️ Falling back to "${FALLBACK_MODEL}"…`);
        }
    }
    throw lastError;
}

module.exports = { groq, createCompletion, PRIMARY_MODEL, FALLBACK_MODEL };
