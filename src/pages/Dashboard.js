import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import API from "../API";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";

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
                const date = new Date(message.receivedAt)
                message.receivedAt = date.toUTCString()
                mess.push(message)
            })
            setMessages(mess.reverse())
        }, (reason) => {
            console.error(reason)
        })
    }, []);
    /*fromNumber: "+18339510147"
    id: 28
    receivedAt: "Fri, 25 Mar 2022 08:20:54 GMT"
    text: "G-537982 is your Google verification code."
    toNumber: "+16062038541"
    * */
    const columns = [
        {
            field: 'receivedAt',
            headerName: 'Date',
            flex: 0.35,
            editable: false,
        },
        {
            field: 'fromNumber',
            headerName: 'From',
            flex: 0.25,
            editable: false,
        },
        {
            field: 'text',
            headerName: 'Message',
            flex: 1,
            editable: false,
        },
    ]

    return (
        <Box
            sx={{
                height:650
            }}
        >
            <DataGrid
                rows={messages}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10,20,50,100]}
                disableSelectionOnClick
            />
        </Box>
    );
}