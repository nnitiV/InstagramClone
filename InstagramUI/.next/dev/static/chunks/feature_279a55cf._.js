(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/feature/feed/components/post/PostMedia.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostMedia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const isVideo = (url)=>{
    return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
};
function PostMedia({ contentUrls, postIndex = 0, hasSelectedPost = false, isModal = false }) {
    _s();
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(hasSelectedPost);
    const [isInViewport, setIsInViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const carouselId = isModal ? 'postMediaCarousel-modal' : `postMediaCarousel-${postIndex}`;
    // Load mute setting from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const stored = localStorage.getItem('globalVideoMute');
                if (stored !== null) {
                    setIsMuted(stored !== 'false');
                }
            }
        }
    }["PostMedia.useEffect"], []);
    const toggleMute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PostMedia.useCallback[toggleMute]": (e)=>{
            e?.stopPropagation();
            e?.preventDefault();
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('globalVideoMute', newMutedState.toString());
            }
            videoRefs.current.forEach({
                "PostMedia.useCallback[toggleMute]": (video)=>{
                    if (video) video.muted = newMutedState;
                }
            }["PostMedia.useCallback[toggleMute]"]);
        }
    }["PostMedia.useCallback[toggleMute]"], [
        isMuted
    ]);
    const togglePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PostMedia.useCallback[togglePlay]": (e)=>{
            e?.stopPropagation();
            e?.preventDefault();
            setIsPlaying({
                "PostMedia.useCallback[togglePlay]": (prev)=>!prev
            }["PostMedia.useCallback[togglePlay]"]);
        }
    }["PostMedia.useCallback[togglePlay]"], []);
    // Intersection Observer for auto-play/pause
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            const currentElement = carouselRef.current;
            if (!currentElement) return;
            observerRef.current = new IntersectionObserver({
                "PostMedia.useEffect": ([entry])=>{
                    const fullyVisible = entry.intersectionRatio >= 1.0;
                    setIsInViewport(fullyVisible);
                    if (fullyVisible && !isModal) {
                        setIsPlaying(true);
                    } else if (!isModal) {
                        videoRefs.current.forEach({
                            "PostMedia.useEffect": (video)=>{
                                if (video) video.pause();
                            }
                        }["PostMedia.useEffect"]);
                        setIsPlaying(false);
                    }
                }
            }["PostMedia.useEffect"], {
                threshold: 1.0,
                rootMargin: '0px'
            });
            observerRef.current.observe(currentElement);
            return ({
                "PostMedia.useEffect": ()=>observerRef.current?.disconnect()
            })["PostMedia.useEffect"];
        }
    }["PostMedia.useEffect"], [
        isModal
    ]);
    // Control active video playback
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            const currentVideo = videoRefs.current[contentUrls?.length === 1 ? 0 : activeIndex];
            if (!currentVideo) return;
            if (!isInViewport && !isModal) {
                currentVideo.pause();
                return;
            }
            if (hasSelectedPost && !isModal) {
                currentVideo.pause();
            } else if (isPlaying) {
                currentVideo.play().catch({
                    "PostMedia.useEffect": ()=>{}
                }["PostMedia.useEffect"]);
            } else {
                currentVideo.pause();
            }
        }
    }["PostMedia.useEffect"], [
        isPlaying,
        hasSelectedPost,
        activeIndex,
        contentUrls?.length,
        isInViewport,
        isModal
    ]);
    // Sync mute state to all videos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            videoRefs.current.forEach({
                "PostMedia.useEffect": (video)=>{
                    if (video) video.muted = isMuted;
                }
            }["PostMedia.useEffect"]);
        }
    }["PostMedia.useEffect"], [
        isMuted
    ]);
    // Global mute sync across tabs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            const handleStorageChange = {
                "PostMedia.useEffect.handleStorageChange": (e)=>{
                    if (e.key === 'globalVideoMute' && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                        const newMuteState = e.newValue !== 'false';
                        setIsMuted(newMuteState);
                        videoRefs.current.forEach({
                            "PostMedia.useEffect.handleStorageChange": (video)=>{
                                if (video) video.muted = newMuteState;
                            }
                        }["PostMedia.useEffect.handleStorageChange"]);
                    }
                }
            }["PostMedia.useEffect.handleStorageChange"];
            const checkStorage = {
                "PostMedia.useEffect.checkStorage": ()=>{
                    if ("TURBOPACK compile-time truthy", 1) {
                        const stored = localStorage.getItem('globalVideoMute');
                        if (stored !== null && stored !== isMuted.toString()) {
                            const muteState = stored !== 'false';
                            setIsMuted(muteState);
                            videoRefs.current.forEach({
                                "PostMedia.useEffect.checkStorage": (video)=>{
                                    if (video) video.muted = muteState;
                                }
                            }["PostMedia.useEffect.checkStorage"]);
                        }
                    }
                }
            }["PostMedia.useEffect.checkStorage"];
            window.addEventListener('storage', handleStorageChange);
            const interval = setInterval(checkStorage, 100);
            return ({
                "PostMedia.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorageChange);
                    clearInterval(interval);
                }
            })["PostMedia.useEffect"];
        }
    }["PostMedia.useEffect"], [
        isMuted
    ]);
    // Track carousel slide changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostMedia.useEffect": ()=>{
            const handleSlide = {
                "PostMedia.useEffect.handleSlide": (e)=>{
                    const carousel = window.bootstrap?.Carousel?.getInstance(carouselRef.current);
                    if (carousel && carousel._activeElement) {
                        const newIndex = Array.from(carouselRef.current.querySelectorAll('.carousel-item')).indexOf(carousel._activeElement);
                        if (newIndex !== -1) {
                            setActiveIndex(newIndex);
                            videoRefs.current.forEach({
                                "PostMedia.useEffect.handleSlide": (video, i)=>{
                                    if (video && i !== newIndex) video.pause();
                                }
                            }["PostMedia.useEffect.handleSlide"]);
                        }
                    }
                }
            }["PostMedia.useEffect.handleSlide"];
            const carousel = carouselRef.current;
            if (carousel) {
                carousel.addEventListener('slid.bs.carousel', handleSlide);
                return ({
                    "PostMedia.useEffect": ()=>carousel.removeEventListener('slid.bs.carousel', handleSlide)
                })["PostMedia.useEffect"];
            }
        }
    }["PostMedia.useEffect"], []);
    if (!contentUrls?.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-100 h-100 bg-dark d-flex align-items-center justify-content-center text-white fs-6",
            children: "No media"
        }, void 0, false, {
            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
            lineNumber: 170,
            columnNumber: 12
        }, this);
    }
    const VolumeIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "d-flex align-items-center justify-content-center w-100 h-100",
            children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4.5 5.5L17.5 18.5M19.5 5.5L6.5 18.5",
                        stroke: "white",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
            lineNumber: 174,
            columnNumber: 5
        }, this);
    const PlayOverlay = ()=>{
        if (isPlaying || !isInViewport && !isModal) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "position-absolute top-50 start-50 translate-middle text-white shadow",
            style: {
                opacity: 0.8,
                pointerEvents: 'none',
                zIndex: 10
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "64",
                height: "64",
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
            lineNumber: 191,
            columnNumber: 7
        }, this);
    };
    // Single media
    if (contentUrls.length === 1) {
        const url = contentUrls[0];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-100 h-100 position-relative",
            ref: carouselRef,
            children: isVideo(url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: (el)=>{
                            if (el) videoRefs.current[0] = el;
                        },
                        className: "w-100 h-100 object-fit-contain",
                        src: "http://localhost:5000/" + url,
                        muted: isMuted,
                        loop: true,
                        playsInline: true,
                        preload: "auto",
                        onClick: togglePlay,
                        style: {
                            cursor: 'pointer'
                        }
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 206,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayOverlay, {}, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "position-absolute btn p-0 bg-black bg-opacity-75 text-white rounded-circle border-0 shadow-lg",
                        style: {
                            width: '48px',
                            height: '48px',
                            right: '20px',
                            bottom: '20px',
                            zIndex: 10
                        },
                        onClick: toggleMute,
                        title: isMuted ? "Ativar som" : "Silenciar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VolumeIcon, {}, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                            lineNumber: 224,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "http://localhost:5000/" + url,
                className: "w-100 h-100 object-fit-contain",
                alt: "Post media"
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 228,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
            lineNumber: 203,
            columnNumber: 7
        }, this);
    }
    // Carousel
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: carouselId,
        className: "carousel bg-dark slide h-100 w-100 position-relative",
        "data-bs-interval": "false",
        "data-bs-wrap": "true",
        ref: carouselRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "position-absolute btn p-0 bg-black bg-opacity-75 text-white rounded-circle border-0 shadow-lg",
                style: {
                    width: '48px',
                    height: '48px',
                    right: '20px',
                    bottom: '20px',
                    zIndex: 10
                },
                onClick: toggleMute,
                title: isMuted ? "Ativar som" : "Silenciar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VolumeIcon, {}, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "carousel-indicators position-absolute start-50 translate-middle-x mx-auto",
                style: {
                    display: contentUrls.length > 1 ? 'flex' : 'none',
                    bottom: '30px',
                    zIndex: 5
                },
                children: contentUrls.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "data-bs-target": `#${carouselId}`,
                        "data-bs-slide-to": index.toString(),
                        className: `rounded-circle ${index === activeIndex ? 'active bg-white' : 'bg-white bg-opacity-50'}`,
                        style: {
                            width: '10px',
                            height: '10px',
                            margin: '0 4px'
                        }
                    }, index, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "carousel-inner h-100 w-100",
                children: contentUrls.map((url, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `carousel-item h-100 ${index === 0 ? 'active' : ''}`,
                        children: isVideo(url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "position-relative w-100 h-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                    ref: (el)=>{
                                        if (el) videoRefs.current[index] = el;
                                    },
                                    src: "http://localhost:5000/" + url,
                                    className: "object-fit-contain w-100 h-100",
                                    muted: isMuted,
                                    playsInline: true,
                                    preload: index === 0 ? "auto" : "metadata",
                                    loop: true,
                                    onClick: togglePlay,
                                    style: {
                                        cursor: 'pointer'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                                    lineNumber: 273,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayOverlay, {}, void 0, false, {
                                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                                    lineNumber: 284,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                            lineNumber: 272,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "http://localhost:5000/" + url,
                            className: "w-100 h-100 object-fit-contain",
                            alt: `Post media ${index + 1}`
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                            lineNumber: 287,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "carousel-control-prev",
                type: "button",
                "data-bs-target": `#${carouselId}`,
                "data-bs-slide": "prev",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "carousel-control-prev-icon bg-black bg-opacity-50 rounded-circle",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "carousel-control-next",
                type: "button",
                "data-bs-target": `#${carouselId}`,
                "data-bs-slide": "next",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "carousel-control-next-icon bg-black bg-opacity-50 rounded-circle",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/feature/feed/components/post/PostMedia.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s(PostMedia, "gCIx249NaIo3TuhlKZ/xkXvt9js=");
_c = PostMedia;
var _c;
__turbopack_context__.k.register(_c, "PostMedia");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/services/data:63e598 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "likePost",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40cac4b4953ad9a8004d6ec48d6cfb28dd43f764d6":"likePost"},"feature/feed/services/feed.service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40cac4b4953ad9a8004d6ec48d6cfb28dd43f764d6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "likePost");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmVlZC5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9ST1VURV9VUkwgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgZ2V0TG9nZ2VkVXNlclRva2VuIH0gZnJvbSBcIkAvZmVhdHVyZS9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQb3N0Q29tbWVudCB9IGZyb20gXCJAL3R5cGVzL2ZlZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9zdG9yeWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RvcmllcyAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9wb3N0L2ZlZWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9zdENvbW1lbnRzID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9jb21tZW50L2FsbENvbW1lbnRzLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQb3N0Q29tbWVudHMgPSBhc3luYyAobmV3Q29tbWVudDogUG9zdENvbW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vY29tbWVudGAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb3N0TGlrZUNvdW50ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9L2NvdW50YCk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocG9zdElkOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1bmxpa2VQb3N0ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFTRV9ST1VURV9VUkx9L3Bvc3RMaWtlLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImtTQXNGYSxxTEFBQSJ9
}),
"[project]/feature/feed/services/data:c7f687 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unlikePost",
    ()=>$$RSC_SERVER_ACTION_6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"405583d5b1fe394d9f993333bc697d6e7a193e73ad":"unlikePost"},"feature/feed/services/feed.service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("405583d5b1fe394d9f993333bc697d6e7a193e73ad", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "unlikePost");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmVlZC5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9ST1VURV9VUkwgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgZ2V0TG9nZ2VkVXNlclRva2VuIH0gZnJvbSBcIkAvZmVhdHVyZS9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQb3N0Q29tbWVudCB9IGZyb20gXCJAL3R5cGVzL2ZlZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9zdG9yeWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RvcmllcyAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9wb3N0L2ZlZWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9zdENvbW1lbnRzID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9jb21tZW50L2FsbENvbW1lbnRzLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQb3N0Q29tbWVudHMgPSBhc3luYyAobmV3Q29tbWVudDogUG9zdENvbW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vY29tbWVudGAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb3N0TGlrZUNvdW50ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9L2NvdW50YCk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocG9zdElkOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1bmxpa2VQb3N0ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFTRV9ST1VURV9VUkx9L3Bvc3RMaWtlLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im9TQXVHYSx1TEFBQSJ9
}),
"[project]/feature/feed/components/post/PostActions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$63e598__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/feed/services/data:63e598 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$c7f687__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/feed/services/data:c7f687 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PostActions({ postId, initialIsLiked, initialLikeCount, initialIsSaved = false, onCommentClick }) {
    _s();
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIsLiked);
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLikeCount);
    const [commentCount, setCommentCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIsSaved);
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLike = async ()=>{
        if (!isLiked) {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$63e598__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["likePost"])(postId);
            if (res) {
                setIsLiked(true);
                setLikeCount((prev)=>prev + 1);
                setIsAnimating(true);
                setTimeout(()=>setIsAnimating(false), 300);
            }
        } else {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$c7f687__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["unlikePost"])(postId);
            if (res) {
                setIsLiked(false);
                setLikeCount((prev)=>prev - 1);
            }
        }
    };
    const handleSave = async ()=>{
        setIsSaved(!isSaved);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "d-flex align-items-center mt-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "d-flex align-items-center me-3 cursor-pointer",
                    onClick: handleLike,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"} fs-4`,
                            style: {
                                transform: isAnimating ? "scale(1.2)" : "scale(1)",
                                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this),
                        likeCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ms-2 fw-semibold",
                            children: likeCount
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                    lineNumber: 53,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "d-flex align-items-center me-3 cursor-pointer",
                    onClick: onCommentClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "bi bi-chat fs-4"
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                            lineNumber: 66,
                            columnNumber: 21
                        }, this),
                        commentCount > 0 && commentCount
                    ]
                }, void 0, true, {
                    fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "bi bi-send fs-4"
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                    lineNumber: 68,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ms-auto cursor-pointer",
                    onClick: handleSave,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: `bi ${isSaved ? "bi-bookmark-fill text-dark" : "bi-bookmark"} fs-4`
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostActions.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/feature/feed/components/post/PostActions.tsx",
            lineNumber: 52,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_s(PostActions, "uaigowCthtlOiTaIyw5+TJRhgBs=");
_c = PostActions;
var _c;
__turbopack_context__.k.register(_c, "PostActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/comment/CommentItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const CommentItem = ({ commentTree, onReplyClick, isReplying = false, replyText = '', onReplyChange, onPostReply, onCancelReply })=>{
    const comment = commentTree.comment;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "d-flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "http://localhost:5000/" + comment.profilePictureUrl || "https://via.placeholder.com/32?text=👤",
                        className: "rounded-circle me-2",
                        style: {
                            width: "32px",
                            height: "32px"
                        },
                        alt: `${comment.username}'s profile`
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "small mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fw-bold me-2",
                                        children: comment.username
                                    }, void 0, false, {
                                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                        lineNumber: 36,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    comment.text
                                ]
                            }, void 0, true, {
                                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "d-flex align-items-center gap-2 small text-muted",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: new Date(comment.createdAt).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                        lineNumber: 40,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !isReplying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-link p-0 text-muted small fw-normal",
                                        onClick: ()=>onReplyClick(comment.id),
                                        children: "Reply"
                                    }, void 0, false, {
                                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                        lineNumber: 42,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                lineNumber: 39,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isReplying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ms-5 mt-2 p-2 bg-light rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        className: "form-control form-control-sm mb-1",
                        placeholder: "Write a reply...",
                        value: replyText,
                        onChange: (e)=>onReplyChange?.(e.target.value),
                        autoFocus: true
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                        lineNumber: 55,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "d-flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-sm btn-primary",
                                onClick: onPostReply,
                                children: "Post"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-sm btn-outline-secondary",
                                onClick: onCancelReply,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                                lineNumber: 67,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
                lineNumber: 54,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/feature/feed/components/comment/CommentItem.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CommentItem;
const __TURBOPACK__default__export__ = CommentItem;
var _c;
__turbopack_context__.k.register(_c, "CommentItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/comment/CommentList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/comment/CommentItem.tsx [app-client] (ecmascript)");
"use client";
;
;
const CommentsList = ({ comments, replyTarget, replyText, onReplyClick, onReplyChange, onPostReply, onCancelReply })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: comments.map((commentTree)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        commentTree: commentTree,
                        onReplyClick: onReplyClick,
                        isReplying: replyTarget === commentTree.comment.id,
                        replyText: replyText || '',
                        onReplyChange: onReplyChange,
                        onPostReply: onPostReply,
                        onCancelReply: onCancelReply
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/comment/CommentList.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    commentTree.replies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-start border-2 ms-3 ps-3 bg-light rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentsList, {
                            comments: commentTree.replies,
                            replyTarget: replyTarget,
                            replyText: replyText,
                            onReplyClick: onReplyClick,
                            onReplyChange: onReplyChange,
                            onPostReply: onPostReply,
                            onCancelReply: onCancelReply
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/comment/CommentList.tsx",
                            lineNumber: 38,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/comment/CommentList.tsx",
                        lineNumber: 37,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, commentTree.comment.id, true, {
                fileName: "[project]/feature/feed/components/comment/CommentList.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false);
_c = CommentsList;
const __TURBOPACK__default__export__ = CommentsList;
var _c;
__turbopack_context__.k.register(_c, "CommentsList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/services/data:79a51b [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addPostComments",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"402e8ac5b7bf275579a64fb47b19e57420ec27856e":"addPostComments"},"feature/feed/services/feed.service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("402e8ac5b7bf275579a64fb47b19e57420ec27856e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addPostComments");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmVlZC5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9ST1VURV9VUkwgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgZ2V0TG9nZ2VkVXNlclRva2VuIH0gZnJvbSBcIkAvZmVhdHVyZS9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQb3N0Q29tbWVudCB9IGZyb20gXCJAL3R5cGVzL2ZlZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9zdG9yeWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RvcmllcyAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9wb3N0L2ZlZWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9zdENvbW1lbnRzID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9jb21tZW50L2FsbENvbW1lbnRzLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQb3N0Q29tbWVudHMgPSBhc3luYyAobmV3Q29tbWVudDogUG9zdENvbW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vY29tbWVudGAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb3N0TGlrZUNvdW50ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9L2NvdW50YCk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocG9zdElkOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1bmxpa2VQb3N0ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFTRV9ST1VURV9VUkx9L3Bvc3RMaWtlLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQTREYSw0TEFBQSJ9
}),
"[project]/feature/feed/services/data:a268e6 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPostComments",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40310a1ff3e2b55716d8250667bc67a2c0662d5c64":"getPostComments"},"feature/feed/services/feed.service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40310a1ff3e2b55716d8250667bc67a2c0662d5c64", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getPostComments");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmVlZC5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9ST1VURV9VUkwgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgZ2V0TG9nZ2VkVXNlclRva2VuIH0gZnJvbSBcIkAvZmVhdHVyZS9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQb3N0Q29tbWVudCB9IGZyb20gXCJAL3R5cGVzL2ZlZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9zdG9yeWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RvcmllcyAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9wb3N0L2ZlZWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9zdENvbW1lbnRzID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9jb21tZW50L2FsbENvbW1lbnRzLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQb3N0Q29tbWVudHMgPSBhc3luYyAobmV3Q29tbWVudDogUG9zdENvbW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vY29tbWVudGAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb3N0TGlrZUNvdW50ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9L2NvdW50YCk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocG9zdElkOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1bmxpa2VQb3N0ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFTRV9ST1VURV9VUkx9L3Bvc3RMaWtlLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InlTQTBDYSw0TEFBQSJ9
}),
"[project]/feature/auth/services/data:b329bb [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLoggedUserInfo",
    ()=>$$RSC_SERVER_ACTION_6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"003c3b3db0470842dc30c317f2322197bcc3e2784c":"getLoggedUserInfo"},"feature/auth/services/auth-service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("003c3b3db0470842dc30c317f2322197bcc3e2784c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getLoggedUserInfo");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYXV0aC1zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5pbXBvcnQgeyBCQVNFX1JPVVRFX1VSTCwgdG9rZW5OYW1lIH0gZnJvbSBcIkAvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCJcclxuaW1wb3J0IHsgUmVnaXN0ZXJVc2VyLCBUb2tlblBheWxvYWQgfSBmcm9tIFwiLi4vLi4vLi4vdHlwZXMvYXV0aFwiO1xyXG5pbXBvcnQgeyBqd3REZWNvZGUgfSBmcm9tIFwiand0LWRlY29kZVwiO1xyXG5pbXBvcnQgeyByZWRpcmVjdCB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuaW1wb3J0IHsgRWRpdFVzZXJQcm9maWxlIH0gZnJvbSBcIkAvdHlwZXMvdXNlclwiO1xyXG5cclxuY29uc3Qgcm91dGUgPSBcIi9hdXRoXCJcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2dpbiA9IGFzeW5jIChsb2dpbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCByZW1lbWJlck1lOiBib29sZWFuKSA9PiB7XHJcbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfSR7cm91dGV9L2xvZ2luYCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBsb2dpbiwgcGFzc3dvcmQsIHJlbWVtYmVyTWUgfSksXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJMb2dpbiBmYWlsZWRcIjtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzLnRleHQoKTtcclxuICAgICAgICBjb25zdCBlcnJvciA9IEpTT04ucGFyc2UodGV4dCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLk1lc3NhZ2UgKyBcIiBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcbiAgICBpZiAocmVtZW1iZXJNZSkge1xyXG4gICAgICAgIGNvbnN0IGRlY29kZSA9IGp3dERlY29kZTxUb2tlblBheWxvYWQ+KGRhdGEudG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZURhdGUgPSBuZXcgRGF0ZShkZWNvZGUuZXhwICogMTAwMCk7XHJcbiAgICAgICAgY29va2llU3RvcmUuc2V0KHtcclxuICAgICAgICAgICAgbmFtZTogdG9rZW5OYW1lLFxyXG4gICAgICAgICAgICBodHRwT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IGRhdGEudG9rZW4sXHJcbiAgICAgICAgICAgIGV4cGlyZXM6IGV4cGlyZURhdGVcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29va2llU3RvcmUuc2V0KHtcclxuICAgICAgICAgICAgbmFtZTogdG9rZW5OYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGF0YS50b2tlbixcclxuICAgICAgICAgICAgaHR0cE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZVJlZ2lzdGVyID0gYXN5bmMgKHJlZ2lzdGVySW5mbzogUmVnaXN0ZXJVc2VyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0ke3JvdXRlfS9yZWdpc3RlcmAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlZ2lzdGVySW5mbyksXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzLnRleHQoKTtcclxuICAgICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5NZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gICAgY29va2llU3RvcmUuZGVsZXRlKHRva2VuTmFtZSk7XHJcbiAgICByZWRpcmVjdChcIi9sb2dpblwiKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzQXV0aGVudGljYXRlZCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gICAgY29uc3QgY29va2llID0gY29va2llU3RvcmUuZ2V0KHRva2VuTmFtZSk7XHJcbiAgICBjb25zdCB0b2tlbiA9IGNvb2tpZT8udmFsdWU7XHJcbiAgICByZXR1cm4gISF0b2tlbjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldExvZ2dlZFVzZXJUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gICAgY29uc3QgdG9rZW4gPSBjb29raWVTdG9yZS5nZXQodG9rZW5OYW1lKT8udmFsdWU7XHJcbiAgICByZXR1cm4gdG9rZW4gfHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldExvZ2dlZFVzZXJUb2tlbkluZm8gPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZVN0b3JlLmdldCh0b2tlbk5hbWUpO1xyXG4gICAgY29uc3QgdG9rZW4gPSBjb29raWU/LnZhbHVlO1xyXG4gICAgaWYgKHRva2VuID09IG51bGwpIHtcclxuICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgbG9nZ2VkIGluISFcIik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkZWNvZGUgPSBqd3REZWNvZGU8VG9rZW5QYXlsb2FkPih0b2tlbik7XHJcbiAgICByZXR1cm4gZGVjb2RlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TG9nZ2VkVXNlckluZm8gPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCB1c2VySWQgPSAoYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuSW5mbygpKT8uc3ViO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS91c2VyLyR7dXNlcklkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVVc2VyUHJvZmlsZSA9IGFzeW5jIChlZGl0VXNlcjogRWRpdFVzZXJQcm9maWxlKSA9PiB7XHJcbiAgICBjb25zdCB1c2VyVG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS91c2VyYCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZWRpdFVzZXIpLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnYXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt1c2VyVG9rZW59YCxcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChzZWxlY3RlZEZpbGU6IEZpbGUpID0+IHtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBzZWxlY3RlZEZpbGUpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9maWxlcy91cGxvYWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKX1gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBmb3JtRGF0YVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSByZXR1cm4gXCJcIjtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEudXJsO1xyXG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIyU0E0RmEsOExBQUEifQ==
}),
"[project]/feature/feed/components/comment/CommentModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommentModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/post/PostMedia.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/post/PostActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/comment/CommentList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$79a51b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/feed/services/data:79a51b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$a268e6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/feed/services/data:a268e6 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$b329bb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/auth/services/data:b329bb [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function CommentModal({ post, onClose, goToUser }) {
    _s();
    if (!post) return null;
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tree, setTree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [replyTarget, setReplyTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replyText, setReplyText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newCommentText, setNewCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const mediaContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const buildCommentTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommentModal.useCallback[buildCommentTree]": (comments)=>{
            const commentMap = {};
            const roots = [];
            comments.forEach({
                "CommentModal.useCallback[buildCommentTree]": (comment)=>{
                    commentMap[comment.id] = {
                        comment,
                        replies: []
                    };
                }
            }["CommentModal.useCallback[buildCommentTree]"]);
            comments.forEach({
                "CommentModal.useCallback[buildCommentTree]": (comment)=>{
                    const parentId = comment.parentCommentId;
                    if (parentId !== null && commentMap[parentId]) {
                        commentMap[parentId].replies.push(commentMap[comment.id]);
                    } else {
                        roots.push(commentMap[comment.id]);
                    }
                }
            }["CommentModal.useCallback[buildCommentTree]"]);
            return roots;
        }
    }["CommentModal.useCallback[buildCommentTree]"], []);
    const insertComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommentModal.useCallback[insertComment]": (tree, parentId, newComment)=>{
            for (const commentTree of tree){
                if (commentTree.comment.id === parentId) {
                    commentTree.replies.push(newComment);
                    return;
                }
                if (commentTree.replies.length > 0) {
                    insertComment(commentTree.replies, parentId, newComment);
                }
            }
        }
    }["CommentModal.useCallback[insertComment]"], []);
    const addReply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommentModal.useCallback[addReply]": async (parentId, text)=>{
            const userInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$b329bb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserInfo"])();
            const newComment = {
                id: Date.now(),
                text,
                postId: post.id,
                userId: userInfo.id,
                username: userInfo.username,
                profilePictureUrl: userInfo.profilePictureUrl,
                parentCommentId: null,
                createdAt: new Date().toISOString()
            };
            if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$79a51b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addPostComments"])(newComment)) {
                const newCommentTree = {
                    comment: newComment,
                    replies: []
                };
                setTree({
                    "CommentModal.useCallback[addReply]": (prevTree)=>{
                        const newTree = JSON.parse(JSON.stringify(prevTree));
                        insertComment(newTree, parentId, newCommentTree);
                        setComments({
                            "CommentModal.useCallback[addReply]": (prevComments)=>[
                                    ...prevComments,
                                    newComment
                                ]
                        }["CommentModal.useCallback[addReply]"]);
                        return newTree;
                    }
                }["CommentModal.useCallback[addReply]"]);
                setReplyTarget(null);
                setReplyText('');
            }
        }
    }["CommentModal.useCallback[addReply]"], [
        post.id,
        post.authorProfilePicture,
        insertComment
    ]);
    const addTopLevelComment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommentModal.useCallback[addTopLevelComment]": async (text)=>{
            const userInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$b329bb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserInfo"])();
            const newComment = {
                id: Date.now(),
                text,
                postId: post.id,
                userId: userInfo.id,
                username: userInfo.username,
                profilePictureUrl: userInfo.profilePictureUrl,
                parentCommentId: null,
                createdAt: new Date().toISOString()
            };
            if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$79a51b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addPostComments"])(newComment)) {
                setComments({
                    "CommentModal.useCallback[addTopLevelComment]": (prev)=>[
                            ...prev,
                            newComment
                        ]
                }["CommentModal.useCallback[addTopLevelComment]"]);
                setTree(buildCommentTree([
                    ...comments,
                    newComment
                ]));
                setNewCommentText('');
            }
        }
    }["CommentModal.useCallback[addTopLevelComment]"], [
        post.id,
        post.authorProfilePicture,
        comments,
        buildCommentTree
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentModal.useEffect": ()=>{
            const load = {
                "CommentModal.useEffect.load": async ()=>{
                    try {
                        const apiComments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$a268e6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getPostComments"])(post.id);
                        setComments(apiComments);
                        setTree(buildCommentTree(apiComments));
                    } catch (error) {
                        console.error('Failed to load comments:', error);
                    }
                }
            }["CommentModal.useEffect.load"];
            load();
        }
    }["CommentModal.useEffect"], [
        post.id,
        buildCommentTree
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentModal.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && mediaContainerRef.current) {
                const carouselElement = mediaContainerRef.current.querySelector('.carousel');
                if (carouselElement && !carouselElement.classList.contains('slide')) {
                    const bootstrap = window.bootstrap;
                    if (bootstrap && bootstrap.Carousel) {
                        new bootstrap.Carousel(carouselElement, {
                            interval: false,
                            wrap: true
                        });
                    }
                }
            }
        }
    }["CommentModal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "46fbe62aad4355ee",
                children: ".modal-media-col.jsx-46fbe62aad4355ee{flex-shrink:0;height:40vh;min-height:300px;max-height:60vh}@media (width>=768px){.modal-media-col.jsx-46fbe62aad4355ee{min-height:0;max-height:none;height:100%!important}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundColor: "rgba(0,0,0,0.7)"
                },
                onClick: onClose,
                className: "jsx-46fbe62aad4355ee" + " " + "modal show d-block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-46fbe62aad4355ee" + " " + "modal-dialog modal-xl modal-dialog-centered",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: "100vh",
                            maxHeight: "90vh",
                            borderRadius: "4px"
                        },
                        className: "jsx-46fbe62aad4355ee" + " " + "modal-content overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-46fbe62aad4355ee" + " " + "d-flex flex-column flex-md-row h-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: mediaContainerRef,
                                    className: "jsx-46fbe62aad4355ee" + " " + "col-12 col-md-7 bg-black d-flex align-items-center justify-content-center modal-media-col",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-46fbe62aad4355ee" + " " + "w-100 h-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            contentUrls: post.contentUrls,
                                            isModal: true,
                                            hasSelectedPost: true
                                        }, void 0, false, {
                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                            lineNumber: 173,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                        lineNumber: 172,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                    lineNumber: 168,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-46fbe62aad4355ee" + " " + "col-12 col-md-5 d-flex flex-column bg-white flex-grow-1 flex-md-grow-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-46fbe62aad4355ee" + " " + "p-3 border-bottom d-flex align-items-center justify-content-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>goToUser(post.userId),
                                                    className: "jsx-46fbe62aad4355ee" + " " + "d-flex align-items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.authorProfilePicture ? "http://localhost:5000/" + post.authorProfilePicture : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                                                            style: {
                                                                width: "32px",
                                                                height: "32px",
                                                                objectFit: "cover"
                                                            },
                                                            className: "jsx-46fbe62aad4355ee" + " " + "rounded-circle border me-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-46fbe62aad4355ee" + " " + "fw-bold small",
                                                            children: post.authorName
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onClose,
                                                    className: "jsx-46fbe62aad4355ee" + " " + "btn-close small"
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                            lineNumber: 180,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-46fbe62aad4355ee" + " " + "flex-grow-1 overflow-y-auto p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>goToUser(post.userId),
                                                    className: "jsx-46fbe62aad4355ee" + " " + "d-flex mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.authorProfilePicture ? "http://localhost:5000/" + post.authorProfilePicture : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                                                            style: {
                                                                width: "32px",
                                                                height: "32px",
                                                                objectFit: "cover"
                                                            },
                                                            className: "jsx-46fbe62aad4355ee" + " " + "rounded-circle me-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-46fbe62aad4355ee" + " " + "small mb-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-46fbe62aad4355ee" + " " + "fw-bold me-2",
                                                                    children: post.authorName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                                    lineNumber: 202,
                                                                    columnNumber: 45
                                                                }, this),
                                                                post.caption
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 37
                                                }, this),
                                                tree.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    comments: tree,
                                                    replyTarget: replyTarget,
                                                    replyText: replyText,
                                                    onReplyClick: setReplyTarget,
                                                    onReplyChange: setReplyText,
                                                    onPostReply: ()=>replyTarget && replyText && addReply(replyTarget, replyText),
                                                    onCancelReply: ()=>{
                                                        setReplyTarget(null);
                                                        setReplyText('');
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 41
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-46fbe62aad4355ee" + " " + "text-center text-muted small py-5",
                                                    children: "No comments yet."
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                            lineNumber: 193,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-46fbe62aad4355ee" + " " + "border-top p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    postId: post.id,
                                                    initialIsLiked: post.isLiked,
                                                    initialLikeCount: post.likeCount,
                                                    onCommentClick: ()=>{}
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-46fbe62aad4355ee" + " " + "mt-3 position-relative border-top pt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Add a comment...",
                                                            value: newCommentText,
                                                            onChange: (e)=>setNewCommentText(e.target.value),
                                                            onKeyPress: (e)=>{
                                                                if (e.key === 'Enter' && newCommentText.trim()) {
                                                                    addTopLevelComment(newCommentText);
                                                                }
                                                            },
                                                            className: "jsx-46fbe62aad4355ee" + " " + "form-control border-0 shadow-none small pe-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            style: {
                                                                top: '50%',
                                                                transform: 'translateY(-50%)'
                                                            },
                                                            disabled: !newCommentText.trim(),
                                                            onClick: ()=>newCommentText.trim() && addTopLevelComment(newCommentText),
                                                            className: "jsx-46fbe62aad4355ee" + " " + "btn text-primary fw-bold btn-sm position-absolute end-0 me-3",
                                                            children: "Post"
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                            lineNumber: 227,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                                    lineNumber: 178,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                            lineNumber: 166,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                        lineNumber: 165,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                    lineNumber: 161,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/comment/CommentModal.tsx",
                lineNumber: 160,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(CommentModal, "ff2VqXpJlip29tdHoQJ1+helgik=");
