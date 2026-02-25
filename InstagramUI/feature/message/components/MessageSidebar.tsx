import React, { useState } from 'react'
import { MOCK_MESSAGES } from '../constants/data'
import Link from 'next/link'
import MessageUserItem from './MessageUserItem';

export default function MessageSidebar() {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <div className="left-side py-5 pb-1 d-flex flex-column align-items-center h-100 border-end" style={{ width: "20vw" }}>
            <div className="header" style={{ width: "90%" }}>
                <div className="d-flex justify-content-between px-2 pe-0">
                    <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">Username</p>
                    <i className="bi bi-pencil-square"></i>
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text rounded-start-5 border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
            <hr className="w-100 mb-1" />
            <div className="d-flex justify-content-between align-items-center w-100 px-4 pt-3 pb-1">
                <p className="m-0 p-0">Messages</p>
                <p className="m-0 p-0">Requests</p>
            </div>
            <div className="scrollbox w-100">
                <div className="users scrollbox-content px-2">
                    {MOCK_MESSAGES.map((message, _) => (
                        <MessageUserItem message={message} setSearchText={setSearchText} />
                    ))}
                </div>
            </div>
        </div>
    )
}
