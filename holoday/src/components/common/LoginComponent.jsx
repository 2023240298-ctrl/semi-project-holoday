import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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
         const response = await axios.post(
            "http://localhost:8080/api/holoday/login",
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
      <div>
         <div>
            <input
               type="text"
               name="userId"
               placeholder="아이디"
               value={login.userId}
               onChange={handleChange}
            />
         </div>

         <div>
            <input
               type="password"
               name="userPw"
               placeholder="비밀번호"
               value={login.userPw}
               onChange={handleChange}
            />
         </div>

         <button
            type="button"
            onClick={handleChangeLogin}
         >
            로그인
         </button>
      </div>
   );
};

export default LoginComponent;