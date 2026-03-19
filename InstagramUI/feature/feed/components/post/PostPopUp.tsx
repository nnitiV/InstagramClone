export default function PostPopUp() {
    return (
        <div className="modal fade" id="postPopup" tabIndex={-1} aria-labelledby="postPopupLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content overflow-hidden">
                    <div className="modal-body p-0">
                        <div className="list-group list-group-flush text-center">
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold">Report</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold">Unfollow</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto">Add to favorites</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto">Go to post</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto">Share to...</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto" data-bs-dismiss="modal">Copy link</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto">Embed</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto">About this account</button>
                            <button className="list-group-item list-group-item-action cursor-pointer pe-auto" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
