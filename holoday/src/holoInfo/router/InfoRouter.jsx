
const holoInfoRouter = () => {
    return [
         {
            path:"holoinfo",
            HydrateFallback: () => <div>Loadig...</div>,
            lazy: async () => {
                const { default: Component} = await import("../InfoList");
                return{Component};
            },
        },
        {
            path: "holoinfo/:infoNo",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const {default: Component} = await import("../InfoRead");
                return {Component};

            },

        },
        {
            path: "holoinfo/new",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const {default: Component} = await import("../InfoAdd");
                return {Component};

            },

        },
    ];
};

export default holoInfoRouter;