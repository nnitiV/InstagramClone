import Link from "next/link";
import SwitchAccountModal from "./SwitchAccountModal";

export default function SearchPage() {
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center" style={{ width: "20vw" }}>
                    <div className="header">
                        <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">username</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: "80vw" }}>remaining</div>
            </div>
            <SwitchAccountModal />
        </>
    )
};

