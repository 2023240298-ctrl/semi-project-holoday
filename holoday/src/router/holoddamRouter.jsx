import { Navigate } from "react-router";

const holoddamRouter = () => {
    return [
        {
            path: '/',
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } = await import('../holoddam/pages/DrawPage');
                return Component;
            },
        }
    ];
};

export default holoddamRouter;