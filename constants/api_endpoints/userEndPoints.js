export const USER_END_POINT = {
    create: () => `/user`,
    get: (page, limit,search=null) => `/user?page=${page}&limit=${limit}&search=${search}`,
    dropdown: (page, limit,search=null,status=true) => `/user?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/user/${id}`,
    update: (id) => `/user/${id}`,
    delete:(id) => `/user/${id}`,
    changePassword:()=>`/user/changepassword`,
}   