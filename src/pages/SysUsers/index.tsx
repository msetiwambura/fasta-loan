import _ from "lodash";
import Table from "../../base-components/Table";
import { PreviewComponent, Preview } from "../../base-components/PreviewComponent";
import { useState, useEffect } from "react";
import axios from "axios";

function Main() {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('authToken') || '');

    useEffect(() => {
        axios.get('http://localhost:8081/api/register', {
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
    }, [token]);

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
                                                            Role Name
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {users.map((user, index) => (
                                                        <Table.Tr key={user.ID}>
                                                            <Table.Td>{index + 1}</Table.Td>
                                                            <Table.Td>{user.FirstName}</Table.Td>
                                                            <Table.Td>{user.LastName}</Table.Td>
                                                            <Table.Td>{user.Email}</Table.Td>
                                                            <Table.Td>{user.Role.Name}</Table.Td> {/* Display the Role name */}
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
