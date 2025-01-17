import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import MainColorSwitcher from "../components/MainColorSwitcher";
import logoUrl from "../assets/images/logo.svg";
import illustrationUrl from "../assets/images/illustration.svg";
import { FormInput, FormCheck } from "../base-components/Form";
import Button from "../base-components/Button";
import clsx from "clsx";
import axios from "axios";
import Swal from "sweetalert2";

function Main() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLoginChange = (e: { target: { name: any; value: any; }; }) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axios.post('http://localhost:8081/api/login', {
            username: loginData.username,
            password: loginData.password,
        })
            .then(response => {
                const token = response.data.ResponseBody.Token;
                localStorage.setItem('authToken', token);

                const userDetails = response.data.ResponseBody.UserDetails;
                localStorage.setItem('userDetails', JSON.stringify(userDetails));

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Logged in successfully!',
                    timer: 400, // 2 seconds timer
                    showConfirmButton: false,
                    willClose: () => {
                        // Redirect to the home page immediately after the alert closes
                        navigate("/"); // Replace with your desired route
                    }
                });
            })
            .catch(error => {
                console.error('There was an error logging in:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error logging in!',
                });
            });
    };

    return (
        <>
            <div
                className={clsx([
                    "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
                    "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
                    "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
                ])}
            >
                <DarkModeSwitcher />
                <MainColorSwitcher />
                <div className="container relative z-10 sm:px-10">
                    <div className="block grid-cols-2 gap-4 xl:grid">
                        {/* BEGIN: Login Info */}
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
                        {/* END: Login Info */}
                        {/* BEGIN: Login Form */}
                        <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                                    Sign In
                                </h2>
                                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                                    A few more clicks to sign in to your account. Manage all your
                                    e-commerce accounts in one place
                                </div>
                                <div className="mt-8 intro-x">
                                    <FormInput
                                        type="text"
                                        name="username"
                                        className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                                        placeholder="Email"
                                        value={loginData.username}
                                        onChange={handleLoginChange}
                                    />
                                    <FormInput
                                        type="password"
                                        name="password"
                                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                                    <a href="">Forgot Password?</a>
                                </div>
                                <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                                    <Button
                                        variant="primary"
                                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                                    >
                                        Register
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
