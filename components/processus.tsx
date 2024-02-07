
const Processus = () => {
  return (
    <div id="processus">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-light-gray py-8">
        <div className="wrapper mx-auto flex flex-col items-start md:flex-row lg:flex-row xl:flex-row 2xl:flex-row my-12 md:my-24 overscroll-none  ">
          <div className="flex flex-col sticky md:top-36 lg:w-1/3 xl:w-1/3 2xl:w-1/4 mt-2 md:mt-12 px-8">
            <h2 className="text-orange uppercase tracking-loose">Processus de réservation</h2>
            <p className="text-sm md:text-base text-gray-50 mb-4">
              Suivez ces étapes pour réserver votre voiture idéale.
            </p>
            <a href="#reservez"
              className="xs:w-1/2 sm:w-1/2 md:w-full bg-transparent hover:bg-orange text-orange hover:text-white rounded transition ease-in duration-200 shadow hover:shadow-lg py-2 px-4 border border-orange hover:border-transparent">
              Je réserve
            </a>
          </div>
          <div className="ml-0 md:ml-12 lg:w-2/3 xl:w-2/3 2xl:w-2/3 sticky">
            <div className="container mx-auto w-full h-full">
              <div className="relative wrap overflow-hidden p-10 h-full">
                {/* Lines for timeline */}
                <div className="border-2-2 absolute h-full border"
                  style={{ right: '50%', border: '2px solid #DE5E0A', borderRadius: '1%' }}></div>
                <div className="border-2-2 absolute h-full border"
                  style={{ left: '50%', border: '2px solid #DE5E0A', borderRadius: '1%' }}></div>

                {/* Timeline Step 1 */}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-right">
                    <p className="mb-3 text-base text-orange">Étape 1</p>
                    <h4 className="mb-3 font-bold text-lg md:text-xl">Choisir une voiture</h4>
                    <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                      Sélectionnez le modèle de voiture qui répond à vos besoins et préférences.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 2 */}
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-left">
                    <p className="mb-3 text-base text-orange">Étape 2</p>
                    <h4 className="mb-3 font-bold text-lg md:text-xl">Choisir la location et la date</h4>
                    <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                      Déterminez le lieu de récuperation et de reotour au=insi que la période de location souhaitée.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 3 */}
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4 text-right">
                    <p className="mb-3 text-base text-orange">Étape 3</p>
                    <h4 className="mb-3 font-bold text-lg md:text-xl">Réserver la voiture choisie</h4>
                    <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                      Confirmez la disponibilité du véhicule et procédez à la réservation.
                    </p>
                  </div>
                </div>

                {/* Timeline Step 4 */}
                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                  <div className="order-1 w-5/12"></div>
                  <div className="order-1 w-5/12 px-1 py-4">
                    <p className="mb-3 text-base text-orange">Étape 4</p>
                    <h4 className="mb-3 font-bold text-lg md:text-xl text-left">Finaliser avec paiement</h4>
                    <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                      Terminez la réservation par le paiement et préparez-vous à prendre la route !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processus;
