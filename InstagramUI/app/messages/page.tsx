export default function MessagesDefaultPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <svg className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96">
                <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                <path d="m52.309 67.221 17.024-28.643c2.25-3.784-.478-8.578-4.88-8.578H31.55c-5.084 0-7.605 6.169-3.976 9.73l10.574 10.376 3.762 15.55c1.197 4.947 7.798 5.94 10.399 1.565Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="38.148" x2="55.675" y1="50.106" y2="40.134"></line>
            </svg>
            <p className="my-3 fs-4 fw-medium">Your messages</p>
            <p className="mb-3 text-secondary">Send a message to start a chat</p>
            <button type="button" className="btn btn-primary rounded-3" data-bs-toggle="modal" data-bs-target="#sendMessageModal">Send Message</button>
        </div>
    )
}