export const SUBJECT_END_POINT = {
    create: () => `/subject`,
    get: (page, limit,search=null,status) => `/subject?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    dropdown : (page, limit,search=null,status=true) => `/subject?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/subject/${id}`,
    update: (id) => `/subject/${id}`,
    delete:(id) => `/subject/${id}`,
}   