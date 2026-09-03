import axios from "axios";

const prefix = "http://localhost:8080/api/holoday"

export const checkEmail = async (formData) => {
    const response = await axios.get(`${prefix}/checkEmail?userEmail=${formData.userEmail}`);
    return response.data;
};

export const checkId = async (formData) => {
    const response = await axios.get(`${prefix}/checkId?userId=${formData.userId}`);
    return response.data;
};

export const signup = async (formData) => {
    const response = await axios.post(`${prefix}/signup`, {
        userId: formData.userId,
        userEmail: formData.userEmail,
        userNick: formData.userNick,
        userPw: formData.userPw,
        userIsAdmin: false,
    });
    return response.data;
};

export const send = async (formData) => {
    const response = await axios.post(`${prefix}/send`, {
        email: formData.userEmail,
    });
    return response.data;
};

export const authenticate = async (formData, codeInput) => {
    const response = await axios.post(`${prefix}/authenticate`, {
        email: formData.userEmail,
        code: codeInput,
    });
    return response.data.success;
};
