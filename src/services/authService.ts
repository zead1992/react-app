import http from "./http-service";
import jwtDecode from 'jwt-decode';

const apiUrl = `/api/auth`;

export type IAuthLogin = {
    email: string;
    password: string;
}

const tokenKey: string = "token";

http.setJwt(getGwt());

export async function login(user: IAuthLogin) {
    const {data: jwt} = await http.post<string>(`${apiUrl}`, user);
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt: string) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;
    }catch (e) {

    }

}

export function getGwt() {
    return localStorage.getItem(tokenKey);
}