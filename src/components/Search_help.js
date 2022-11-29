import React from "react";
import { UserAuth } from "../AuthContext/context";

const SearchHelp=()=>{
   const {databaseData}=UserAuth();
   if(databaseData!==[]){
      console.log(databaseData);
   }
   return (
      <div>
         {databaseData.map(data=>{
            return (
               <div className="border border-solid border-2">
                  {data.name}
               </div>
            )
         })}
      </div>
   )
}

export default SearchHelp;