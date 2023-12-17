
import { SUBJECT_END_POINT } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import React, { useEffect, useState } from 'react'

const Subjects = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const {
        data: subjectList,
        isLoading,
        refetch: fetchSubjectList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, SUBJECT_END_POINT.get(page, limit, search, ""));

    console.log("subjectList", subjectList);


    return (
        <div className="flex flex-col gap-10">

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Subjects
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Subjects