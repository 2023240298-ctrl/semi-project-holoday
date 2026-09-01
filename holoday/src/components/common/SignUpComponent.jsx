import { Card, Label } from "flowbite-react";
import './SignUpComponent.css'
import { HiMail } from "react-icons/hi";
import { useState, useEffect, use } from 'react';

const initState = {
    userId: '',
    userEmail: '',
    userNick: '',
    userPw: '',
}

const SignUpComponent = () => {

    const [formData, setFormData] = useState(initState);
    const [codeInput, setCodeInput] = useState('');
    const [isEmaliSent, setIsEmailSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [authError, setAuthError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleCodeChange = (e) => {
        setCodeInput(e.target.value);
    };


    return (
        <>
            <div className="flex justify-center items-center signupbox-container">
                <Card className="w-full max-w-2xl !p-8 shadow-xl m-10 !px-14">
                    <form className="flex flex-col gap-7">


                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label className="logo-text head-guide">이메일</Label>
                            </div>
                            <div className="flex items-center gap-0 w-full">
                                <div className="flex items-center w-full h-14 rounded-l-lg rounded-r-none border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 border-r-0">
                                    <HiMail className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                                    <input type="email" placeholder="email@holoday.com" required
                                        value={formData.userEmail} onChange={handleChange}
                                        className="w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                                </div>
                                <button type="button" className="shrink-0 px-6 h-14 -ml-[1px] rounded-l-none rounded-r-lg bg-blue-200 hover:bg-blue-300 active:bg-blue-200 font-medium text-md transition-colors border border-blue-300 flex items-center justify-center">
                                    인증
                                </button>
                            </div>
                        </div>


                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label className="logo-text head-guide">인증번호</Label>
                            </div>
                            <div className="flex items-center gap-0 w-full">
                                <div className="flex items-center justify-between w-full h-14 rounded-l-lg rounded-r-none border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 border-r-0">
                                    <input type="text" placeholder="인증번호 입력" required
                                        value={codeInput} onChange={handleCodeChange}
                                        className="w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                                    <span className="shrink-0 text-md text-rose-400 select-none">
                                        03:00
                                    </span>
                                </div>
                                <button type="button"
                                    className="shrink-0 px-6 h-14 -ml-[1px] rounded-l-none rounded-r-lg border border-gray-300 bg-gray-200 hover:bg-gray-300 active:bg-gray-200 font-medium text-md transition-colors flex items-center justify-center">
                                    확인
                                </button>
                            </div>
                        </div>


                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label className="logo-text head-guide">아이디</Label>
                            </div>
                            <div className="flex items-center w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <span className="text-lg font-bold text-gray-500 mr-4 select-none">@</span>
                                <input type="text" placeholder="holoday1234" required
                                    value={formData.userId} onChange={handleChange}
                                    className="w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                            </div>
                        </div>


                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="userPw" className="logo-text head-guide">비밀번호</Label>
                            </div>
                            <div className="flex items-center w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <svg className="w-6 h-6 ml-0 mr-2 text-gray-500 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                                </svg>
                                <input
                                    type="password" placeholder="holoday0831!" required
                                    value={formData.userPw} onChange={handleChange}
                                    className="w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                            </div>
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label className="logo-text head-guide">닉네임</Label>
                            </div>
                            <div className="flex items-center w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <input
                                    id="userNick" type="text" placeholder="닉네임 변경은 불가능합니다." required
                                    value={formData.userNick} onChange={handleChange}
                                    className="w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-400"
                                />
                            </div>
                        </div>


                        <div>
                            <Label className="text-white text-xs">.</Label>
                            <button type="submit" className="logo-text head-guide w-full py-3 px-5 h-14 bg-blue-700 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg text-center text-lg transition-colors focus:ring-2 shadow-sm">
                                가입
                            </button>
                        </div>

                    </form>
                </Card>
            </div>
        </>
    );
};

export default SignUpComponent;