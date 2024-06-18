import { Menu } from 'lucide-react'

export const Header = () => {
  return (
    <header className='flex h-14 flex-row items-center justify-between border-b bg-card px-4'>
      <h1 className='text-xl font-semibold text-primary'>ReserveEase</h1>
      <Menu />
    </header>
  )
}
