import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CreateUlam from './pages/CreateUlam'
import EditUlam from './pages/EditUlam'
import CreateVariation from './pages/CreateVariation'
import Search from './pages/Search'
import UlamProfile from '../src/pages/UlamProfile'

export default function App() {

        return (
                <div className='app'>
                        <BrowserRouter>
                                <Routes>
                                        <Route path='/' element={<Home />}/>

                                        <Route path='/ulams/create' element={<CreateUlam />}/>
                                        <Route path='/ulams/:ulamId/edit' element={<EditUlam />}/>
                                        {/* <Route path="/ulams/:ulamId/edit" element={<EditUlam />} /> */}
                                        <Route path='/ulams/:ulamId/variations/new' element={<CreateVariation />}/>
                                        {/* /ulams/:ulamId/variations/new */}
                                        <Route path='/ulams/:ulamId' element={<UlamProfile />}/>

                                        <Route path='/search' element={<Search />}/>
                                </Routes>              
                        </BrowserRouter>
                </div>
        )
}