import React,{useState,useEffect} from 'react';
import { UserAuth } from '../AuthContext/context';
import { auth } from '../firebase';
import {FaRegTrashAlt,FaEdit} from 'react-icons/fa';

const MyPosts=()=>{
   const {databaseData,updatePost,deletePost}=UserAuth();
   const [localPosts,setLocalPosts]=useState([]);
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
               <button onClick={()=>updatePost(post)}> <FaEdit/> </button>
               <button onClick={()=>deletePost(post)}> <FaRegTrashAlt/> </button>
            </div>
         ))}
      </div>
   )
}

export default MyPosts;