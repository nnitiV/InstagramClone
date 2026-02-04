"use client";

import { useState } from "react";

type PostMediaProps = {
    contentUrls: string[];
};

export default function PostMedia({ contentUrls }: PostMediaProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMultiple = contentUrls.length > 1;

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentIndex < contentUrls.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="ratio ratio-1x1 bg-light border rounded overflow-hidden position-relative">
            <img
                src={contentUrls[currentIndex] || "https://placehold.co/600x600?text=No+Image"}
                className="object-fit-cover w-100 h-100"
                alt={`Post content ${currentIndex + 1}`}
            />
            {hasMultiple && (
                <>
                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y ms-2 d-flex align-items-center justify-content-center"
                            style={{ width: "30px", height: "30px", opacity: 0.8 }}
                        >
                            <i className="bi bi-chevron-left small"></i>
                        </button>
                    )}
                    {currentIndex < contentUrls.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center"
                            style={{ width: "30px", height: "30px", opacity: 0.8 }}
                        >
                            <i className="bi bi-chevron-right small"></i>
                        </button>
                    )}
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
                        {contentUrls.map((_, idx) => (
                            <div
                                key={idx}
                                className={`rounded-circle ${idx === currentIndex ? "bg-primary" : "bg-white opacity-50"}`}
                                style={{ width: "6px", height: "6px", transition: "all 0.2s" }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}