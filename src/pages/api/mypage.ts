import { ChangeUser, Check, annualApply, dutyApply } from '@/types/api'
import axios from 'axios'

const readUser = async (accessToken: string | null) => {
  const res = await axios({
    url: '/api/serverLess',
    method: 'POST',
    data: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
      path: 'user'
    }
  })

  return res.data.data
}

const userDataChange = async (
  accessToken: string | null,
  newData: ChangeUser
) => {
  const res = await axios({
    url: '/api/serverLess',
    method: 'POST',
    data: {
      method: 'PUT',
      Authorization: `Bearer ${accessToken}`,
      path: 'user',
      data: newData
    }
  })

  return res.data.data
}

const setAnnualApply = async (
  accessToken: string | null,
  newAnnual: annualApply
) => {
  const res = await axios({
    url: '/api/serverLess',
    method: 'POST',
    data: {
      method: 'POST',
      Authorization: `Bearer ${accessToken}`,
      path: 'annual',
      data: newAnnual
    }
  })
  console.log(res)

  return res
}

const setDutyApply = async (accessToken: string | null, newDuty: dutyApply) => {
  console.log(newDuty)
  const res = await axios({
    url: '/api/serverLess',
    method: 'POST',
    data: {
      method: 'POST',
      Authorization: `Bearer ${accessToken}`,
      path: 'duty',
      data: newDuty
    }
  })
  console.log(res)

  return res
}

export { userDataChange, readUser, setAnnualApply, setDutyApply }
