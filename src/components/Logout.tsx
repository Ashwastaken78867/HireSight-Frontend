// src/pages/Logout.tsx
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear session/auth data
    localStorage.removeItem("authToken")
    sessionStorage.clear()

    // Redirect to login page
    navigate("/login")
  }, [navigate])

  return null
}
