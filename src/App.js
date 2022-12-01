import React from 'react';
import { AuthContextProvider } from './AuthContext/context';
import {Routes,Route} from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
import PostHelp from './components/Post_help';
import SearchHelp from './components/Search_help';
import MyPosts from './components/my_posts';
import ResendForm from './components/ResendForm';
import SuccessSent from './components/redirects/SuccessSent';
import SuccessUpdate from './components/redirects/SuccssEdit';
import Applied from './components/Applied';

const App=()=>{
  return (
    <div>
      <AuthContextProvider>
        <Routes>
        <Route
             path="/successSent"
             element={
               <ProtectedRoute>
                  <SuccessSent/>
               </ProtectedRoute>}
          />

          <Route
             path="/successUpdate"
             element={
               <ProtectedRoute>
                  <SuccessUpdate/>
               </ProtectedRoute>
             }
          />
          <Route
             exact path="/"
             element={<SignIn/>}
          />

          <Route
             path="/sign-up"
             element={<SignUp/>}
          />

          <Route
            path="/account"
          >
            <Route
               index 
               element={
                  <ProtectedRoute>
                    <Account/>
                  </ProtectedRoute>
               }
            />

            <Route
               path="search-help"
               element={
                <ProtectedRoute>
                   <SearchHelp/>
                </ProtectedRoute>
               }
            />

            <Route
               path="post-help"
               element={
                <ProtectedRoute>
                   <PostHelp/>
                </ProtectedRoute>
               }
            />

            <Route
               path="my_posts"
               element={
                <ProtectedRoute>
                  <MyPosts/>
                </ProtectedRoute>
               }
            />

            <Route
               path="resend_form"
               element={
                <ProtectedRoute>
                   <ResendForm/>
                </ProtectedRoute>
               }
            />

            <Route
               path="applied"
               element={
                  <ProtectedRoute>
                     <Applied/>
                  </ProtectedRoute>
               }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;