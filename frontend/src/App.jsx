import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CreateUlam from './pages/CreateUlam'
import EditUlam from './pages/EditUlam'
import CreateVariation from './pages/CreateVariation'

export default function App() {

        return (
                <div className='app'>
                        <BrowserRouter>
                                <Routes>
                                        <Route path='/' element={<Home />}/>
                                        <Route path='/ulams/new' element={<CreateUlam />}/>
                                        <Route path='/ulams/ulamId/edit' element={<EditUlam />}/>
                                        {/* <Route path="/ulams/:ulamId/edit" element={<EditUlam />} /> */}
                                        <Route path='/ulams/ulamId/variations/new' element={<CreateVariation />}/>
                                        {/* /ulams/:ulamId/variations/new */}
                                </Routes>              
                        </BrowserRouter>
                </div>
        )
}