import { Routes, Route } from 'react-router-dom'
import Home from '../page/client/Home'
import Authentication from '../page/client/Authentication'
import Dashboard from '../page/admin/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import ClientLayout from '../layouts/ClientLayout'
import AdminLayout from '../layouts/AdminLayout'
import NotFound from '../page/NotFound'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Client Routes */}
            <Route element={<ClientLayout />}>
                <Route path="/" element={<Home />} />
            </Route>

            {/* Auth Routes (No layout or specific layout) */}
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Authentication />} />

            {/* Admin Routes (Protected) */}
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />                {/* Add more admin routes here */}
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;
