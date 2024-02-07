import { createBooking } from "@/services";
import { useEffect, useState } from "react"

const Form = ({ car }: any) => {
  const [formValue, setFormValue] = useState({ location: '', pickupDate: '', dropOffDate: '', pickUpTime: '', dropoffDate: '', contactNumber: '', carId: '' })
  const [ finalPrice, setFinalPrice ] = useState(car.price)
  const [withDriver, setWithDriver] = useState(false);
  const [outCapital, setOutCapital] = useState(false);
  const [addDropoff, setAddDropoff] = useState(false)
  const [step, setStep] = useState(1);


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const updatePrice = (e: any) => {
    if(e.target.name == "withDriver") {
      setWithDriver(e.target.checked)
    } else if(e.target.name == "outAbidjan") {
      setOutCapital(e.target.checked)
    }
  }

  const updateDropoffLocation = (e:any)  => {
     if(e.target.name == "returnAgency") {
      setAddDropoff(e.target.checked)
    }
  }

  useEffect(() => {
    let price = car.price;
    if(withDriver) { price += 5000}
    if(outCapital) { price += 10000}
    setFinalPrice(price);
  }, [withDriver, outCapital, car.price])
  useEffect(() => {
    if (car) setFormValue({ ...formValue, carId: car.id });
  }, [car])
  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  }
  const handleSubmit = async () => {
    console.log(formValue)
    const resp = await createBooking(formValue);
    console.log(resp);
  }

  return (
    <div>
      {
        step === 1 && (
          <div>
            <div className="flex flex-col w-full mb-5">
              <label className="text-gray-400 mb-2">Lieu de récuperation</label>
              <select className="select bg-white select-bordered w-full " name="pickupLocation" onChange={handleChange}>
                <option defaultValue="Lieu de récuperation ?">Lieu de récuperation ?</option>
                <option>Riviéra M'badon, Abidjan</option>
                <option>Aéroport Félix Houphouet Boigny, Abidjan</option>
              </select>
            </div>
            <div className="form-control flex-col mb-2">
              <label htmlFor="returnAgency" className="label cursor-pointer ">
                <span className="label-text text-gray-400">Retour dans une autre agence&nbsp;?</span>
                <input name="returnAgency" type="checkbox" className="toggle toggle-accent" onChange={updateDropoffLocation} />
              </label>
            </div>
            {
              addDropoff == true && (
              <div className="flex flex-col w-full mb-5">
                <label className="text-gray-400 mb-2">Lieu de retour</label>
                <select className="select bg-white select-bordered w-full " name="dropoffLocation" onChange={handleChange}>
                  <option defaultValue="Lieu de retour ?">Lieu de retour ?</option>
                  <option>Riviéra M'badon, Abidjan</option>
                  <option>Aéroport Félix Houphouet Boigny, Abidjan</option>
                </select>
              </div>
            )}
          <div className="flex flex-row gap-5 mb-5">
            <div className="flex flex-col w-3/5">
              <label className="text-gray-400 mb-2">Date de récuperation</label>
              <input type="date" placeholder="Type here" name="pickUpDate" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col w-2/5">
              <label className="text-gray-400 mb-2">Heure de récuperation</label>
              <input type="time" name="pickUpTime" placeholder="Type here" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
            </div>
          </div>
          <div className="flex gap-5 mb-5">
            <div className="flex flex-col  w-3/5">
              <label className="text-gray-400 mb-2">Date de retour</label>
              <input type="date" placeholder="Type here" name="dropOffDate" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col w-2/5">
              <label className="text-gray-400 mb-2">Heure de retour</label>
              <input type="time" name="dropOffTime" placeholder="Type here" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-row w-full mb-5 gap-6">
            <div className="form-control flex-col basis-1/2">
              <label className="label cursor-pointer ">
                <span className="label-text">Avec chauffeur ?</span>
                <input name="withDriver" type="checkbox" className="toggle toggle-accent" onChange={updatePrice} />
              </label>
            </div>
            <div className="form-control flex-col basis-1/2">
              <label className="label cursor-pointer">
                <span className="label-text">Hors Abijan ?</span>
                <input name="outAbidjan" type="checkbox" className="toggle toggle-accent" onChange={updatePrice} />
              </label>
            </div>
          </div>
          <FinalPrice price={finalPrice} />
          <button className="btn bg-light-orange text-dark-gray" onClick={nextStep}>Suivant</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Nom</label>
              <input type="text" placeholder="Nom" name="lastName" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Prénom</label>
              <input type="text" placeholder="Prénom" name="firstName" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Email</label>
              <input type="email" placeholder="Email" name="email" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Age</label>
              <select className="select bg-white select-bordered w-full " name="age" defaultValue="30+" onChange={handleChange}>
                <option value="21-24">21-24</option>
                <option value="25-29">25-29</option>
                <option value="30+">30+</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full mb-5 gap-5">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Numéro de tél</label>
              <input type="tel" placeholder="Votre numéro de tél" name="phoneNumber" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-400 mb-2">Numéro de WhatsApp</label>
              <input type="tel" placeholder="Votre numéro de WhatsApp" name="whatsAppNumber" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
            </div>
          </div>
          <FinalPrice price={ finalPrice } />
          <div className="flex flex-col gap-5">
            <button className="btn bg-light-orange text-dark-gray w-40" onClick={prevStep}>Précédent</button>
            <div className="flex gap-5" >
              <button className="btn w-40 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange  hover:border-transparent transition ease-in duration-200" onClick={handleSubmit}>Payer plut tard</button>
              <button className="btn w-40 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange  hover:border-transparent transition ease-in duration-200" onClick={handleSubmit}>Payer maintenant</button>
            </div>
          </div>
        </div>
      )}

      <div className="modal-action">
        {/* <button className="btn bg-light-orange text-dark-gray">Fermer</button>
        <button className="group overflow-hidden btn_base py-1 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" onClick={handleSubmit}>
          <span className="z-40"> Enregistrer</span>
        </button> */}
      </div>
    </div>
  )
}

const FinalPrice = ({ price }: { price: number }) => (
  <div className="mb-5">
    <p className="text-md text-gray-800 mt-0 kbd">
      <span className="font-semibold text-2xl">{
        new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'CFA' }).format( price) }&nbsp;
      </span>
      <span className="font-12px">/jr</span>
    </p>
  </div>
)

export default Form