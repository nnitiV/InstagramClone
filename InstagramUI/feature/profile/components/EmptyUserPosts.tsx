import Link from "next/link";

type EmptyUserPosts = {
    isLoggedUser: boolean;
}

export default function EmptyUserPosts({ isLoggedUser }: EmptyUserPosts) {
    if (!isLoggedUser) return (
        <div className="d-flex flex-column align-items-center justify-content-center h-75 text-center w-75 mx-auto">
            <div className="rounded-circle border border-2 border-dark d-flex align-items-center justify-content-center mb-4"
                style={{ width: "100px", height: "100px" }}>
                <i className="bi bi-camera fs-1"></i>
            </div>
            <h2 className="fw-light mb-2">Welcome to Instagram</h2>
            <p className="text-muted mb-4" style={{ maxWidth: "350px" }}>
                When you post, you'll see his photos and videos here when he/she posts some.
            </p>
        </div>
    )
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center h-75 text-center w-75 mx-auto">
                <div className="rounded-circle border border-2 border-dark d-flex align-items-center justify-content-center mb-4"
                    style={{ width: "100px", height: "100px" }}>
                    <i className="bi bi-camera fs-1"></i>
                </div>
                <h2 className="fw-light mb-2">Welcome to Instagram</h2>
                <p className="text-muted mb-4" style={{ maxWidth: "350px" }}>
                    When you post, you'll see your photos and videos here.
                </p>
                <div className="d-grid gap-2 col-10 col-sm-6 col-md-4" data-bs-target="#createModal" data-bs-toggle="modal">
                    <Link href="#" className="btn btn-primary btn-sm fw-semibold">
                        Post now
                    </Link>
                </div>
            </div>
        </>
    );
}