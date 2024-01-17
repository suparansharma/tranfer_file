import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CATEGORIE_END_POINT, CITY_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '@/constants';
import { mapArrayToDropdown } from '@/helpers/common_Helper';
import ToggleSwitch from '@/components/elements/toggleSwitch';
import { get, post, put } from '@/helpers/api_helper';
import AnimatedMulti from '@/components/elements/AnimatedMulti';
import ToastMessage from '@/components/Toast';

const JobCreationForm = () => {

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const router = useRouter();
    const { data } = router.query;
    const [guardian, setGuardian] = useState([]);
    const [category, setCategory] = useState([]);
    const [isTrue, setIsTrue] = useState(false);
    const [isApproval, setIsApproval] = useState(false);
    const [newGuardian, setNewGuardian] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [city, setCity] = useState([]);
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [numOfStudent, setNumOfStudent] = useState(null);


    const [jobCreation, setJobCreation] = useState({
        guardian: '',
        category: '',
        noOfStudent: null,
        subject: [],
        class: [],
        city: '',
        location: '',
        address: '',
        studentGender: '',
        teacherGender: '',
        daysPerWeek: '',
        preferenceInstitute: '',
        salaryType: '',
        salary: '',
        phone: '',
        isApproval: '',
        tuitionType: '',
        // curriculum: '',
        hireDate: '',
        tutoringTime: '',
        status: '',
        // jobStatus: 'PENDING',

    });





    // if (data === null) {
    //     // Handle null data, e.g., provide default values or log a message
    //     console.error("Received null data");
    // } else {
    //     // Parse the JSON data
    //     try {
    //         const parsedData = JSON.parse(data);
    //         // Continue processing the parsed data
    //         console.log("data", parsedData);
    //     } catch (error) {
    //         console.error("Error parsing JSON data:", error);
    //     }
    // }


    const [editData, setEditData] = useState(false);
    console.log("editData", editData);
    useEffect(() => {
        if (data === null) {
            // Handle null data, e.g., provide default values or log a message
            console.error("Received null data");
            setEditData(false)

        } else {
            // Parse the JSON data
            try {
                const parsedData = JSON.parse(data);
                // Continue processing the parsed data
                setEditData(true)
                // Set the editData state with the parsed data
                // setEditData(parsedData);
                setJobCreation({
                    guardian: parsedData?.guardian?._id,
                    category: parsedData?.category?._id,
                    noOfStudent: parsedData?.noOfStudent,
                    subject: parsedData?.subject?.map((t) => t.subjectId)?.map((t) => t?._id),
                    class: parsedData?.class?.map((t) => t.classId)?.map((t) => t?._id),
                    studentGender: parsedData?.studentGender,
                    teacherGender: parsedData?.teacherGender,
                    city: parsedData.city?._id,
                    location: parsedData?.location?._id,
                    address: parsedData?.address,
                    daysPerWeek: parsedData?.daysPerWeek,
                    preferenceInstitute: parsedData?.preferenceInstitute,
                    salaryType: parsedData?.salaryType,
                    salary: parsedData?.salary,
                    phone: parsedData?.phone,
                    isApproval: parsedData?.isApproval,
                    tuitionType: parsedData.tuitionType,
                    hireDate: parsedData.hireDate,
                    tutoringTime: parsedData.tutoringTime,
                    status: parsedData.status,
                });


            } catch (error) {
                console.error("Error parsing JSON data:", error);
            }
        }
    }, [data]);
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





    /**fetch class   End */
    const handleCategory = async (value) => {
        try {
            const fetchCategory = await get(CATEGORIE_END_POINT.info(value));

            setCode(fetchCategory?.data?.code);

            const classInfo = fetchCategory?.data?.class.map((item) => ({
                _id: item?.classId?._id,
                name: item?.classId?.name,
            }));

            const CLASSDROPDOWN = classInfo.map((item) => ({
                id: item?._id,
                value: item?.name,
            }));

            setClasses(CLASSDROPDOWN);
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    //   useEffect(() => {

    //     setClasses([]);
    //   }, [code]);
    /**fetch class list  End */





    /**fetch subject list */
    const {
        data: subjectList,
        refetch: fetchSubjectList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_SUBJECT_LIST,
        SUBJECT_END_POINT.get(1, -1, '', status)
    );

    /**subject dropdown */
    useEffect(() => {
        const SUBJECTDROPDOWN = mapArrayToDropdown(
            subjectList?.data,
            'name',
            '_id'
        );

        const allSubj = SUBJECTDROPDOWN?.map((item) => ({
            id: item?._id,
            value: item?.name,
        }));
        setSubjects(allSubj);
    }, [subjectList]);


    /**fetch subject list  End */





    /** Fetch city */
    const {
        data: cityList,
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

    /** end city dropdown */




    /**fetch location list */

    const handleLocation = async (cityId) => {
        try {
            // Fetch location data based on cityId
            const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(cityId));
            const LOCATIONDROPDOWN = mapArrayToDropdown(
                fetchLocation?.data,
                'name',
                '_id'
            );

            // Update the state with the new location data
            setLocation(LOCATIONDROPDOWN);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    /**fetch location list  End */



    const handleNewGuardian = async (value) => {
        // Do any other logic you need here
        setNewGuardian(value);
    };



    const handleChange = (e, selectedOptions) => {
        const { name, value } = e.target;

        if (name === 'status' || name === 'isApproval' && e.target.type === 'select-one') {
            // Handle select input
            setJobCreation((prev) => ({
                ...prev,
                [name]: value === 'true' || value === true, // Convert the value to boolean
            }));
        }
        else if (name === 'guardian' || name === 'phone' || name === 'tuitionType' || name === 'city' || name === 'location' || name === 'studentGender' || name === 'teacherGender' || name === 'noOfStudent' ||
            name === 'daysPerWeek' || name === 'preferenceInstitute' || name === 'hireDate' || name === 'tutoringTime' || name === 'salaryType' || name === 'salary' || name === 'jobStatus' || name === 'address' || name === 'category') {
            // Convert value to integer for 'noOfStudent' and 'daysPerWeek' fields
            setJobCreation((prev) => ({
                ...prev,
                [name]: name === 'noOfStudent' || name === 'daysPerWeek' ? parseInt(value, 10) : value,
            }));
        } else if (name === 'class') {
            const classId = selectedOptions.map((option) => option.value);

            setJobCreation((prev) => ({
                ...prev,
                class: classId,
            }));
        } else if (name === 'subject') {
            const subjectId = selectedOptions.map((option) => option.value);

            setJobCreation((prev) => ({
                ...prev,
                subject: subjectId,
            }));
        }
    }



    const handleStudentNumberChange = (e) => {
        const value = e.target.value;
        setNumOfStudent(value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const subjects = jobCreation.subject?.map((subjectId) => ({
            subjectId: subjectId,
        }));
        jobCreation.subject = subjects;

        const classes = jobCreation.class?.map((classId) => ({
            classId: jobCreation?._id ? classId.value : classId,
        }));
        jobCreation.class = classes;

        try {
            if (jobCreation?._id) {
                const update = await put(JOB_REQUEST_END_POINT.update(jobCreation?._id), jobCreation);
                if (update.status === 'SUCCESS') {
                    notify('success', update.message);
                    router.push('/job_creation');
                } else {
                    notify('error', update.errorMessage);
                    setLoading(false);
                }
            } else {
                const response = await post(JOB_REQUEST_END_POINT.create(), jobCreation);
                if (response.status === 'SUCCESS') {
                    notify('success', response.message);
                    router.push('/job_creation');
                } else {
                    notify('error', response.errorMessage);
                    setLoading(false);
                }
            }
            setLoading(false);
        } catch (error) {
            notify('error', error.message);
            setLoading(false);
        }
    };



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


                                    <ToggleSwitch
                                        value={isTrue}
                                        setValue={setIsTrue}
                                        onChange={handleNewGuardian}
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        label="New Guardian"
                                    />
                                </div>
                            </div>

                            <div className="p-7">
                                <form  >

                                    {
                                        newGuardian ? (
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
                                                        placeholder="Enter the name"
                                                        defaultValue={jobCreation?.full_name}

                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>


                                        ) : (

                                            <div className="mb-5.5">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="guardian"
                                                >
                                                    Guardian
                                                </label>
                                                <div className="relative">

                                                    <select
                                                        name='guardian'
                                                        id="guardian"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                        onChange={handleChange}
                                                        value={jobCreation?.guardian}
                                                    >
                                                        <option value="" disabled>
                                                            Choose a Guardian
                                                        </option>

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

                                        )
                                    }

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
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.phone}
                                            />
                                        </div>


                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="tuitionType"
                                            >
                                                Tuition Type
                                            </label>
                                            <select
                                                name='tuitionType'
                                                id="tuitionType"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={jobCreation?.tuitionType}
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
                                            </label>
                                            <div className="relative">
                                                <select
                                                    // onChange={(e) => handleCategory(e.target.value)}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        handleCategory(e.target.value);
                                                    }}
                                                    name='category'
                                                    id="status"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    value={jobCreation?.category}
                                                >
                                                    <option value="" disabled>
                                                        Choose a Category
                                                    </option>
                                                    {categoryList?.data &&
                                                        categoryList.data.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="noOfStudent"
                                            >
                                                Number of Students

                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                name="noOfStudent"
                                                id="noOfStudent"
                                                placeholder="Enter the number of students"
                                                defaultValue={jobCreation?.noOfStudent}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleStudentNumberChange(e);
                                                }}
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
                                            <AnimatedMulti
                                                options={classes}
                                                labelKey="value"
                                                valueKey="id"
                                                onChange={(selectedOptions) => handleChange({ target: { name: 'class' } }, selectedOptions)}
                                                selectedValues={jobCreation.class || []}  // Use jobCreation.class directly
                                            />
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Required Subject
                                            </label>
                                            <AnimatedMulti
                                                options={subjects}
                                                labelKey="value"
                                                valueKey="id"
                                                onChange={(selectedOptions) => handleChange({ target: { name: 'subject' } }, selectedOptions)}
                                                selectedValues={jobCreation?.subject || []} // Provide an empty array as a fallback
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">




                                        {code === 'MT' && (
                                            <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="nationality"
                                                >
                                                    curriculum
                                                </label>
                                                <select
                                                    name='curriculum'
                                                    id="status"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    value={jobCreation?.curriculum}

                                                >
                                                    <option selected="">Select a option</option>
                                                    <option value={"Ed-Excel"}> Ed-Excel </option>
                                                    <option value={"Cambridge"}>Cambridge</option>
                                                    <option value={"IB"}>IB</option>

                                                </select>
                                            </div>
                                        )}
                                        <div className="w-full sm:w-1/2">

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
                                                    name="city"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        handleLocation(e.target.value);
                                                    }}
                                                    value={jobCreation?.city}

                                                >
                                                    {city && (
                                                        <>
                                                            <option value="" disabled>
                                                                Choose a City                                                            </option>
                                                            {city.map((city) => (
                                                                <option key={city._id} value={city._id}>
                                                                    {city.name}
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
                                                htmlFor="fullName"
                                            >
                                                Location
                                            </label>

                                            <div className="relative">

                                                <select
                                                    name="location"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    // onChange={handleChange}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // handleLocation(e.target.value);
                                                    }}
                                                    value={jobCreation?.location}

                                                >
                                                    {location && (
                                                        <>
                                                            <option value="" disabled>
                                                                Choose a Location
                                                            </option>
                                                            {location.map((location) => (
                                                                <option key={location._id} value={location._id}>
                                                                    {location.name}
                                                                </option>
                                                            ))}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="address"
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
                                                name="address"
                                                id="bio"
                                                rows={3}
                                                placeholder="Write your address here"
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.address}

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
                                                        name="studentGender"
                                                        value="Male"
                                                        onChange={handleChange}
                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                        defaultChecked={jobCreation?.studentGender === "Male"}

                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="studentGender"
                                                        value="Female"
                                                        onChange={handleChange}
                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                        defaultChecked={jobCreation?.studentGender === "Female"}

                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>
                                                {numOfStudent > 1 &&
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="studentGender"
                                                            value="Both"
                                                            onChange={handleChange}
                                                            className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                            defaultChecked={jobCreation?.studentGender === "Both"}

                                                        />
                                                        <span className="ml-2">Both</span>
                                                    </label>}
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
                                                        name="teacherGender"
                                                        value="Male"
                                                        onChange={handleChange}
                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                        defaultChecked={jobCreation?.teacherGender === "Male"}

                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="teacherGender"
                                                        value="Female"
                                                        onChange={handleChange}
                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                        defaultChecked={jobCreation?.teacherGender === "Female"}
                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>

                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="teacherGender"
                                                        value="Any"
                                                        onChange={handleChange}
                                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                                                        defaultChecked={jobCreation?.teacherGender === "Any"}

                                                    />
                                                    <span className="ml-2">Any </span>
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
                                                    name="daysPerWeek"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={handleChange}
                                                    value={jobCreation?.daysPerWeek}

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value={1}>1 Day Per Week</option>
                                                    <option value={2}>2 Day Per Week</option>
                                                    <option value={3}>3 Day Per Week</option>
                                                    <option value={4}>4 Day Per Week</option>
                                                    <option value={5}>5 Day Per Week</option>
                                                    <option value={6}>6 Day Per Week</option>
                                                    <option value={7}>7 Day Per Week</option>
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
                                                name="preferenceInstitute"
                                                id="phoneNumber"
                                                placeholder="+990 3343 7865"
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.preferenceInstitute}

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
                                                name="hireDate"
                                                id="dob"
                                                placeholder="+990 3343 7865"
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.hireDate}

                                            />
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="tutoringTime"
                                            >
                                                Tutoring Time
                                            </label>
                                            <input
                                                className="w-full custom-input-time rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="time"
                                                name="tutoringTime"
                                                id="tutoringTime"
                                                placeholder="HH:mm"
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.tutoringTime}

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
                                                    name="salaryType"
                                                    id="countries"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={handleChange}
                                                    value={jobCreation?.salaryType}

                                                >
                                                    <option value>Choose a Id</option>
                                                    <option value="Fixed">Fixed</option>
                                                    <option value="Range">Range</option>
                                                    <option value="Negotiable">Negotiable</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="salary"
                                            >
                                                Salary (BDT)
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="salary"
                                                id="salary"
                                                placeholder="Enter the phone number"
                                                onChange={handleChange}
                                                defaultValue={jobCreation?.salary}

                                            />
                                        </div>


                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">




                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Status
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="status"
                                                    id="status"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={handleChange}
                                                    defaultValue={jobCreation?.status}

                                                >
                                                    <option value>Status</option>
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="w-full sm:w-1/2">
                                            <ToggleSwitch
                                                value={isTrue}
                                                setValue={setIsTrue}
                                                onChange={handleNewGuardian}
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                                label="Approval"
                                            />
                                        </div> */}

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="Approval"
                                            >
                                                Approval
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="isApproval"
                                                    id="isApproval"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={handleChange}
                                                    defaultValue={jobCreation?.isApproval}

                                                >
                                                    <option value>Select..</option>
                                                    <option value={true}>Active</option>
                                                    <option value={false}>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                                        <div className="w-full sm:w-1/2">
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
                                                    onChange={handleChange}
                                                // defaultValue={jobCreation?.address}


                                                ></textarea>
                                            </div>
                                        </div>

                                        {editData && <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="Approval"
                                            >
                                                Approval
                                            </label>
                                            <div className="relative">

                                                <select
                                                    name="jobStatus"
                                                    id="jobStatus"
                                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    onChange={handleChange}
                                                    value={jobCreation?.jobStatus}

                                                >
                                                    <option value>Select..</option>
                                                    <option value="ACTIVE">Active</option>
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="CANCELED">CANCELED</option>
                                                    <option value="CONFIRMED">CONFIRMED</option>
                                                </select>
                                            </div>
                                        </div>}
                                    </div>



                                    <div className="flex justify-end gap-4.5">

                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            // type="submit"
                                            onClick={handleSubmit}
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