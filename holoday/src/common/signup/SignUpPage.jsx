import SignUpComponent from "./SignUpComponent";
import './SignUpPage.css';
import '../Member.css';

const SignUpPage = () => {
    return (
        <>
            <div className="w-full select-none flex flex-col items-center justify-start min-h-screen pt-12 total-container">
                <h1 className="logo-text text-4xl signup-head-text">회원 가입 페이지</h1>
                <SignUpComponent />
            </div>
        </>
    );
};
export default SignUpPage;