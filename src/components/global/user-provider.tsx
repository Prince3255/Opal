'use client'

import { useDispatch } from 'react-redux'
import { USER } from '@/redux/slice/user'
import { useEffect } from 'react'

type UserProviderProps = {
  user: {
    id: string | null
    firstname: string | null
    lastname: string | null
    email: string | null
    workspaceId: string | null
  } | null
  children: React.ReactNode
}

const UserProvider = ({ user, children }: UserProviderProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(USER({ user }))
    }
  }, [user, dispatch])

  return <>{children}</>
}

export default UserProvider 