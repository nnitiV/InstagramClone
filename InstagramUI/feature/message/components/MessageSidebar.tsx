import React, { useState } from 'react'
import { MOCK_MESSAGES } from '../constants/data'
import Link from 'next/link'
import MessageUserItem from './MessageUserItem';
import MessageSidebarHeader from './MessageSidebarHeader';

export default function MessageSidebar() {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <div className="left-side py-5 pb-1 d-flex flex-column align-items-center h-100 border-end" style={{ width: "20vw" }}>
            <MessageSidebarHeader searchText={searchText} setSearchText={setSearchText} />
            <hr className="w-100 mb-1" />
            <div className="d-flex justify-content-between align-items-center w-100 px-4 pt-3 pb-1">
                <p className="m-0 p-0">Messages</p>
                <p className="m-0 p-0">Requests</p>
            </div>
            <div className="scrollbox w-100">
                <div className="users scrollbox-content px-2">
                    {MOCK_MESSAGES.map((message, _) => (
                        <MessageUserItem key={message.id} message={message} setSearchText={setSearchText} />
                    ))}
                </div>
            </div>
        </div>
    )
}
