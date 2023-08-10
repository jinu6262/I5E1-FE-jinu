import { CalendarDate } from '@/types/data'
import React from 'react'

const Day = ({
  day,
  calendarMonth
}: {
  day: CalendarDate
  calendarMonth: number
}) => {
  if (day.month === calendarMonth) {
    if (day.day === '토') {
      return <div className="text-[#3d81ff]">{day.date}</div>
    } else if (day.day === '일') {
      return <div className="text-[#ff5c5c]">{day.date}</div>
    } else {
      return <div>{day.date}</div>
    }
  } else {
    return <div className="text-[black]/50">{day.date}</div>
  }
}

export default Day
