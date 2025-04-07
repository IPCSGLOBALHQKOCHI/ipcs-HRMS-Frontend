import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddEmployeeForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    status: '',
  })

  const [resume, setResume] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setResume(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach((key) => data.append(key, formData[key]))
    data.append('resume', resume)

    const token = localStorage.getItem("token")
    if (!token) {
        console.log("not token");
      navigate("/recuriterlogin")
      return
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/recuriter/recuriteraddemployee',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(res.data.message)
      navigate("/recuriterdashboard")
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Employee</h2>

      {message && (
        <p className="mb-4 text-center text-sm text-green-600 font-medium">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddEmployeeForm
