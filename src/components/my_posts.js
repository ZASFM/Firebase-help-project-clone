import React,{useState,useEffect} from 'react';
import { UserAuth } from '../AuthContext/context';
import { auth } from '../firebase';
import {FaRegTrashAlt,FaEdit} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyPosts=()=>{
   const {databaseData,navigateToUpdate,deletePost}=UserAuth();
   const [localPosts,setLocalPosts]=useState([]);
   const navigate=useNavigate();
   useEffect(()=>{
      const filterMyPosts=databaseData.filter(document=>document.userId===auth.currentUser.uid);
      setLocalPosts(filterMyPosts);
   },[databaseData])

   return (
      <div className='m-4'>
         <h1 className='text 3xl'>Check out your latest posts:</h1>
         {localPosts.map(post=>(
            <div className="border border-solid border-2 border-black bg-blue-300 m-4 group">
               <div className="w-full flex justify-center items-center">
                  <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{post.location}</div>
                  <div className="bg-black-300 border-2 border-solid rounded w-1/5 flex justify-center items-center m-4">{post.category}</div>
               </div><br/>
               <div className="pl-4">{`From: ${post.name}`}</div>
               <div className="pl-4 mb-2">{`Message: ${post.message}`}</div>
               <div className='invisible w-full flex justify-center items-center group-hover:visible'>
                  <button onClick={()=>navigateToUpdate(post)}> <FaEdit className='w-[50px] hover:text-orange-500'/> </button>
                  <button onClick={()=>deletePost(post)}> <FaRegTrashAlt className='hover:text-red-500'/> </button>
               </div>
            </div>
         ))}
      </div>
   )
}

export default MyPosts;