export const Footer = () => {
  return (
    <footer className='sticky top-full flex flex-col items-center justify-center border-t bg-primary py-2 text-background md:h-16 md:flex-row md:gap-3 md:px-[160px]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>ReserveEase</h3>
            <p className='text-sm'>
              シンプルで使いやすい予約管理サービス。
              <br />
              フリーランスや個人店向けに、低価格で高品質な予約管理システムを提供します。
            </p>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-700 pt-8 text-center'>
          <p className='text-sm'>
            &copy; 2024 ReserveEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
