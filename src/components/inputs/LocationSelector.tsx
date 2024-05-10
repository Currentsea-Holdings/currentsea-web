import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Country, State } from 'country-state-city';
import type { ICountry, IState } from 'country-state-city';

interface LocationSelectorProps {
  initialCountry?: string;
  initialState?: string;
  initialCity?: string;
}

export const LocationSelector = ({
  initialCountry = 'US',
  initialState = '',
  initialCity = '',
}: LocationSelectorProps) => {
  const { register, setValue, watch } = useFormContext();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);

  const selectedCountry: string = watch('country', initialCountry);
  const selectedState = watch('state', initialState);

  // Load countries
  useEffect(() => {
    const fetchedCountries = Country.getAllCountries();
    setCountries(fetchedCountries);
    if (!initialCountry) {
      setValue('country', 'US');
    }
  }, [initialCountry, setValue]);

  // Load states based on the selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);

      if (!fetchedStates.some(state => state.isoCode === selectedState)) {
        setValue('state', '');
      }
    }
  }, [selectedCountry, selectedState, setValue]);

  return (
    <>
      <div>
        <label htmlFor="country" className="mb-2 block text-sm font-semibold text-gray-700">
          Country
        </label>
        <select
          id="country"
          {...register('country')}
          value={selectedCountry}
          className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
        >
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <label htmlFor="city" className="mb-2 block text-sm font-semibold text-gray-700">
            City
          </label>
          <input
            id="city"
            type="text"
            defaultValue={initialCity}
            {...register('city')}
            className="form-input mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
          />
        </div>

        <div className="w-1/3">
          <label htmlFor="state" className="mb-2 block text-sm font-semibold text-gray-700">
            State
          </label>
          <select
            id="state"
            {...register('state')}
            value={selectedState}
            className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
