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
   //console.log(localPosts);

   return (
      <div>
         {localPosts.map(post=>(
            <div className='border m-2 border-solid border-2'>
               {post.name}
               <button onClick={()=>navigateToUpdate(post)}> <FaEdit/> </button>
               <button onClick={()=>deletePost(post)}> <FaRegTrashAlt/> </button>
            </div>
         ))}
      </div>
   )
}

export default MyPosts;