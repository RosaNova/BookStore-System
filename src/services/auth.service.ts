import api from '../api/axios';
import type { AuthAdminLoginResponse, AuthUserResponse, LoginCredentials, RegisterData } from '../types/auth.types';
import Cookies from 'js-cookie';

const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthUserResponse> => {
        const response = await api.post<AuthUserResponse>('/customers/login', credentials);
        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
        }
        return response.data;
    },

    register: async (userData: RegisterData): Promise<AuthUserResponse> => {
        const response = await api.post<AuthUserResponse>('/customers/register', userData);
        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 7 });
        }
        return response.data;
    },

    logout: () => {
        Cookies.remove('token');
        localStorage.removeItem('admin');
    },

    getCurrentUser: async () => {
        const response = await api.get('/customers');
        return response.data;
    },

    adminLogin: async (credentials: LoginCredentials): Promise<AuthAdminLoginResponse> => {
        const response = await api.post<AuthAdminLoginResponse>('/admin/login', credentials);
        if (response.data.token) {
            Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
            if (response.data.admin) {
                localStorage.setItem('admin', JSON.stringify(response.data.admin));
            }
        }
        return response.data;
    },

    getStoredAdmin: () => {
        const admin = localStorage.getItem('admin');
        return admin ? JSON.parse(admin) : null;
    },
};

export default authService;
