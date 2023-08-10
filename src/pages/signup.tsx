import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { join, check } from '@/pages/api/api'

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return isValid
  }

  const validatePassword = (password: string) => password.length >= 4

  const validateTel = (tel: string) => /^010\d{4}\d{4}$/.test(tel)

  const handleSignUp = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!username || !email || !tel || !password || !confirmPassword) {
        alert('가입에 필요한 정보를 입력해주세요.')
        return
      }

      if (!validateEmail(email)) {
        alert('유효하지 않은 이메일 형식입니다.')
        return
      }

      if (!validatePassword(password)) {
        alert('비밀번호는 최소 6자 이상이어야 합니다.')
        return
      }

      if (!validateTel(tel)) {
        setError('잘못된 전화 형식입니다. 01XXXXXXXXX 형식을 사용하세요.')
        return
      }

      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다!')
        setPasswordsMatch(false)
        return
      }

      try {
        const response = await join({ username, email, tel, password })

        if (response.status === 200) {
          setError(null)
          router.push('/signin')
          alert('회원가입에 성공했습니다')
        } else {
          if (response.status === 400) {
            setError(
              '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            )
          } else {
            setError('사용할 수 없는 이메일입니다.')
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 500) {
          setError('회원가입이 중복되었습니다.')
        } else {
          console.error(error)
          setError('가입하는 동안 오류가 발생했습니다.')
        }
      }
    },
    [username, email, tel, password, confirmPassword, setPasswordsMatch]
  )

  const handleEmailCheckClick = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 형식입니다.')
      return
    }

    try {
      const response = await check({ email })

      if (response.status === 200) {
        setEmailError('사용할 수 있는 이메일입니다.')
      } else if (response.status === 409) {
        setEmailError('이미 가입된 이메일입니다.')
      } else {
        setEmailError('중복된 이메일입니다.')
      }
    } catch (error) {
      console.error(error)
      setEmailError('이메일을 확인하는 동안 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      const { email, username, tel, password } = JSON.parse(localToken)
      setEmail(email)
      setUsername(username)
      setTel(tel)
      setPassword(password)
      setConfirmPassword(password)
    }
  }, [])

  return (
    <div className="flex h-screen font-Noto">
      <div className="w-[1280px] p-8">
        <div className="mb-20">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="tracking-tighter font-medium text-3xl rounded-xl shadow-xl p-5">
          <div className="mb-11 text-center">
            <p className="mb-3">환영합니다!</p>
            <p className="font-normal text-2xl">
              <span className="font-Spoqa font-bold tracking-normal text-3xl text-primary mr-1.5">
                RE:POST
              </span>
              사원 계정을 생성해주세요.
            </p>
          </div>
          <form
            onSubmit={handleSignUp}
            className="mb-10 flex justify-center gap-11"
          >
            <div>
              <div className="mb-7">
                <p className="text-lg mb-2.5">사원명</p>
                <input
                  className="text-base w-[384px] font-normal border px-5 py-2.5 rounded-md focus:outline-none focus:border-primary"
                  type="text"
                  placeholder="ex)신예은"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <p className="text-lg mb-2.5">이메일</p>
                <div className="flex">
                  <input
                    className="text-base font-normal border w-[384px] px-5 py-2.5 mr-2.5 rounded-md focus:outline-none focus:border-primary"
                    type="email"
                    placeholder="ex)team7@naver.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    className="py-2.5 w-16 bg-secondary text-[white] rounded-md text-xs"
                    onClick={handleEmailCheckClick}
                  >
                    중복체크
                  </button>
                </div>
                {emailError && (
                  <div
                    className={`text-sm ${
                      emailError === '사용할 수 있는 이메일입니다.'
                        ? 'text-[blue]'
                        : 'text-[red]'
                    }`}
                  >
                    {emailError}
                  </div>
                )}
              </div>
              <div>
                <p className="text-lg mb-2.5">연락처</p>
                <input
                  className={`text-base font-normal border w-[384px] px-5 py-2.5 rounded-md focus:outline-non`}
                  type="tel"
                  name="phone"
                  pattern="(010)\d{3,4}\d{4}"
                  title="01012345678"
                  placeholder="ex)01012341234"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mb-7">
                <p className="text-lg mb-2.5">비밀번호</p>
                <input
                  className="text-base font-normal border w-[384px] px-5 py-2.5 rounded-md focus:outline-none focus:border-primary"
                  type="password"
                  placeholder="최소 4자 이상 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <p className="text-lg mb-2.5">비밀번호 확인</p>
                <input
                  className={`text-base font-normal border w-[384px] px-5 py-2.5 rounded-md focus:outline-none ${
                    !passwordsMatch ? 'border-[red]' : 'border-subText'
                  }`}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setPasswordsMatch(password === e.target.value)
                  }}
                />
                {!passwordsMatch && (
                  <div className="text-sm text-[red]">
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
            </div>
          </form>
          <div className="text-center">
            <button
              className="w-60 h-16 py-2.5 bg-btnDefault rounded-[30px] font-normal text-base text-[white] hover:bg-primary transition duration-300"
              type="submit"
              disabled={!passwordsMatch}
              onClick={handleSignUp}
            >
              회원가입
            </button>
            {error && <div className="text-sm text-red">{error}</div>}
          </div>
        </div>
      </div>
      <div className="w-[640px] rounded-l-[30px] p-8 bg-primary flex flex-col justify-end">
        <div>
          <img src="/worker.png" alt="worker" />
        </div>
      </div>
    </div>
  )
}
