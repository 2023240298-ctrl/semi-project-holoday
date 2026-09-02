import { useParams } from "react-router";
import "./InfoRead.css";
import { getOne } from "./api/infoApi";
import { useEffect, useState } from "react";

const categoryName = {
  1: "홀로 휴식",
  2: "홀로 문화",
  3: "홀로 체험",
};

const InfoRead = () => {
  const {infoNo} = useParams();
  const [info, setInfo] = useState(null);

  {/*상세 데이터 */}
  useEffect(()=> {
    
    getOne(infoNo).then((result)=> {
        setInfo(result);
    })
     .catch((error) => {
            console.log("상세 조회 오류 =", error);
        });

  }, [infoNo]);

  {/* 지도 */}
  useEffect(() => {

    if (!info) {return;}

    const container = document.getElementById("map");//지도를 담을 영역의 DOM 레퍼런스

    const options = {//지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3, //지도의 레벨 (확대, 축소)
    };

    const map = new window.kakao.maps.Map(container, options);//지도 생성 및 객체 리턴

      // 주소를 좌표로 변환하기 위한 객체
    const geocoder = new window.kakao.maps.services.Geocoder();

    // DB에서 가져온 주소로 좌표 검색
    geocoder.addressSearch(info.infoAddress, (result, status) =>{
       
      if (status === window.kakao.maps.services.Status.OK) {

      // 검색된 주소의 위도, 경도로 좌표 생성
      const coords = new window.kakao.maps.LatLng(
        result[0].y,
        result[0].x
      );

      // 해당 위치에 마커 생성
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 지도 중심을 해당 주소로 이동
      map.setCenter(coords);
    }
  });
    
  }, [info]);

  if (!info) {
    return <div>Loading...</div>;
    }

    return(
        <div className="info-read holo-text">
          <div className="info-read-header">

            <span className="info-read-category">
                <span>{categoryName[info.categoryNo]}</span>
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
                src={`http://localhost:8080/upload/${info.infoImg}`}
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

              <div 
                className="info-map"
                id="map"
                >
                
              </div>

            </div>


                    
    </div>

    );
};
export default InfoRead;