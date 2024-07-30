import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PreviewComponent, Preview } from "../../base-components/PreviewComponent";
import Table from "../../base-components/Table";
import Button from "../../base-components/Button";
import { Dialog, Menu } from "../../base-components/Headless";
import { FormLabel, FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

interface Customer {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Gender: string;
    NationalID: string;
    PhoneNumber: string;
    Address: string;
    City: string;
    Country: string;
    EmploymentStatus: string;
    AnnualIncome: string;
    CreditScore: number;
}

function Main() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [token] = useState(localStorage.getItem('chanelToken') || '');
    const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);
    const sendButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customers?page=${currentPage}&limit=${itemsPerPage}`, {
            headers: {
                'ChannelID': 'LN',
                'IPAddress': '127.0.0.1',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data.ResponseHeader.StatusCode === 1000) {
                    setCustomers(response.data.ResponseBody.Customers);
                    setTotalPages(response.data.ResponseBody.TotalPages);
                } else {
                    console.error('Error fetching customers:', response.data.ResponseHeader.StatusDesc);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the customers:', error);
            });
    }, [token, currentPage, itemsPerPage]);

    const handleViewClick = (customer: Customer) => {
        setSelectedCustomer(customer);
        setHeaderFooterModalPreview(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (selectedCustomer) {
            const { name, value } = e.target;
            let updatedValue: string | number = value;

            // Handle CreditScore as number
            if (name === 'CreditScore') {
                updatedValue = parseInt(value, 10);
            }

            setSelectedCustomer({
                ...selectedCustomer,
                [name]: updatedValue,
            });
        }
    };

    const handleUpdate = () => {
        if (selectedCustomer) {
            axios.put(`http://localhost:8080/api/customers/${selectedCustomer.Id}`, selectedCustomer, {
                headers: {
                    'ChannelID': 'LN',
                    'IPAddress': '127.0.0.1',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.data.ResponseHeader.StatusCode === 1000) {
                        setCustomers(prevCustomers =>
                            prevCustomers.map(c => c.Id === selectedCustomer.Id ? selectedCustomer : c)
                        );
                        setHeaderFooterModalPreview(false);
                        Swal.fire({
                            title: 'Success!',
                            text: 'Customer details updated successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6',
                        }).then(() => {
                            // Delay the navigation by 500 milliseconds
                            setTimeout(() => {
                                navigate('/customers'); // Adjust the path if needed
                            }, 500);
                        });
                    } else {
                        console.error('Error updating customer:', response.data.ResponseHeader.StatusDesc);
                    }
                })
                .catch(error => {
                    console.error('There was an error updating the customer:', error);
                });
        }
    };

    const closeModal = () => {
        setHeaderFooterModalPreview(false);
        setSelectedCustomer(null);
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Customers</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-auto">
                    <PreviewComponent className="intro-y box">
                        <div className="p-5">
                            <Preview>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <Table.Thead variant="dark">
                                            <Table.Tr>
                                                <Table.Th>#</Table.Th>
                                                <Table.Th>First Name</Table.Th>
                                                <Table.Th>Last Name</Table.Th>
                                                <Table.Th>Email</Table.Th>
                                                <Table.Th>Gender</Table.Th>
                                                <Table.Th>National Id</Table.Th>
                                                <Table.Th>Phone Number</Table.Th>
                                                <Table.Th>Address</Table.Th>
                                                <Table.Th>City</Table.Th>
                                                <Table.Th>Country</Table.Th>
                                                <Table.Th>Employment</Table.Th>
                                                <Table.Th>Annual Income</Table.Th>
                                                <Table.Th>Credit Score</Table.Th>
                                                <Table.Th>Actions</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {(customers || []).map((customer, index) => (
                                                <Table.Tr key={customer.Id}>
                                                    <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                                                    <Table.Td>{customer.FirstName}</Table.Td>
                                                    <Table.Td>{customer.LastName}</Table.Td>
                                                    <Table.Td>{customer.Email}</Table.Td>
                                                    <Table.Td>{customer.Gender}</Table.Td>
                                                    <Table.Td>{customer.NationalID}</Table.Td>
                                                    <Table.Td>{customer.PhoneNumber}</Table.Td>
                                                    <Table.Td>{customer.Address}</Table.Td>
                                                    <Table.Td>{customer.City}</Table.Td>
                                                    <Table.Td>{customer.Country}</Table.Td>
                                                    <Table.Td>{customer.EmploymentStatus}</Table.Td>
                                                    <Table.Td>{customer.AnnualIncome}</Table.Td>
                                                    <Table.Td>{customer.CreditScore}</Table.Td>
                                                    <Table.Td>
                                                        <Button variant="primary" onClick={() => handleViewClick(customer)}>
                                                            View
                                                        </Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </Table>
                                </div>
                            </Preview>
                        </div>
                    </PreviewComponent>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <Button variant="secondary" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </Button>
                <span className="mx-4">Page {currentPage} of {totalPages}</span>
                <Button variant="secondary" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </Button>
            </div>

            {/* New Modal Content */}
            <Dialog
                open={headerFooterModalPreview}
                onClose={closeModal}
                initialFocus={sendButtonRef}
                className="fixed inset-0 flex items-center justify-center z-50"
            >
                <Dialog.Panel className="custom-modal-width bg-white p-6 rounded-lg shadow-lg">
                    <Dialog.Title>
                        <h2 className="text-base font-medium">Edit Customer Details</h2>
                    </Dialog.Title>
                    <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                        {selectedCustomer && (
                            <>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="FirstName">First Name</FormLabel>
                                    <FormInput
                                        id="FirstName"
                                        name="FirstName"
                                        type="text"
                                        value={selectedCustomer.FirstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="LastName">Last Name</FormLabel>
                                    <FormInput
                                        id="LastName"
                                        name="LastName"
                                        type="text"
                                        value={selectedCustomer.LastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="Email">Email</FormLabel>
                                    <FormInput
                                        id="Email"
                                        name="Email"
                                        type="email"
                                        value={selectedCustomer.Email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="Gender">Gender</FormLabel>
                                    <FormSelect
                                        id="Gender"
                                        name="Gender"
                                        value={selectedCustomer.Gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </FormSelect>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="NationalID">National ID</FormLabel>
                                    <FormInput
                                        id="NationalID"
                                        name="NationalID"
                                        type="text"
                                        value={selectedCustomer.NationalID}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
                                    <FormInput
                                        id="PhoneNumber"
                                        name="PhoneNumber"
                                        type="text"
                                        value={selectedCustomer.PhoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="Address">Address</FormLabel>
                                    <FormInput
                                        id="Address"
                                        name="Address"
                                        type="text"
                                        value={selectedCustomer.Address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="City">City</FormLabel>
                                    <FormInput
                                        id="City"
                                        name="City"
                                        type="text"
                                        value={selectedCustomer.City}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="Country">Country</FormLabel>
                                    <FormInput
                                        id="Country"
                                        name="Country"
                                        type="text"
                                        value={selectedCustomer.Country}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="EmploymentStatus">Employment Status</FormLabel>
                                    <FormInput
                                        id="EmploymentStatus"
                                        name="EmploymentStatus"
                                        type="text"
                                        value={selectedCustomer.EmploymentStatus}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="AnnualIncome">Annual Income</FormLabel>
                                    <FormInput
                                        id="AnnualIncome"
                                        name="AnnualIncome"
                                        type="text"
                                        value={selectedCustomer.AnnualIncome}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormLabel htmlFor="CreditScore">Credit Score</FormLabel>
                                    <FormInput
                                        id="CreditScore"
                                        name="CreditScore"
                                        type="number"
                                        value={selectedCustomer.CreditScore}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        )}
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={closeModal}
                            className="w-20 mr-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="button"
                            className="w-20"
                            ref={sendButtonRef}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Dialog.Footer>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default Main;
