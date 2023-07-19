export const GUARDIAN_END_POINT = {
    create: () => `/guardian`,
    dropdown : (page, limit,search=null,status=true) => `/guardian?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    get: (page, limit,search=null,status) => `/guardian?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/guardian/${id}`,
    update: (id) => `/guardian/${id}`,
    delete:(id) => `/guardian/${id}`,
}