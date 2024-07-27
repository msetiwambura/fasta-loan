import _ from "lodash";
import Table from "../../base-components/Table";
import { PreviewComponent, Preview } from "../../base-components/PreviewComponent";
import { useState, useEffect } from "react";
import axios from "axios";

function Main() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers', {
            headers: {
                'ChannelID': 'LN',
                'IPAddress': '127.0.0.1',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaGFubmVsSUQiOiJMTiIsIklQQWRkcmVzcyI6IjEyNy4wLjAuMSIsImV4cCI6MTcyMDk2MTkxMn0.MmVdc2B4Aw00vLcBpTiumzvl8DLYguAcvsVFnB1diu8'
            }
        })
            .then(response => {
                if (response.data.ResponseHeader.StatusCode === 1000) {
                    setCustomers(response.data.ResponseBody);
                } else {
                    console.error('Error fetching customers:', response.data.ResponseHeader.StatusDesc);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the customers:', error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Customers</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-auto">
                    <PreviewComponent className="intro-y box">
                        {({ toggle }) => (
                            <>
                                <div className="p-5">
                                    <Preview>
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <Table.Thead variant="dark" className="rounded-header">
                                                    <Table.Tr>
                                                        <Table.Th className="whitespace-nowrap">#</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">First Name</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Last Name</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Email</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Gender</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">National Id</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Phone Number</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Address</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">City</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Country</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Employment</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Annual Income</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">Credit Score</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {customers.map((customer, index) => (
                                                        <Table.Tr key={customer.Id}>
                                                            <Table.Td>{index + 1}</Table.Td>
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
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Preview>
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
