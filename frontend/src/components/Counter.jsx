import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts up from 0 to `end` when scrolled into view.
 * Supports a prefix/suffix (e.g. "+", "k", "%").
 */
function Counter({ end, duration = 1800, prefix = '', suffix = '', className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let raf;
        const start = performance.now();
        const target = Number(end) || 0;

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutExpo for a premium settle
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setValue(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{value.toLocaleString()}{suffix}
        </span>
    );
}

export default Counter;
