type MessageSidebarHeaderProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function MessageSidebarHeader({searchText, setSearchText}: MessageSidebarHeaderProps) {
    return (
        <div className="header" style={{ width: "90%" }}>
            <div className="d-flex justify-content-between px-2 pe-0">
                <p data-bs-toggle="modal" data-bs-target="#switchAccountModal">Username</p>
                <i className="bi bi-pencil-square"></i>
            </div>
            <div className="input-group mb-1">
                <span className="input-group-text rounded-start-5 border-end-0" id="basic-addon1"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control border-start-0 rounded-end-5 shadow-none border" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
        </div>
    )
}
