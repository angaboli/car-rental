const SpinnerSearch = () => {
  return <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="relative">
        <div className="w-20 h-20 border-[#D6B456] border-2 rounded-full"></div>
        <div className="w-20 h-20 border-[#B38425] border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  </>
}

export default SpinnerSearch;