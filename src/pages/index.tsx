import Calendar from '@/components/calendar/Calendar'
import { useEffect, useState } from 'react'
import router from 'next/router'
import { useUserStore } from '@/store/userStore'
import { useAnnualStore, useDutyStore } from '@/store/store'
import { annual, annualApply, duty, dutyApply, user } from '@/types/api'
import dayjs from 'dayjs'
import { setAnnualApply, setDutyApply } from './api/mypage'

export default function Home() {
  //test01@fc.com
  //abcd
  const accessToken =
    typeof window !== 'undefined' ? sessionStorage.getItem('access') : null

  useEffect(() => {
    if (!accessToken) {
      window.location.replace('/signin')
    }
  }, [])

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

  const [tep, setTep] = useState('annual')
  const [isApply, setIsApply] = useState(true)
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [summary, setSummary] = useState('')
  const [reason, setReason] = useState('')

  const [dutyDate, setDutyDate] = useState(dayjs().format('YYYY-MM-DD'))
  return (
    <>
      <div
        className={
          'fixed bg-[black]/50 w-full h-full z-10 flex items-center ' +
          `${isApply ? 'hidden' : ''}`
        }
        onClick={() => {
          setIsApply(!isApply)
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (tep === 'annual') {
              const newApply = {} as annualApply
              newApply.startDate = startDate
              newApply.endDate = endDate
              newApply.summary = summary
              newApply.reason = reason
              setAnnualApply(accessToken, newApply)
            }

            if (tep === 'duty') {
              const newApply = {} as dutyApply
              newApply.dutyDate = dutyDate
              newApply.reason = reason
              setDutyApply(accessToken, newApply)
            }

            setIsApply(!isApply)
          }}
          className="container mx-auto w-full h-[60%] bg-white rounded-[20px] p-[20px]"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {tep === 'annual' ? (
            <>
              <h2>연차신청</h2>
              <div className="flex">
                <div>
                  <span className="font-bold">시작일</span>
                  <input
                    className="border border-inputBorder rounded-[5px] w-[130px] m-[10px]"
                    type="date"
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                    }}
                  />
                </div>
                <div>
                  <span className="font-bold">종료일</span>
                  <input
                    className="border border-inputBorder rounded-[5px] w-[130px] m-[10px]"
                    type="date"
                    defaultValue={dayjs().format('YYYY-MM-DD')}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="font-bold">신청사유 : </span>
                <input
                  className="border-b border-gray-light"
                  type="text"
                  onChange={(e) => {
                    setSummary(e.target.value)
                  }}
                />
              </div>
              <div>
                <span className="font-bold">상세내용</span>
                <br />
                <textarea
                  className="w-full min-h-[auto] my-auto border border-gray-light resize-none p-[10px] h-[30vh]  rounded-[10px]"
                  name="test"
                  onChange={(e) => {
                    setReason(e.target.value)
                  }}
                ></textarea>
              </div>
              <div className="flex justify-end ">
                <button
                  className="bg-primary rounded-[30px] w-[120px] h-[46px] text-[white] mr-[10px]"
                  type="button"
                  onClick={() => {
                    setIsApply(!isApply)
                  }}
                >
                  취소하기
                </button>
                <button
                  className="bg-primary rounded-[30px] w-[120px] h-[46px] text-[white]"
                  type="submit"
                >
                  신청하기
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>당직신청</h2>
              <div>
                <span className="font-bold">당직일</span>
                <input
                  className="border border-inputBorder rounded-[5px] w-[130px] m-[10px]"
                  type="date"
                  defaultValue={dayjs().format('YYYY-MM-DD')}
                  onChange={(e) => {
                    setDutyDate(e.target.value)
                  }}
                />
              </div>
              <div>
                <span className="font-bold">상세내용</span>
                <br />
                <textarea
                  className="w-full min-h-[auto] my-auto border border-gray-light resize-none p-[10px] h-[30vh]  rounded-[10px]"
                  onChange={(e) => {
                    setReason(e.target.value)
                  }}
                ></textarea>
                <div className="flex justify-end">
                  <button
                    className="bg-primary rounded-[30px] w-[120px] h-[46px] text-[white] mr-[10px]"
                    type="button"
                    onClick={() => {
                      setIsApply(!isApply)
                    }}
                  >
                    취소하기
                  </button>
                  <button
                    className="bg-primary rounded-[30px] w-[120px] h-[46px] text-[white]"
                    type="submit"
                  >
                    신청하기
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="container mx-auto">
        <img className="mx-auto" src="/logo_cut_ver.png" alt="logo" />
        <div className="flex justify-between">
          <div>
            <button
              className={
                'hover:bg-primary hover:text-white w-[140px] h-[46px] bg-gray rounded-t-[6px] ' +
                `${tep === 'annual' ? 'bg-primary text-white' : null}`
              }
              onClick={() => {
                setTep('annual')
              }}
            >
              연차
            </button>
            <button
              className={
                'hover:bg-primary hover:text-white w-[140px] h-[46px] bg-gray rounded-t-[6px] ' +
                `${tep === 'duty' ? 'bg-primary text-white' : null}`
              }
              onClick={() => {
                setTep('duty')
              }}
            >
              당직
            </button>
          </div>
          <button
            className="text-white w-[140px] h-[46px] bg-secondary rounded-[6px]"
            onClick={() => router.push('/mypage')}
          >
            My Page
          </button>
        </div>
        <div className="border-0 rounded-[12px] shadow-[3px_3px_5px_-2px_rgba(0,0,0,0.1)] p-[40px]">
          <Calendar tep={tep} />
          <div>
            <div className="flex justify-end items-center">
              <button
                className="bg-primary rounded-[30px] w-[120px] h-[46px] text-[white]"
                onClick={() => setIsApply(!isApply)}
              >
                신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
