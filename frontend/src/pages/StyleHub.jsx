import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './StyleHub.css';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function StyleHub() {
    const { user } = useAuth();
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizStep, setQuizStep] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aiResult, setAiResult] = useState('');
    const [budgetFilter, setBudgetFilter] = useState('LUXURY'); // Default to luxury
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pendingQuiz = localStorage.getItem('pendingQuiz');
        if (pendingQuiz) {
            try {
                const { quizId, answers } = JSON.parse(pendingQuiz);
                localStorage.removeItem('pendingQuiz');
                setActiveQuiz(quizId);
                setQuizAnswers(answers);
                submitQuiz(quizId, answers);
            } catch (e) {
                console.error("Error restoring quiz", e);
                localStorage.removeItem('pendingQuiz');
            }
        }
    }, []);

    const quizzes = {
        color: {
            id: 'color',
            title: 'Color Analysis',
            icon: '🎨',
            description: 'Discover your perfect palette based on skin tone, hair, and eyes.',
            image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80&auto=format&fit=crop',
            questions: [
                { id: 'gender', text: 'How do you identify?', options: ['Female', 'Male'] },
                { id: 'undertone', text: 'Look at the veins on your wrist. What color are they?', options: ['Blue/Purple (Cool)', 'Green (Warm)', 'Blue & Green (Neutral)', 'Can\'t tell'] },
                { id: 'jewelry', text: 'Which jewelry metal makes your skin glow?', options: ['Silver', 'Gold', 'Rose Gold', 'Both Silver & Gold'] },
                { id: 'sun', text: 'What happens when you stay in the sun without SPF?', options: ['Burn easily, rarely tan', 'Tan easily, rarely burn', 'Burn first, then tan', 'My skin is dark, I don\'t burn'] },
                { id: 'hair', text: 'What is your natural hair color?', options: ['Black / Dark Brown', 'Light Brown / Dark Blonde', 'Blonde', 'Red / Auburn', 'Grey / White'] },
                { id: 'eyes', text: 'What is your eye color?', options: ['Dark Brown / Black', 'Hazel / Light Brown', 'Blue / Grey', 'Green'] },
                { id: 'contrast', text: 'How much contrast is there between your skin and hair?', options: ['High Contrast (Very different)', 'Medium Contrast', 'Low Contrast (Similar)'] },
                { id: 'white', text: 'Which shade of white looks better on you?', options: ['Pure, bright white', 'Cream or off-white', 'Neither'] },
                { id: 'compliments', text: 'Which color do you get the most compliments in?', options: ['Royal Blue / Emerald', 'Mustard / Olive', 'Pastels / Baby Pink', 'Black / White'] }
            ]
        },
        body: {
            id: 'body',
            title: 'Body Shape Guide',
            icon: '👗',
            description: 'Find silhouettes that flatter your unique proportions.',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop',
            questions: [
                { id: 'gender', text: 'How do you identify?', options: ['Female', 'Male'] },
                { id: 'shoulders', text: 'How do your shoulders compare to your hips?', options: ['Shoulders are narrower', 'Shoulders are wider', 'About the same width'] },
                { id: 'waist', text: 'How defined is your waist?', options: ['Very defined (Hourglass)', 'Somewhat defined', 'Not very defined (Straight)', 'Wider than hips/shoulders'] },
                { id: 'hips', text: 'How would you describe your hips/thighs?', options: ['Curvy / Full', 'Straight / Narrow', 'Average'] },
                { id: 'weight', text: 'When you gain weight, where does it usually go?', options: ['Hips and thighs', 'Stomach / Midsection', 'All over evenly', 'Arms and chest'] },
                { id: 'jeans', text: 'What is your biggest struggle with jeans?', options: ['Gap at the waist', 'Tight on thighs', 'Tight on waist', 'Too long/short'] },
                { id: 'top', text: 'What is your biggest struggle with tops?', options: ['Tight across shoulders/bust', 'Loose around waist', 'Tight around stomach', 'Sleeves are tight'] },
                { id: 'prominent', text: 'What is your most prominent feature?', options: ['Legs', 'Waist', 'Shoulders/Arms', 'Bust'] },
                { id: 'preference', text: 'What do you prefer to highlight?', options: ['My waist', 'My legs', 'My shoulders/neckline', 'My curves'] }
            ]
        },
        skincare: {
            id: 'skincare',
            title: 'Skincare For You',
            icon: '✨',
            description: 'Curated routine for your skin type and concerns.',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format&fit=crop',
            questions: [
                { id: 'gender', text: 'How do you identify?', options: ['Female', 'Male'] },
                { id: 'type', text: 'How does your skin feel 2 hours after washing?', options: ['Oily/Shiny all over', 'Tight and dry', 'Oily T-zone, dry cheeks', 'Normal/Comfortable'] },
                { id: 'concern', text: 'What is your #1 skin concern?', options: ['Acne / Breakouts', 'Aging / Wrinkles', 'Dullness / Pigmentation', 'Sensitivity / Redness', 'Dryness'] },
                { id: 'sensitivity', text: 'Does your skin react easily to new products?', options: ['Yes, often gets red/itchy', 'Sometimes', 'No, my skin is tough'] },
                { id: 'pores', text: 'How visible are your pores?', options: ['Very visible, especially on nose', 'Visible but not huge', 'Barely visible'] },
                { id: 'breakouts', text: 'How often do you get breakouts?', options: ['Constantly', 'Hormonal / Monthly', 'Rarely', 'Never'] },
                { id: 'sun', text: 'Do you wear sunscreen daily?', options: ['Yes, always', 'Sometimes / When sunny', 'No, never'] },
                { id: 'routine', text: 'How complex do you want your routine to be?', options: ['Simple (3 steps)', 'Moderate (5 steps)', 'Extensive (Korean 10-step)'] },
                { id: 'budget', text: 'What is your budget for skincare?', options: ['Affordable / Drugstore', 'Mid-range', 'High-end / Luxury'] }
            ]
        },
        makeup: {
            id: 'makeup',
            title: 'Makeup For You',
            icon: '💄',
            description: 'Personalized makeup products and shades.',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format&fit=crop',
            questions: [
                { id: 'gender', text: 'How do you identify?', options: ['Female', 'Male'] },
                { id: 'finish', text: 'What foundation finish do you prefer?', options: ['Matte (No shine)', 'Dewy (Glowy)', 'Natural / Satin', 'No foundation, just concealer'] },
                { id: 'coverage', text: 'How much coverage do you like?', options: ['Sheer / Skin tint', 'Medium coverage', 'Full coverage'] },
                { id: 'skin_prep', text: 'Do you use primer?', options: ['Yes, always', 'Sometimes', 'No, never'] },
                { id: 'eyes', text: 'What is your eye shape?', options: ['Almond', 'Round', 'Hooded', 'Monolid'] },
                { id: 'lips', text: 'What is your go-to lip look?', options: ['Nude / MLBB', 'Bold Red / Berry', 'Glossy', 'Just balm'] },
                { id: 'time', text: 'How much time do you spend on makeup?', options: ['5 minutes (Quick)', '15-20 minutes', '30+ minutes (Full glam)'] },
                { id: 'skill', text: 'How would you rate your makeup skills?', options: ['Beginner', 'Intermediate', 'Pro / Advanced'] },
                { id: 'budget', text: 'What is your budget for makeup?', options: ['Affordable / Drugstore', 'Mid-range', 'High-end / Luxury'] }
            ]
        }
    };

    const handleStartQuiz = (quizId) => {
        setActiveQuiz(quizId);
        setQuizStep(0);
        setQuizAnswers({});
        setShowResults(false);
    };

    const handleAnswer = (answer) => {
        const currentQuiz = quizzes[activeQuiz];
        const currentQuestion = currentQuiz.questions[quizStep];

        const newAnswers = { ...quizAnswers, [currentQuestion.id]: answer };
        setQuizAnswers(newAnswers);

        if (quizStep < currentQuiz.questions.length - 1) {
            setQuizStep(quizStep + 1);
        } else {
            submitQuiz(activeQuiz, newAnswers);
        }
    };

    const submitQuiz = async (quizId, answers) => {
        if (!user) {
            localStorage.setItem('pendingQuiz', JSON.stringify({ quizId, answers }));
            navigate('/login', { state: { from: location } });
            return;
        }

        setLoading(true);
        setShowResults(true);
        setAiResult('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/style-hub/quiz-result`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quizType: quizId, answers })
            });

            if (!response.ok) throw new Error('Failed to connect to AI');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';
            let leftover = '';

            if (answers.budget) {
                if (answers.budget.includes('Affordable')) setBudgetFilter('AFFORDABLE');
                else if (answers.budget.includes('Mid-range')) setBudgetFilter('MID-RANGE');
                else if (answers.budget.includes('Luxury')) setBudgetFilter('LUXURY');
            }

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = (leftover + chunk).split('\n');
                leftover = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(trimmedLine.slice(6));
                            if (data.error) throw new Error(data.error);
                            if (data.content) {
                                fullContent += data.content;
                                setAiResult(fullContent);
                                if (fullContent.length > 50) {
                                    setLoading(false);
                                }
                            }
                        } catch (e) {
                            console.error('Error parsing stream chunk:', e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Quiz submission error:', error);
            setAiResult(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetQuiz = () => {
        setActiveQuiz(null);
        setQuizStep(0);
        setQuizAnswers({});
        setShowResults(false);
        setAiResult('');
    };

    const renderResults = () => {
        const quiz = quizzes[activeQuiz];
        return (
            <div className="quiz-results fade-in">
                <h2 className="results-title">Your {quiz.title} Results</h2>

                <div className="results-card">
                    <h3>Your Profile</h3>
                    <ul className="results-summary">
                        {Object.entries(quizAnswers).map(([key, value]) => (
                            <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>

                <div className="results-card ai-analysis-card" style={{ background: 'transparent', border: 'none', padding: 0, boxShadow: 'none' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', fontFamily: 'Cormorant Garamond, serif' }}>
                        The Curator's Edit
                    </h3>

                    {!aiResult && loading ? (
                        <div className="loading-state" style={{ padding: '40px 20px', textAlign: 'center' }}>
                            <div className="luxury-loader">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', marginTop: '20px' }}>
                                Curating Your Luxury Edit
                            </h3>
                            <p style={{ color: '#666', fontStyle: 'italic', maxWidth: '400px', margin: '15px auto' }}>
                                Our AI is analyzing your unique profile to build a personalized style and beauty strategy...
                            </p>
                        </div>
                    ) : (
                        <div className="ai-results-grid">
                            {aiResult.split('###').map((section, index) => {
                                if (!section.trim()) return null;

                                const lines = section.trim().split('\n');
                                let title = 'INSIGHT';
                                let contentStartIdx = 0;

                                if (lines[0].includes('**')) {
                                    const titleMatch = lines[0].match(/\*\*(.*?)\*\*/);
                                    title = titleMatch ? titleMatch[1] : lines[0].replace(/[#*]/g, '').trim();
                                    contentStartIdx = 1;
                                }

                                const isRecommendations = title.toUpperCase().includes('RECOMMENDATIONS');
                                const icons = ['✦', '✷', '∞'];

                                const renderText = (text) => {
                                    if (!text) return '';
                                    const parts = text.split(/(\*\*.*?\*\*)/g);
                                    return parts.map((part, i) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    });
                                };

                                if (isRecommendations) {
                                    const recommendationLines = lines.slice(contentStartIdx);
                                    return (
                                        <div key={index} className="ai-result-card recommendations-card" style={{ gridColumn: '1 / -1' }}>
                                            <span className="ai-card-icon">{icons[1]}</span>
                                            <h4 className="ai-card-title">{title}</h4>
                                            <div className="ai-results-subgrid">
                                                {recommendationLines.map((line, i) => {
                                                    const trimmed = line.trim();
                                                    if (!trimmed) return null;
                                                    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                                                        return <h5 key={i} className="ai-item-category">{renderText(trimmed)}</h5>;
                                                    }
                                                    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                                                        return (
                                                            <div key={i} className="ai-list-item">
                                                                <span className="ai-bullet">✦</span>
                                                                <span>{renderText(trimmed.replace(/^[-•]\s*/, ''))}</span>
                                                            </div>
                                                        );
                                                    }
                                                    return <p key={i}>{renderText(trimmed)}</p>;
                                                })}
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={index} className="ai-result-card">
                                        <span className="ai-card-icon">{icons[index % 3]}</span>
                                        <h4 className="ai-card-title">{title}</h4>
                                        <div className="ai-card-body">
                                            {lines.slice(contentStartIdx).map((line, i) => {
                                                const trimmed = line.trim();
                                                if (!trimmed) return null;
                                                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                                                    return (
                                                        <div key={i} className="ai-list-item">
                                                            <span className="ai-bullet">›</span>
                                                            <span>{renderText(trimmed.replace(/^[-•]\s*/, ''))}</span>
                                                        </div>
                                                    );
                                                }
                                                return <p key={i} style={{ marginBottom: '12px' }}>{renderText(line)}</p>;
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {loading && aiResult && (
                                <div className="ai-typing-status" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
                                    <div className="typing-indicator" style={{ justifyContent: 'center' }}>
                                        <span></span><span></span><span></span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#D4AF37', marginTop: '8px', letterSpacing: '1px' }}>CURATING MORE INSIGHTS...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="reset-btn" onClick={resetQuiz}>Back to Style Hub</button>
                </div>
            </div>
        );
    };

    return (
        <div className="style-hub-white">
            <section className="style-hub-hero">
                <div className="style-hero-content">
                    <span className="ai-badge-style">
                        <span className="sparkle">✨</span>
                        THE ATELIER
                    </span>
                    <h1 className="style-hub-title">Personalized Style & Beauty</h1>
                    <p className="style-hub-subtitle">
                        Take our expert quizzes to discover your perfect look, routine, and aesthetic.
                    </p>
                </div>
            </section>

            <div className="container-style">
                {!activeQuiz ? (
                    <div className="style-cards-grid">
                        {Object.values(quizzes).map((quiz) => (
                            <div key={quiz.id} className="style-feature-card" onClick={() => handleStartQuiz(quiz.id)}>
                                <div className="card-image-bg" style={{ backgroundImage: `url(${quiz.image})` }}></div>
                                <div className="card-overlay"></div>
                                <div className="card-content-style">
                                    <div className="feature-icon-large">{quiz.icon}</div>
                                    <h3 className="feature-card-title">{quiz.title}</h3>
                                    <p className="feature-card-description">{quiz.description}</p>
                                    <button className="feature-cta-btn">
                                        Start Quiz <span className="arrow-icon">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="quiz-container">
                        {!showResults ? (
                            <div className="quiz-card fade-in">
                                <div className="quiz-header">
                                    <button className="back-btn" onClick={resetQuiz}>← Back</button>
                                    <h2>{quizzes[activeQuiz].title}</h2>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${((quizStep + 1) / quizzes[activeQuiz].questions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="question-section">
                                    <h3>{quizzes[activeQuiz].questions[quizStep].text}</h3>
                                    <div className="options-grid">
                                        {quizzes[activeQuiz].questions[quizStep].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                className="option-btn"
                                                onClick={() => handleAnswer(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            renderResults()
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StyleHub;
