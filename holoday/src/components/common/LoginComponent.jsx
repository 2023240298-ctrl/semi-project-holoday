import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Label } from "flowbite-react";
import customAxios from "../../api/customAxios";

const LoginComponent = () => {
   const navigate = useNavigate();

   const [login, setLogin] = useState({
      userId: "",
      userPw: "",
   });

   const handleChange = (e) => {
      const {name, value} = e.target;

      setLogin((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleChangeLogin = async () => {
      console.log(login);
      try {
         const response = await customAxios.post(
            "/api/holoday/login",
            login
         );

         console.log("로그인 성공:", response.data);
         localStorage.setItem("accessToken", response.data.accessToken);

         navigate("/");
         window.location.reload();
      } catch(error) {
         console.log("로그인 실패:", error);
      }
   };

       return (
           <>
               <div className="flex justify-center items-center signupbox-container">
                   
                   <Card className="w-full max-w-2xl !p-8 shadow-xl m-10 !px-14">
                       
                       <form
                           className="flex flex-col gap-7"
                           onSubmit={(e) => {
                              e.preventDefault();
                              handleChangeLogin();
                           }}
                        >

                           <div className="w-full">
                              <div className="mb-2 block">
                                 <Label className="logo-text head-guide">
                                    아이디
                                 </Label>
                              </div>
                              <div className="flex items-center w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                 <span className="text-lg font-bold text-gray-500 mr-4 select-none">
                                    @
                                 </span>

                                 <input
                                    type="text"
                                    name="userId"
                                    value={login.userId}
                                    onChange={handleChange}
                                    required
                                    className="!w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500"
                                 />
                              </div>
                           </div>

                           <div className="w-full">
                              <div className="mb-2 block">
                                 <Label
                                    htmlFor="userPw"
                                    className="logo-text head-guide"
                                 >
                                    비밀번호
                                 </Label>
                              </div>
                              <div className="flex items-center w-full h-14 rounded-lg border border-gray-300 bg-gray-50 px-4 shadow-sm transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                 <svg
                                    className="w-6 h-6 mr-2 text-gray-500 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                 >
                                    <path
                                       stroke="currentColor"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="m7 16 4-4-4-4m6 8 4-4-4-4"
                                    />
                                 </svg>
                                 <input
                                    id="userPw"
                                    type="password"
                                    name="userPw"
                                    value={login.userPw}
                                    onChange={handleChange}
                                    required
                                    className="!w-full bg-transparent outline-none border-none p-0 focus:outline-none focus:ring-0 text-base text-gray-900 placeholder-gray-500"
                                 />
                              </div>
                           </div>

                           <div>
                              <button
                                 type="submit"
                                 className="logo-text head-guide w-full py-3 px-5 h-14 bg-blue-700 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg text-center text-lg transition-colors focus:ring-2 shadow-sm"
                              >
                                 로그인
                              </button>
                           </div>

                           <div className="text-center">
                              <span className="text-gray-500 mr-2">
                                 아직 회원이 아니신가요?
                              </span>
                              <button
                                 type="button"
                                 onClick={() => navigate("/holosignup")}
                                 className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                 회원가입
                              </button>
                           </div>
                       </form>
                   </Card>
               </div>
           </>
       );
   };

export default LoginComponent;