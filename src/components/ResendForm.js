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
      <div>
         <form onSubmit={resendData}>
         <label htmlFor="name">Your name:</label><br/>
            <input
               id="name"
               type="text"
               name="name"
               placeholder="Your name"
               value={currentDocToUpdate.name}
               onChange={handleChange}
            />
            <label htmlFor="email">Your email:</label>
            <input
               id="email"
               type="text"
               name="email"
               placeholder="Your email"
               value={currentDocToUpdate.email}
               onChange={handleChange}
            />
            <label htmlFor="location">Your location:</label>
            <select
               id="location"
               name="location"
               value={currentDocToUpdate.location}
               onChange={handleChange}
            >
               <option value="">--choose--</option>
               <option value="paris">Paris</option>
               <option value="london">London</option>
               <option value="madrid">Madrid</option>
               <option value="rome">Rome</option>
            </select>
            <label>Your category:</label>
               <input
                  id="transport"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='transport'}
                  value="transport"
                  onChange={handleChange}
               />
               <label htmlFor="transport">Transport</label>
               <input
                  id="accompany"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='accompany'}
                  value="accompany"
                  onChange={handleChange}
               />
               <label htmlFor="accompany">Accompany</label>
               <input
                  id="delivery"
                  name="category"
                  type="radio"
                  checked={currentDocToUpdate.category==='delivery'}
                  value="delivery"
                  onChange={handleChange}
               />
               <label htmlFor="delivery">Delivery</label>
            <label htmlFor="message">Your message:</label>
            <textarea
               id="message"
               name="message"
               value={currentDocToUpdate.message}
               onChange={handleChange}
            />
            <label htmlFor="terms">Accept terms?</label>
            <input
                  id="terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={currentDocToUpdate.acceptTerms}
                  onChange={handleChange}
               />
            <input
               type="submit"
               value="Submit form"
            />
         </form>
      </div>
   )
}

export default ResendForm;