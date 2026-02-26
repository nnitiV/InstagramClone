import Link from 'next/link'

export default function SwitchAccountModal() {
    return (
        <div className="modal fade" id="switchAccountModal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content rounded-5">
                    <div className="modal-header d-flex justify-content-center position-relative">
                        <p className="modal-title fs-5">Switch Accounts</p>
                        <button type="button" className="btn-close position-absolute" style={{ right: 25 }} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-2 px-2">
                        <div className="d-flex justify-content-between align-items-center m-0">
                            <div className="p-1 rounded-circle position-relative me-2 d-flex align-items-center">
                                <img
                                    src={"https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                                    alt="Story"
                                    className="rounded-circle"
                                    style={{ width: "38px", height: "38px", objectFit: "cover", }}
                                />
                                <p className="m-0 ms-2">username</p>
                            </div>
                            <i className="bi bi-patch-check fs-4"></i>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link href={"#"} className="icon-link text-decoration-none w-100 d-flex justify-content-center">
                            Log into an Existing Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
