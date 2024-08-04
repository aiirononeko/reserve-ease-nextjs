import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-4 px-4 py-8'>
      <h1 className='text-center text-xl font-bold'>
        特定商取引法に基づく表記
      </h1>
      <div className='space-y-4 leading-8 tracking-wide'>
        <h2 className='text-lg font-bold'>事業者</h2>
        <p>片田 凌太</p>
        <h2 className='text-lg font-bold'>事業者の所在</h2>
        <p>請求があった際に遅延なく開示します。</p>
        <h2 className='text-lg font-bold'>お問い合わせ先</h2>
        <div className='flex flex-row items-center space-x-1'>
          <a
            href='https://forms.gle/CRWBFiMniRv1EVuF6'
            target='_blank'
            className='underline'
          >
            お問い合わせフォーム
          </a>
          <ExternalLink className='size-4' />
        </div>
        <p className='text-sm text-muted-foreground'>
          お電話でのお問い合わせは受け付けておりません。上記のお問い合わせフォームをご利用ください。
        </p>
        <h2 className='text-lg font-bold'>販売価格と手数料</h2>
        <p>
          販売ページおよび購入手続きの画面において、消費税・手数料を含む価格で表示されています。
        </p>
        <h2 className='text-lg font-bold'>
          販売価格以外でお客様に発生する金銭
        </h2>
        <p>
          当サービスの利用に必要となるインターネット通信料金はお客様のご負担となります。
        </p>
        <h3 className='text-lg font-bold'>提供時期</h3>
        <p>決済手続きが完了した後、すぐに利用できるようになります。</p>
        <h2 className='text-lg font-bold'>お支払方法</h2>
        <p>
          クレジットカードもしくはその他当社が定める方法によりお支払いいただきます。購入手続きの画面において、ご利用可能なお支払い方法が表示されます。
        </p>
        <h2 className='text-lg font-bold'>お支払時期</h2>
        <p>
          定期契約であるため、契約日から一ヶ月おきにご利用のクレジットカード会社へ請求いたします。
          クレジットカード会社からお客様への請求時期は、お客様とクレジットカード会社との間の契約に基づきます。
        </p>
        <h2 className='text-lg font-bold'>解約について</h2>
        <p>
          定期契約の解約手続きは、
          <Link href='/dashboard' className='underline'>
            設定ページ（要ログイン）
          </Link>
          からいつでも行うことができます。解約手続き後も、契約日から1ヶ月間は引き続きサービスをご利用いただけます。
        </p>
        <h2 className='text-lg font-bold'>返金について</h2>
        <p>
          商品の性質上、お客様のご都合によるキャンセルと返金はできかねます。
        </p>
        <h2 className='text-lg font-bold'>個人情報の取扱いについて</h2>
        <p>
          <Link href='/privacy-policy' className='underline'>
            プライバシーポリシー
          </Link>
          をご参照ください。
        </p>
        <p className='text-right'>2024年8月4日 制定</p>
      </div>
    </div>
  )
}
