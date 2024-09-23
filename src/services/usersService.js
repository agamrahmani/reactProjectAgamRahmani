import httpService, { setDefaultCommonHeaders } from "./httpsService";
import {jwtDecode} from "jwt-decode";

const TOKEN_KEY = "token";

refreshToken();

function setToken(token){
    localStorage.setItem(TOKEN_KEY, token);
    refreshToken();
}

function getJWT(){
return localStorage.getItem(TOKEN_KEY);
}

function refreshToken(){
    setDefaultCommonHeaders("x-auth-token", getJWT());
}

export function createUser(user) {
    return httpService.post("/users", user);
}

export async function login(credentials){
    const response = await httpService.post("/users/login", credentials);
    setToken(response.data);
    return response;
}

export async function getUserById(){
    try{  
        const decode = jwtDecode(getJWT());
        const res = await httpService.get(`/users/${decode._id}`); 
        return res.data;
    } catch{
        return null;
    }
}

export function logout(){
    setToken(null);
}

export function updateUser(id, data){
    return httpService.put(`/users/${id}`, data);
}


const userService = {
    createUser,
    login,
    getUserById,
    logout,
    updateUser,
};

export default userService;