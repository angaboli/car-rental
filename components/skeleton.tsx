export default function Skeleton() {
  return (
    <div className="wrapper flex">
      <div className="relative m-3 flex flex-wrap gap-1 mx-auto justify-center ">
        {
        Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col max-w-sm min-w-[340px] gap-4 mx-1 my-3">
            <div className="skeleton h-40 w-full"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-6 w-full"></div>
          </div>
        ))
      }
      </div>
    </div>
  )
}