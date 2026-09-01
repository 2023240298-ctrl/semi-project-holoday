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
        uesrId: formData.userId,
        userEmail: formData.userEmail,
        userNick: formData.userNick,
        userPw: formData.userPw,
    });
};

export const send = async () => {
    const response = 
}
