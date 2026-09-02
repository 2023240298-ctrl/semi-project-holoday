import { Navigate } from "react-router";

const holoddamRouter = () => {
    return [
        {
            path: 'holoddam',
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } = await import('../holoddam/pages/DrawPage');
                return { Component };
            },
        },
        {
            path: 'holoddam/cards',
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } = await import('../holoddam/pages/InquiryPage');
                return { Component };
            },
        },
    ];
};

export default holoddamRouter;