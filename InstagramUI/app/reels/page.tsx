"use client";

import { REELS_MOCK } from "@/feature/reels/constants/data";
import SingleReel from "../../feature/reels/components/SingleReel";

export default function ReelsPage() {
    return (
        <div className="d-flex flex-column align-items-center overflow-y-auto h-100 mt-3 scrollbar-invisible"
            style={{ scrollSnapType: "y mandatory", }}>
            {REELS_MOCK.map((reel, _) => (
                <SingleReel key={reel.id} reel={reel} />
            ))}
        </div>
    )
};

