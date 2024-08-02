import { CopyLinkSection } from './copy-link-section'
import { getRecentReservation } from './data'
import { NewsSection } from './news-section'
import { RecentReservationSection } from './recent-reservation-section'

export default async function Page() {
  const reservation = await getRecentReservation()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      {/* @ts-expect-error because: JOINした後の型定義は後でやる */}
      <RecentReservationSection reservation={reservation} />
      <CopyLinkSection
        // @ts-expect-error because: JOINした後の型定義は後でやる
        storeId={reservation.stores.id}
        // @ts-expect-error because: JOINした後の型定義は後でやる
        staffId={reservation.users.id}
      />
      <NewsSection />
    </div>
  )
}
