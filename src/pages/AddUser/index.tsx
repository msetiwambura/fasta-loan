import React, { useState } from "react";
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
} from "../../base-components/PreviewComponent";
import {
    FormSelect,
    FormInput,
    FormLabel,
    FormSwitch,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Main() {
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Gender: "Male",
        DateOfBirth: "",
        NationalID: "",
        Address: "",
        City: "",
        Province: "",
        PostalCode: "",
        Country: "",
        PhoneNumber: "",
        Email: "",
        EmploymentStatus: "Employed",
        AnnualIncome: "",
        CreditScore: "",
    });
    const [token] = useState(localStorage.getItem('chanelToken') || '');
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "AnnualIncome" || name === "CreditScore" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/customers', formData, {
                headers: {
                    'ChannelId': 'LN',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("[+++]" + response.data.ResponseHeader);

            if (response.status === 201) {
                // Show success message with SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Customer created successfully.',
                    timer: 2000,
                    showConfirmButton: false,
                    willClose(popup) {
                        navigate('/customers')
                    }
                });

                // Redirect to customers page after 400 milliseconds
                // setTimeout(() => {
                //     navigate('/customers'); // Updated navigation
                // }, 400);
            }
        } catch (error) {
            let errorMessage = 'Failed to create customer.';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.ResponseHeader.StatusDesc || errorMessage;
            } else {
                console.error('Error: []', error);
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33', // Make the OK button more noticeable
            });
        }
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Regular Form</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-12">
                    <PreviewComponent className="intro-y box">
                        {({ toggle }) => (
                            <>
                                <div className="p-5">
                                    <Preview>
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <FormLabel htmlFor="first-name">First Name</FormLabel>
                                                <FormInput
                                                    id="first-name"
                                                    name="FirstName"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={formData.FirstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="last-name">Last Name</FormLabel>
                                                <FormInput
                                                    id="last-name"
                                                    name="LastName"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={formData.LastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="gender">Gender</FormLabel>
                                                <FormSelect
                                                    id="gender"
                                                    name="Gender"
                                                    value={formData.Gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </FormSelect>
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="date-of-birth">Date of Birth</FormLabel>
                                                <FormInput
                                                    id="date-of-birth"
                                                    name="DateOfBirth"
                                                    type="date"
                                                    value={formData.DateOfBirth}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="national-id">National ID</FormLabel>
                                                <FormInput
                                                    id="national-id"
                                                    name="NationalID"
                                                    type="text"
                                                    placeholder="National ID"
                                                    value={formData.NationalID}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="address">Address</FormLabel>
                                                <FormInput
                                                    id="address"
                                                    name="Address"
                                                    type="text"
                                                    placeholder="Address"
                                                    value={formData.Address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="city">City</FormLabel>
                                                <FormInput
                                                    id="city"
                                                    name="City"
                                                    type="text"
                                                    placeholder="City"
                                                    value={formData.City}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="province">Province</FormLabel>
                                                <FormInput
                                                    id="province"
                                                    name="Province"
                                                    type="text"
                                                    placeholder="Province"
                                                    value={formData.Province}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="postal-code">Postal Code</FormLabel>
                                                <FormInput
                                                    id="postal-code"
                                                    name="PostalCode"
                                                    type="text"
                                                    placeholder="Postal Code"
                                                    value={formData.PostalCode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="country">Country</FormLabel>
                                                <FormInput
                                                    id="country"
                                                    name="Country"
                                                    type="text"
                                                    placeholder="Country"
                                                    value={formData.Country}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="phone-number">Phone Number</FormLabel>
                                                <FormInput
                                                    id="phone-number"
                                                    name="PhoneNumber"
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    value={formData.PhoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <FormInput
                                                    id="email"
                                                    name="Email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={formData.Email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="employment-status">Employment Status</FormLabel>
                                                <FormSelect
                                                    id="employment-status"
                                                    name="EmploymentStatus"
                                                    value={formData.EmploymentStatus}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Employed">Employed</option>
                                                    <option value="Unemployed">Unemployed</option>
                                                    <option value="Student">Student</option>
                                                    <option value="Retired">Retired</option>
                                                </FormSelect>
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="annual-income">Annual Income</FormLabel>
                                                <FormInput
                                                    id="annual-income"
                                                    name="AnnualIncome"
                                                    type="number"
                                                    placeholder="Annual Income"
                                                    value={formData.AnnualIncome}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="credit-score">Credit Score</FormLabel>
                                                <FormInput
                                                    id="credit-score"
                                                    name="CreditScore"
                                                    type="number"
                                                    placeholder="Credit Score"
                                                    value={formData.CreditScore}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <Button variant="primary" className="mt-5" type="submit">
                                                Submit
                                            </Button>
                                        </form>
                                    </Preview>
                                    <Source>
                                        <Highlight>
                                            {/* Code highlighting for reference */}
                                        </Highlight>
                                    </Source>
                                </div>
                            </>
                        )}
                    </PreviewComponent>
                </div>
            </div>
        </>
    );
}

export default Main;
