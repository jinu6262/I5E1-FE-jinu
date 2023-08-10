export interface Login {
  email: string
  password: string
}

export interface Join {
  email: string
  password: string
  tel: string
  username: string
}

export interface Check {
  email: string
}

// user 데이터
export interface user {
  position?: string
  name?: string
  email?: string
  tel?: string
  annualCount?: string
}

export interface ChangeUser {
  tel?: string
  password?: string
}

export interface annualApply {
  startDate: string
  endDate: string
  summary: string
  reason: string
}

export interface dutyApply {
  dutyDate: string
  reason: string
}

export interface annual {
  startDate: string
  endDate: string
  status: string
  reason: string
  summary: string
}

export interface duty {
  dutyDate: string
  status: string
  reason: string
}
