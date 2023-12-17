import { http_get_request } from '@/helpers/http_requests';
import { useEffect, useState } from "react";

const UpdateProfile = ({ handleSubmit, profile, setProfile }) => {

    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(true);
    const [countrylist, setCountryList] = useState([]);
    const [statelist, setStateList] = useState([]);
    const [citylist, setCityList] = useState([]);
    const [country_id, setCountryId] = useState(profile?.country?.id !== null ? profile?.country?.id : null);
    const [state_id, setStateId] = useState(profile?.state?.id !== null ? profile?.state?.id : null);
    const [city_id, setCityId] = useState(profile?.city?.id !== null ? profile?.city?.id : null);



    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        console.log("click", profile);
        setIsModalOpen(!isModalOpen);

        getAllCountries();
        getAllStateList();


    };


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


    useEffect(() => {
        console.log('init call call', profile)
        // getAllCountries();
        // getAllStateList();
    }, []);


    const getAllCountries = async () => {
        try {
            setLoading(true);
            console.log('country call')
            const authRes = await http_get_request({ endpoint: '/geo/v1/getCountryList' });
            setCountryList(authRes?.results || []);
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Handle error if needed
        } finally {
            setLoading(false);
        }


    };


    const getAllStateList = async () => {
        try {
            setLoading(true);

            const authRes = await http_get_request({ endpoint: `/geo/v1/getStateList?country_id=${country_id}` });
            setStateList(authRes?.results || []);
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Handle error if needed
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getAllStateList();
        return () => controller.abort();
    }, [country_id])

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
    }, [state_id])//profile?.state


    return (
        <>
            {isModalOpen ? (
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 overflow-y-auto z-999 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="relative p-4 w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  ">
                        {/* Modal content */}
                        <div className="relative border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    Update {profile?.full_name} Profile
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3 text-black dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only text-black dark:text-white">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}


                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            id="name"
                                            className="w-full rounded text-black dark:text-white border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Update your name"
                                            required=""
                                            defaultValue={profile?.full_name}
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="nationality"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Nationality
                                        </label>
                                        <input
                                            name='nationality'
                                            type="text"
                                            placeholder="Enter your Id Number"
                                            className="w-full rounded-lg border text-black dark:text-white border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={handleChange}
                                            defaultValue={profile?.nationality}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            DOB
                                        </label>

                                        <input
                                            type="date"
                                            name='dob'
                                            onChange={handleChange}
                                            defaultValue={profile?.dob}
                                            className="custom-input-date text-black dark:text-white custom-input-date-1 w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />



                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Id Type
                                        </label>
                                        <select
                                            name="id_type"
                                            id="countries" className="w-full text-black dark:text-white rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={handleChange}
                                            defaultValue={profile?.id_type}
                                        >
                                            <option value>Choose a Id</option>
                                            <option value="nid">Nid</option>
                                            <option value="passport">Passport</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Enter Id Number
                                        </label>
                                        <input
                                            name='nid'
                                            type="text"
                                            placeholder="Enter your Id Number"
                                            className="w-full rounded-lg border text-black dark:text-white border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={handleChange}
                                            defaultValue={profile?.nid}
                                        />

                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="contact_number"
                                            className="block mb-2 text-sm text-black dark:text-white"
                                        >
                                            Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile_number"
                                            id="name"
                                            className="w-full rounded border-[1.5px] text-black dark:text-white border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="..."
                                            required=""
                                            onChange={handleChange}
                                            defaultValue={profile?.mobile_number}

                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="name"
                                            className="w-full rounded border-[1.5px] text-black dark:text-white border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="your@example.com"
                                            required=""
                                            onChange={handleChange}
                                            defaultValue={profile?.email}

                                        />
                                    </div>


                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Country
                                        </label>
                                        <select
                                            name="country_code"
                                            id="countries"
                                            defaultValue={profile?.country?.code}
                                            onChange={handleChange}
                                            className="w-full text-black dark:text-white rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="state"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            State
                                        </label>
                                        <select
                                            name="state"
                                            defaultValue={profile?.state?.id || ''} // Use profile?.state?.id as the value
                                            onChange={handleChange}
                                            className="w-full rounded-lg border text-black dark:text-white border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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





                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            City
                                        </label>
                                        <select
                                            name="city"
                                            defaultValue={profile?.city?.id}
                                            onChange={handleChange}
                                            className="w-full text-black dark:text-white rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="country_code"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            id="name"
                                            className="w-full text-black dark:text-white  border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            // placeholder="your@example.com"
                                            required=""
                                            onChange={handleChange}
                                            defaultValue={profile?.zip_code}

                                        />
                                    </div>







                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Service Address
                                        </label>
                                        <input
                                            name='address'
                                            id="address"

                                            rows={4}
                                            className="w-full text-black dark:text-white rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            onChange={handleChange}
                                            defaultValue={profile?.address}
                                        />
                                    </div>
                                </div>





                                <button
                                    className="block ml-auto rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                    type="submit"
                                    onClick={() => { handleSubmit(); setIsModalOpen(false); }}
                                >
                                    Update
                                </button>


                            </form>

                        </div>
                    </div>
                </div>) : <span onClick={toggleModal}>Edit Me</span>}
        </>
    )
}

export default UpdateProfile