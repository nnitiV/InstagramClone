import SearchOffset from "@/components/layout/SearchOffset";
import Link from "next/link";

export default function EmptyPost() {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-5">
        <div
          className="rounded-circle border border-2 border-dark d-flex align-items-center justify-content-center mb-4"
          style={{ width: "100px", height: "100px" }}
        >
          <i className="bi bi-camera fs-1"></i>
        </div>
        <h2 className="fw-light mb-2">Welcome to Instagram</h2>
        <p className="text-muted mb-4" style={{ maxWidth: "350px" }}>
          When you follow people, you'll see the photos and videos they post
          here.
        </p>
        <div className="d-grid gap-2 col-10 col-sm-6 col-md-4">
          <Link href="#" className="btn btn-primary btn-sm fw-semibold" data-bs-target="#searchOffcanvas" data-bs-toggle="offcanvas">
            Find People to Follow
          </Link>
        </div>
      </div>
      <SearchOffset />
    </>
  );
}
