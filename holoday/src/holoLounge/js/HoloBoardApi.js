import customAxios from "../../api/customAxios";

const prefix = `/api/holoday/board`;

export const getOne = async (no) => {
    const response = await customAxios.get(`${prefix}/${no}`);
    return response.data;
};

export const getList = async (pageParam) => {
    const {page, size} = pageParam;
    const response = await customAxios.get(prefix, {
        params: {page, size},
    });
    return response.data;
};

export const postAdd = async(holoLounge) => {
    const response = await customAxios.post(prefix, holoLounge);

    return response.data;
};