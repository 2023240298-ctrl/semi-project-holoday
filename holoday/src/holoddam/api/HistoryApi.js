import axios from "axios";

const prefix = "http://localhost:8080/api/holoday"

export const cardList = async () => {
    const response = await axios.get(`${prefix}/card/history`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    return response.data.data;
};

export const deleteCard = async (cardNo) => {
    const response = await axios.delete(`${prefix}/${cardNo}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    });
    return response.data;
};
