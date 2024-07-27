import React, { useState } from "react";
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

function Main() {
    const [formData, setFormData] = useState({
        LoanID: "",
        CollateralType: "",
        Description: "",
        Value: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/collaterals', formData, {
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
                    text: 'Collateral created successfully.',
                });
                // Reset form after successful submission
                setFormData({ LoanID: "", CollateralType: "", Description: "", Value: "" });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.ResponseHeader?.StatusDesc || 'Failed to create collateral.';
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
                <h2 className="mr-auto text-lg font-medium">Collateral Creation Form</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-12">
                    <PreviewComponent className="intro-y box">
                        {() => (
                            <>
                                <div className="p-5">
                                    <Preview>
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <FormLabel htmlFor="loan-id">Loan ID</FormLabel>
                                                <FormInput
                                                    id="loan-id"
                                                    name="LoanID"
                                                    type="text"
                                                    placeholder="Enter Loan ID"
                                                    value={formData.LoanID}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="collateral-type">Collateral Type</FormLabel>
                                                <FormInput
                                                    id="collateral-type"
                                                    name="CollateralType"
                                                    type="text"
                                                    placeholder="Enter Collateral Type"
                                                    value={formData.CollateralType}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="description">Description</FormLabel>
                                                <FormInput
                                                    id="description"
                                                    name="Description"
                                                    type="text"
                                                    placeholder="Enter Description"
                                                    value={formData.Description}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <FormLabel htmlFor="value">Value</FormLabel>
                                                <FormInput
                                                    id="value"
                                                    name="Value"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter Value"
                                                    value={formData.Value}
                                                    onChange={handleChange}
                                                    required
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
