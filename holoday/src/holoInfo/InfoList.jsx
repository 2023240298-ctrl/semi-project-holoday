import { useEffect, useState } from "react";
import{ getList } from "./api/infoApi";
import { useNavigate } from "react-router";
import "./InfoList.css";
import PagiNation from "../components/common/PagiNation";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const InfoList = () => {
  const[serverData, setServerData] = useState(null);
  const navigate = useNavigate();

  const moveToRead = (infoNo) => {
    navigate(`/info/${infoNo}`);
  };

  const movePage = ({ page }) => {
    getList({
        page: page,
        size: 9
    }).then((result) => {
        setServerData(result);
    });
  };
  
  useEffect(() => {
    getList({
        page: 1,
        size: 9
    }).then((result) => {
        setServerData(result);
    });
  },[]);

  if (!serverData) {
    return <div>Loading...</div>;
    }

    return (
        <div className="info-list holo-text">

            <div className="info-title">
                <h2>홀로 알림</h2>
                <p>혼자 즐기는 하루에 필요한 소식을 확인해보세요.</p>
            </div>

            <div className="info-category">
                <button>전체 보기</button>
                <button>홀로 휴식</button>
                <button>홀로 문화</button>
                <button>홀로 체험</button>
            </div>

            <div className="info-cards">
                {serverData.dtoList.map((info) => (
                <div
                    className="info-card-overlay"
                    key={info.infoNo}
                    onClick={() => moveToRead(info.infoNo)}
                >
                <img
                src="/images/holoInfo/testfile.png"
                alt={info.infoTitle}
                />

                <div className="info-overlay-text">
                    <span>홀로 체험</span>
                    <h3>{info.infoTitle}</h3>
                    <p>{info.infoPlace}</p>
                </div>   
                </div>
                ))}

            </div>
            <div className="info-pagination">
                <PagiNation
                serverData={serverData}
                movePage={movePage}
                />
            </div>
        </div>
    );
};

export default InfoList;