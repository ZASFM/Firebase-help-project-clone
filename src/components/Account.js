import React from 'react'
import { UserAuth } from '../AuthContext/context';
import { useNavigate,Link } from 'react-router-dom';

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
         <div className='flex justify-between'>
            <p className='ml-6'>Account: {user.email}</p>
            <button className='mr-6' onClick={logOutFromSession}>Log out</button>
         </div>
         <h1>Your dashboard</h1>
         <div className='flex flex-row flex-wrap p-4 w-3/5 justify-between mx-auto mt-4'>
            <div className='border border-solid border-2 w-96 m-2 mb-8 ml-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <Link to="/account/post-help">Post Help</Link>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 mr-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <Link to="/account/search-help">Search Help</Link>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 ml-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <Link to="/account/my_posts">My Posts</Link>
            </div>
            <div className='border border-solid border-2 w-96 m-2 mb-8 mr-8 ease-in duration-300 hover:scale-110 cursor-pointer'>
               <img src="https://www.designyourway.net/blog/wp-content/uploads/2012/08/winterph2.jpg" alt="cool"/>
               <Link to="/account/applied">Applied Jobs</Link>
            </div>
         </div>
      </div>
   )
}

export default Account;