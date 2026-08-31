
const InfoRouter = () => {
    return [
         {
            path:"info",
            HydrateFallback: () => <div>Loadig...</div>,
            lazy: async () => {
                const { default: Component} = await import("../InfoList");
                return{Component};
            },
        },
        {
            path: "info/:infoNo",
            HydrateFallback: () => <div>Loading...</div>,
            lazy: async () => {
                const {default: Component} = await import("../InfoRead");
                return {Component};

            },

        },
    ];
};

export default InfoRouter;