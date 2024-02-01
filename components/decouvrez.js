

const Decouvrez = () => {

  return <div className="sm:px-28 py-5"  id="decouvrez">
    <div className="relative flex items-center w-full">
      <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
        <div className="relative flex-col items-start m-auto align-middle">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 lg:gap-24">
            <div className="relative items-center gap-10 m-auto lg:inline-flex md:order-first">
              <div className="max-w-xl xs:text-center lg:text-left">
                <div>
                  <h2 className="text-3xl head_text uppercase">
                    Découvrez
                  </h2>
                  <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600">
                    Use this paragraph to share information about your company or products. Make it engaging and interesting, and showcase your brand's personality. Thanks for visiting our website!
                  </p>
                </div>
                <div className="flex justify-center gap-3 mt-10 lg:justify-start">
                  <a className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-green focus:outline-none focus-visible:outline-gray-600" href="/decrouvrez">
                    <span> En savoir plus &nbsp; → </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="order-first flex w-full mt-12 items-center aspect-square lg:mt-0">
              <img className="object-cover rounded-3xl object-center w-full mx-auto bg-gray-300 lg:ml-auto " alt="hero" src="https://images.unsplash.com/photo-1601221656510-e23d747fec7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y290ZSUyMGQnaXZvaXJlfGVufDB8fDB8fHww" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Decouvrez;