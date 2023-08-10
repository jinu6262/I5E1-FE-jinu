import { annual } from '@/types/api'
import axios from 'axios'
import { create } from 'zustand'

interface annualStore {
  annualList: annual[]
  getAnnualList: (accessToken: string | null) => void
}

// 연차 데이터 요청
export const useAnnualStore = create<annualStore>()((set) => ({
  annualList: [],
  getAnnualList: async (accessToken) => {
    const res = await axios({
      url: '/api/serverLess',
      method: 'POST',
      data: {
        method: 'GET',
        Authorization: `Bearer ${accessToken}`,
        path: 'annual'
      }
    })

    set({ annualList: res.data.data.annuals })
  }
}))

interface dutyStore {
  dutyList: []
  getDutyList: (accessToken: string | null) => void
}

// 당직 데이터 요청
export const useDutyStore = create<dutyStore>()((set) => ({
  dutyList: [],
  getDutyList: async (accessToken) => {
    const res = await axios({
      url: '/api/serverLess',
      method: 'POST',
      data: {
        method: 'GET',
        Authorization: `Bearer ${accessToken}`,
        path: 'duty'
      }
    })

    set({ dutyList: res.data.data.dutyPageList })
  }
}))
