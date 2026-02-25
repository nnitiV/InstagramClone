import React from 'react'
import { USER_PROFILE_MOCK } from '../constants/data'

export default function Highlights() {
    return (
        <div className="profile-highlights mt-5 w-75 mx-auto d-flex">
            {USER_PROFILE_MOCK.highlights.map((highlight, _) => (
                <div className="transparent-background-hover-2 d-flex flex-column text-center me-3 cursor-pointer" style={{ width: "fit-content" }}>
                    <img className="rounded-circle border border-5" style={{ width: "96px", height: "96px" }} src={highlight.cover ? highlight.cover : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"} alt="" />
                    <p className="p-0 m-0">{highlight.name}</p>
                </div>
            ))}
        </div>
    )
}
