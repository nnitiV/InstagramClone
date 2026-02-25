import React from 'react'

export default function ChatHeader() {
    return (
        <div className="border-bottom p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex cursor-pointer transparent-background-hover rounded px-2" data-bs-dismiss="offcanvas"
                data-mdb-ripple-init
                data-mdb-ripple-color="light">
                <div className="p-1 rounded-circle position-relative me-2">
                    <img
                        src={"https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                        alt="Story"
                        className="rounded-circle"
                        style={{ width: "46px", height: "46px", objectFit: "cover", }}
                    />
                </div>
                <div className="d-flex flex-column justify-content-center" style={{ fontSize: "14px" }}>
                    <p className="m-0 p-0">"Full name"</p>
                    <p className="m-0 p-0" style={{ color: "rgba(75,75,75,0.75)" }}>"Usernmame"</p>
                </div>
            </div>
            <div className="d-flex justify-content-between px-3 fs-3">
                <i className="bi bi-telephone"></i>
                <i className="bi bi-camera px-3"></i>
                <i className="bi bi-info-circle"></i>
            </div>
        </div>
    )
}
