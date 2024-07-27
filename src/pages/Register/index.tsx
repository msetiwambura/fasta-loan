import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.svg";
import illustrationUrl from "../../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";
import React, { useState, useEffect } from 'react';
import FormSelect from "../../base-components/Form/FormSelect";
import axios from 'axios';
import Swal from 'sweetalert2';

function Main() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    roleId: '',
  });

  const [loginData, setLoginData] = useState({
    email: 'rafamceti@gmail.com',
    password: 'Dmtml1'
  });

  const [roles, setRoles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8081/api/roles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then(response => {
            setRoles(response.data.ResponseBody);
          })
          .catch(error => console.error('Error fetching roles:', error));
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password, passwordConfirmation, roleId } = formData;

    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Passwords do not match!',
      });
      return;
    }

    axios.post('http://localhost:8081/api/register', {
      firstName,
      lastName,
      email,
      password,
      roleId: Number(roleId), // Ensure roleId is a number
    })
        .then(response => {
          console.log('User registered successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User registered successfully!',
          });
        })
        .catch(error => {
          console.error('There was an error registering the user:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was an error registering the user!',
          });
        });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:8081/api/login', loginData)
        .then(response => {
          const { Token } = response.data.ResponseBody;
          localStorage.setItem('token', Token); // Save token to localStorage
          setToken(Token);
          console.log('Logged in successfully:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Logged in successfully!',
          });
        })
        .catch(error => {
          console.error('Error logging in:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Invalid login credentials!',
          });
        });
  };

  return (
      <>
        <div className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}>
          <DarkModeSwitcher />
          <MainColorSwitcher />
          <div className="container relative z-10 sm:px-10">
            <div className="block grid-cols-2 gap-4 xl:grid">
              {/* BEGIN: Register Info */}
              <div className="flex-col hidden min-h-screen xl:flex">
                <a href="" className="flex items-center pt-5 -intro-x">
                  <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="w-6"
                      src={logoUrl}
                  />
                  <span className="ml-3 text-lg text-white"> V&M </span>
                </a>
                <div className="my-auto">
                  <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="w-1/2 -mt-16 -intro-x"
                      src={illustrationUrl}
                  />
                </div>
              </div>
              {/* END: Register Info */}
              {/* BEGIN: Register Form */}
              <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                    Sign Up
                  </h2>
                  <div className="mt-8 intro-x">
                    <FormInput
                        type="text"
                        name="firstName"
                        className="block px-4 py-3 intro-x min-w-full xl:min-w-[450px]"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <FormInput
                        type="text"
                        name="lastName"
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <FormInput
                        type="text"
                        name="email"
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <FormSelect
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    >
                      <option value="" disabled>Select Role</option>
                      {roles.map((role) => (
                          <option key={role.ID} value={role.ID}>{role.name}</option>
                      ))}
                    </FormSelect>
                    <FormInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Password"
                    />
                    <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
                      <div className="h-full col-span-3 rounded bg-success"></div>
                      <div className="h-full col-span-3 rounded bg-success"></div>
                      <div className="h-full col-span-3 rounded bg-success"></div>
                      <div className="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800"></div>
                    </div>
                    <FormInput
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Password Confirmation"
                    />
                  </div>
                  <div className="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                    />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">
                      I agree to the M&N
                    </label>
                    <a className="ml-1 text-primary dark:text-slate-200" href="">
                      Privacy Policy
                    </a>
                    .
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                        variant="primary"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                        onClick={handleRegister}
                    >
                      Register
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                        onClick={() => setFormData({ ...formData, roleId: '' })}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
              {/* END: Register Form */}
              {/* BEGIN: Login Form */}
              <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                  <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                    Sign In
                  </h2>
                  <div className="mt-8 intro-x">
                    <FormInput
                        type="text"
                        name="email"
                        className="block px-4 py-3 intro-x min-w-full xl:min-w-[450px]"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Password"
                    />
                  </div>
                  <div className="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                    />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">
                      Remember me
                    </label>
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                        variant="primary"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                        onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
              {/* END: Login Form */}
            </div>
          </div>
        </div>
      </>
  );
}

export default Main;