_c = CommentModal;
var _c;
__turbopack_context__.k.register(_c, "CommentModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/post/PostPopUp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PostPopUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PostPopUp() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal fade",
        id: "exampleModal",
        tabIndex: -1,
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-dialog modal-dialog-centered",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-content overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-body p-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-group list-group-flush text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold",
                                children: "Report"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 8,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto text-danger fw-bold",
                                children: "Unfollow"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 9,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "Add to favorites"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 10,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "Go to post"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 11,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "Share to..."
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 12,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "Copy link"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 13,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "Embed"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 14,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                children: "About this account"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 15,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-group-item list-group-item-action cursor-pointer pe-auto",
                                "data-bs-dismiss": "modal",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                                lineNumber: 16,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                        lineNumber: 7,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                    lineNumber: 6,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
                lineNumber: 5,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
            lineNumber: 4,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/feature/feed/components/post/PostPopUp.tsx",
        lineNumber: 3,
        columnNumber: 9
    }, this);
}
_c = PostPopUp;
var _c;
__turbopack_context__.k.register(_c, "PostPopUp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/profile/services/profile.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkFollowStatus",
    ()=>checkFollowStatus,
    "followUser",
    ()=>followUser,
    "getFollowersList",
    ()=>getFollowersList,
    "getFollowingList",
    ()=>getFollowingList,
    "getUserById",
    ()=>getUserById,
    "getUserByUsername",
    ()=>getUserByUsername,
    "getUserPosts",
    ()=>getUserPosts,
    "unfollowUser",
    ()=>unfollowUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/auth/services/data:36cd1f [app-client] (ecmascript) <text/javascript>");
;
;
const getUserByUsername = async (username)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/user/${username}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return null;
    return await res.json();
};
const getUserById = async (id)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/user/${id}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return null;
    return await res.json();
};
const followUser = async (id)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/followers/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return false;
    return true;
};
const unfollowUser = async (id)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/followers/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    });
    if (!res.ok) return false;
    return true;
};
const checkFollowStatus = async (id)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/followers/${id}/status`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return null;
    return await res.json();
};
const getFollowersList = async (userId)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/followers/${userId}/followers`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return [];
    return await res.json();
};
const getFollowingList = async (userId)=>{
    const userToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/followers/${userId}/following`, {
        headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return [];
    return await res.json();
};
const getUserPosts = async (userId)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$auth$2f$services$2f$data$3a$36cd1f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/post/user/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) return [];
    return await res.json();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/post/Posts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Posts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/post/PostMedia.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/post/PostActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/comment/CommentModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostPopUp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/post/PostPopUp.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$profile$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/profile/services/profile.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$pt$2d$BR$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/locale/pt-BR.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function Posts({ posts }) {
    _s();
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const goToUserProfile = async (userId)=>{
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$profile$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(userId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])(`/profile/${user.username}`);
    };
    const formatShortDate = (date)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(date), {
            locale: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$locale$2f$pt$2d$BR$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ptBR"]
        }).replace('aproximadamente ', '').replace('há ', '').replace('menos de um minuto', 'agora').replace(' minutos', 'min').replace(' minuto', 'min').replace(' horas', 'h').replace(' hora', 'h').replace(' dias', 'd').replace(' dia', 'd');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-fluid p-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row justify-content-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-12 col-md-10 col-lg-9",
                            children: posts.length > 0 && posts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-bottom pb-4 my-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "d-flex align-items-center justify-content-between py-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "d-flex align-items-center cursor-pointer",
                                                    onClick: ()=>goToUserProfile(post.userId),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: post.authorProfilePicture ? "http://localhost:5000/" + post.authorProfilePicture : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                                                            alt: "User",
                                                            className: "rounded-circle border me-2",
                                                            style: {
                                                                width: "32px",
                                                                height: "32px",
                                                                objectFit: "cover"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                            lineNumber: 45,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "d-flex align-items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "fw-bold small me-1",
                                                                    children: post.authorName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                                    lineNumber: 52,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted small",
                                                                    children: [
                                                                        "• ",
                                                                        formatShortDate(post.createdAt)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                                    lineNumber: 53,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                            lineNumber: 51,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "bi bi-three-dots cursor-pointer",
                                                    "data-bs-toggle": "modal",
                                                    "data-bs-target": "#exampleModal"
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                            lineNumber: 43,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            contentUrls: post.contentUrls,
                                            postIndex: index,
                                            hasSelectedPost: !!selectedPost,
                                            isModal: false
                                        }, void 0, false, {
                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                            lineNumber: 58,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            postId: post.id,
                                            initialIsLiked: post.isLiked,
                                            initialLikeCount: post.likeCount,
                                            initialIsSaved: false,
                                            onCommentClick: ()=>setSelectedPost(post)
                                        }, void 0, false, {
                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                            lineNumber: 63,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "fw-bold me-2 small",
                                                    children: post.authorName
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "small",
                                                    children: post.caption
                                                }, void 0, false, {
                                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                            lineNumber: 70,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, post.id, true, {
                                    fileName: "[project]/feature/feed/components/post/Posts.tsx",
                                    lineNumber: 42,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/feature/feed/components/post/Posts.tsx",
                            lineNumber: 40,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/Posts.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    selectedPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$comment$2f$CommentModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        post: selectedPost,
                        onClose: ()=>setSelectedPost(null),
                        goToUser: goToUserProfile
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/post/Posts.tsx",
                        lineNumber: 82,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/feature/feed/components/post/Posts.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$post$2f$PostPopUp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/feature/feed/components/post/Posts.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(Posts, "gO2hpKITQnTFbbgLvGWkMtNfAjI=");
_c = Posts;
var _c;
__turbopack_context__.k.register(_c, "Posts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/story/StoryItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoryItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function StoryItem({ story }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/stories/${story.username}/${story.id}`,
        className: "text-decoration-none text-body",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "d-flex flex-column align-items-center px-2 cursor-pointer",
            style: {
                minWidth: "85px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-1 circle-element rounded-circle rainbow-border position-relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: story.profilePictureUrl && story.profilePictureUrl.length > 0 ? "http://localhost:5000/" + story.profilePictureUrl : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
                        alt: "Story",
                        className: "rounded-circle",
                        style: {
                            width: "62px",
                            height: "62px",
                            objectFit: "cover",
                            border: "2px solid white"
                        }
                    }, void 0, false, {
                        fileName: "[project]/feature/feed/components/story/StoryItem.tsx",
                        lineNumber: 16,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/story/StoryItem.tsx",
                    lineNumber: 15,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-truncate small mt-1 mb-0 text-center",
                    style: {
                        maxWidth: "70px",
                        fontSize: "11px"
                    },
                    children: story.username
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/story/StoryItem.tsx",
                    lineNumber: 23,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/feature/feed/components/story/StoryItem.tsx",
            lineNumber: 11,
            columnNumber: 13
        }, this)
    }, story.id, false, {
        fileName: "[project]/feature/feed/components/story/StoryItem.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
_c = StoryItem;
var _c;
__turbopack_context__.k.register(_c, "StoryItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/services/data:4b05bb [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStories",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00d5d6f54606608d1c9611a005cc00e5ddd4ef3c68":"getStories"},"feature/feed/services/feed.service.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00d5d6f54606608d1c9611a005cc00e5ddd4ef3c68", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getStories");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZmVlZC5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHNlcnZlclwiO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9ST1VURV9VUkwgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgZ2V0TG9nZ2VkVXNlclRva2VuIH0gZnJvbSBcIkAvZmVhdHVyZS9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQb3N0Q29tbWVudCB9IGZyb20gXCJAL3R5cGVzL2ZlZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTdG9yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9zdG9yeWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgc3RvcmllcyAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRMb2dnZWRVc2VyVG9rZW4oKTtcclxuICAgIGlmICghdG9rZW4pIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9wb3N0L2ZlZWRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHJlcy5zdGF0dXMpO1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9zdENvbW1lbnRzID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG5cclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0VfUk9VVEVfVVJMfS9jb21tZW50L2FsbENvbW1lbnRzLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzLnN0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRQb3N0Q29tbWVudHMgPSBhc3luYyAobmV3Q29tbWVudDogUG9zdENvbW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vY29tbWVudGAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0NvbW1lbnQpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gLFxyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlcy5qc29uKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQb3N0TGlrZUNvdW50ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9L2NvdW50YCk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBhd2FpdCByZXMuanNvbigpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocG9zdElkOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0TG9nZ2VkVXNlclRva2VuKCk7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFX1JPVVRFX1VSTH0vcG9zdExpa2UvJHtwb3N0SWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB1bmxpa2VQb3N0ID0gYXN5bmMgKHBvc3RJZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldExvZ2dlZFVzZXJUb2tlbigpO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7QkFTRV9ST1VURV9VUkx9L3Bvc3RMaWtlLyR7cG9zdElkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIkFwcGxpY2F0aW9uL0pzb25cIixcclxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0b2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighcmVzLm9rKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXMuc3RhdHVzKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXdhaXQgcmVzLmpzb24oKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im9TQU1hLHVMQUFBIn0=
}),
"[project]/feature/story/store/useStoryStore.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStoryStore",
    ()=>useStoryStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$4b05bb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/feature/feed/services/data:4b05bb [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
;
const useStoryStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        stories: [],
        fetchStories: async ()=>{
            set({
                stories: (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$services$2f$data$3a$4b05bb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getStories"])()).stories
            });
        },
        setInitialStories: (serverStories)=>set({
                stories: serverStories
            })
    }), {
    name: "instagram-stories",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>sessionStorage)
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/feature/feed/components/story/Stories.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Stories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$story$2f$StoryItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/feed/components/story/StoryItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$story$2f$store$2f$useStoryStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/feature/story/store/useStoryStore.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Stories({ serverStories, userPhoto }) {
    _s();
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [storiesIcon, setStoriesIcons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { setInitialStories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$story$2f$store$2f$useStoryStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoryStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Stories.useEffect": ()=>{
            let seen = new Set();
            let filteredStories = serverStories.filter({
                "Stories.useEffect.filteredStories": (item)=>{
                    const value = item.username;
                    if (seen.has(value)) {
                        return false;
                    }
                    seen.add(value);
                    console.log(seen);
                    return true;
                }
            }["Stories.useEffect.filteredStories"]);
            setStoriesIcons(filteredStories);
            const stories = [
                ...serverStories
            ];
            const groupedByUsername = stories.reduce({
                "Stories.useEffect.groupedByUsername": (acc, story)=>{
                    if (!acc[story.username]) {
                        acc[story.username] = [];
                    }
                    acc[story.username].push(story);
                    return acc;
                }
            }["Stories.useEffect.groupedByUsername"], {});
            const userGroups = Object.values(groupedByUsername).map({
                "Stories.useEffect.userGroups": (userStories)=>{
                    userStories.sort({
                        "Stories.useEffect.userGroups": (a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    }["Stories.useEffect.userGroups"]);
                    const mostRecentDate = new Date(userStories[0].createdAt).getTime();
                    return {
                        stories: userStories,
                        mostRecentDate
                    };
                }
            }["Stories.useEffect.userGroups"]);
            userGroups.sort({
                "Stories.useEffect": (a, b)=>b.mostRecentDate - a.mostRecentDate
            }["Stories.useEffect"]);
            const finalSortedStories = userGroups.flatMap({
                "Stories.useEffect.finalSortedStories": (group)=>group.stories
            }["Stories.useEffect.finalSortedStories"]);
            setInitialStories(finalSortedStories);
        }
    }["Stories.useEffect"], [
        serverStories,
        setInitialStories
    ]);
    const scroll = (direction)=>{
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 200;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "position-relative w-100 border-bottom",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y ms-2 z-1 d-flex align-items-center justify-content-center",
                style: {
                    width: "30px",
                    height: "30px",
                    border: "1px solid #dbdbdb"
                },
                onClick: ()=>scroll("left"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "bi bi-chevron-left small"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/story/Stories.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/story/Stories.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "d-flex flex-row overflow-x-auto py-3 no-scrollbar align-items-center",
                style: {
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth"
                },
                children: storiesIcon.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$feed$2f$components$2f$story$2f$StoryItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        story: story
                    }, story.id, false, {
                        fileName: "[project]/feature/feed/components/story/Stories.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/story/Stories.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y   me-2 z-1 d-flex align-items-center justify-content-center",
                style: {
                    width: "30px",
                    height: "30px",
                    border: "1px solid #dbdbdb"
                },
                onClick: ()=>scroll("right"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "bi bi-chevron-right small"
                }, void 0, false, {
                    fileName: "[project]/feature/feed/components/story/Stories.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/feature/feed/components/story/Stories.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/feature/feed/components/story/Stories.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(Stories, "L5yyJn2b9a1OKW4KXpbp640B86k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$feature$2f$story$2f$store$2f$useStoryStore$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoryStore"]
    ];
});
_c = Stories;
var _c;
__turbopack_context__.k.register(_c, "Stories");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=feature_279a55cf._.js.map