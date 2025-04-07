import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-100 p-6">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => navigate('/hrsignup')}
      >
        HR
      </button>

      <button
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        onClick={() => navigate('/onboardingsignup')}
      >
        Onboarding
      </button>

      <button
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        onClick={() => navigate('/recuritersignup')}
      >
        Recruiter
      </button>
    </div>
  )
}

export default Home
