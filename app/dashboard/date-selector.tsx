import { Button } from '@/components/ui/button'
import { format } from '@formkit/tempo'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  currentDate: Date
  prev: () => void
  next: () => void
}

export function DateSelector({ currentDate, prev, next }: Props) {
  return (
    <div className='grid grid-cols-6'>
      <div className='border'>
        <Button variant='ghost' onClick={prev} className='col-span-1'>
          <ChevronLeft />
        </Button>
      </div>
      <div className='col-span-4 flex items-center justify-center border-y'>
        <p className='font-bold'>{format(currentDate, 'YYYY/MM/DD (d)')}</p>
      </div>
      <div className='border'>
        <Button variant='ghost' onClick={next} className='col-span-1'>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
