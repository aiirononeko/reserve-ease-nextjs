export default function Page() {
  return (
    <div className='my-8 space-y-8 p-4'>
      <div className='space-y-4'>
        <p>ReserveEaseにご登録いただきありがとうございます！</p>
        <p>
          ご登録いただいたメールアドレス宛てに確認メールを送信しましたのでご確認ください。
        </p>
      </div>
      <div className='space-y-4 border p-4'>
        <p className='text-center font-bold'>
          アカウント登録から利用開始までの流れ
        </p>
        <div className='grid grid-cols-10 gap-4'>
          <p className='col-span-1'>1.</p>
          <p className='col-span-9'>
            確認メールのURLからアカウントを有効化する
          </p>
          <p className='col-span-1'>2.</p>
          <p className='col-span-9'>
            ダッシュボードにアクセスして、初月無料のサブスクリプションに登録する
          </p>
          <p className='col-span-1'>3.</p>
          <p className='col-span-9'>
            店舗情報、メニュー、スタッフ情報を設定する
          </p>
          <p className='col-span-1'>4.</p>
          <p className='col-span-9'>
            店舗またはスタッフ指名済みのリンクをダッシュボードからコピーして顧客に共有
          </p>
        </div>
      </div>
    </div>
  )
}
