import { CorsOptions } from 'cors'

const whitelist = [
  'https://cotillonsanmartin.com.ar',
  'https://www.cotillonsanmartin.com.ar',
]

export const corsConfig: CorsOptions = {
  origin(origin, callback) {
    // origin undefined = peticiones del mismo servidor (curl, SSR, etc.)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  },
  credentials: true,
}