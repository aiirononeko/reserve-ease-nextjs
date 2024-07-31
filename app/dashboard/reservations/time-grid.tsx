import type { Database } from '@/types/supabase'
import { format } from '@formkit/tempo'
import type { ReactNode } from 'react'
import { EmptyCard } from './empty-card'
import { ReservationCard } from './reservation-card'

interface Props {
  times: Date[]
  maxCapacity: number
  getGridCols: (maxCapacity: number) => string
  filteringReservations: (
    time: Date,
  ) => Database['public']['Tables']['reservations']['Row'][]
  filteringDuringReservations: (
    time: Date,
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
  filteringReservations,
  filteringDuringReservations,
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
                  // 該当時刻の予約データ(Duringを含む)をフィルタリング
                  const reservations = filteringReservations(time)

                  // 該当時刻の予約データ(Duringのみ)をフィルタリング
                  const duringReservations = filteringDuringReservations(time)

                  // 取得した予約データを使って描画するブロックを生成
                  const blocks = Array.from({ length: maxCapacity }).map(
                    (_, i) => {
                      // 全て予約なしの場合、Duringなし
                      // EmptyCardをcapacity分描画
                      if (reservations.length === 0) {
                        return (
                          <EmptyCard
                            key={i}
                            date={time}
                            userId={userId}
                            storeId={storeId}
                            menus={menus}
                          />
                        )
                      }

                      // 全て予約ありの場合、Duringなし
                      // ReservationCardをcapacity分描画
                      if (
                        reservations.length === maxCapacity &&
                        duringReservations.length === 0
                      ) {
                        return (
                          <ReservationCard
                            key={reservations[i].id}
                            cardHeight={getHeight(reservations[i])}
                            reservation={reservations[i]}
                            userId={userId}
                          />
                        )
                      }

                      // 全て予約ありの場合かつ全てDuring
                      // DuringCardをcapacity分描画
                      if (
                        reservations.length === maxCapacity &&
                        duringReservations.length === maxCapacity
                      ) {
                        return (
                          <div key={i} className='h-20 w-full border-r'>
                            during {reservations[i].id}
                          </div>
                        )
                      }

                      // 全て予約ありの場合かつ一部During
                      // DuringReservationのstart_datetimeから描画位置を判定し、並び替えてcapacity分描画 // TODO:
                      if (
                        reservations.length === maxCapacity &&
                        duringReservations.length > 0
                      ) {
                        return (
                          <div key={i} className='h-20 w-full border-r'>
                            during {reservations[i].id}
                          </div>
                        )
                      }

                      // 一部予約ありの場合、Duringなし
                      // あらかじめReservationCardを描画し、残ったブロックはEmptyCardを描画
                      if (duringReservations.length === 0) {
                        return reservations[i] ? (
                          <ReservationCard
                            key={reservations[i].id}
                            cardHeight={getHeight(reservations[i])}
                            reservation={reservations[i]}
                            userId={userId}
                          />
                        ) : (
                          <EmptyCard
                            key={i}
                            date={time}
                            userId={userId}
                            storeId={storeId}
                            menus={menus}
                          />
                        )
                      }

                      // 一部予約ありの場合かつ一部During
                      // DuringReservationのstart_datetimeから描画位置を判定し、並び替えてcapacity分描画 // TODO:
                      // 余ったブロックにはEmptyCardを描画 // TODO:
                      if (duringReservations.length > 0) {
                        return (
                          <div key={i} className='h-20 w-full border-r'>
                            during
                          </div>
                        )
                      }
                    },
                  )

                  return blocks
                })()}
              </div>
            ),
        )}
      </div>
    </div>
  )
}
