import { useEffect, useState } from "react";
import{ getList } from "./api/infoApi";
import { useNavigate } from "react-router";
import "./InfoList.css";
import PagiNation from "../components/common/PagiNation";

const categoryName = {
  1: "홀로 휴식",
  2: "홀로 문화",
  3: "홀로 체험",
};


const InfoList = () => {
  const[serverData, setServerData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();
  
  const isAdmin =
  localStorage.getItem("userIsAdmin") === "true";

  const moveToRead = (infoNo) => {
    navigate(`/holoinfo/${infoNo}`);
  };

  const movePage = ({ page }) => {
    getList({
        page: page,
        size: 9,
        categoryNo: selectedCategory
    }).then((result) => {
        setServerData(result);
    });
  };

  
  const moveCategory = (categoryNo) => {
    setSelectedCategory(categoryNo);

    getList({
        page: 1,
        size: 9,
        categoryNo: categoryNo
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
}, []);

  

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
                <button onClick={() => moveCategory(0)}>전체 보기</button>
                <button onClick={() => moveCategory(1)}>홀로 휴식</button>
                <button onClick={() => moveCategory(2)}>홀로 문화</button>
                <button onClick={() => moveCategory(3)}>홀로 체험</button>
            </div>

            {isAdmin && (
                <div className="info-add-btn-area">
                    <button
                        type="button"
                        className="info-add-btn"
                        onClick={() => navigate("/holoinfo/new")}
                    >
                        등록
                    </button>
                </div>
            )}

            <div className="info-cards">
                {serverData.dtoList.map((info) => (
                <div
                    className="info-card-overlay"
                    key={info.infoNo}
                    onClick={() => moveToRead(info.infoNo)}
                >
                <img
                src={`http://localhost:8080/upload/${info.infoSimg}`}
                alt={info.infoTitle}
                />

                <div className="info-overlay-text">
                    <span>{categoryName[info.categoryNo]}</span>
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