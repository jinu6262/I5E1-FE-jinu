import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent
} from 'react'
import { useRouter } from 'next/router'
import { login } from '@/pages/api/api'

export default function SignIn() {
  const [check, setCheck] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!email || !password) {
        alert('사원정보를 입력해주세요.')
        return
      }

      if (!validateEmail(email)) {
        alert('유효하지 않은 이메일 형식입니다.')
        return
      }

      if (password.length < 4) {
        alert('비밀번호는 최소 4자 이상이어야 합니다.')
        return
      }

      try {
        const response = await login({ email, password })

        const { data: resdata, status } = response // response에서 data, status 꺼내올 것이다라는 의미
        const { token } = resdata.data // 위의 코드에서 구조분해할당 세번째

        if (status === 200) {
          sessionStorage.setItem('access', token)
          router.push('/')
          alert('로그인에 성공했습니다.')
        } else {
          alert('로그인에 실패했습니다.')
        }
      } catch (error) {
        alert('로그인에 실패했습니다.')
      }
    },
    [email, password]
  )

  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return isValid
  }

  return (
    <div className="flex h-screen font-Noto">
      <div className="w-[1280px] p-8">
        <div className="mb-20">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="w-[34rem] mx-auto tracking-tighter font-medium text-3xl">
          <div className="mb-11">
            <p className="mb-3">안녕하세요</p>
            <p>
              <span className="font-Spoqa font-bold tracking-normal text-6xl text-primary">
                RE:POST
              </span>
              입니다
            </p>
          </div>
          <form className="mb-20" onSubmit={handleSignIn}>
            <div className="mb-7">
              <p className="text-lg mb-2.5">이메일</p>
              <input
                className="text-base font-normal border border-subText w-full px-5 py-2.5 rounded-md focus:outline-none focus:border-primary"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="mb-10">
              <p className="text-lg mb-2.5">비밀번호</p>
              <input
                className="text-base font-normal border border-subText w-full px-5 py-2.5 rounded-md focus:outline-none focus:border-primary"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="flex items-center gap-3 mb-16">
              <input
                className="w-7 h-7 rounded-md"
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCheck(e.target.checked)
                }
              />
              <span className="font-normal text-sm">이메일 저장</span>
            </div>
            <div className="text-center">
              <button
                className="w-60 h-16 py-2.5 bg-btnDefault rounded-[30px] font-normal text-base text-[white] hover:bg-primary transition duration-300"
                type="submit"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[640px] rounded-l-[30px] p-8 bg-primary text-[white] tracking-tighter flex flex-col justify-end">
        <div className="text-center mb-5">
          <h3 className="text-3xl mb-12">환영합니다!</h3>
          <p className="mb-20">
            연차와 당직 관리
            <br />
            이제는{' '}
            <span className="font-Spoqa tracking-normal font-bold text-2xl">
              RE:POST
            </span>
            와 함께
          </p>
          <button
            className="w-60 h-16 py-2.5 rounded-[30px] border border-white font-normal text-base text-[white] hover:bg-[white] hover:text-primary transition duration-300"
            type="submit"
            onClick={() => router.push('/signup')}
          >
            회원가입
          </button>
        </div>
        <div>
          <img src="/worker.png" alt="worker" />
        </div>
      </div>
    </div>
  )
}
