import React,{useRef,useEffect,useState} from "react";
import { UserAuth } from "../AuthContext/context";
import { auth } from "../firebase";
import {FaCheck} from 'react-icons/fa'; 
import {doc,updateDoc} from 'firebase/firestore';
import { db } from "../firebase";

const SearchHelp=()=>{
   const {databaseData,setDatabaseData}=UserAuth();
   const [localData,setLocalData]=useState([]);
   const [selectData,setSelectData]=useState({
      location:'',
      category:'',
   })
   const [showMessage,setShowMessage]=useState(false);
   console.log(localData);
   const input=useRef();

   useEffect(()=>{
      setLocalData(databaseData);
      input.current.focus();
   },[databaseData])

   const filterItems=()=>{
      let filterItems=databaseData.filter(data=>data.name.includes(input.current.value));
      setLocalData(filterItems);
   }

   const updateLocalWithSelect=()=>{
      if(selectData.location==='' && selectData.category===''){
         setLocalData(databaseData);
      }
      else if(selectData.location!=='' && selectData.category!==''){
         const filteredLocalData=localData.filter(data=>data.location===selectData.location && data.category===selectData.category);
         setLocalData(filteredLocalData);
      }else if(selectData.location!=='' && selectData.category===''){
         const filteredLocalData=localData.filter(data=>data.location===selectData.location);
         setLocalData(filteredLocalData);
      }else if(selectData.location==='' && selectData.category!==''){
         const filteredLocalData=localData.filter(data=>data.category===selectData.category);
         setLocalData(filteredLocalData);
      }
   }

   const updateSelect=(e)=>{
      const {value,name}=e.target;
      setSelectData(preVal=>{
         return {
            ...preVal,
            [name]:value,
         }
      })
   }

   const applyForAJob=async(post)=>{
      try{
         await updateDoc(doc(db,'appUsers',post.id),{
            ...post,
            appliedBy:`${auth.currentUser.uid}`,
         })
         setShowMessage(true);
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Process update doc will appliedBy has ended');
      }
      setTimeout(()=>{
         setShowMessage(false);
      },2500)
   }

   useEffect(()=>{
      updateLocalWithSelect();
   },[selectData])

   return (
      <div className="m-4">
         {showMessage && <div className="bg-green-700 text-white-500 flex gap-[20px] justify-center items-center"><FaCheck/> You have successfully applied for a job</div>}
         <h1 className="text-2xl">All posts are show here:</h1>
         <div>
            <p className="text-1.25xl mt-4">Search your prefered jobs here:</p>
            <input 
               type="text" 
               placeholder="Search by name of the user"
               ref={input}
               onChange={filterItems}
               className="w-2/5 border-2 rounded p-2 "
            />
            <select
               onChange={updateSelect}
               name="location"
               value={selectData.location}
               className="border-0 cursor-pointer rounded-full drop-shadow-md bg-gray-200 w-72 duration-300 mr-2 ml-2"
            >
               <option value="">--choose--</option>
               <option value="rome">Rome</option>
               <option value="london">London</option>
               <option value="madrid">Madrid</option>
               <option value="paris">Paris</option>
            </select>
            <select
               name="category"
               value={selectData.category}
               onChange={updateSelect}
               className="border-0 cursor-pointer rounded-full drop-shadow-md bg-gray-200 w-72 duration-300"
            >
               <option value="">--choose--</option>
               <option value="transport">Transport</option>
               <option value="accompany">Accompany</option>
               <option value="delivery">Delivery</option>
            </select>
            <button className="m-4 cursor-pointer bg-blue-200 text-white border-2 border-black rounded-lg p-2 hover:bg-blue-500" onClick={()=>setSelectData({
               location:'',
               category:'',
            })}>Reset search field</button>
         </div>
         {localData.length<1 && <div>No results matches your search, try with another query</div>}
         {localData!==[] && localData.map(data=>{
            return (
               <div className="border border-solid border-2 border-black bg-blue-300 m-4">
                  <div className="w-full flex justify-center items-center">
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.location}</div>
                     <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{data.category}</div>
                     <button onClick={()=>applyForAJob(data)} className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4 hover:bg-red-800">Apply for this job</button>
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