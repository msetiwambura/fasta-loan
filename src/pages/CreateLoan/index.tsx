import React, { useState, useEffect } from "react";
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
} from "../../base-components/PreviewComponent";
import {
    FormInput,
    FormLabel,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import TomSelect from "../../base-components/TomSelect";

function Main() {
    const [formData, setFormData] = useState({
        LoanAmount: "",
        LoanCurrency: "TZS",
        InterestRate: "",
        StartDate: "",
        EndDate: "",
        Status: "Pending",
        Customer: "",
    });
    const [customers, setCustomers] = useState([]);
    const [loanCurrency, setLoanCurrency] = useState("TZS");
    const [loanStatus, setLoanStatus] = useState("Pending");
    const [customer, setCustomer] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/customers', {
                    headers: {
                        'ChannelId': 'LN',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaGFubmVsSUQiOiJMTiIsIklQQWRkcmVzcyI6IjEyNy4wLjAuMSIsImV4cCI6MTcyMDk2MTkxMn0.MmVdc2B4Aw00vLcBpTiumzvl8DLYguAcvsVFnB1diu8',
                    },
                });
                setCustomers(response.data.ResponseBody);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch customers.',
                });
            }
        };

        fetchCustomers();
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        // Parse specific fields as numbers
        if (["AnnualIncome", "CreditScore", "LoanAmount", "InterestRate"].includes(name)) {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/loans', {
                ...formData,
                LoanCurrency: loanCurrency,
                Status: loanStatus,
                Customer: customer
            }, {
                headers: {
                    'ChannelId': 'LN',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_TOKEN',
                },
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Loan created successfully.',
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.ResponseHeader?.StatusDesc || 'Failed to create loan.';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            });
        }
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Loan Application Form</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-12">
                    <PreviewComponent className="intro-y box">
                        {() => (
                            <>
                                <div className="p-5">
                                    <Preview>
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <FormLabel htmlFor="loan-amount">Loan Amount</FormLabel>
                                                <FormInput
                                                    id="loan-amount"
                                                    name="LoanAmount"
                                                    type="number"
                                                    placeholder="Loan Amount"
                                                    value={formData.LoanAmount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="loan-currency">Loan Currency</FormLabel>
                                                <TomSelect
                                                    value={loanCurrency}
                                                    onChange={setLoanCurrency}
                                                    options={{
                                                        placeholder: "Select loan currency",
                                                    }}
                                                    className="w-full"
                                                >
                                                    <option value="TZS">TZS</option>
                                                    {/* Add other currencies as needed */}
                                                </TomSelect>
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="interest-rate">Interest Rate (%)</FormLabel>
                                                <FormInput
                                                    id="interest-rate"
                                                    name="InterestRate"
                                                    type="number"
                                                    placeholder="Interest Rate"
                                                    value={formData.InterestRate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="start-date">Start Date</FormLabel>
                                                <FormInput
                                                    id="start-date"
                                                    name="StartDate"
                                                    type="date"
                                                    value={formData.StartDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="end-date">End Date</FormLabel>
                                                <FormInput
                                                    id="end-date"
                                                    name="EndDate"
                                                    type="date"
                                                    value={formData.EndDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="status">Loan Status</FormLabel>
                                                <TomSelect
                                                    value={loanStatus}
                                                    onChange={setLoanStatus}
                                                    options={{
                                                        placeholder: "Select loan status",
                                                    }}
                                                    className="w-full"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Closed">Closed</option>
                                                </TomSelect>
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="customer">Customer</FormLabel>
                                                <TomSelect
                                                    value={customer}
                                                    onChange={setCustomer}
                                                    options={{
                                                        placeholder: "Select customer",
                                                    }}
                                                    className="w-full"
                                                >
                                                    <option value="">Select Customer</option>
                                                    {customers.map((customer) => (
                                                        <option key={customer.Id} value={customer.Id}>
                                                            {customer.FirstName} {customer.LastName}
                                                        </option>
                                                    ))}
                                                </TomSelect>
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
