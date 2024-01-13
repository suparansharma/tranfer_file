import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CATEGORIE_END_POINT, GUARDIAN_END_POINT } from '@/constants';
import { mapArrayToDropdown } from '@/helpers/common_Helper';

const JobCreationForm = () => {

    const router = useRouter();




    const { data } = router.query;
    const [guardian, setGuardian] = useState([]);
    const [category, setCategory] = useState([]);


    if (data === null) {
        // Handle null data, e.g., provide default values or log a message
        console.error("Received null data");
    } else {
        // Parse the JSON data
        try {
            const parsedData = JSON.parse(data);
            // Continue processing the parsed data
            console.log("data", parsedData);
        } catch (error) {
            console.error("Error parsing JSON data:", error);
        }
    }





    /** Fetch Guardian List */
    const {
        data: guardianList,
        isLoading,
        refetch: fetchGuardianList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_GUARDIAN_LIST, GUARDIAN_END_POINT.get(1, -1, '', true));


    /**guarian dropdown */
    useEffect(() => {
        const GUARDIANDROPDOWN = mapArrayToDropdown(
            guardianList?.data?.data,
            'fullName',
            '_id'
        );
        setGuardian(GUARDIANDROPDOWN);
    }, [guardianList]);
    /** Fetch Guardian List End */


    /** Fetch category List */

    const {
        data: categoryList,
        refetch: fetchTotalCategory,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_CATEGORY_LIST,
        CATEGORIE_END_POINT.get(1, -1, '', true)
    );
console.log("categoryList",categoryList);

    /**category dropdown */
    useEffect(() => {
        const CATEGORYDROPDOWN = mapArrayToDropdown(
            categoryList?.data,
            'name',
            '_id'
        );
        setCategory(CATEGORYDROPDOWN);
    }, [categoryList]);



    /** Fetch CategoryList List End */



    return (
        <>
            <div className="mx-auto max-w-250">

                <div className="grid grid-cols-6 gap-8">

                    {/* Guardian Information start */}
                    <div className="col-span-6 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Information of Personal
                                </h3>
                                <div className="flex justify-end">
                                    <label className="relative inline-flex items-center me-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultValue=""
                                            className="sr-only peer"
                                            defaultChecked=""
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-green-500 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Green
                                        </span>
                                    </label>


                                </div>
                            </div>

                            <div className="p-7">
                                <form  >


                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="full_name"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                </svg>
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                placeholder="Devid Jhon"

                                            />
                                        </div>
                                    </div>


                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="full_name"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">

                                            <select
                                                name='status'
                                                id="status"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                            >
                                                <option value="" disabled>
                                                    Choose a Guardian
                                                </option>
                                                {/* {guardian.map((guardian) => (
                                                <option key={guardian.id} value={guardian._id}>
                                                    {guardian.fullName}
                                                </option>
                                            ))} */}

                                                {guardianList?.data?.data && (
                                                    <>
                                                        <option value="" disabled>
                                                            Choose a Guardian
                                                        </option>
                                                        {guardianList.data.data.map((guardian) => (
                                                            <option key={guardian._id} value={guardian._id}>
                                                                {guardian.fullName}
                                                            </option>
                                                        ))}
                                                    </>
                                                )}


                                            </select>
                                        </div>
                                    </div>


                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="dob"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder="Enter the phone number"

                                            />
                                        </div>


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nationality"
                                            >
                                                Tuition Type
                                            </label>
                                            <select
                                                name='tuitionType'
                                                id="status"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                            >
                                                <option selected="">Select a option</option>
                                                <option value={"Home Tutoring"}> Home Tutoring </option>
                                                <option value={"Online Tutoring"}>Online Tutoring</option>
                                                <option value={"Group Tutoring"}>Group Tutoring</option>
                                                <option value={"Package Tutoring"}>Package Tutoring</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="emailAddress"
                                            >
                                                Category
                                                {/* categoryList */}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name='status'
                                                    id="status"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    {categoryList?.data && (
                                                    <>
                                                        <option value="" disabled>
                                                            Choose a Guardian
                                                        </option>
                                                        {categoryList.data.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </>
                                                )}


                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="phoneNumber"
                                            >
                                                Number of Students

                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                placeholder="Devid Jhon"

                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Class/Course
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Required Subject
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                City
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Location
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="Username"
                                        >
                                            Address
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_88_10224">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>

                                            <textarea
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                name="about"
                                                id="bio"
                                                rows={3}
                                                placeholder="Write your bio here"

                                            ></textarea>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Guardian Information end */}


                    {/* Tutor Information start */}
                    <div className="col-span-6 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Information of Condition
                                </h3>
                            </div>
                            <div className="p-7">
                                <form  >


                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nationality"
                                            >
                                                Student Gender
                                            </label>
                                            <div className="flex space-x-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"

                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="other"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                    />
                                                    <span className="ml-2">Other</span>
                                                </label>
                                            </div>
                                        </div>


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nationality"
                                            >
                                                Tutor Gender
                                            </label>
                                            <div className="flex space-x-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"

                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="other"

                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                    />
                                                    <span className="ml-2">Other</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="emailAddress"
                                            >
                                                Days / Week
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="phoneNumber"
                                            >
                                                Preference Institute
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="mobile_number"
                                                id="phoneNumber"
                                                placeholder="+990 3343 7865"

                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nationality"

                                            >
                                                Hire Date
                                            </label>
                                            <input
                                                className="w-full custom-input-date custom-input-date-1 rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                placeholder="+990 3343 7865"

                                            />
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nationality"

                                            >
                                                Tutoring Time
                                            </label>
                                            <input
                                                className="w-full custom-input-date custom-input-date-1 rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                placeholder="+990 3343 7865"

                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Salary Type
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Status
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="id_type"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="nid">Nid</option>
                                                    <option value="passport">Passport</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>




                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="Username"
                                        >
                                            More Requirement
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_88_10224">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>

                                            <textarea
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                name="about"
                                                id="bio"
                                                rows={3}
                                                placeholder="Write your bio here"

                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        {/* <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="submit"
                                >
                                    Cancel
                                </button> */}
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            type="submit"
                                        // onClick={() => { handleSubmit() }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* Tutor Information end */}
                </div>
            </div>
        </>
    )
}

export default JobCreationForm