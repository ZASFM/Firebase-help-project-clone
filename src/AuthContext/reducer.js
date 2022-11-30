import {deleteDoc,updateDoc,doc} from 'firebase/firestore';
import { db } from '../firebase';

const reducer=async(state,action)=>{
   if(action.type==='DELETE_DOC'){
      try{
         await deleteDoc(doc(db,'appUsers',action.payload.id))
      }
      catch(error){
         console.log(error.message);
      }
      finally{
         console.log('Delete doc process ended');
      }
   }

   if(action.type==='UPDATE_DOC'){
      console.log(action.payload);
   }

   return state;
}

export default reducer;