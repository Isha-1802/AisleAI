import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // 1) Restore the cached user synchronously and render the app IMMEDIATELY.
        //    No blocking loader on every visit.
        try {
            const userData = localStorage.getItem('user');
            if (token && userData && userData !== 'undefined') {
                setUser(JSON.parse(userData));
            }
        } catch {
            localStorage.removeItem('user');
        }
        setLoading(false);

        // 2) Verify the token with the backend in the BACKGROUND (doesn't block
        //    rendering). This keeps the session honest without a loader flash.
        if (!token) return;

        axios
            .get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const freshUser = res.data.user || res.data;
                setUser(freshUser);
                localStorage.setItem('user', JSON.stringify(freshUser));
            })
            .catch((error) => {
                // ONLY log out on a genuine auth rejection (401/403). Network errors
                // or a 503 (server warming up) must NOT clear a valid session.
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                } else {
                    console.warn('Session check deferred (server not reachable):', error.message);
                }
            });
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
