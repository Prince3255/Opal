import { useAppSelector } from '@/redux/store'

export const useUser = () => {
  const { user } = useAppSelector((state) => state.UserReducer)
  return user
} 