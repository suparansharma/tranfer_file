export const CITY_END_POINT = {
    create: () => `/city`,
    // get: (page, limit,search=null) => `/city?page=${page}&limit=${limit}&search=${search}`,
    // dropdown : (page, limit,search=null,status=true) => `/city?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    get : (page, limit,search=null,status) => `/city?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/city/${id}`,
    update: (id) => `/city/${id}`,
    delete:(id) => `/city/${id}`,
}