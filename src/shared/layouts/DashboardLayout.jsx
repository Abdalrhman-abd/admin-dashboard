import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">

      <nav className="w-full px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 rounded-2xl bg-white/90 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">

          <div className="text-2xl font-bold">
            <span className="text-purple-700">Admin</span>
            <span className="text-pink-500"> Dashboard</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">

            <Link
              to="/home"
              className="rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:bg-purple-100 hover:text-purple-700"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:bg-purple-100 hover:text-purple-700"
            >
              Services
            </Link>

            <Link
              to="/projects"
              className="rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:bg-pink-100 hover:text-pink-600"
            >
              Projects
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      <main className="w-full">
        <Outlet />
      </main>

    </div>
  )
}

export default DashboardLayout