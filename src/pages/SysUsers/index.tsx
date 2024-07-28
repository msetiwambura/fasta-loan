import _ from "lodash";
import Table from "../../base-components/Table";
import { PreviewComponent, Preview, Source, Highlight } from "../../base-components/PreviewComponent";
import { useState, useEffect } from "react";
import axios from "axios";

function Main() {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('authToken') || '');
    useEffect(() => {
        axios.get('http://localhost:8081/api/register',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.ResponseHeader.StatusCode === "200") {
                    setUsers(response.data.ResponseBody);
                } else {
                    console.error('Error fetching users:', response.data.ResponseHeader.StatusDesc);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the users:', error);
            });
    }, []);

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Registered Users</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-auto">
                    <PreviewComponent className="intro-y box">
                        {({ toggle }) => (
                            <>
                                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                    <h2 className="mr-auto text-base font-medium">
                                        Users
                                    </h2>
                                </div>
                                <div className="p-5">
                                    <Preview>
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <Table.Thead variant="dark">
                                                    <Table.Tr>
                                                        <Table.Th className="whitespace-nowrap">#</Table.Th>
                                                        <Table.Th className="whitespace-nowrap">
                                                            First Name
                                                        </Table.Th>
                                                        <Table.Th className="whitespace-nowrap">
                                                            Last Name
                                                        </Table.Th>
                                                        <Table.Th className="whitespace-nowrap">
                                                            Email
                                                        </Table.Th>
                                                        <Table.Th className="whitespace-nowrap">
                                                            Role
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {users.map((user, index) => (
                                                        <Table.Tr key={user.ID}>
                                                            <Table.Td>{index + 1}</Table.Td>
                                                            <Table.Td>{user.firstName}</Table.Td>
                                                            <Table.Td>{user.lastName}</Table.Td>
                                                            <Table.Td>{user.email}</Table.Td>
                                                            <Table.Td>{user.roleId}</Table.Td>
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
