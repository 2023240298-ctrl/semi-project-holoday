import { useState } from "react";
import "./InfoAdd.css";

const [file,setFile] = useState(null);

const initState = {
    categoryNo: "",
    infoTitle: "",
    infoPlace: "",
    infoAddress: "",
    infoContent: "",
    
};

const InfoAdd = () => {
  const [info, setInfo] = useState(initState);

  const handleChange = (e) => {
    const {name, value } = e.target;

    setInfo({
        ...info,
        [name]: value,
    });
  };
  
    return (
         <div className="info-add">
            <h2>홀로 알림 등록</h2>

            <label>제목</label>
            <input
                type="text"
                name="infoTitle"
                value={info.infoTitle}
                onChange={handleChange}
            />

            <label>장소</label>
            <input
                type="text"
                name="infoPlace"
                value={info.infoPlace}
                onChange={handleChange}
            />

            <label>주소</label>
            <input
                type="text"
                name="infoAddress"
                value={info.infoAddress}
                onChange={handleChange}
            />

            <label>내용</label>
            <textarea
                name="infoContent"
                value={info.infoContent}
                onChange={handleChange}
            />

            <button type="button">등록</button>
        </div>
    );
}

export default InfoAdd;