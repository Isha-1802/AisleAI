import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AIStylist.css';

const API_URL = 'http://localhost:5001/api';

function AIStylist({ user: userProp }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [user, setUser] = useState(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication from localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            console.log('No authentication found, redirecting to login...');
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            // Load conversations list
            loadConversations();

            // Start with empty chat (no active conversation)
            setMessages([]);
            setActiveConversation(null);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            navigate('/login');
        }
    }, [navigate]);

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
            console.log('Sending message:', userMessage);
            console.log('Active conversation:', activeConversation);

            const response = await axios.post(
                `${API_URL}/chat/message`,
                {
                    message: userMessage,
                    conversationId: activeConversation
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Response received:', response.data);
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);

            // Update active conversation ID if it's a new chat
            if (!activeConversation && response.data.conversationId) {
                setActiveConversation(response.data.conversationId);
                // Reload conversations to show the new one
                loadConversations();
            }
        } catch (error) {
            console.error('❌ Failed to send message:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);

            const errorMessage = error.response?.status === 401
                ? 'Please log in to use the AI Stylist.'
                : error.response?.data?.error || 'Sorry, I couldn\'t process your request. Please try again.';

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setLoading(false);
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setActiveConversation(null);
        console.log('Started new chat');
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
                                    {msg.content}
                                </div>
                            </div>
                        ))
                    )}
                    {loading && (
                        <div className="message assistant">
                            <div className="message-avatar">✨</div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
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
