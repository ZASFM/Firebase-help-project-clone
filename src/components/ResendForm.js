import React, { useState } from "react";
import { UserAuth } from "../AuthContext/context";
import {doc,updateDoc} from 'firebase/firestore';
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ResendForm=()=>{
   const {currentDocToUpdate,setCurrentDocToUpdate}=UserAuth();
   const navigate=useNavigate();

   const resendData=async(e)=>{
      e.preventDefault();
      //console.log(currentDocToUpdate);
      try{
         await updateDoc(doc(db,'appUsers',currentDocToUpdate.id),{
            name:currentDocToUpdate.name,
            email:currentDocToUpdate.email,
            message:currentDocToUpdate.message,
            location:currentDocToUpdate.location,
            category:currentDocToUpdate.category,
            acceptTerms:currentDocToUpdate.acceptTerms,
         })
         navigate('/successUpdate')
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Process update ended');
      }
   }

   const handleChange=(e)=>{
      const {type,name,value,checked}=e.target;
      setCurrentDocToUpdate(preVal=>{
         return {
            ...preVal,
            [name]:type==='checked'?checked:value,
         }
      })
   }

   return(
      <div className="m-4">
         <h1 className="text-3xl mb-6">Please change those field you desire to commit:</h1>
         <div className="flex flex-row justify-center gap-[250px] mt-[80px]">
         <p className="text-red mr-8 my-auto">Warning: this action is irreversible, beware of of the fields</p>
         <form onSubmit={resendData}>
         <label htmlFor="name" className="inline-block text-gray-700">Your name:</label><br/>
            <input
               id="name"
               type="text"
               name="name"
               placeholder="Your name"
               value={currentDocToUpdate.name}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <label htmlFor="email" className="inline-block text-gray-700">Your email:</label><br/>
            <input
               id="email"
               type="text"
               name="email"
               placeholder="Your email"
               value={currentDocToUpdate.email}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <label htmlFor="location" className="inline-block text-gray-700">Your location:</label><br/>
            <select
               id="location"
               name="location"
               value={currentDocToUpdate.location}
               onChange={handleChange}
               className="border-0 cursor-pointer rounded-full drop-shadow-md bg-gray-200 w-72 duration-300"
            >
               <option value="">--choose--</option>
               <option value="paris">Paris</option>
               <option value="london">London</option>
               <option value="madrid">Madrid</option>
               <option value="rome">Rome</option>
            </select><br/><br/>
            <label className="inline-block text-gray-700">Your category:</label><br/>
               <input
                  id="transport"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='transport'}
                  value="transport"
                  onChange={handleChange}
               />
               <label htmlFor="transport">Transport</label><br/>
               <input
                  id="accompany"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='accompany'}
                  value="accompany"
                  onChange={handleChange}
               />
               <label htmlFor="accompany">Accompany</label><br/>
               <input
                  id="delivery"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='delivery'}
                  value="delivery"
                  onChange={handleChange}
               />
               <label htmlFor="delivery">Delivery</label><br/><br/>
            <label htmlFor="message" className="inline-block text-gray-700">Your message:</label><br/>
            <textarea
               id="message"
               name="message"
               value={currentDocToUpdate.message}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <input
                  id="terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={currentDocToUpdate.acceptTerms}
                  onChange={handleChange}
            />
            <label htmlFor="terms">Accept terms?</label><label htmlFor="terms">Accept terms?</label><br/>
            <input
               type="submit"
               value="Submit form"
               className="cursor-pointer px-4 py-1 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
            />
         </form>
         </div>
      </div>
   )
}

export default ResendForm;