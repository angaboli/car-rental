"use client";
import { useEffect, useState } from "react";

const CarsFiltersOption = ({carsList, setCat, setType, orderCarList, resetFilters}:any) => {
  const [ categoryList, setCategoryList ] = useState<any>([]);
  const [ transmissionList, setTransmissionList ] = useState<any>([]);
  //const catSet = new Set();
  //const gearboxSet = new Set();

  /* useEffect(() => {
    if(carsList) filterCarList();
  }, [carsList]) */

  useEffect(() => {
    const catSet = new Set();
    const gearboxSet = new Set();

    carsList.forEach((item: any) => {
      catSet.add(item.carCategory);
      gearboxSet.add(item.carType);
    });

    setCategoryList(Array.from(catSet));
    setTransmissionList(Array.from(gearboxSet));
  }, [carsList]);

  return (
    <div className="shadow-3xl border-t border-light-gray bg-white">
      <div className="wrapper flex md:items-center py-3 justify-between">
        <div className="items-start">
          <h2 className="text-xl md:text-3xl text-choco font-bold">Nos voitures</h2>
          <p className="text-dark-gray">Choisissez votre Voitures</p>
        </div>
        <div className="flex flex-col md:flex-row text-center">
          <select onChange={e => setCat(e.target.value)} value="" className="select text-xs appearance-none h-full rounded-l border block w-full bg-white border-light-gray text-dark-gray leading-tight focus:outline-none focus:bg-light-gray focus:border-blue-green">
            <option disabled value="">Catégorie</option>
            {categoryList && categoryList.map(( cat: string, index: number) => (
              <option key={index} value={cat} >{cat}</option>
            ))}
          </select>
          {/* <select onChange={e => setType(e.target.value)} value="" className="select text-xs appearance-none h-full rounded-l border block w-full bg-white border-light-gray text-dark-gray py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-light-gray focus:border-blue-green">
            <option disabled value="">Transmission</option>
            {transmissionList && transmissionList.map(( trans: string, index: number) => (
              <option key={index} value={trans} >{trans}</option>
            ))}
          </select>
          <select onChange={e => orderCarList(e.target.value)} value="" className="select text-xs appearance-none h-full rounded-l border block w-full bg-white border-light-gray text-dark-gray py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-light-gray focus:border-blue-green">
            <option disabled value="">Prix</option>
            <option value={-1}>Min à Max</option>
            <option value={1}>Max à Min</option>
          </select> */}
          <button onClick={resetFilters} className="px-3  bg-light-gray text-dark-gray rounded">Réinitialiser</button>
        </div>
      </div>
    </div>
  )
}

export default CarsFiltersOption