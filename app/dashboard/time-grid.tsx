import type { Database } from '@/types/supabase'
import { format } from '@formkit/tempo'
import type { ReactNode } from 'react'
import { ReservationCard } from './reservation-card'

interface Props {
  times: Date[]
  maxCapacity: number
  getGridCols: (maxCapacity: number) => string
  getReservation: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  duringReservation: (
    time: Date,
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => boolean
  getHeight: (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => string
}

export function TimeGrid({
  times,
  maxCapacity,
  getGridCols,
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
          <div
            key={time.toISOString()}
            className={`grid h-20 border-t ${getGridCols(maxCapacity)}`}
          >
            {((): ReactNode => {
              // 対象時刻の予約データを取得
              const reservations = getReservation(time)

              // 対象時刻に予約データが存在するか？
              return reservations.length > 0 ? (
                // 予約が存在する場合、予約数やキャパシティに応じてブロックを描画していく
                // 存在する予約数はmax_capacityの数より少ないか？
                <>
                  {reservations.length < maxCapacity ? (
                    // 存在する予約を描画し、足りない数分空のブロックを描画する
                    <>
                      {reservations.map((reservation) => (
                        // 描画しようとしている予約はすでに描画済みか？
                        <div key={reservation.id}>
                          {duringReservation(time, reservation) ? (
                            // 空のブロックを描画して、次の予約が横並びになるようにする
                            <div className='h-20 w-full border-r'></div>
                          ) : (
                            // 予約のブロックを予約時間に応じて高さを計算し、描画する
                            <ReservationCard
                              cardHeight={getHeight(reservation)}
                              reservation={reservation}
                            />
                          )}
                        </div>
                      ))}
                      {
                        // 予約は存在しないがキャパシティが空いている場合、空のブロックを描画する
                        Array.from({
                          length: maxCapacity - reservations.length,
                        }).map((_, index) => (
                          <div
                            key={index}
                            className='h-20 w-full border-r'
                          ></div>
                        ))
                      }
                    </>
                  ) : (
                    // 存在する予約を全て描画する
                    <>
                      {reservations.map((reservation) => (
                        // 描画しようとしている予約はすでに描画済みか？
                        <div key={reservation.id}>
                          {duringReservation(time, reservation) ? (
                            // 空のブロックを描画して、次の予約が横並びになるようにする
                            <div className='h-20 w-full border-r'></div>
                          ) : (
                            // 予約のブロックを予約時間に応じて高さを計算し、描画する
                            <ReservationCard
                              cardHeight={getHeight(reservation)}
                              reservation={reservation}
                            />
                          )}
                        </div>
                      ))}
                      {Array.from({
                        length: maxCapacity - reservations.length,
                      }).map((_, index) => (
                        <div key={index} className='h-20 w-full border-r'>
                          empty card
                        </div>
                      ))}
                    </>
                  )}
                </>
              ) : (
                // 予約が存在しない場合、空のブロックをmax_capacity分描画する
                <>
                  {Array.from({ length: maxCapacity }).map((_, index) => (
                    <div key={index} className='h-20 w-full border-r'></div>
                  ))}
                </>
              )
            })()}
          </div>
        ))}
      </div>
    </div>
  )
}
