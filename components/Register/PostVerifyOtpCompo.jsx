import React from 'react'

const PostVerifyOtpCompo = ({ otpVerify, setPostVerifyOtp, postVerifyOtp,reference }) => {

    console.log("postVerifyOtp", postVerifyOtp);

    const handleChange = (e) => {
        setPostVerifyOtp((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <>

            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Valid Yout Email address
            </h2>

            <form onSubmit={otpVerify}>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        OTP
                    </label>
                    <div className="relative">
                        <input
                            name='otp'
                            type="text"
                            placeholder="Enter your otp"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={handleChange}
                        />

                        <span className="absolute right-4 top-4">
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.5">
                                    <path
                                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                        fill=""
                                    />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Reference
                    </label>
                    <div className="relative">
                        <input
                            // name='reference'
                            type="text"
                            placeholder="Enter your reference"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            // onChange={handleChange}
                            value={reference}
                        />

                        <span className="absolute right-4 top-4">
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.5">
                                    <circle cx="11" cy="11" r="10" stroke="" strokeWidth="2" />
                                    <path
                                        d="M11 6.5C11 7.88071 9.88071 9 8.5 9C7.11929 9 6 7.88071 6 6.5C6 5.11929 7.11929 4 8.5 4C9.88071 4 11 5.11929 11 6.5Z"
                                        fill=""
                                    />
                                    <path
                                        d="M17.5 17.9999C15.6406 17.9999 14.0195 16.3788 14.0195 14.5194V13.9999C14.0195 12.3152 12.6943 10.9999 11 10.9999C9.30573 10.9999 7.98047 12.3152 7.98047 13.9999V14.5194C7.98047 16.3788 6.35938 17.9999 4.5 17.9999C3.11929 17.9999 2 16.8806 2 15.4999C2 14.6437 2.67651 13.9291 3.5 13.7331V13.9999C3.5 12.9236 4.55635 11.9999 5.83203 11.9999C6.30217 11.9999 6.74984 12.1441 7.12125 12.3991C8.35384 13.1822 10.0913 13.9999 11 13.9999C11.9087 13.9999 13.6462 13.1822 14.8787 12.3991C15.2502 12.1441 15.6978 11.9999 16.168 11.9999C17.4437 11.9999 18.5 12.9236 18.5 13.9999V13.7331C19.3235 13.9291 20 14.6437 20 15.4999C20 16.8806 18.8807 17.9999 17.5 17.9999Z"
                                        fill=""
                                    />
                                </g>
                            </svg>
                        </span>

                    </div>
                </div>

                <div className="mb-5">
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                </div>

            </form>

        </>
    )
}

export default PostVerifyOtpCompo