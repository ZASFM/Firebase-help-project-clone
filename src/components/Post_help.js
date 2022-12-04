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
            appliedBy:'',
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
         <h1 className="text-2xl mb-8 mt-8 ml-8">Please fill out the form with your data:</h1>
         <div className="flex justify-center">
         <form onSubmit={sendData}>
            <div className="form-group mb-6">
            <label htmlFor="name" className="inline-block text-gray-700">Your name:</label><br/>
            <input
               id="name"
               type="text"
               name="name"
               placeholder="Your name"
               value={formData.name}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <label className="inline-block text-gray-700" htmlFor="email">Your email:</label><br/>
            <input
               id="email"
               type="text"
               name="email"
               placeholder="Your email"
               value={formData.email}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <label className="inline-block text-gray-700" htmlFor="location">Your location:</label><br/>
            <select
               id="location"
               name="location"
               value={formData.location}
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
                  checked={formData.category==='transport'}
                  value="transport"
                  onChange={handleChange}
                  class="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
               />
               <label htmlFor="transport">Transport</label><br/>
               <input
                  id="accompany"
                  name="category"
                  type="radio"
                  checked={formData.category==='accompany'}
                  value="accompany"
                  onChange={handleChange}
                  class="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
               />
               <label htmlFor="accompany">Accompany</label><br/>
               <input
                  id="delivery"
                  name="category"
                  type="radio"
                  checked={formData.category==='delivery'}
                  value="delivery"
                  onChange={handleChange}
                  class="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
               />
               <label htmlFor="delivery">Delivery</label><br/>
            <br/><label className="inline-block text-gray-700" htmlFor="message">Your message:</label><br/>
            <textarea
               id="message"
               name="message"
               value={formData.message}
               onChange={handleChange}
               className="px-4 py-1 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
            /><br/><br/>
            <input
                  id="terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
               />
               <label htmlFor="terms">Accept terms?</label>
            <br/><input
               type="submit"
               value="Submit form"
               className="cursor-pointer px-4 py-1 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
            />
            </div>
         </form>
         </div>
      </div>
   )
}

export default PostHelp;