import { useNavigate } from "react-router";
import "./Header.css";

const Header = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    navigate("/");
  };

  return (
const Header = ({ isLogin, setIsLogin }) => {
      const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLogin(false);
        navigate("/");
      };

      return (
        <header className="header">
          <div className="header_logo logo-text ">
            HOLODAY
          </div>

          <nav className="header_menu head-text">
            <a href="/">홈</a>
            <a href="/info">홀로정보</a>
            <a href="/board">홀로라운지</a>
            <a href="/card">홀로땜</a>
          </nav>

          <div className="header_login head-text">

            {isLogin ? (
              <button
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
            )}
            <button
              type="button"
            >
              회원가입
            </button>
          </div>
        </header>
      );

    }

export default Header;