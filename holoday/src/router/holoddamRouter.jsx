
const holoddamRouter = () => {
    return [
        {
            path: '',
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } = await import('../holoddam/pages/DrawPage');
                return { Component };
            },
        },
        {
            path: 'cards',
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } = await import('../holoddam/pages/InquiryPage');
                return { Component };
            },
        },
    ];
};

export default holoddamRouter;