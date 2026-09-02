import axios from "axios";

const prefix = "http://localhost:8080/api/holoday"

export const drawCard = async () => {
    const response = await axios.get(`${prefix}/card`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data.data;
};

export const inquiryCard = async () => {
    const response = await axios.get(`${prefix}/card/history`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data.data;
};