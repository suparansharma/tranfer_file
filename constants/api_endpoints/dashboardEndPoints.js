export const DASHBOARD_END_POINT = {
    dashbord: (status,) => `/job/dashboard?status=${status}&sortBy=updatedAt&orderBy=desc`,
    jobDetails: (id) => `/job/dashboard/${id}`
}