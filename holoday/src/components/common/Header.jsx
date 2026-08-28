import "./Header.css";

const Header = () => {
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
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );

}

export default Header;