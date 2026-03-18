type InstagramLogoProps = {
    isIcon: boolean;
}

export default function InstagramLogo({isIcon} : InstagramLogoProps) {
    if(isIcon) return (
        <i className="bi-instagram"></i>
    )
    return (
        <i data-visualcompletion="css-img" aria-label="Instagram" className="position-absolute" role="img"
            style={{
                backgroundImage: "url('https://static.cdninstagram.com/rsrc.php/v4/ya/r/7RjayfbZ-nN.png')",
                backgroundPosition: "0px 0px",
                backgroundSize: "auto",
                width: "103px",
                height: "29px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
                top: 35, left: 50
            }}></i>
    )
}
