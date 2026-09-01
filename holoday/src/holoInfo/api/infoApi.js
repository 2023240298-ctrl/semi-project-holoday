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

export const postAdd = async (info,file) => {
    const formData = new FormData();
    
    const infoBlob = new Blob(
        [JSON.stringify(info)],
        { type: "application/json" }
    );

    formData.append("info", infoBlob);

    if (file) {
        formData.append("file", file);
    }

    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
        prefix, 
        formData,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

    return response.data;
};


