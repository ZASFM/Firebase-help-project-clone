import React,{useState,useEffect} from "react";
import { UserAuth } from "../AuthContext/context";
import { auth } from "../firebase";

const Applied=()=>{
   const {databaseData}=UserAuth();
   const [appliedFor,setAppliedFor]=useState([]);
   console.log(appliedFor);
   const filterAppliedBy=()=>{
      const appliedFilter=databaseData.filter(data=>data.appliedBy===auth.currentUser.uid);
      setAppliedFor(appliedFilter);
   }
   useEffect(()=>{
      filterAppliedBy();
   },[])

   return (
      <div className="m-4">
         <h1 className="text-2xl">You have applied for all these jobs, please contact the the person to there emails</h1>
         {appliedFor && appliedFor.map(data=>{
            return (
               <div className="border border-solid border-2 border-black bg-blue-300 m-4">
                  <div className="w-full flex justify-center items-center">
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.location}</div>
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.category}</div>
                  </div><br/>
                  <div className="pl-4">{`From: ${data.name}`}</div>
                  <div className="pl-4">{`Message: ${data.message}`}</div>
                  <div className="pl-4 mb-2 font-bold">Please contact the provider of the solicitude: {data.email}</div>
               </div>
            )
         })}
      </div>
   )
}

export default Applied;