import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ScrollToTop from './components/utils/ScrollToTop'

import ProtectedRoutes from './components/auth/ProtectedRoutes'
import Home from './pages/Home'
import CreateUlam from './pages/CreateUlam'
import EditUlam from './pages/EditUlam'
import CreateVariation from './pages/CreateVariation'
import Search from './pages/search/Search'
import UlamProfile from './pages/ulam-profile/UlamProfile'
import CookUlam from './pages/cook-ulam/CookUlam'
import CookingHistory from './pages/cooking-history/CookingHistory'
import MealPlanner from './pages/meal-planner/MealPlanner'
import UserProfile from './pages/user-profile/UserProfile'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import CompleteProfilePage from './pages/complete-profile-page/CompleteProfilePage'
import EmailSentPage from './pages/email-sent/EmailSentPage'
import VerifyEmailPage from './pages/verify-email/VerifyEmailPage'
import useUserContext from './hooks/useUserContext'
import PageNotFound from './pages/page-not-found/PageNotFound'

export default function App() {
        const { user } = useUserContext()

        // everytime we go to a page we push the url
        // we everytime we go back we pop and go to the popped url

        return (
                <div className='app'>
                        <BrowserRouter>
                                <ScrollToTop />

                                <Routes>
                                        <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'} />}/>
                                        <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />}/>

                                        <Route path='/email-sent' element={<EmailSentPage />}/>
                                        <Route path='/verify-email' element={<VerifyEmailPage />}/> 

                                        <Route element={<ProtectedRoutes />}>
                                                <Route path='/profile-setup' element={<CompleteProfilePage />}/>
                                                
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

                                        <Route path='*' element={<PageNotFound />} />
                                </Routes>              
                        </BrowserRouter>
                </div>
        )
}