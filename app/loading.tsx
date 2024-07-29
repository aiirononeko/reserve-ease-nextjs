export default function Loading() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='h-4 w-1 animate-ping rounded-full bg-primary'></div>
      <div className='animation-delay-100 h-4 w-1 animate-ping rounded-full bg-primary'></div>
      <div className='animation-delay-200 h-4 w-1 animate-ping rounded-full bg-primary'></div>
      <div className='animation-delay-300 h-4 w-1 animate-ping rounded-full bg-primary'></div>
      <div className='animation-delay-400 h-4 w-1 animate-ping rounded-full bg-primary'></div>
    </div>
  )
}
