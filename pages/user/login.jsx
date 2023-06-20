import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ToastMessage from '../../components/Toast/index';
import { SECURITY_END_POINT } from "../../constants/index";
import { post } from "../../helpers/api_helper";
import Axios from "../../utils/axios";

const LoginPage = () => {
  const{http,setToken,token} = Axios();
  const router = useRouter();
  const[password,setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  useEffect(()=>{
    if(token){
      router.replace('/');
    }
  },[token])
  const submitForm = async (event) =>{
    event.preventDefault();
    console.log(SECURITY_END_POINT);
    try{
      const login = await post(SECURITY_END_POINT.login(),{ phone: phone, password: password });
    //  const res = 
    console.log(login,"alll",login.status);
    setToken(login.accessToken);
    notify("success", "successfully Login!");

    }catch(error){
      let message;
      const errorStatus = error?.response?.status;
      if (errorStatus) {
        switch (error.response.status) {
          case 404:
            message = 'Sorry! the page you are looking for could not be found';
            break;
          case 500:
            message = 'Sorry! something went wrong, please contact our support team';
            break;
          case 401:
            message = 'Invalid credentials';
            break;
          default:
            message = error[1];
            break;
        }
      }
      
  
      if (!errorStatus && error.code === 'ERR_NETWORK') {
        message = 'Netword Error!';
      }
      notify("error", message);
    }
    
  }

  return (
    <>
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"
          alt="Sample image"
        />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={submitForm}>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f" />
            </button>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter" />
            </button>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in" />
            </button>
          </div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="name"
              id="form3Example3"
              className="form-control form-control-lg"
              placeholder="Enter a valid Phone Number"
              value={phone} onChange={e=>setPhone(e.target.value)}
            />
            <label className="form-label" htmlFor="form3Example3">
              Phone Number
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-3">
            <input
              type="password"
              id="form3Example4"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password} onChange={e=>setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form3Example4">
              Password
            </label>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {/* Checkbox */}
            <div className="form-check mb-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                defaultValue=""
                id="form2Example3"
              />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body" onClick={e => e.preventDefault()} >
              Forgot password?
            </a>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            >
              Login
            </button>
            <p className="small fw-bold mt-2 pt-1 mb-0">
              Dont have an account?{" "}
              <a onClick={e => e.preventDefault()} href="#!" className="link-danger">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
 
</section>

    </>
  );
};

export default LoginPage;