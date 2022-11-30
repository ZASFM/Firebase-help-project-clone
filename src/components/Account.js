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
         <p>Account: {user.email}</p>
         <button onClick={logOutFromSession}>Log out</button>
         <div>
            <Link to="/account/post-help">Post help</Link>
            <Link to="/account/search-help">Search help</Link>
            <Link to="/account/my_posts">My posts</Link>
         </div>
      </div>
   )
}

export default Account;