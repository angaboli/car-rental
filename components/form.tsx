import { createBooking } from "@/services";
import { useEffect, useState } from "react"

const Form = ({ car }: any) => {
    const [formValue, setFormValue] = useState({ location: '', pickUpDate: '', dropOffDate: '', pickUpTime: '', dropOffTime: '', contactNumber: '', carId: '' })

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
          <div className="flex flex-col w-full mb-5">
              <label className="text-gray-400">Lieu de récuperation</label>
              <select className="select bg-white select-bordered w-full max-w-lg" name="location" onChange={handleChange}>
                <option value="">Lieu de récuperation ?</option>
                <option>Agence Abijdan</option>
                <option>Agence Yamoussoukro</option>
              </select>
          </div>
          <div className="flex flex-col gap-5 mb-5">
              <div className="flex flex-col w-full">
                <label className="text-gray-400">Date de récuperation</label>
                <input type="date" placeholder="Type here" name="pickUpDate" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-gray-400">Date de retour</label>
                <input type="date" placeholder="Type here" name="dropOffDate" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
              </div>
          </div>
          <div className="flex gap-5 ">
              <div className="flex flex-col w-full mb-5">
                <label className="text-gray-400">Heure de récuperation</label>
                <input type="time" name="pickUpTime" placeholder="Type here" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
              </div>
              <div className="flex flex-col w-full mb-5">
                <label className="text-gray-400">Heure de retour</label>
                <input type="time" name="dropOffTime" placeholder="Type here" className="input input-bordered bg-white w-full max-w-lg" onChange={handleChange} />
              </div>
          </div>
          <div className="flex flex-col w-full mb-5">
            <label className="text-gray-400">Numero de tél</label>
            <input type="tel" placeholder="Votre numero de tél" name="contactNumber" className="input input-bordered w-full bg-white max-w-lg" onChange={handleChange} />
          </div>
          <div className="modal-action">
              <button className="btn bg-light-orange text-dark-gray">Fermer</button>
              <button className="group overflow-hidden btn_base py-1 px-3 rounded  items-center flex gap-2 bg-gradient-to-r from-cyan-700 to-cyan-500  text-light-gray hover:text-light-orange hover:bg-primary-black hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" onClick={handleSubmit}>
                <span className="z-40"> Enregistrer</span>
                {/* <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-70%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000" /> */}
              </button>
          </div>
      </div>
    )
}

export default Form