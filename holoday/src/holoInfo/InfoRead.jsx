import { useParams } from "react-router";
import "./InfoRead.css";
import { getOne } from "./api/infoApi";
import { useEffect, useState } from "react";

const InfoRead = () => {
  const {infoNo} = useParams();
  const [info, setInfo] = useState(null);

  useEffect(()=> {
    
    getOne(infoNo).then((result)=> {
        console.log(result);
        setInfo(result);
    });
  }, [infoNo]);


  if (!info) {
    return <div>Loading...</div>;
    }

    return(
        <div className="info-read holo-text">
          <div className="info-read-header">

            <span className="info-read-category">
                홀로 체험
            </span>

            <h2>{info.infoTitle}</h2>

            <div className="info-read-meta">
                <span>{info.infoPlace}</span>
                <span>·</span>
                <span>{info.infoAddress}</span>
            </div>

          </div>

            {/* 큰 이미지 */}
            <div className="info-read-image">
              <img
                src="/images/holoInfo/testfile.png"
                alt={info.infoTitle}
                />
            </div>

            {/* 상세 내용 */}
            <div className="info-read-detail">
              <h3>상세 정보</h3>
                <p>
                    {info.infoContent}
                </p>
            </div>

            {/* 지도 영역 */}
            <div className="info-read-location">
              <h3>위치 안내</h3>

              <div className="info-location-text">
                <strong>{info.infoPlace}</strong>
                <p>{info.infoAddress}</p>
              </div>

              <div className="info-map">
                지도
              </div>

            </div>


                    
    </div>

    );
};
export default InfoRead;