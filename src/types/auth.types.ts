export interface User {
    id: number;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export interface AuthResponse {
    token: string;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address?: string;
    password?: string;
}
