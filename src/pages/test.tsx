import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Todo } from '@/types/api'

export default function Test() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [isTest, setIsTest] = useState(false)
  const [now, setNow] = useState('')

  // 날짜데이터를 사용할때는 dayjs 라이브러리를 활용해주세요!//
  // const now = dayjs().format('YYYY.MM.DD HH:mm:ss')

  useEffect(() => {
    readTodos()
    setNow(dayjs().format('YYYY.MM.DD HH:mm:ss'))
  }, [isTest])

  // api 사용 예시(과제3의 api를 예시로 활용)
  async function readTodos() {
    const { data } = await axios({
      url: '/api/todos',
      method: 'POST',
      data: {
        method: 'GET'
      }
    })
    setTodos(data)
  }

  async function createTodo() {
    await axios({
      url: '/api/todos',
      method: 'POST',
      data: {
        method: 'POST',
        data: {
          title
        }
      }
    })
    setTitle('')
    setIsTest(!isTest)
  }

  async function deleteTodo(todoId: Todo['id']) {
    await axios({
      url: '/api/todos',
      method: 'POST',
      data: {
        path: todoId,
        method: 'DELETE'
      }
    })
    setIsTest(!isTest)
  }

  //출력 예시,
  return (
    <div className="container mx-auto">
      <div className="w-full bg-black text-white p-[20px]">
        <p className="mb-[20px]">{now}</p>
        <input
          className="bg-transparent border-b-4"
          placeholder="Todo를 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') createTodo()
          }}
        />
        <p className="mt-[30px]">항목 클릭 시 삭제</p>
        {todos.map((todo) => (
          <div key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.title}
          </div>
        ))}
      </div>
    </div>
  )
}
