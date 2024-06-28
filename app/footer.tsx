export const Footer = () => {
  return (
    <footer className='bg-primary text-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>
              ReserveEase (リザーブイーズ)
            </h3>
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
