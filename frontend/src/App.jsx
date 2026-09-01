import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ScrollToTop from './components/utils/ScrollToTop'

import ProtectedRoutes from './components/auth/ProtectedRoutes'
import Home from './pages/Home'
import CreateUlam from './pages/CreateUlam'
import EditUlam from './pages/EditUlam'
import CreateVariation from './pages/CreateVariation'
import Search from './pages/Search'
import UlamProfile from './pages/UlamProfile'
import CookUlam from './pages/cook-ulam/CookUlam'
import CookingHistory from './pages/cooking-history/CookingHistory'
import MealPlanner from './pages/meal-planner/MealPlanner'
import UserProfile from './pages/user-profile/UserProfile'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import CompleteProfilePage from './pages/complete-profile-page/CompleteProfilePage'
import EmailSentPage from './pages/email-sent/EmailSentPage'
import VerifyEmailPage from './pages/verify-email/VerifyEmailPage'

export default function App() {

        return (
                <div className='app'>
                        <BrowserRouter>
                                <ScrollToTop />

                                <Routes>
                                        <Route path='/signup' element={<Signup />}/>
                                        <Route path='/login' element={<Login />}/>

                                        <Route path='/profile-setup' element={<CompleteProfilePage />}/>
                                        <Route path='/email-sent' element={<EmailSentPage />}/>
                                        <Route path='/verify-email' element={<VerifyEmailPage />}/> 
                                        {/* ?token=efyi843rnu */}

                                        <Route element={<ProtectedRoutes />}>
                                                <Route path='/' element={<Home />}/>

                                                <Route path='/ulams/create' element={<CreateUlam />}/>
                                                <Route path='/ulams/:ulamId/edit' element={<EditUlam />}/>
                                                <Route path='/ulams/:ulamId/variations/new' element={<CreateVariation />}/>
                                                <Route path='/ulams/:ulamId' element={<UlamProfile />}/>

                                                <Route path='/search' element={<Search />}/>

                                                <Route path='/cook/:ulamId' element={<CookUlam />}/>
                                                <Route path='/cook/history' element={<CookingHistory />}/>

                                                <Route path='/meal-planner' element={<MealPlanner />}/>

                                                <Route path='/users/:username' element={<UserProfile />}/>
                                        </Route>


                                        {/* TODO: add 404 page not found  */}
                                </Routes>              
                        </BrowserRouter>
                </div>
        )
}