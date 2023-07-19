export const JOB_REQUEST_END_POINT = {
    create: () => `/job`,
    // get: () => `/job`,
    get: (page, limit,search=null,status) => `/job?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    dropdown: (page, limit,search=null,status=true) => `/job?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/job/${id}`,
    update: (id) => `/job/${id}`,
    delete:(id) => `/job/${id}`,
    getTutorByJobId: (id) => `/job/requesttour/${id}`
}