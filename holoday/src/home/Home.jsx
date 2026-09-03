import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getList as getInfoList } from "../holoInfo/api/infoApi";
import { getList as getBoardList } from "../holoLounge/js/HoloBoardApi";
import "./Home.css";

const categoryName = {
    1: "홀로 휴식",
    2: "홀로 문화",
    3: "홀로 체험",
};

const Home = () => {
  const [infoList, setInfoList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

    useEffect(() => {
        getInfoList({
            page: 1,
            size: 6
        }).then((result) => {
            setInfoList(result.dtoList);
        });

        getBoardList({
            page:1,
            size: 6
        }).then((result) => {
            setBoardList(result.dtoList);
        });

    }, []);

    const currentInfo = infoList[startIndex];

    const prevInfo =
        startIndex > 0
            ? infoList[startIndex - 1]
            : null;

    const nextInfo =
        startIndex < infoList.length - 1
            ? infoList[startIndex + 1]
            : null;

   

    const nextSlide = () => {
    if (startIndex < infoList.length -1) {
        setStartIndex(startIndex + 1);
    }
    };

    const prevSlide = () => {
    if (startIndex > 0) {
        setStartIndex(startIndex - 1);
    }
    };

    

    return (
        <div className="home">
          <section className="home-info">
            <div className="home-section-title ">
                <h2>홀로알림</h2>
                    <button
                        type="button"
                        onClick={() => navigate("/holoinfo")}
                    >
                        더보기
                    </button>
            </div>

            <div className="home-info-slider">
                    {/* 이전 카드 */}
                    <div className="home-info-side">
                        {prevInfo && (
                            <img
                                src={`http://localhost:8080/upload/${prevInfo.infoSimg}`}
                                alt={prevInfo.infoTitle}
                            />
                        )}
                    </div>
                    {/* 가운데 메인 카드 */}
                    {currentInfo && (
                        <div
                            className="home-info-main"
                            onClick={() =>
                                navigate(`/holoinfo/${currentInfo.infoNo}`)
                            }
                        >
                            <img
                                src={`http://localhost:8080/upload/${currentInfo.infoSimg}`}
                                alt={currentInfo.infoTitle}
                            />

                            <div className="home-info-main-text">
                                <span>
                                    {categoryName[currentInfo.categoryNo]}
                                </span>
                                <h3>{currentInfo.infoTitle}</h3>
                                <p>{currentInfo.infoPlace}</p>
                            </div>

                            <button
                                type="button"
                                className="home-slider-prev"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevSlide();
                                }}
                            >
                                ◁
                            </button>

                            <button
                                type="button"
                                className="home-slider-next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextSlide();
                                }}
                            >
                                ▷
                            </button>
                        </div>
                    )}
                    {/* 다음 카드 */}
                    <div className="home-info-side">
                        {nextInfo && (
                            <img
                                src={`http://localhost:8080/upload/${nextInfo.infoSimg}`}
                                alt={nextInfo.infoTitle}
                            />
                        )}
                    </div>

                </div>
            </section>
            <section
                className="home-ddam"
                onClick={() => navigate("/holoddam")}
            >
                <div>
                  <span>오늘 뭐 하지?</span>
                  <h2>홀로땜</h2>
                  <p>오늘은 뭐 하면서 시간 때울까?</p>
                </div>

                <button type="button">
                    카드 보러 가기 →
                </button>
            </section>
            <section className="home-lounge">
              <div className="home-section-title">
                <h2>홀로라운지</h2>

                <button
                    type="button"
                    onClick={() => navigate("/holoboard")}
                >
                    더보기
                </button>
              </div>

            <div className="home-lounge-list">
                {boardList.map((board) => (
                    <div key={board.boardNo}>
                        <h3>{board.boardTitle}</h3>
                    </div>
                ))}
            </div>

        </section>


        </div>
    );
};

export default Home;