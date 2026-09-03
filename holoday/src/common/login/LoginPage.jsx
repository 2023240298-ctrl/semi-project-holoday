import LoginComponent from "../../components/common/LoginComponent";
import './Member.css';

const LoginPage = () => {
   return (
      <>
         <div className="w-full select-none flex flex-col items-center justify-start min-h-screen pt-12 total-container">
            <h1 className="logo-text text-4xl signup-head-text">로그인</h1>
            <LoginComponent />
         </div>
      </>
   );
};

export default LoginPage;