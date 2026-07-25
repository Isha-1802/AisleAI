import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            // 1) Optimistically restore the cached user so the UI shows as
            //    logged in instantly (no flicker) while we verify in the background.
            try {
                const userData = localStorage.getItem('user');
                if (userData && userData !== 'undefined') {
                    setUser(JSON.parse(userData));
                }
            } catch {
                localStorage.removeItem('user');
            }

            // 2) Verify the token with the backend and refresh the user record.
            //    This confirms the session is genuinely valid so protected calls
            //    (like the AI chat) work immediately on page load.
            try {
                const res = await axios.get(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const freshUser = res.data.user || res.data;
                setUser(freshUser);
                localStorage.setItem('user', JSON.stringify(freshUser));
            } catch (error) {
                // ONLY log out on a genuine auth rejection (401/403). Network
                // errors or a 503 (server/DB still warming up) must NOT clear the
                // session, or the user gets wrongly kicked out on a cold start.
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                } else {
                    console.warn('Session check deferred (server not reachable):', error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('pendingQuiz');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
