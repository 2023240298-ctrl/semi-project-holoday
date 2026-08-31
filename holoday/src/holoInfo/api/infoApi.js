import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/holoday/info`;

export const getOne = async (infoNo) => {
    const response = await axios.get (`${prefix}/${infoNo}`);
    return response.data;
};

export const getList = async (pageParam) => {
    const {page, size} = pageParam;

    const response = await axios.get(prefix, {
        params: {page,size},
    });

    return response.data;
};


