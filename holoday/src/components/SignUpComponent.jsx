import { Button, Card, Label, TextInput, HelperText } from "flowbite-react";

import { HiMail } from "react-icons/hi";

const SignUpComponent = () => {

    return (
        <>
            <div className="flex justify-center items-center">
                <Card className="w-full max-w-lg !p-8 shadow-xl m-10 !px-12">
                    <form className="flex flex-col gap-5">
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="userEmail">이메일</Label>
                            </div>
                            <TextInput id="userEmail" type="userEmail" icon={HiMail} placeholder="email@holoday.com"
                                required sizing="lg" className="placeholder-gray-900" />
                        </div>
                        <div>
                            <TextInput id="code" type="code" required sizing="lg" />
                        </div>

                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="userId">아이디</Label>
                            </div>
                            <div className="flex items-center w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500">
                                <span className="text-lg font-bold text-gray-500 mr-4 select-none">@</span>
                                <input
                                    id="userId" type="text" placeholder="holoday1234" required
                                    className="w-full bg-transparent outline-none border-none p-0 py-1
                                    focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="userPw">비밀번호</Label>
                            </div>
                            <div className="flex items-center w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 shadow-sm transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500">
                                <svg class="w-6 h-6 ml-0 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
                                </svg>
                                <input
                                    id="userPw" type="password" placeholder="holoday0831!" required
                                    className="w-full bg-transparent outline-none border-none p-0 py-1
                                     focus:ring-0 text-base text-gray-900 placeholder-gray-500" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="userNick" value="userNick">닉네임</Label>
                            </div>
                            <TextInput id="userNick" type="text" required sizing="lg" placeholder="닉네임 변경은 불가능합니다." color="failure" />
                        </div>
                        <div>
                            <Label >text</Label>
                            <button type="submit" className="w-full py-3 px-5 h-12 bg-blue-700 hover:bg-blue-600 active:bg-blue-800
                            text-white font-medium rounded-lg text-center transition-colors focus:ring-2"
                            >Submit</button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default SignUpComponent;