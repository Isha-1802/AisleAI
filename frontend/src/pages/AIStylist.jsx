import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AIStylist.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function AIStylist() {
    const { user, loading: authLoading } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            console.log('No authentication found, redirecting to login...');
            navigate('/login');
            return;
        }

        if (user) {
            loadConversations();
            setMessages([]);
            setActiveConversation(null);
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/chat/conversations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Conversations loaded:', response.data.conversations.length);
            setConversations(response.data.conversations);
        } catch (error) {
            console.error('Failed to load conversations:', error);
        }
    };

    const loadConversation = async (convId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/chat/conversations/${convId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data.messages);
            setActiveConversation(convId);

            // Close sidebar on mobile after loading conversation
            if (window.innerWidth <= 768) {
                setSidebarOpen(false);
            }
        } catch (error) {
            console.error('Failed to load conversation:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);

        // Add user message immediately
        const newUserMessage = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);

        try {
            const token = localStorage.getItem('token');
            console.log('Sending message (streaming):', userMessage);

            // Add an empty assistant message to populate during stream
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            const response = await fetch(`${API_URL}/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationId: activeConversation
                })
            });

            if (!response.ok) throw new Error('Failed to connect to AI');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullContent = '';
            let leftover = '';

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
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    if (newMessages.length > 0) {
                                        newMessages[newMessages.length - 1].content = fullContent;
                                    }
                                    return newMessages;
                                });
                            }

                            if (data.done) {
                                if (!activeConversation && data.conversationId) {
                                    setActiveConversation(data.conversationId);
                                    loadConversations();
                                }
                            }
                        } catch (e) {
                            console.error('Error parsing stream chunk:', e, 'Line:', trimmedLine);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('❌ Failed to send message:', error);
            const errorMessage = error.message || 'Sorry, I couldn\'t process your request. Please try again.';

            setMessages(prev => {
                const newMessages = [...prev];
                // If we added a placeholder, update it, otherwise add new
                if (newMessages[newMessages.length - 1]?.role === 'assistant' && !newMessages[newMessages.length - 1]?.content) {
                    newMessages[newMessages.length - 1].content = errorMessage;
                } else {
                    newMessages.push({ role: 'assistant', content: errorMessage });
                }
                return newMessages;
            });
        } finally {
            setLoading(false);
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setActiveConversation(null);
        console.log('Started new chat');

        // Close sidebar on mobile after starting new chat
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    };

    const deleteConversation = async (convId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/chat/conversations/${convId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Reload conversations
            loadConversations();

            // If deleted conversation was active, start new chat
            if (activeConversation === convId) {
                startNewChat();
            }
        } catch (error) {
            console.error('Failed to delete conversation:', error);
        }
    };

    if (!user) return null;


    return (
        <div className="chatgpt-container">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`chatgpt-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <button className="new-chat-btn" onClick={startNewChat}>
                        <span>+</span> New chat
                    </button>
                </div>

                <div className="conversations-list">
                    {conversations.map(conv => (
                        <div
                            key={conv.id}
                            className={`conversation-item ${activeConversation === conv.id ? 'active' : ''}`}
                            onClick={() => loadConversation(conv.id)}
                        >
                            <span className="conv-icon">💬</span>
                            <div className="conv-info">
                                <div className="conv-title">{conv.title}</div>
                                <div className="conv-date">{conv.date} · {conv.messageCount} msgs</div>
                            </div>
                            <button
                                className="conv-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteConversation(conv.id);
                                }}
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <div className="user-details">
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chatgpt-main">
                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? '←' : '→'}
                </button>


                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <h1>AisleAI Stylist</h1>
                            <p>Your personal fashion assistant</p>
                            <div className="suggestions">
                                <button onClick={() => setInput('What should I wear to a wedding?')}>
                                    What should I wear to a wedding?
                                </button>
                                <button onClick={() => setInput('Help me find the perfect outfit for work')}>
                                    Help me find the perfect outfit for work
                                </button>
                                <button onClick={() => setInput('What colors suit me best?')}>
                                    What colors suit me best?
                                </button>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.role}`}>
                                <div className="message-avatar">
                                    {msg.role === 'user' ? user.name.charAt(0).toUpperCase() : '✨'}
                                </div>
                                <div className="message-content">
                                    {msg.role === 'assistant' ? (
                                        <div className="ai-message-body">
                                            {msg.content === '' && loading && idx === messages.length - 1 ? (
                                                <div className="typing-indicator" style={{ padding: '10px 0' }}>
                                                    <span></span><span></span><span></span>
                                                </div>
                                            ) : (
                                                msg.content.split('\n').map((line, i) => {
                                                    if (!line.trim()) return <br key={i} />;

                                                    // Handle headings
                                                    if (line.trim().startsWith('###') || (line.trim().startsWith('**') && line.trim().endsWith('**') && line.length < 50)) {
                                                        const cleanHeading = line.replace(/[#*]/g, '').trim();
                                                        return <h4 key={i} className="ai-message-heading">{cleanHeading}</h4>;
                                                    }

                                                    // Handle bold text in regular lines
                                                    const renderText = (text) => {
                                                        const parts = text.split(/(\*\*.*?\*\*)/g);
                                                        return parts.map((part, index) => {
                                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                                return <strong key={index}>{part.slice(2, -2)}</strong>;
                                                            }
                                                            return part;
                                                        });
                                                    };

                                                    // Handle bullet points
                                                    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                        return (
                                                            <div key={i} className="ai-message-list-item">
                                                                <span className="ai-message-bullet">✦</span>
                                                                <span>{renderText(line.replace(/^[•-]\s*/, ''))}</span>
                                                            </div>
                                                        );
                                                    }

                                                    return <p key={i}>{renderText(line)}</p>;
                                                })
                                            )}
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <form onSubmit={sendMessage} className="chat-input-form">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                            placeholder="Message AisleAI Stylist..."
                            rows={1}
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim() || loading}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </form>
                    <div className="input-footer">
                        AisleAI can make mistakes. Check important info.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIStylist;
