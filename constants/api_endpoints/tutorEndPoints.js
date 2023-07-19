export const TUTOR_END_POINT = {
    create: () => `/tutor`,
    get: (page, limit,search=null,status) => `/tutor?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    dropdown: (page, limit,search=null,status=true) => `/tutor?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/tutor/${id}`,
    update: (id) => `/tutor/${id}`,
    delete:(id) => `/tutor/${id}`,
}