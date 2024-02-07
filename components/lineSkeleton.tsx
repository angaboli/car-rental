export default function LineSkeleton() {
  return (
    <div className="bg-gradient-to-r from-cyan-700 to-cyan-500 bg-blue-green text-light-gray border-t-4 border-orange p-5">
      <div className="wrapper flex">
        <div className="flex gap-1 mx-auto justify-between">
          <div  className="w-80 pr-5" >
            <div className="skeleton w-50 h-3 w-full"></div>
          </div>
          <div  className="w-80 px-5 border-l border-light-orange" >
            <div className="skeleton w-50 h-3 w-full"></div>
          </div>
          <div  className="w-80 pl-5 border-l border-light-orange" >
            <div className="skeleton w-50 h-3 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}