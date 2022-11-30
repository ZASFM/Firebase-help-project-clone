import React,{useState,useEffect,createContext,useContext,useReducer} from 'react';
import { auth } from '../firebase';
import {
   signInWithEmailAndPassword,
   signOut,
   createUserWithEmailAndPassword,
   onAuthStateChanged
} from 'firebase/auth';

import {collection,doc,updateDoc,deleteDoc,onSnapshot,query} from 'firebase/firestore';
import { db } from '../firebase';
import reducer from './reducer';

const UserContext=createContext();
const AuthContextProvider=({children})=>{
   const [user,setUser]=useState({});
   const [databaseData,setDatabaseData]=useState([]);
   const [state,dispatch]=useReducer(reducer,databaseData);

   //***********AUTH***************/
   const createUser=(email,password)=>{
      return createUserWithEmailAndPassword(auth,email,password);
   }

   const signIn=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password);
   }

   const logOut=()=>{
      return signOut(auth);
   }

   useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
         setUser(currentUser);
      })
      return ()=>unsubscribe();
   },[])


   /***************DATABASE*****************/
   
   //Read:
   useEffect(()=>{
      const q=query(collection(db,'appUsers'));
      const unsubscribe=onSnapshot(q,(snapShot)=>{
         const dataArr=[];
         snapShot.forEach(doc=>{
            dataArr.push({
               ...doc.data(),
               id:doc.id,
            })
         })
         setDatabaseData(dataArr);
      })
      return()=>unsubscribe();
   },[])

   /************REDUCER**************/
   const deletePost=async(post)=>{
      dispatch({type:'DELETE_DOC',payload:post});
   }

   const updatePost=(post)=>{
      dispatch({type:'UPDATE_DOC',payload:post});
   }

   return (
      <UserContext.Provider
         value={{
            user,
            createUser,
            signIn,
            logOut,
            databaseData,
            deletePost,
            updatePost,
         }}
      >
         {children}
      </UserContext.Provider>
   )
}

//custom UserAuth:
export const UserAuth=()=>{
   return useContext(UserContext);
}

export {UserContext,AuthContextProvider};