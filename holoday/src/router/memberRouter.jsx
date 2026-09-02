const memberRouter = () => {
   return [
      {
         path: "login",
         HydrateFallback: () => <div>로그인 페이지 불러오는 중</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/LoginPage");
            return { Component };
         },
      },
      {
         path: "holosignup",
         HydrateFallback: () => <div>회원가입 페이지 불러오는 중</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/SignUpPage");
            return { Component };
         },
      },
   ];
};

export default memberRouter;