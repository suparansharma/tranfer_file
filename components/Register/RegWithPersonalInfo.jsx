import { http_get_request } from "@/helpers/http_requests";
import React, { useEffect, useState } from "react";

const RegWithPersonalInfo = ({ profile, setProfile, submitProfile }) => {


  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [countrylist, setCountryList] = useState([]);
  const [statelist, setStateList] = useState([]);
  const [citylist, setCityList] = useState([]);
  const [country_id, setCountryId] = useState(null);
  const [state_id, setStateId] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'country_code') {
      const selectedCountry = countrylist.find((country) => country.code === value);
      setCountryId(selectedCountry ? selectedCountry.id : null);
    }
  
    if (name === 'state' || name === 'city') {
      setStateId(parseInt(value, 10)); // Convert to integer using parseInt
    }
  
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'state' || name === 'city' ? parseInt(value, 10) : value,
    }));
  };
  
  


  const getAllCountries = async () => {
    try {
      setLoading(true);

      const authRes = await http_get_request({ endpoint: '/geo/v1/getCountryList' });
      setCountryList(authRes?.results || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }


  };



  useEffect(() => {
    getAllCountries();

  }, []);





  useEffect(() => {

    const controller = new AbortController();
    const getAllStateList = async () => {
      try {
        setLoading(true);

        const authRes = await http_get_request({ endpoint: `/geo/v1/getStateList?country_id=${country_id}` });
        setStateList(authRes?.results || []);
        // setCountryList(authRes?.results || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    getAllStateList();
    return () => controller.abort();
  }, [profile?.country_code])


  useEffect(() => {

    const controller = new AbortController();
    const getAllCityList = async () => {
      try {
        setLoading(true);

        const authRes = await http_get_request({ endpoint: `/geo/v1/getCityList?state_id=${state_id}` });
        setCityList(authRes?.results || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    getAllCityList();
    return () => controller.abort();
  }, [profile?.state])




  return (
    <div >

      <div className="grid grid-cols-2 gap-5 ">

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Mobile Number
          </label>
          <div className="relative">
            <input
              name='mobile_number'
              type="text"
              placeholder="Enter your mobile number"
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleChange}
            />
          </div>
        </div>



        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile?.gender === 'male'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"

              />
              <span className="ml-2">Male</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile?.gender === 'female'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
              />
              <span className="ml-2">Female</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={profile?.gender === 'other'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
        </div>



      </div>


      <div className="grid grid-cols-2 gap-5 ">

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Id Type
          </label>
          <div className="relative">
            <select
              name="id_type"
              id="countries" className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleChange}
            >
              <option selected>Choose a Id Type</option>
              <option value="nid">Nid</option>
              <option value="passport">Passport</option>
            </select>

          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Enter Id Number
          </label>
          <div className="relative">
            <input
              name='nid'
              type="text"
              placeholder="Enter your Id Number"
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleChange}
            />
          </div>
        </div>



      </div>


      <div className="grid grid-cols-2 gap-5 ">

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Nationality
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              name='nationality'
              type="text"
              placeholder="Enter your reference"
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              name='password'
              type="text"
              placeholder="Enter your Password"
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={handleChange}
            />
          </div>
        </div>
       

      </div>

      <div className="grid grid-cols-2 gap-5 ">
      <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Country
          </label>
          <div className="relative">
            <select
              name="country_code"
              id="countries"
              value={profile?.country_code}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="" disabled>
                Choose a country
              </option>
              {countrylist.map((country) => (
                <option key={country.id} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            State
          </label>
          <div className="relative">
            <select
              name="state"
              value={profile?.state}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="" disabled>
                Choose a state
              </option>
              {statelist.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-5 ">






        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            City
          </label>
          <div className="relative">
            <select
              name="city"
              value={profile?.city}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="" disabled>
                Choose a city
              </option>
              {citylist.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Zip Code
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              name='zip_code'
              type="text"
              placeholder="Enter your zip code  "
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

      </div>




      <div className="grid grid-cols-1 gap-5 ">




        <div className="mb-4">
          <label className="mb-1.5 block font-medium text-black dark:text-white">
            Address
          </label>
          <div className="relative">
            <textarea
              onChange={handleChange}
              name='address'
              placeholder="Enter your reference"
              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-6 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>
        </div>


      </div>





      <div className="mb-5">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
          onClick={submitProfile}
        >
          Submit
        </button>
      </div>




    </div>
  );
};

export default RegWithPersonalInfo;
