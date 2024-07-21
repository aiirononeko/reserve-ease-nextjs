import { createClient as createMicrocmsClient } from 'microcms-js-sdk'

export const createClient = () => {
  return createMicrocmsClient({
    serviceDomain: '2o8j0ptx1l',
    apiKey: process.env.MICROCMS_API_KEY!
  })
}
