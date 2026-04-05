import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import shape1 from '../assets/images/shape1.svg';
import darkShape from '../assets/images/dark_shape.svg';
import shape2 from '../assets/images/shape2.svg';
import darkShape1 from '../assets/images/dark_shape1.svg';
import shape3 from '../assets/images/shape3.svg';
import darkShape2 from '../assets/images/dark_shape2.svg';
import registrationImg from '../assets/images/registration.png';
import registrationImgDark from '../assets/images/registration1.png';
import logo from '../assets/images/logo.svg';
import google from '../assets/images/google.svg';

export default function Register() {
  const navigate = useNavigate();
   const { register } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();

   if (form.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }


    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(form); 
      navigate("/"); 
    } catch (err) {
      alert(err.message); 
    }
  };

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      
      <div className="_shape_one">
        <img src={shape1} alt="" className="_shape_img" />
        <img src={darkShape} alt="" className="_dark_shape" />
      </div>

      <div className="_shape_two">
        <img src={shape2} alt="" className="_shape_img" />
        <img src={darkShape1} alt="" className="_dark_shape _dark_shape_opacity" />
      </div>

      <div className="_shape_three">
        <img src={shape3} alt="" className="_shape_img" />
        <img src={darkShape2} alt="" className="_dark_shape _dark_shape_opacity" />
      </div>

      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src={registrationImg} alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src={registrationImgDark} alt="Image" />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">

                <div className="_social_registration_right_logo _mar_b28">
                  <img src={logo} alt="Logo" className="_right_logo" />
                </div>

                <p className="_social_registration_content_para _mar_b8">
                  Get Started Now
                </p>

                <h4 className="_social_registration_content_title _titl4 _mar_b50">
                  Registration
                </h4>

                <button type="button" className="_social_registration_content_btn _mar_b40">
                  <img src={google} alt="Google" className="_google_img" />
                  <span> Register with google</span>
                </button>

                <div className="_social_registration_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                <form className="_social_registration_form" onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control _social_registration_input"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control _social_registration_input"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">
                          Repeat Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control _social_registration_input"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="form-check _social_registration_form_check">
                        <input
                          className="form-check-input _social_registration_form_check_input"
                          type="radio"
                          name="flexRadioDefault" 
                          id="flexRadioDefault2"
                          defaultChecked
                        />
                        <label className="_social_registration_form_check_label">
                          I agree to terms & conditions
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button type="submit" className="_social_registration_form_btn_link _btn1">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>

                </form>

                <div className="_social_registration_bottom_txt">
                  <p className="_social_registration_bottom_txt_para">
                    Already have an account?{' '}
                    <Link to="/">Login</Link>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}