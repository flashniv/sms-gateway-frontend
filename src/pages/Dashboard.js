import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";
import API from "../API";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!API.isLoggedIn()) {
            navigate("/login", {replace: false})
        }
        const response = API.getContent("/message?token=" + API.getToken())
        response.then((value) => {
            let mess = []
            value.data.map((message) => {
                const date= new Date(message.receivedAt)
                message.receivedAt =date.toUTCString()
                mess.push(message)
            })
            setMessages(mess)
        }, (reason) => {
            console.error(reason)
        })
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight: "bold"
                            }}
                        >#</TableCell>
                        <TableCell
                            sx={{
                                fontWeight: "bold"
                            }}
                        >Date</TableCell>
                        <TableCell
                            sx={{
                                fontWeight: "bold"
                            }}
                        >From</TableCell>
                        <TableCell
                            sx={{
                                fontWeight: "bold"
                            }}
                        >Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.map((message, index) => (
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{message.receivedAt}</TableCell>
                            <TableCell>{message.fromNumber}</TableCell>
                            <TableCell
                                sx={{
                                    width: "65%"
                                }}
                            >{message.text}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}