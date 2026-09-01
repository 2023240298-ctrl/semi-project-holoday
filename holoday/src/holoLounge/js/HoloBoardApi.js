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

export const putOne = async(holoLounge) => {
    const response = await customAxios.patch(
        `${prefix}/${holoLounge.boardNo}`,
        holoLounge
    );

    return response.data;
};

export const deleteOne = async(no) => {
    const response = await customAxios.delete(
        `${prefix}/${no}`
    );

    return response.data;
};

export const getCommentList = async (boardNo, pageParam) => {
    const {page, size} = pageParam;

    const response = await customAxios.get(
        `${prefix}/${boardNo}/comments`,
        {
            params: {page, size},
        }
    );

    return response.data;
};

export const postComment = async (boardNo, comment) => {
    const response = await customAxios.post(
        `${prefix}/${boardNo}/comments`,
        comment
    );

    return response.data;
};

export const putComment = async (hComment) => {
    const response = await customAxios.patch(
        `/api/holoday/comment/${hComment.commentNo}`,
        hComment
    );

    return response.data;
}

export const deleteComment = async (commentNo) => {
    const response = await customAxios.delete(
        `/api/holoday/comment/${commentNo}`
    );

    return response.data;
};

export const likeComment = async (commentNo) => {
    const response = await customAxios.patch(
        `/api/holoday/comment/${commentNo}/like`
    );

    return response.data;
};

export const unLikeComment = async (commentNo) => {
    const response = await customAxios.patch(
        `/api/holoday/comment/${commentNo}/unlike`
    );

    return response.data;
}