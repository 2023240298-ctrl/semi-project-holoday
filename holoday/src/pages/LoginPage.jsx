import LoginComponent from "../components/common/LoginComponent";

const LoginPage = () => {
   return (
      <>
         <div className="select-none flex flex-col items-center justify-start min-h-screen pt-12 total-container">
            <h1 className="logo-text text-4xl signup-head-text">로그인</h1>
            <LoginComponent />
         </div>
      </>
   );
};

export default LoginPage;