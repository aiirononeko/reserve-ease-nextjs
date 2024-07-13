'use client'

import { Provider } from 'jotai'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return <Provider>{children}</Provider>
}
