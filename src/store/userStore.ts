import { readUser } from '@/pages/api/mypage'
import { create } from 'zustand'

interface userStore {
  userData: any
  getUser: (accessToken: string | null) => void
}

export const useUserStore = create<userStore>()((set) => ({
  userData: {},
  getUser: async (accessToken) => {
    const res = await readUser(accessToken)

    set({ userData: res })
  }
}))
