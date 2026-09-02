
const holoInfoRouter = () => {
    return [
         {
            index: true,
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component} = await import("../holoInfo/InfoList");
                return{Component};
            },
        },
        {
            path: ":infoNo",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoInfo/InfoRead");
                return {Component};

            },

        },
        {
            path: "new",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoInfo/InfoAdd");
                return {Component};

            },

        },
         {
            path: "edit/:infoNo",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const { default: Component } =
                    await import("../holoInfo/InfoModify");

                return { Component };
            },
        },
        
    ];
};

export default holoInfoRouter;