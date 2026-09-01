import { useState } from "react";
import { postAdd } from "./api/infoApi";
import "./InfoAdd.css";

const initState = {
    categoryNo: "",
    infoTitle: "",
    infoPlace: "",
    infoAddress: "",
    infoContent: "",
    
};

const InfoAdd = () => {
  const [info, setInfo] = useState(initState);
  const [file,setFile] = useState(null);


  const handleChange = (e) => {
    const {name, value } = e.target;

    setInfo({
        ...info,
        [name]: value,
    });
  };

  const handleClickAdd = () => {
    console.log(localStorage.getItem("accessToken"));
    
    postAdd(info, file).then((result)=> {
        console.log(result);
    });
  };
  
    return (
         <div className="info-add">
            <h2>홀로 알림 등록</h2>


            <div className="info-add-select">
                <label>카테고리</label>

                <select
                    name="categoryNo"
                    value={info.categoryNo}
                    onChange={handleChange}
                >
                    <option value="">카테고리를 선택하세요</option>
                    <option value="1">홀로 휴식</option>
                    <option value="2">홀로 문화</option>
                    <option value="3">홀로 체험</option>
                </select>
            </div>

            <div className="info-add-input">
                <label>제목</label>
                <input
                    type="text"
                    name="infoTitle"
                    value={info.infoTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="info-add-textarea">
                <label>내용</label>
                <textarea
                    name="infoContent"
                    value={info.infoContent}
                    onChange={handleChange}
                />
            </div>

            <div className="info-input">
                <label>이미지</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>

            <div className="info-add-input">
                <label>장소</label>
                <input
                    type="text"
                    name="infoPlace"
                    value={info.infoPlace}
                    onChange={handleChange}
                />
            </div>

            <div className="info-add-input">
                <label>주소</label>
                <input
                    type="text"
                    name="infoAddress"
                    value={info.infoAddress}
                    onChange={handleChange}
                />
            </div>

            <button 
              type="button"
              onClick={handleClickAdd}
            >
                등록
            </button>
        </div>
    );
}

export default InfoAdd;