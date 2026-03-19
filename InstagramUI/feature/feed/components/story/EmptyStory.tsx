export default function EmptyStory() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 border-bottom py-4 text-muted">
            <p className="mb-0 small d-flex align-items-center">
                <i className="bi bi-people me-2 fs-5"></i>
                No stories available
            </p>
            <button 
                type="button"
                className="btn btn-link btn-sm text-decoration-none fw-bold p-0"
                data-bs-toggle="modal"
                data-bs-target="#createStory"
            >
                Create your story
            </button>
        </div>
    );
}