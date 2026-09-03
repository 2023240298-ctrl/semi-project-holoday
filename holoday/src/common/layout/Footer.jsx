import"./Footer.css";

const Footer = () => {
     return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer_logo logo-text">
            HOLODAY
        </span>

        <div className="footer_menu">
        <span>
          혼자 보내는 시간도 즐거울 수 있도록,
          다양한 혼놀 정보와 경험을 공유합니다.
        </span>

        <span>홀로알림 | 홀로라운지 | 홀로땜</span>

        <span>Team HoloDay</span>
        <span>Semi Project 2026</span>
        </div>
      </div>

      <p className="footer-copy">
        © 2026 HoloDay. All rights reserved.
      </p>
    </footer>
  );
};


export default Footer;