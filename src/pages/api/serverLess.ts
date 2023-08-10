import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

interface RequestBody {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: {
    [key: string]: unknown
  }
  path?: string
  Authorization?: string
}

const { API_SERVER } = process.env
// 요청/반환
export default async (req: VercelRequest, res: VercelResponse) => {
  const { data, method, Authorization, path = '' } = req.body as RequestBody

  const { data: responseValue } = await axios({
    url: `${API_SERVER}/${path}`,
    headers: {
      'content-type': 'application/json',
      Authorization
    },
    method,
    data
  })

  res.status(200).json(responseValue)
}
