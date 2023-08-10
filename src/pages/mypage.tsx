import { useAnnualStore, useDutyStore } from '@/store/store'
import { useUserStore } from '@/store/userStore'
import { annual, duty, user } from '@/types/api'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { userDataChange } from './api/mypage'

export default function MyPage() {
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem('access') : null

  const [user, setUser] = useState<user>({})
  const [annual, setAnnual] = useState<annual[]>([])
  const [duty, setDuty] = useState<duty[]>([])

  const { userData, getUser } = useUserStore()
  const { annualList, getAnnualList } = useAnnualStore()
  const { dutyList, getDutyList } = useDutyStore()

  useEffect(() => {
    getUser(accessToken)
    getAnnualList(accessToken)
    getDutyList(accessToken)
  }, [])

  useEffect(() => {
    setUser(userData)
    setAnnual(annualList)
    setDuty(dutyList)
  }, [userData, annualList, dutyList])

  const { position, name, email, tel, annualCount } = user

  const [newTel, setNewTel] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const handleMyDataChangeClick = async () => {
    interface ChangeUser {
      tel?: string
      password?: string
    }
    let newData = {} as ChangeUser
    newData.tel = newTel
    if (newPassword !== '') {
      newData.password = newPassword
    }
    console.log(newData)
    const newUser = await userDataChange(accessToken, newData)

    setUser(newUser)
  }

  console.log(annual)
  console.log(duty)
  return (
    <>
      <div className="container mx-auto">
        <img className="pt-[30px]" src="/logo_cut_ver.png" alt="logo" />
        <div className="relative z-10 mt-[70px]">
          <div className="flex flex-wrap gap-[100px] items-end">
            <div className="relative w-full lg:w-[480px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.15)] rounded-t-[55px] rounded-b-[20px] bg-[white]">
              <div className="bg-primary w-full h-[200px] absolute z-10 rounded-t-[50px] rounded-bl-[100px]"></div>
              <div className="bg-sub-primary w-[95%] h-[200px] absolute z-5 top-[20px] right-0 rounded-t-[50px] rounded-bl-[100px]"></div>
              <div className="relative z-20 p-[20px]">
                <img
                  className="rounded-[100px] w-[182px] h-[182px] mt-[100px] mx-auto"
                  src="/logo_cut_ver.png"
                  alt="test"
                />
                <div className="flex flex-col items-end my-[40px]">
                  <div className="my-info">
                    <span className="my-info-title">직급</span>
                    <span className="input-span">|</span>
                    <span className="my-data">{position}</span>
                  </div>
                  <div className="my-info">
                    <span className="my-info-title">이름</span>
                    <span className="input-span">|</span>
                    <span className="my-data">{name}</span>
                  </div>
                  <div className="my-info">
                    <span className="my-info-title">이메일</span>
                    <span className="input-span">|</span>
                    <span className="my-data">{email}</span>
                  </div>
                  <div className="my-info">
                    <span className="my-info-title">연락처</span>
                    <span className="input-span">|</span>
                    <span className="my-data">
                      <input
                        className="my-input"
                        type="text"
                        defaultValue={tel}
                        placeholder="010-0000-0000"
                        onChange={(e) => {
                          console.log(e.target.value)
                          setNewTel(e.target.value)
                        }}
                      />
                    </span>
                  </div>
                  <div className="my-info">
                    <span className="my-info-title">비밀번호</span>
                    <span className="input-span">|</span>
                    <span className="my-data">
                      <input
                        className="my-input"
                        type="password"
                        placeholder="********"
                        onChange={(e) => {
                          console.log(e.target.value)
                          setNewPassword(e.target.value)
                        }}
                      />
                    </span>
                  </div>
                  <div className="my-info">
                    <span className="my-info-title">잔여일수</span>
                    <span className="input-span">|</span>
                    <span className="my-data">{annualCount}</span>
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="bg-secondary text-[white] w-[140px] h-[50px] rounded-[6px] block mr-auto"
                    onClick={() => {
                      sessionStorage.removeItem('access')
                      router.push('/signin')
                    }}
                  >
                    로그아웃
                  </button>
                  <button
                    className="bg-primary text-[white] w-[140px] h-[50px] rounded-[6px] block ml-auto"
                    onClick={handleMyDataChangeClick}
                  >
                    정보 수정
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:max-w-[700px] ">
              <button
                className="bg-secondary text-[white] w-[140px] h-[50px] rounded-[6px] block mr-auto mb-[20px]"
                onClick={() => router.push('/')}
              >
                메인으로
              </button>
              <div className="history-container mb-[40px]">
                <div className="history-title">연차 내역</div>
                <div className="h-full overflow-auto">
                  {annual
                    ? annual.map((item, index) => {
                        let status
                        if (item.status === 'COMPLETED') {
                          status = '완료'
                        }
                        if (item.status === 'REQUESTED') {
                          status = '요청'
                        }
                        if (item.status === 'APPROVED') {
                          status = '승인'
                        }
                        return (
                          <div
                            className="flex justify-around border border-gray-light rounded-[6px] p-[5px] mb-[15px] text-sm mr-[15px]"
                            key={index}
                          >
                            <div>
                              {item.startDate} - {item.endDate}
                            </div>
                            <span>{status}</span>
                          </div>
                        )
                      })
                    : null}
                </div>
              </div>
              <div className="history-container">
                <div className="history-title">당직 내역</div>
                <div className="h-full overflow-auto">
                  {duty
                    ? duty.map((item, index) => {
                        let status
                        if (item.status === 'COMPLETED') {
                          status = '완료'
                        }
                        if (item.status === 'REQUESTED') {
                          status = '요청'
                        }
                        if (item.status === 'APPROVED') {
                          status = '승인'
                        }
                        return (
                          <div
                            className="flex justify-around border border-gray-light rounded-[6px] p-[5px] mb-[15px] text-sm mr-[15px]"
                            key={index}
                          >
                            <div>{item.dutyDate}</div>
                            <div>{item.reason}</div>
                            <div>{status}</div>
                          </div>
                        )
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary w-1/3 rounded-l-[30px] h-screen fixed inset-y-0 right-0 hidden md:block">
          <img
            className="absolute bottom-[30px] w-full"
            src="/worker.png"
            alt="worker"
          />
        </div>
      </div>
    </>
  )
}
