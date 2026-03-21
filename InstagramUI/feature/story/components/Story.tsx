type StoryProps = {
  username: string;
};

export default function Story({ username }: StoryProps) {
  return (
    <>
      <div className="h-100 align-items-center m-3 d-none d-md-flex">
        <button type="button" className="bg-transparent border-0 p-3">
          <i className="bi bi-arrow-left-circle-fill fs-4" style={{ color: "rgba(235,235,235,0.75)" }}></i>
        </button>
      </div>
      
      <div
        className="card p-0 m-0 border-0"
        style={{
          width: "100%", maxWidth: "400px",
          height: "90vh",
          backgroundImage:
            "url('https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card-body text-white d-flex flex-column justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex gap-1 px-2 pt-3 mb-2">
              <div
                className="bg-white rounded"
                style={{ height: "2px", flex: 1 }}
              ></div>
            </div>{" "}
            <div className="d-flex justify-content-between align-items-center px-2">
              <div className="d-flex align-items-center">
                <img
                  src="https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg"
                  alt="Profile picture"
                  className="rounded-circle border m-0 p-0 me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="text-start">
                  <p className="card-title m-0 p-0 fs-4">
                    {username} <span className="text-secondary">17h</span>
                  </p>
                  <p className="p-0 m-0 fw-normal">Song name</p>
                </div>
              </div>
              <div className="fs-4 w-25 d-flex justify-content-between">
                <i className="bi bi-volume-up"></i>
                <i className="bi bi-play"></i>
                <i className="bi bi-three-dots"></i>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-around fs-4">
            <input
              type="text"
              style={{ background: "rgba(25,25,25, .25)" }}
              className="form-control transparent-input border-0 text-white rounded-4 w-75 text-truncate"
              placeholder={`Reply to ${username}...`}
              aria-label="Reply to story"
            />
            <i className="bi bi-heart"></i>
            <i className="bi bi-send"></i>
          </div>
        </div>
      </div>
      <div className="h-100 d-flex align-items-center m-3">
        <button>
          <i
            className="bi bi-arrow-right-circle-fill fs-4"
            style={{ color: "rgba(235,235,235,0.75)" }}
          ></i>
        </button>
      </div>
    </>
  );
}
