import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get } from '../../helpers/api_helper';

//export async 

export const useGetAllData =  (queryKey , url) => {
    const queryClient = useQueryClient();
    const fetchData = (url) => {
        return get(url);
    }
    return useQuery({
        queryKey: [queryKey , url],
        queryFn: ()=> fetchData(url),
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        initialData: ()=> {
            const list = queryClient.getQueriesData(queryKey)?.data;
            if(list)
            {
                return {
                    data : list
                }
            }else{
                return undefined;
            }
        }
    } );
}