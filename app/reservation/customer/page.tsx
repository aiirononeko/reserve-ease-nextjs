import { CustomerForm } from './customer-form'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  return (
    <div className='mx-4 items-center py-8'>
      <CustomerForm />
    </div>
  )
}
