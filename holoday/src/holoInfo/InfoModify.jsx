import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FileInput, Label } from "flowbite-react";

import { getOne, patchModify , deleteOne} from "./api/infoApi";
import "./InfoAdd.css";

const initState = {
    categoryNo: "",
    infoTitle: "",
    infoPlace: "",
    infoAddress: "",
    infoContent: "",
    
};
const InfoModify = () => {
  const {infoNo} = useParams();

  const [info, setInfo] = useState(initState);
  const [file, setFile] = useState(null);

  const isAdmin = localStorage.getItem("userIsAdmin") === "true";

  const navigate = useNavigate();

  useEffect(() => {
    getOne(infoNo).then((result)=> {
        setInfo(result);
    });
  },[infoNo]);


  const handleChange = (e) => {
    const {name, value } = e.target;

    setInfo({
        ...info,
        [name]: 
          name === "categoryNo" && value !== ""
            ? Number(value)
            :value,
    });
  };

  const handleClickModify = () => {
    patchModify(infoNo,info,file).then(()=> {
        navigate(`/holoinfo/${infoNo}`);
    });
  };
  
  const handleClickDelete = () => {
    if(window.confirm("삭제하시겠습니까?")){
        deleteOne(infoNo).then(()=> {
            navigate("/holoinfo");
        });
    }
  };

    return (
         <div className="info-add holo-text">
            <h2>홀로 알림 수정</h2>


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
                    placeholder="제목을 입력하세요"
                />
            </div>

            <div className="info-add-textarea">
                <label>내용</label>
                <textarea
                    name="infoContent"
                    value={info.infoContent}
                    onChange={handleChange}
                    placeholder="내용을 입력하세요"
                />
            </div>

            <div className="info-add-file">
                <Label
                    className="mb-2 block"
                    htmlFor="file-upload"
                    value="이미지"
                />

                <FileInput
                    id="file-upload"
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
                    placeholder="장소명을 입력하세요"
                />
            </div>

            <div className="info-add-input">
                <label>주소</label>
                <input
                    type="text"
                    name="infoAddress"
                    value={info.infoAddress}
                    onChange={handleChange}
                    placeholder="상세주소를 입력하세요"
                />
            </div>
            {isAdmin && (
            <div className="info-add-btn-area">
                <button 
                    type="button"
                    onClick={handleClickModify}
                    className="info-add-btn modify-action-btn">
                        수정
                    </button>

                    <button 
                    type="button"
                    onClick={handleClickDelete}
                    className="info-add-btn modify-action-btn">
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
};
export default InfoModify;