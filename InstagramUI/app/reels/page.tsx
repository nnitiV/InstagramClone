export default function ReelsPage() {
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="w-50 d-flex">
                <div className="d-flex justify-content-center align-items-center rounded rounded-3" style={{background: "rgba(125,125,125,0.5)", width: "27vw", height: "95vh"}}>
                </div>
                <ul className="d-flex flex-column justify-content-end align-items-center px-4 list-unstyled">
                    <li className="d-flex flex-column align-items-center cursor-pointer">
                        <i className="bi bi-heart fs-5 m-0 p-0"></i>
                        <span className="p-0 m-0">365</span>
                    </li>
                    <li className="d-flex flex-column align-items-center mt-3 cursor-pointer">
                        <i className="bi bi-chat flip-horizontal fs-5 m-0 p-0"></i>
                        <span className="p-0 m-0">365</span>
                    </li>
                    <li className="mt-3 cursor-pointer">
                        <i className="bi bi-send fs-5 m-0 p-0"></i>
                    </li>
                    <li className="mt-3 cursor-pointer">
                        <i className="bi bi-bookmark fs-5 m-0 p-0"></i>
                    </li>
                    <li className="mt-3 cursor-pointer">
                        <i className="bi bi-three-dots fs-5 m-0 p-0"></i>
                    </li>
                    <li className="mt-3 cursor-pointer">
                        <i className="bi bi-person-circle fs-5 m-0 p-0"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
};

