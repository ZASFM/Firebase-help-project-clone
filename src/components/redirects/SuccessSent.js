import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessSent=()=>{
   const navigate=useNavigate();
   setTimeout(()=>{
      navigate('/account')
   },1500);
   return (
      <div>
         Your form was successfully sent, redirecting you shortly to the dashboard
      </div>
   )
}

export default SuccessSent;