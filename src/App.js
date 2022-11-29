import React from 'react';
import { AuthContextProvider } from './AuthContext/context';
import {Routes,Route} from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
import PostHelp from './components/Post_help';
import SearchHelp from './components/Search_help';

const App=()=>{
  return (
    <div>
      <AuthContextProvider>
        <Routes>
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
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;