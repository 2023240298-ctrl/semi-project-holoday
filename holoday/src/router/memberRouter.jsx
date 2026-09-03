const memberRouter = () => {
   return [
      {
         path: "login",
         HydrateFallback: () => <div>로그인 페이지 불러오는 중</div>,
         lazy: async () => {
            const { default: Component } = await import("../common/login/LoginPage");
            return { Component };
         },
      },
      {
         path: "signup",
         HydrateFallback: () => <div>회원가입 페이지 불러오는 중</div>,
         lazy: async () => {
            const { default: Component } = await import("../common/signup/SignUpPage");
            return { Component };
         },
      },
   ];
};

export default memberRouter;