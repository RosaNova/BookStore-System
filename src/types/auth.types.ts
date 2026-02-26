//  User interface
export interface User {
    id: number;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    avatar?: string;
    role?: string;
}


export interface AuthUserResponse {
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address?: string;
    password?: string;
}

//  Admin interface
export interface AdminRegisterData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
    password: string;
}

export interface Admin {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

export interface AuthAdminLoginResponse {
    token: string;
    admin?: Admin;
}

export interface AuthAdminRegisterResponse {
    message: string;
}
