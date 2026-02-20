"use client"
import Link from "next/link";
import SwitchAccountModal from "./SwitchAccountModal";
import { useState } from "react";

export default function SearchPage() {
    const [searchText, setSearchText] = useState<string>("");
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="left-side py-5 d-flex flex-column align-items-center h-100 border-end" style={{ width: "20vw" }}>
                    <div className="header" style={{width: "90%"}}>
                        <div className="d-flex justify-content-between px-2 pe-0">
                            <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">username</p>
                            <i className="bi bi-pencil-square"></i>
                        </div>
                        <div className="input-group mb-1">
                            <span className="input-group-text rounded-start-5 border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: "80vw" }}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <svg className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title></title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="m52.309 67.221 17.024-28.643c2.25-3.784-.478-8.578-4.88-8.578H31.55c-5.084 0-7.605 6.169-3.976 9.73l10.574 10.376 3.762 15.55c1.197 4.947 7.798 5.94 10.399 1.565Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="38.148" x2="55.675" y1="50.106" y2="40.134"></line></svg>
                        <p className="my-3">Your messages</p>
                        <p className="mb-3">Send a message to start a chat</p>
                        <button type="button" className="btn btn-primary">Send Message</button>
                    </div>
                </div>
            </div>
            <SwitchAccountModal />
        </>
    )
};

