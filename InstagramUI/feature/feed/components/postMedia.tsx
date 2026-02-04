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
        e.stopPropagation();
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentIndex < contentUrls.length - 1) setCurrentIndex((prev) => prev + 1);
    };

    return (
        <div
            className="bg-dark border rounded overflow-hidden position-relative d-flex align-items-center justify-content-center"
            style={{
                width: '100%',
                aspectRatio: '1 / 1',
                minHeight: '200px'
            }}
        >
            <img
                src={contentUrls[currentIndex] || "https://placehold.co/600x600?text=No+Image"}
                className="w-100 h-100 object-fit-cover position-absolute"
                alt={`Post content ${currentIndex + 1}`}
                style={{ zIndex: 1, top: 0, left: 0 }}
            />

            {hasMultiple && (
                <>
                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center position-absolute"
                            style={{
                                width: "30px",
                                height: "30px",
                                opacity: 0.8,
                                zIndex: 10,
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <i className="bi bi-chevron-left small text-dark"></i>
                        </button>
                    )}
                    {currentIndex < contentUrls.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center position-absolute"
                            style={{
                                width: "30px",
                                height: "30px",
                                opacity: 0.8,
                                zIndex: 10,
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <i className="bi bi-chevron-right small text-dark"></i>
                        </button>
                    )}
                    <div
                        className="d-flex gap-1 position-absolute"
                        style={{
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10
                        }}
                    >
                        {contentUrls.map((_, idx) => (
                            <div
                                key={idx}
                                className="rounded-circle"
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    transition: "all 0.2s",
                                    backgroundColor: idx === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                                    boxShadow: "0px 0px 2px rgba(0,0,0,0.5)"
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
