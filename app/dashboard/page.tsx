import { CopyLinkSection } from './copy-link-section'
import { getRecentReservation, getUser } from './data'
import { NewsSection } from './news-section'
import { RecentReservationSection } from './recent-reservation-section'

export default async function Page() {
  const reservation = await getRecentReservation()
  const user = await getUser()

  return (
    <div className='mx-4 flex flex-col items-center space-y-6 py-4'>
      {/* @ts-expect-error because: JOINした後の型定義は後でやる */}
      <RecentReservationSection reservation={reservation} />
      <CopyLinkSection
        storeId={user.user_metadata.store_id}
        staffId={user.id}
      />
      <NewsSection />
    </div>
  )
}
