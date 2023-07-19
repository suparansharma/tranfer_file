export const LOCATION_END_POINT = {
    create: () => `/location`,
    get: (page, limit,search=null,status) => `/location?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    // dropdown: (page, limit,search=null,status=true) => `/location?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/location/${id}`,
    update: (id) => `/location/${id}`,
    delete:(id) => `/location/${id}`,
    getLocationByCityId: (id) => `/location/city/${id}`
}