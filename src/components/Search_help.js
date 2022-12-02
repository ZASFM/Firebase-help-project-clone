import React,{useRef,useEffect,useState} from "react";
import { UserAuth } from "../AuthContext/context";

const SearchHelp=()=>{
   const {databaseData}=UserAuth();
   const [localData,setLocalData]=useState([]);
   const input=useRef();

   useEffect(()=>{
      setLocalData(databaseData);
      input.current.focus();
   },[databaseData])

   const filterItems=()=>{
      let filterItems=databaseData.filter(data=>data.name.includes(input.current.value));
      setLocalData(filterItems);
   }

   return (
      <div>
         <input 
            type="text" 
            placeholder="Search by name of the user"
            ref={input}
            onChange={filterItems}
            className="w-3/5 border-2 rounded p-2 "
         />
         <h1 className="text-2xl">All posts are show here:</h1>
         {localData.length<1 && <div>No results matches your search, try with another query</div>}
         {localData!==[] && localData.map(data=>{
            return (
               <div className="border border-solid border-2 border-black bg-blue-300 m-4">
                  <div className="w-full flex justify-center items-center">
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.location}</div>
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.category}</div>
                  </div><br/>
                  <div className="pl-4">{`From: ${data.name}`}</div>
                  <div className="pl-4 mb-2">{`Message: ${data.message}`}</div>
               </div>
            )
         })}
      </div>
   )
}

export default SearchHelp;