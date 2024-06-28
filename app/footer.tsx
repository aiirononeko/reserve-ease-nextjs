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
              フリーランサーや個人店向けに、低価格で高品質な予約管理システムを提供します。
            </p>
          </div>
          {/* <div> */}
          {/*   <h3 className='mb-4 text-lg font-semibold'>リンク</h3> */}
          {/*   <ul className='space-y-2'> */}
          {/*     <li> */}
          {/*       <Link href='/' className='hover:underline'> */}
          {/*         ホーム */}
          {/*       </Link> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <Link href='/features' className='hover:underline'> */}
          {/*         機能 */}
          {/*       </Link> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <Link href='/pricing' className='hover:underline'> */}
          {/*         料金プラン */}
          {/*       </Link> */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       <Link href='/contact' className='hover:underline'> */}
          {/*         お問い合わせ */}
          {/*       </Link> */}
          {/*     </li> */}
          {/*   </ul> */}
          {/* </div> */}
          {/* <div> */}
          {/*   <h3 className='mb-4 text-lg font-semibold'>お問い合わせ</h3> */}
          {/*   <p className='text-sm'> */}
          {/*     〒156-0054 */}
          {/*     <br /> */}
          {/*     東京都渋谷区○○1-2-3 */}
          {/*     <br /> */}
          {/*     メール: info@reserveease.com */}
          {/*     <br /> */}
          {/*     電話: 03-1234-5678 */}
          {/*   </p> */}
          {/* </div> */}
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
