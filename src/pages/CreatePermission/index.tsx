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
        Name: "",
        Description: "",
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/permissions', formData, {
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
                    text: 'Permission created successfully.',
                });
                // Reset form after successful submission
                setFormData({ Name: "", Description: "" });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.ResponseHeader?.StatusDesc || 'Failed to create permission.';
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
                <h2 className="mr-auto text-lg font-medium">Permission Creation Form</h2>
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
                                                <FormLabel htmlFor="name">Permission Name</FormLabel>
                                                <FormInput
                                                    id="name"
                                                    name="Name"
                                                    type="text"
                                                    placeholder="Enter permission name"
                                                    value={formData.Name}
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
                                                    placeholder="Enter permission description"
                                                    value={formData.Description}
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
