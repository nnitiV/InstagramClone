export default function PostPopUp() {
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content overflow-hidden">
                    <div className="modal-body p-0">
                        <ul className="list-group list-group-flush text-center">
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold">Report</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold">Unfollow</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">Add to favorites</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">Go to post</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">Share to...</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">Copy link</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">Embed</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto">About this account</li>
                            <li className="list-group-item list-group-item-action cursor-pointer pe-auto" data-bs-dismiss="modal">Cancel</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
} 
