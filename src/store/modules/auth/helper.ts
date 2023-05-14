import { ss } from '@/utils/storage'

const Authorization = 'Authorization'

export function getToken() {
  // return localStorage.getItem('Authorization')
  return ss.get(Authorization)
}

export function setToken(token: object) {
  // localStorage.setItem('Authorization', 'token')
  return ss.set(Authorization, token)
}

export function removeToken() {
  return ss.remove(Authorization)
}
