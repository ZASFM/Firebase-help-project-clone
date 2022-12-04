import React from 'react'
import { UserAuth } from '../AuthContext/context';
import { useNavigate,Link } from 'react-router-dom';
import {FaSignOutAlt} from 'react-icons/fa';

const Account=()=>{
   const {user,logOut}=UserAuth();
   const navigate=useNavigate();

   if(user){
      console.log(user);
   }

   const logOutFromSession=async()=>{
      try{
         await logOut();
         navigate('/');
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Log out process ended');
      }
   }

   return (
      <div>
         <div className='flex justify-between bg-blue-700 p-4 text-white'>
            <p className='ml-6'>You are logged in with the account: {user.email}</p>
            <button className='mr-6' onClick={logOutFromSession}><FaSignOutAlt/></button>
         </div>
         <h1 className='mx-auto mt-4 text-2xl'>Your dashboard</h1>
         <div className='flex flex-row flex-wrap p-4 w-3/5 justify-between mx-auto mt-4'>
            <div className='border border-solid border-2 w-96 m-2 mb-8 ml-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <div className='flex justify-center m-4 border-2 border solid border-black rounded group hover:bg-blue-700'>
                  <Link className='group-hover:text-white' to="/account/post-help">Post Help</Link>
               </div>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 mr-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <div className='flex justify-center m-4 border-2 border solid border-black rounded group hover:bg-blue-700'>
                  <Link className='group-hover:text-white' to="/account/search-help">Search Help</Link>
               </div>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 ml-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <div className='flex justify-center m-4 border-2 border solid border-black rounded group hover:bg-blue-700'>
                  <Link className='group-hover:text-white' to="/account/my_posts">My Posts</Link>
               </div>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 mr-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <div className='flex justify-center m-4 border-2 border solid border-black rounded group hover:bg-blue-700'>
                  <Link className='group-hover:text-white' to="/account/applied">Applied Jobs</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Account;