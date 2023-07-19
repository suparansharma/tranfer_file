export const SECURITY_END_POINT = {
    login: () => `/auth/login`,
    guardianReg: () => `/auth/guardiansignup`,
    tutorReg: () => `/auth/tutorsignup`,
    verifyOtp: (userId) => `/auth/otp/${userId}`,
    registration: () => `/registration`
}