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
import Swal from "sweetalert2";

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
    const [loans, setLoans] = useState<Loan[]>([]);
    const [token] = useState(localStorage.getItem('chanelToken') || '');
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);
    const [repaymentModal, setRepaymentModal] = useState(false);
    const [repaymentDetails, setRepaymentDetails] = useState({
        LoanID: 0,
        PaymentAmount: 0,
        PaymentDate: "",
        PaymentMethod: "Bank Transfer",
    });

    useEffect(() => {
        axios.get<ApiResponse>(`http://localhost:8080/api/loans?page=${currentPage}&limit=${itemsPerPage}`, {
            headers: {
                'ChannelID': 'LN',
                'IPAddress': '127.0.0.1',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data.ResponseHeader.StatusCode === 1000) {
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
        setRepaymentDetails(prevState => ({
            ...prevState,
            LoanID: loan.Id
        }));
        setRepaymentModal(true);
    };

    const handleRepaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRepaymentDetails(prevState => ({
            ...prevState,
            [name]: name === "PaymentAmount" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleRepaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/payments', repaymentDetails, {
                headers: {
                    'ChannelId': 'LN',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.ResponseHeader.StatusCode === 1000) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.data.ResponseBody.Message,
                });
                setRepaymentModal(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.ResponseHeader.StatusDesc,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to process payment.',
            });
        }
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
                                                            Repay
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

            {/* Repayment Modal */}
            <Dialog
                size="lg"
                open={repaymentModal}
                onClose={() => setRepaymentModal(false)}
                className="max-w-4xl mx-auto" // Increased modal width
            >
                <Dialog.Panel className="p-6 bg-white rounded-lg shadow-lg">
                    <Dialog.Title className="text-2xl font-semibold mb-4">
                        Repay Loan
                    </Dialog.Title>
                    <form onSubmit={handleRepaymentSubmit}>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="loan-id" className="font-medium">Loan ID</FormLabel>
                                <FormInput
                                    id="loan-id"
                                    name="LoanID"
                                    type="text"
                                    value={repaymentDetails.LoanID}
                                    readOnly
                                    className="border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="payment-amount" className="font-medium">Payment Amount</FormLabel>
                                <FormInput
                                    id="payment-amount"
                                    name="PaymentAmount"
                                    type="number"
                                    value={repaymentDetails.PaymentAmount}
                                    onChange={handleRepaymentChange}
                                    className="border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="payment-date" className="font-medium">Payment Date</FormLabel>
                                <FormInput
                                    id="payment-date"
                                    name="PaymentDate"
                                    type="date"
                                    value={repaymentDetails.PaymentDate}
                                    onChange={handleRepaymentChange}
                                    className="border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="payment-method" className="font-medium">Payment Method</FormLabel>
                                <select
                                    id="payment-method"
                                    name="PaymentMethod"
                                    value={repaymentDetails.PaymentMethod}
                                    onChange={handleRepaymentChange}
                                    className="border-gray-300 rounded-lg w-full"
                                    required
                                >
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button variant="secondary" onClick={() => setRepaymentModal(false)} className="mr-4">
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Repay
                            </Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default Main;
