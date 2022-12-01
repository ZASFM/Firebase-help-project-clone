import React,{useState} from "react";
import {addDoc,collection} from 'firebase/firestore';
import { db } from "../firebase";
import { UserAuth } from "../AuthContext/context";
import { useNavigate } from "react-router-dom";

const PostHelp=()=>{
   const [formData,setFormData]=useState({
      name:"",
      email:"",
      message:"",
      location:"",
      category:"",
      acceptTerms:false,
   })
   const {user}=UserAuth();
   const navigate=useNavigate();

   const sendData=async(e)=>{
      e.preventDefault();
      console.log(formData);
      setFormData({
         name:"",
         email:"",
         message:"",
         location:"",
         category:"",
         acceptTerms:false,
      });
      try{
         await addDoc(collection(db,'appUsers'),{
            ...formData,
            userId:user.uid,
         })
         navigate('/successSent');
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Send data process ended');
      }
   }

   const handleChange=(e)=>{
      const target=e.target;
      const {type,name,value,checked}=target;
      setFormData(preVal=>{
         return {
            ...preVal,
            [name]:type==='checkbox'?checked:value,
         }
      })
   }

   return (
      <div>
         <form onSubmit={sendData}>
            <label htmlFor="name">Your name:</label><br/>
            <input
               id="name"
               type="text"
               name="name"
               placeholder="Your name"
               value={formData.name}
               onChange={handleChange}
            />
            <label htmlFor="email">Your email:</label>
            <input
               id="email"
               type="text"
               name="email"
               placeholder="Your email"
               value={formData.email}
               onChange={handleChange}
            />
            <label htmlFor="location">Your location:</label>
            <select
               id="location"
               name="location"
               value={formData.location}
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
                  checked={formData.category==='transport'}
                  value="transport"
                  onChange={handleChange}
               />
               <label htmlFor="transport">Transport</label>
               <input
                  id="accompany"
                  name="category"
                  type="radio"
                  checked={formData.category==='accompany'}
                  value="accompany"
                  onChange={handleChange}
               />
               <label htmlFor="accompany">Accompany</label>
               <input
                  id="delivery"
                  name="category"
                  type="radio"
                  checked={formData.category==='delivery'}
                  value="delivery"
                  onChange={handleChange}
               />
               <label htmlFor="delivery">Delivery</label>
            <label htmlFor="message">Your message:</label>
            <textarea
               id="message"
               name="message"
               value={formData.message}
               onChange={handleChange}
            />
            <label htmlFor="terms">Accept terms?</label>
            <input
                  id="terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
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

export default PostHelp;