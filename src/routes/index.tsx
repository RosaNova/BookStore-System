import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Authentication from '../page/Authentication/Authentication'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Authentication />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
