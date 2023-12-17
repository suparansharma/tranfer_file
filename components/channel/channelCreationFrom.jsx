import { http_get_request } from '@/helpers/http_requests';
import React, { useEffect, useState } from 'react';

const ChannelCreationFrom = ({ toggleModal, isModalOpen, setIsModalOpen, handleSubmit, channelProfile, setChannelProfile }) => {

    const [countrylist, setCountryList] = useState([]);
    const [loading, setLoading] = useState(true);



    console.log("channelProfile",channelProfile);

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

    const handleChange = (e) => {
        setChannelProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };




    return (
        <>

            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 overflow-y-auto z-50 bg-black bg-opacity-50 flex items-center justify-center"
                >
                    <div className="relative p-4 w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        {/* Modal content */}
                        <div className="relative border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-black dark:text-white">
                                    Create New Channel
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
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
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}


                            <form onsubmit="{handleSubmit}" className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Channel Name
                                        </label>
                                        <input
                                            type="text"
                                            name="channel_name"
                                            id="name"
                                            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Company Name"
                                            required=""
                                            value={channelProfile?.channel_name}
                                            onChange={handleChange}
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
                                            name="contact_number"
                                            id="name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="..."
                                            required=""
                                            value={channelProfile?.contact_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Business Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="your@example.com"
                                            required=""
                                            value={channelProfile?.email}
                                            onChange={handleChange}
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
                                            id="country_code"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='country_code'
                                            value={channelProfile?.country_code}
                                            onChange={handleChange}
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
                                            htmlFor="service_type"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Service type
                                        </label>
                                        <select
                                            id="service_type"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            name='service_type'

                                            value={channelProfile?.service_type}
                                            onChange={handleChange}
                                        >
                                            <option selected="">Service Type</option>
                                            <option value="web">Web</option>
                                            <option value="app">App</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-black dark:text-white"
                                        >
                                            Service Address
                                        </label>
                                        <input
                                            name='service_address'
                                            id="service_address"
                                            value={channelProfile?.service_address}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent rounded-lg p-2.5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="https//:example.com"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>





                                <button
                                    className="block ml-auto rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Create
                                </button>


                            </form>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChannelCreationFrom;
