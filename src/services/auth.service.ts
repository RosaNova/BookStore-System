import api from '../api/axios';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types/auth.types';
import Cookies from 'js-cookie';

const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/customers/login', credentials);
        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
        }
        return response.data;
    },

    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/customers/register', userData);
        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 7 });
        }
        return response.data;
    },

    logout: () => {
        Cookies.remove('token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/customers');
        return response.data;
    }
};

export default authService;
