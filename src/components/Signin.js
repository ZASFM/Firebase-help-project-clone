import React,{useState} from 'react';
import { UserAuth } from '../AuthContext/context';
import {useNavigate,Link} from 'react-router-dom';

const SignIn=()=>{
   const {signIn}=UserAuth();
   const [fromData,setFormData]=useState({
      email:"",
      password:"",
   })
   const navigate=useNavigate();

   const updateForm=(e)=>{  
      const target=e.target;
      const {name,value}=target;
      setFormData(preVal=>{
         return {
            ...preVal,
            [name]:value,
         }
      })
   }

   const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
         await signIn(fromData.email,fromData.password);
         navigate('/account');
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Sign in process ended');
      }
   }
   
   return (
      <>
      <div className='lg:w-1/2 w-[85%] mx-auto p-4'>
         <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
         <p className='py-2'>Don´ have an account <Link to="/sign-up" className='underline'>Sign up</Link></p>
         <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
            <label htmlFor='email' className='py-2 font-medium'>Your email:</label>
            <input
               type="text"
               id="email"
               name="email"
               placeholder='Insert your email'
               value={fromData.email}
               onChange={updateForm}
               className="border p-3 text-black"
            />
            <label htmlFor='password' className='py-2 font-medium'>Your password:</label>
            <input
               type="password"
               id="password"
               name='password'
               placeholder='Insert your password'
               value={fromData.password}
               onChange={updateForm}
               className="border p-3 text-black"
            />
            <input
               type="submit"
               value="Sign In"
               className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white"
            />
            </div>
         </form>
      </div>
      </>
   )
}

export default SignIn;