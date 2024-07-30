import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
} from "../../base-components/PreviewComponent";
import {
    FormLabel,
    FormInput,
} from "../../base-components/Form";
import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Table from "../../base-components/Table";

interface Loan {
    Id: number;
    Customer: {
        CustomerID: number;
        CustomerFirstName: string;
        CustomerLastName: string;
    };
    LoanAmount: number;
    LoanCurrency: string;
    InterestRate: number;
    StartDate: string;
    EndDate: string;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
}

interface ApiResponse {
    ResponseBody: {
        CurrentPage: number;
        Loans: Loan[];
        TotalItems: number;
        TotalPages: number;
    };
    ResponseHeader: {
        StatusCode: number;
        StatusMessage: string;
        StatusDesc: string;
    };
}

function Main() {
    const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState(false);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [token] = useState(localStorage.getItem('chanelToken') || '');
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);
    const sendButtonRef = useRef(null);

    useEffect(() => {
        // Fetch data with pagination
        axios.get<ApiResponse>(`http://localhost:8080/api/loans?page=${currentPage}&limit=${itemsPerPage}`, {
            headers: {
                'ChannelID': 'LN',
                'IPAddress': '127.0.0.1',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data.ResponseHeader.StatusCode === 1000) {
                    // Extract data from the response
                    const { CurrentPage, Loans, TotalItems, TotalPages } = response.data.ResponseBody;
                    setLoans(Loans);
                    setCurrentPage(CurrentPage);
                    setTotalPages(TotalPages);
                } else {
                    console.error('Error fetching loans:', response.data.ResponseHeader.StatusDesc);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the loans:', error);
            });
    }, [token, currentPage, itemsPerPage]);

    const handleViewClick = (loan: Loan) => {
        setSelectedLoan(loan);
        setHeaderFooterModalPreview(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-semibold">Loans & Modals</h2>
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
                                                <Table.Th>Customer Name</Table.Th>
                                                <Table.Th>Loan Amount</Table.Th>
                                                <Table.Th>Currency</Table.Th>
                                                <Table.Th>Interest Rate</Table.Th>
                                                <Table.Th>Start Date</Table.Th>
                                                <Table.Th>End Date</Table.Th>
                                                <Table.Th>Status</Table.Th>
                                                <Table.Th>Actions</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {(loans || []).map((loan, index) => (
                                                <Table.Tr key={loan.Id}>
                                                    <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                                                    <Table.Td>{loan.Customer.CustomerFirstName} {loan.Customer.CustomerLastName}</Table.Td>
                                                    <Table.Td>{loan.LoanAmount}</Table.Td>
                                                    <Table.Td>{loan.LoanCurrency}</Table.Td>
                                                    <Table.Td>{loan.InterestRate}</Table.Td>
                                                    <Table.Td>{loan.StartDate}</Table.Td>
                                                    <Table.Td>{loan.EndDate}</Table.Td>
                                                    <Table.Td>{loan.Status}</Table.Td>
                                                    <Table.Td>
                                                        <Button variant="primary" onClick={() => handleViewClick(loan)}>
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

            <div className="flex justify-center mt-4">
                <Button variant="secondary" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </Button>
                <span className="mx-4 text-lg font-medium">Page {currentPage} of {totalPages}</span>
                <Button variant="secondary" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </Button>
            </div>

            <Dialog
                size="lg"
                open={headerFooterModalPreview}
                onClose={() => setHeaderFooterModalPreview(false)}
                initialFocus={sendButtonRef}
                className="max-w-4xl mx-auto" // Increased modal width
            >
                <Dialog.Panel className="p-6 bg-white rounded-lg shadow-lg">
                    <Dialog.Title className="text-2xl font-semibold mb-4">
                        Loan Details
                    </Dialog.Title>
                    <Dialog.Description className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-customer-name" className="font-medium">Customer Name</FormLabel>
                            <FormInput
                                id="modal-form-customer-name"
                                type="text"
                                value={`${selectedLoan?.Customer.CustomerFirstName || ''} ${selectedLoan?.Customer.CustomerLastName || ''}`}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-loan-amount" className="font-medium">Loan Amount</FormLabel>
                            <FormInput
                                id="modal-form-loan-amount"
                                type="text"
                                value={selectedLoan?.LoanAmount || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-currency" className="font-medium">Currency</FormLabel>
                            <FormInput
                                id="modal-form-currency"
                                type="text"
                                value={selectedLoan?.LoanCurrency || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-interest-rate" className="font-medium">Interest Rate</FormLabel>
                            <FormInput
                                id="modal-form-interest-rate"
                                type="text"
                                value={selectedLoan?.InterestRate || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-start-date" className="font-medium">Start Date</FormLabel>
                            <FormInput
                                id="modal-form-start-date"
                                type="text"
                                value={selectedLoan?.StartDate || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-end-date" className="font-medium">End Date</FormLabel>
                            <FormInput
                                id="modal-form-end-date"
                                type="text"
                                value={selectedLoan?.EndDate || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="modal-form-status" className="font-medium">Status</FormLabel>
                            <FormInput
                                id="modal-form-status"
                                type="text"
                                value={selectedLoan?.Status || ''}
                                readOnly
                                className="border-gray-300 rounded-lg"
                            />
                        </div>
                    </Dialog.Description>
                    <div className="flex justify-end mt-4">
                        <Button
                            ref={sendButtonRef}
                            variant="primary"
                            onClick={() => setHeaderFooterModalPreview(false)}
                        >
                            Close
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default Main;
