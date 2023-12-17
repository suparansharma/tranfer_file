export const DASHBOARD_END_POINT = {
    // dashbord: (status,) => `/job/dashboard?status=${status}&sortBy=updatedAt&orderBy=desc`,
    dashbord: (status,limit,page,fromDate='',toDate='',tuitionType='',city='',location='',category='',Class='',subject='',studentGender='',teacherGender='') => `/job/dashboard?status=${status}&sortBy=updatedAt&orderBy=desc&limit=${limit}&page=${page}&fromDate=${fromDate}&toDate=${toDate}&tuitionType=${tuitionType}&city=${city}&location=${location}&category=${category}&class=${Class}&subject=${subject}&studentGender=${studentGender}&teacherGender=${teacherGender}`,
    // get: (page, limit,search=null,status) => `/class?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    jobDetails: (id) => `/job/dashboard/${id}`,
    jobApply: (jobId) => `/job/request/${jobId}`,
 
}