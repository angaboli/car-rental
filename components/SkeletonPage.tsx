export default function SkeletonPage() {
  return (
    <div className="md:max-w-[1366px] md:px-8 mx-auto">
      <div className=" flex flex-wrap py-16 px-5">
        <div className="w-3/5">
          <div className="skeleton h-10 w-4/5 mb-5"></div>
          <div className="skeleton h-10 w-4/5 mb-5"></div>
          <div className="skeleton h-10 w-4/5 mb-20"></div>
          <div className='flex justify-between gap-5 w-4/5 mb-5'>
            <div className="skeleton h-10 w-1/2"></div>
            <div className="skeleton h-10 w-1/2"></div>
          </div>
          <div className='flex justify-between gap-5 w-4/5 mb-5'>
            <div className="skeleton h-10 w-1/2"></div>
            <div className="skeleton h-10 w-1/2"></div>
          </div>
          <div className='flex justify-between gap-5 w-4/5 mb-10'>
            <div className="skeleton h-10 w-1/2"></div>
            <div className="skeleton h-10 w-1/2"></div>
          </div>
        </div>
        <div className="w-2/5">
          <div className="skeleton h-64 w-full mb-10"></div>
          <div className="skeleton h-10 w-full mb-5"></div>
          <div className="skeleton h-10 w-2/3"></div>
        </div>
      </div>
    </div>
  )
}