import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

interface Props {
  cases: Case[]
}

export const Case = ({ cases }: Props) => {
  return (
    <div className='flex flex-col space-y-4 px-4 py-8 leading-8 tracking-wide'>
      <div className='space-y-2'>
        <h2 className='text-center text-4xl font-bold'>Case</h2>
        <h3 className='text-center text-lg font-bold'>導入事例</h3>
      </div>
      <p>
        実際にReserveEase（リザーブイーズ）を導入いただいたフリーランスや個人店経営者の方のお声をご紹介いたします。
      </p>
      <Carousel className='w-full'>
        <CarouselContent>
          {cases.map((caseItem) => (
            <CarouselItem key={caseItem.id}>
              <div className='p-1'>
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-6'>
                    <span className='text-4xl font-semibold'>
                      {caseItem.id}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex h-full flex-row items-center justify-end space-x-2'>
        <span className='rotate-270 text-sm font-bold tracking-widest'>
          SCROLL
        </span>
        <div className='h-[2px] w-10 bg-primary'></div>
      </div>
    </div>
  )
}
