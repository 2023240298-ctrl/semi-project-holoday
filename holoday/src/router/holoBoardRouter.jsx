const holoBoardRouter = () => {
    return [
        {
            index: true,
            HydrateFallback: () => <div>목록 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoLounge/pages/HoloBoard")
                return {Component};
            },
        },
        {
            path: ":no",
            HydrateFallback: () => <div>상세 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoLounge/pages/HoloBoardDetailPage");
                return {Component};
            },
        },
        {
            path: "new",
            HydrateFallback: () => <div>등록 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoLounge/pages/HoloBoardNewPage");
                return {Component};
            },
        },
        {
            path: "edit/:no",
            HydrateFallback: () => <div>수정 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../holoLounge/pages/HoloBoardEditPage");
                return {Component};
            },
        },
    ];
};

export default holoBoardRouter;