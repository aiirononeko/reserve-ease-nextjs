import type { Database } from '@/types/supabase'
import { addHour, date, format } from '@formkit/tempo'

interface Props {
  times: Date[]
  reservationExists: (time: Date) => boolean
  getReservation: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  duringReservation: (time: Date) => boolean
  getHeight: (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => string
}

export function TimeGrid({
  times,
  reservationExists,
  getReservation,
  duringReservation,
  getHeight,
}: Props) {
  return (
    <div className='grid grid-cols-6 border-y'>
      <div className='col-span-1 border-r py-2'>
        {times.map((time, index) => (
          <div key={time.toISOString()}>
            {times.length > index + 1 ? (
              <div className='h-20 font-semibold tracking-wide text-gray-500'>
                {format(time, 'HH:mm')}
              </div>
            ) : (
              <div className='font-semibold tracking-wide text-gray-500'>
                {format(time, 'HH:mm')}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='col-span-5 py-5'>
        {times.map((time, index) => (
          <div key={time.toISOString()}>
            <div className='grid grid-cols-2'>
              {reservationExists(time) ? (
                getReservation(time).map((reservation) => (
                  <>
                    {duringReservation(time) && (
                      <div className='h-20 w-full border-r'></div>
                    )}
                    <div className='relative h-20'>
                      <div
                        key={reservation.id}
                        className={`absolute flex w-full flex-col items-start justify-center space-y-1 border bg-primary px-4 text-xs font-semibold tracking-wide text-white ${getHeight(reservation)}`}
                      >
                        <div className='space-x-1'>
                          <span>
                            {format(
                              addHour(date(reservation.start_datetime), 9),
                              'HH:mm',
                            )}
                          </span>
                          <span>~</span>
                          <span>
                            {format(
                              addHour(date(reservation.end_datetime), 9),
                              'HH:mm',
                            )}
                          </span>
                        </div>
                        {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                        {reservation.customers.name && (
                          // @ts-expect-error because JOINした時の型定義あとでやる
                          <p>{reservation.customers.name} 様</p>
                        )}
                        {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                        <p>{reservation.menus.name}</p>
                        {/* @ts-expect-error because JOINした時の型定義あとでやる */}
                        <p>{reservation.users.name}</p>
                      </div>
                    </div>
                    <>
                      <div className='h-20 w-full border-r'></div>
                    </>
                  </>
                ))
              ) : (
                <>
                  {times.length > index + 1 && (
                    <div className='h-20 w-full border-r'></div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
