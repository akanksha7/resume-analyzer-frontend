// components/ProtectedRoute.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/components/hooks/useAuth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}