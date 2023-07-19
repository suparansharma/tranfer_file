export const CLASS_END_POINT = {
    create: () => `/class`,
    //  get: (page, limit,search=null,status=true) => `/class?page=${page}&limit=${limit}&search=${search}&status=${status}`,
     get: (page, limit,search=null,status) => `/class?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/class/${id}`,
    update: (id) => `/class/${id}`,
    delete:(id) => `/class/${id}`,
}