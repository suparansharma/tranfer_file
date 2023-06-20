export const SUBJECT_END_POINT = {
    create: () => `/subject`,
    get: (page, limit,search=null) => `/subject?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/subject/${id}`,
    update: (id) => `/subject/${id}`,
    delete:(id) => `/subject/${id}`,
}   