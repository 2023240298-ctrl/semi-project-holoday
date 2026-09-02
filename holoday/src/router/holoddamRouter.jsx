
const holoddamRouter = () => {
    return [
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