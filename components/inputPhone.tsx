import { useState, useEffect } from 'react'
import { useCountries } from "use-react-countries";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";


export function InputPhone() {
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const { name, flags, countryCallingCode } = countries[country];

   function sortCountries(countries:any) {
  // Tri par nom
    countries.sort((a:any, b:any) => a.name.localeCompare(b.name));
    const coteDIvoire = {
      name: "Cote d'ivoire",
      flags: { "png": "https://flagcdn.com/w320/ci.png", "svg": "https://flagcdn.com/ci.svg"},
      countryCallingCode: "+225"
    };
    countries.unshift(coteDIvoire); // Place Côte d'Ivoire en haut de la liste

    return countries;
  }


  useEffect(() => {
    sortCountries(countries)
  }, [countries])

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem]">
          {countries.map(({ name, flags, countryCallingCode }, index) => {
            return (
              <MenuItem
                key={name}
                value={name}
                className="flex items-center gap-2"
                onClick={() => setCountry(index)}
              >
                <img
                  src={flags.svg}
                  alt={name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {name} <span className="ml-auto">{countryCallingCode}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder="Numero tél"
        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
      />
    </div>
  );
}
