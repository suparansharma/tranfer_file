import ToastMessage from '@/components/Toast';
import AnimatedMulti from '@/components/elements/AnimatedMulti';
import { LOCATION_END_POINT, CITY_END_POINT } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { post, put } from '@/helpers/api_helper';
import { mapArrayToDropdown } from '@/helpers/common_Helper';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';

const LocationForm = ({ isOpen, onClose, setEditData, isParentRender }) => {
    
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationInfo, setLocationInfo] = useState({
        name: '',
        city: '',
        status: ''
    });




    /**fetch city list */

    const {
        data: cityList,
        isLoading,
        refetch: fetchCityList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CITY_LIST,
        CITY_END_POINT.get(1, -1, '', true)
    );

    /**city dropdown */
    useEffect(() => {
        const CITYDROPDOWN = mapArrayToDropdown(
            cityList?.data,
            'name',
            '_id'
        );
        setCity(CITYDROPDOWN);
    }, [cityList]);


    /**fetch city list  End */



    useEffect(() => {
        if (setEditData === null) {
            setLocationInfo({ name: '', status: '',city:'' });
        } else {
            setLocationInfo({
                name: setEditData.name || '',
                status: setEditData.status || '',
                city: setEditData?.city?._id,
            });

        }
    }, [setEditData?._id, setEditData]);




    const handleChange = (e, selectedOptions) => {
        const { name, value } = e.target;
        setLocationInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setLoading(true);
        if (setEditData?._id) {
          try {
            const update = await put(LOCATION_END_POINT.update(setEditData._id), locationInfo);
            if (update.status == 'SUCCESS') {
              notify('success', update.message);
              if (isParentRender) {
                isParentRender(true);
              }
              onClose();
            }
          } catch (error) {
            notify('error', update.errorMessage);
            setLoading(false);
          }
        } else {
          try {
            const response = await post(LOCATION_END_POINT.create(), locationInfo);
            if (response.status === 'SUCCESS') {
              notify('success', response.message);
              if (isParentRender) {
                isParentRender(true);
              }
              onClose();
            } else {
              notify('error', response.errorMessage);
              setLoading(false);
            }
          } catch (error) {
            console.log(error)
            notify('error', error.message);
            setLoading(false);
          }
    
          // setLoading(false);
    
        }
    
        onClose();
        setLoading(false);
      };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full">
                            {/* Modal content */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {setEditData?._id ? "Update Class" : "Create New Class"}
                                </h3>
                                <button
                                    onClick={() => {
                                        onClose();
                                        setLocationInfo({});
                                    }}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="crud-modal"
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
                            {/* Your modal content goes here */}
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="Type class name"
                                            required=""
                                            defaultValue={locationInfo?.name}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <div className="col-span-2">
                                        <label
                                            htmlFor="city"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            City
                                        </label>
                                        <select
                                            name="city"
                                            id="city"
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            value={locationInfo?.city}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Choose a city
                                            </option>
                                            {city.map((city) => (
                                                <option key={city.id} value={city._id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Status
                                        </label>
                                        <select
                                            name='status'
                                            id="status"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            onChange={handleChange}
                                            value={locationInfo?.status}
                                        >
                                            <option selected="">Select category</option>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>

                                        </select>
                                    </div>



                                </div>
                                <div className="ml-auto">
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {setEditData?._id ? "Update Class" : "Create New Class"}

                                        {/* Add new Subject */}
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LocationForm