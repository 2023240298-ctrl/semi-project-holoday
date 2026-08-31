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


    return(
        <div>
            상세페이지
        </div>

    );
};
export default InfoRead;