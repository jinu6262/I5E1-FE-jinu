import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import Day from './Day'
import { CalendarDate } from '@/types/data'
import { useAnnualStore, useDutyStore } from '@/store/store'
dayjs.locale('ko')

interface Props {
  tep: string
}

const Calendar: React.FC<Props> = ({ tep }) => {
  const { annualList } = useAnnualStore()
  const { dutyList } = useDutyStore()

  let testData: any[] = []
  if (tep === 'annual') {
    testData = annualList
  }
  if (tep === 'duty') {
    testData = dutyList
  }

  const now = dayjs() // 현재 시간 데이터
  const [calendarData, setCalendarData] = useState(now)

  const endDay = calendarData.endOf('month') // 이번달 마지막 날 데이터

  // 지난 달의 마지막 날 데이터
  const lastMonthEnd = calendarData.subtract(1, 'month').endOf('month')

  const lastMonthEndDate = lastMonthEnd.get('date') // 지난 달 마지막 날짜
  const lastMonthEndDay = lastMonthEnd.get('day') // 지난 달 마지막 요일

  // 다음 달의 첫 날 데이터
  const nextMonthStart = calendarData.add(1, 'month').startOf('month')

  const weeks = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

  const week = weeks.map((day, index) => {
    return (
      <div className="text-center" key={index}>
        {day}
      </div>
    )
  })

  const days: CalendarDate[] = []
  for (let i = lastMonthEndDate - lastMonthEndDay; i <= lastMonthEndDate; i++) {
    days.push({
      year: lastMonthEnd.get('year'),
      month: lastMonthEnd.get('month') + 1,
      date: i,
      day: dayjs(lastMonthEnd.format('YYYY-MM') + `${i}`).format('ddd'),
      strDate: `${lastMonthEnd.get('year')}-${
        lastMonthEnd.get('month') + 1 < 10
          ? '0' + (lastMonthEnd.get('month') + 1)
          : lastMonthEnd.get('month') + 1
      }-${i < 10 ? '0' + i : i}`
    })
  }

  const endDate = endDay.get('date') //이번 달의 마지막 날
  for (let i = 1; i <= endDate; i++) {
    days.push({
      year: calendarData.get('year'),
      month: calendarData.get('month') + 1,
      date: i,
      day: dayjs(calendarData.format('YYYY-MM') + `${i}`).format('ddd'),
      strDate: `${calendarData.get('year')}-${
        calendarData.get('month') + 1 < 10
          ? '0' + (calendarData.get('month') + 1)
          : calendarData.get('month') + 1
      }-${i < 10 ? '0' + i : i}`
    })
  }

  // 42(6주의 일 수)
  for (let i = 1; days.length < 42; i++) {
    days.push({
      year: nextMonthStart.get('year'),
      month: nextMonthStart.get('month') + 1,
      date: i,
      day: dayjs(nextMonthStart.format('YYYY-MM') + `${i}`).format('ddd'),
      strDate: `${nextMonthStart.get('year')}-${
        nextMonthStart.get('month') + 1 < 10
          ? '0' + (nextMonthStart.get('month') + 1)
          : nextMonthStart.get('month') + 1
      }-${i < 10 ? '0' + i : i}`
    })
  }

  interface startDate {
    startDate: string
    summary: string
  }

  interface dutyDate {
    dutyDate: string
    reason: string
  }

  let flegDates: string[] = []
  let startDates: startDate[] = []
  let endDates: string[] = []
  let dutyDates: dutyDate[] = []

  testData.map((item) => {
    const start = dayjs(item.startDate)
    const end = dayjs(item.endDate)
    const duty = dayjs(item.dutyDate)

    if (tep === 'annual') {
      for (let date = start; date <= end; date = date.add(1, 'days')) {
        flegDates.push(date.format('YYYY-MM-DD'))
      }

      startDates.push({
        startDate: start.format('YYYY-MM-DD'),
        summary: item.summary
      })
      endDates.push(end.format('YYYY-MM-DD'))
    }
    if (tep === 'duty') {
      dutyDates.push({
        dutyDate: duty.format('YYYY-MM-DD'),
        reason: item.reason
      })
    }
  })

  const body = days.map((day, index) => {
    let fleg = false
    let start = false
    let end = false
    let duty = false
    let summary = ''
    let reason = ''
    flegDates.map((item) => {
      if (day.strDate === item) {
        fleg = true
      }
    })

    startDates.map((item) => {
      if (day.strDate === item.startDate) {
        start = true
        summary = item.summary
      }
    })
    endDates.map((item) => {
      if (day.strDate === item) {
        end = true
      }
    })
    dutyDates.map((item) => {
      if (day.strDate === item.dutyDate) {
        console.log('들어옴')
        duty = true
        reason = item.reason
      }
    })

    return (
      <div className="h-[100px] relative" key={index}>
        <div className="border-b-2 border-gray w-3/4 mx-[10px] pb-[10px] pl-[10px]">
          <Day day={day} calendarMonth={calendarData.get('month') + 1} />
        </div>
        {fleg ? (
          start ? (
            <div className="bg-primary w-full h-[30px] absolute bottom-[30%] rounded-l-[15px] text-white pl-[10px]">
              {summary}
            </div>
          ) : end ? (
            <div className="bg-primary w-full h-[30px] absolute bottom-[30%] rounded-r-[15px]"></div>
          ) : (
            <div className="bg-primary w-full h-[30px] absolute bottom-[30%]"></div>
          )
        ) : duty ? (
          <div className="bg-primary w-full h-[30px] absolute bottom-[30%] rounded-[15px] text-white pl-[10px]">
            {reason}
          </div>
        ) : null}
      </div>
    )
  })

  return (
    <div>
      <div className="flex">
        <input
          className="text-[2rem] font-bold mb-[1rem]"
          type="month"
          defaultValue={calendarData.format('YYYY-MM')}
          onChange={(e) => setCalendarData(dayjs(e.target.value))}
        />
      </div>
      <div className="font-bold grid grid-cols-7 gap-0 mb-[20px]">{week}</div>
      <div className="font-bold grid grid-cols-7 gap-0 ">{body}</div>
    </div>
  )
}

export default Calendar
