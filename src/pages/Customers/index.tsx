import React, { useState, useEffect } from "react";
import axios from "axios";
import { PreviewComponent, Preview, Source, Highlight } from "../../base-components/PreviewComponent";
import Table from "../../base-components/Table";
import Button from "../../base-components/Button";
import { Dialog } from "../../base-components/Headless";

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
    const [basicModalPreview, setBasicModalPreview] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [itemsPerPage] = useState(10); // Items per page

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
                    setTotalPages(response.data.ResponseBody.TotalPages); // Set total pages from response
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
        setBasicModalPreview(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
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
                            <Source>
                                <Highlight>
                                    {/* Place your code here */}
                                </Highlight>
                            </Source>
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

            {/* BEGIN: Modal Content */}
            {selectedCustomer && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setBasicModalPreview(false)}
                    />
                    <Dialog
                        open={basicModalPreview}
                        onClose={() => setBasicModalPreview(false)}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-4 shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-center">Customer Details</h2>
                            <div className="space-y-4">
                                <p><strong>First Name:</strong> {selectedCustomer.FirstName}</p>
                                <p><strong>Last Name:</strong> {selectedCustomer.LastName}</p>
                                <p><strong>Email:</strong> {selectedCustomer.Email}</p>
                                <p><strong>Gender:</strong> {selectedCustomer.Gender}</p>
                                <p><strong>National ID:</strong> {selectedCustomer.NationalID}</p>
                                <p><strong>Phone Number:</strong> {selectedCustomer.PhoneNumber}</p>
                                <p><strong>Address:</strong> {selectedCustomer.Address}</p>
                                <p><strong>City:</strong> {selectedCustomer.City}</p>
                                <p><strong>Country:</strong> {selectedCustomer.Country}</p>
                                <p><strong>Employment Status:</strong> {selectedCustomer.EmploymentStatus}</p>
                                <p><strong>Annual Income:</strong> {selectedCustomer.AnnualIncome}</p>
                                <p><strong>Credit Score:</strong> {selectedCustomer.CreditScore}</p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button variant="secondary" onClick={() => setBasicModalPreview(false)}>Close</Button>
                            </div>
                        </div>
                    </Dialog>
                </>
            )}
            {/* END: Modal Content */}
        </>
    );
}

export default Main;
