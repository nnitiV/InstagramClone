import { useState } from 'react'
import { MOCK_MESSAGES } from '../constants/data'
import MessageUserItem from './MessageUserItem';
import MessageSidebarHeader from './MessageSidebarHeader';
import { LastMessageDto } from '@/types/messages';

type MessageSidebarProps = {
    width: string;
    shouldHideSidebar: boolean;
    lastMessages: LastMessageDto[];
}

export default function MessageSidebar({ width, shouldHideSidebar, lastMessages }: MessageSidebarProps) {
    const [searchText, setSearchText] = useState<string>("");
    console.log(lastMessages.length > 0);
    return (
        <div className={`pt-5 pb-1 d-flex flex-column align-items-center h-100 ${shouldHideSidebar ? "d-none" : "d-flex"}`} style={{ width }}>
            <MessageSidebarHeader shouldHideSidebar={shouldHideSidebar} searchText={searchText} setSearchText={setSearchText} />
            <hr className="w-100 mb-1" />

            <div className="d-flex justify-content-between align-items-center w-100 px-4 pt-3 pb-1 mb-4">
                <p className="m-0 p-0 fw-bold">Messages</p>
                <p className="m-0 p-0 text-muted cursor-pointer">Requests</p>
            </div>
            <div className="scrollbox w-100 overflow-y-auto">
                <div className="users scrollbox-content px-2">
                    {lastMessages.length > 0 ?
                        lastMessages.map((message) => (
                            <MessageUserItem key={message.id} message={message} setSearchText={setSearchText} />
                        ))
                        :
                        <p className='mx-auto text-center fw-bold mt-5'>No messages yet.</p>
                    }
                </div>
            </div>
        </div>
    )
}
