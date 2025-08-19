import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Work from './pages/Work.jsx'
import Writing from './pages/Writing.jsx'
import SpokenWord from './pages/SpokenWord.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/work', element: <Work /> },
	{ path: '/writing', element: <Writing /> },
	{ path: '/spoken-word', element: <SpokenWord /> },
	{ path: '/admin', element: <AdminDashboard /> },
	{ path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
