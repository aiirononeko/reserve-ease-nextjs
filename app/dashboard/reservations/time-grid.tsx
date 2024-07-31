import type { Database } from '@/types/supabase'
import { format } from '@formkit/tempo'
import type { ReactNode } from 'react'
import { EmptyCard } from './empty-card'
import { ReservationCard } from './reservation-card'

interface Props {
  times: Date[]
  maxCapacity: number
  getGridCols: (maxCapacity: number) => string
  filteredReservations: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  duringReservations: (
    time: Date,
    reservations: Database['public']['Tables']['reservations']['Row'][],
  ) => Database['public']['Tables']['reservations']['Row'][]
  getHeight: (
    reservation: Database['public']['Tables']['reservations']['Row'],
  ) => string
  userId: string
  storeId: number
  menus: Database['public']['Tables']['menus']['Row'][]
}

export function TimeGrid({
  times,
  maxCapacity,
  getGridCols,
  filteredReservations,
  duringReservations,
  getHeight,
  userId,
  storeId,
  menus,
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
        {times.map(
          (time, index) =>
            times.length > index + 1 && (
              <div
                key={time.toISOString()}
                className={`grid h-20 border-t ${getGridCols(maxCapacity)}`}
              >
                {((): ReactNode => {
                  // 当日の予約データをフィルタリング
                  const reservations = filteredReservations(time)

                  return (
                    <>
                      {Array.from({ length: maxCapacity }).map((_, i) => (
                        <div key={i}>
                          {reservations.length === 0 ? (
                            // reservationsがない場合はEmptyCardを描画する
                            <EmptyCard
                              key={i}
                              date={time}
                              userId={userId}
                              storeId={storeId}
                              menus={menus}
                            />
                          ) : (
                            <>
                              {((): ReactNode => {
                                if (!reservations[i])
                                  return (
                                    <EmptyCard
                                      key={i}
                                      date={time}
                                      userId={userId}
                                      storeId={storeId}
                                      menus={menus}
                                    />
                                  )

                                // 重なるreservationがあるか判定
                                const during = duringReservations(
                                  time,
                                  reservations,
                                )

                                if (during.length > 0) {
                                  // ある場合は重なるreservationのstart_datetimeから過去のreservationsを取得
                                  // 描画位置(index)を取得し、順番に応じてJSXの配列を生成
                                  return (
                                    <div className='h-20 w-full border-r'>
                                      during {reservations[i].id}
                                    </div>
                                  )
                                } else {
                                  // ない場合はそのまま順番でJSXの配列を生成
                                  return (
                                    <ReservationCard
                                      cardHeight={getHeight(reservations[i])}
                                      reservation={reservations[i]}
                                      userId={userId}
                                    />
                                  )
                                }
                              })()}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )
                })()}
              </div>
            ),
        )}
      </div>
    </div>
  )
}
