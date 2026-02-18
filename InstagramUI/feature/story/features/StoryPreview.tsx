type StoryPreviewProps = { 
    username: string
}
export default function StoryPreview({username} : StoryPreviewProps) {
  return (
    <div className="card p-0 m-0 border-0 position-absolute"
        style={{
          right: 400,
          width: "13vw", height: "50vh", backgroundImage: "url('https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg')",
          backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
        }}>
        <div className="card-body text-white d-flex flex-column align-items-center justify-content-center" style={{ background: "rgba(25,25,25,0.5)" }}>
          <img src="https://wallpapers.com/images/featured/anime-iphone-psdmm565oizldbbg.jpg" alt="Profile picture"
            className="rounded-circle border m-0 p-0 me-2 mb-2" style={{ width: "48px", height: "48px", objectFit: "cover" }} />
          <p className="card-title m-0 p-0 mb-2">{username} <span className="text-secondary">17h</span></p>
          <p className="p-0 m-0 fw-normal">Song name</p>
        </div>
      </div>
  )
}
