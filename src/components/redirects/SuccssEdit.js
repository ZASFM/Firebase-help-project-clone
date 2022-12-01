import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessUpdate=()=>{
   const navigate=useNavigate();
   setTimeout(()=>{
      navigate('/account')
   },1500);
   return (
      <div>
         Your form was successfully updated, redirecting you shortly to the dashboard
      </div>
   )
}

export default SuccessUpdate;