module.exports = [
"[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a6723df852650042f0e0a323913e6024bf46645d":"getStories","00c9095dbfc134de70b9b0fce2ce07a45fea99aa4a":"getPosts","400294df6f13573f0b1d1f3cce0c2ffc68dce46d1d":"addPostComments","4004ea45f4c5608867655c84d4c18a63db9dc22509":"getPostComments","4044627085a9d0c2ba7a3afdb14b33713f341c64bc":"getPostLikeCount","4072f6b8fc46265ab14da034d3dd618edc9198f2a1":"likePost","40f305d3bd44119dbe86f472c1deac0d5e38482574":"unlikePost"},"",""] */ __turbopack_context__.s([
    "addPostComments",
    ()=>addPostComments,
    "getPostComments",
    ()=>getPostComments,
    "getPostLikeCount",
    ()=>getPostLikeCount,
    "getPosts",
    ()=>getPosts,
    "getStories",
    ()=>getStories,
    "likePost",
    ()=>likePost,
    "unlikePost",
    ()=>unlikePost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/constants/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const getStories = async ()=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    if (!token) return [];
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/story`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(`Error fetching stories (${res.status})`);
        return [];
    }
    return await res.json();
};
const getPosts = async ()=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    if (!token) return [];
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/post/feed`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    if (!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
};
const getPostComments = async (postId)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/comment/allComments/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache: "no-store"
    });
    if (!res.ok) {
        console.error(res.status);
        return [];
    }
    return await res.json();
};
const addPostComments = async (newComment)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/comment`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "Application/Json"
        }
    });
    if (!res.ok) {
        console.error(res);
        return null;
    }
    return await res.json();
};
const getPostLikeCount = async (postId)=>{
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/postLike/${postId}/count`);
    if (!res.ok) {
        console.error(res.status);
        return 0;
    }
    return await res.json();
};
const likePost = async (postId)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/postLike/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        console.error(res.status);
        return;
    }
    return await res.json();
};
const unlikePost = async (postId)=>{
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/postLike/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        console.error(res.status);
        return;
    }
    return await res.json();
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getStories,
    getPosts,
    getPostComments,
    addPostComments,
    getPostLikeCount,
    likePost,
    unlikePost
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStories, "00a6723df852650042f0e0a323913e6024bf46645d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPosts, "00c9095dbfc134de70b9b0fce2ce07a45fea99aa4a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPostComments, "4004ea45f4c5608867655c84d4c18a63db9dc22509", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addPostComments, "400294df6f13573f0b1d1f3cce0c2ffc68dce46d1d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPostLikeCount, "4044627085a9d0c2ba7a3afdb14b33713f341c64bc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(likePost, "4072f6b8fc46265ab14da034d3dd618edc9198f2a1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unlikePost, "40f305d3bd44119dbe86f472c1deac0d5e38482574", null);
}),
"[project]/InstagramUI/.next-internal/server/app/stories/[username]/[storyId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$feed$2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/InstagramUI/.next-internal/server/app/stories/[username]/[storyId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0005ad5fbcf636cfe426ddefad5a30834885c931c6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserInfo"],
    "002f686fe21cc78705f62933b7656b7afb268fa84a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserToken"],
    "0074ad7e855f67980be7205906e8f3d3c99d59403b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleLogout"],
    "00a0f5f7f58f99876abaada2e99edc43e9b72e31a1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAuthenticated"],
    "00a6723df852650042f0e0a323913e6024bf46645d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$feed$2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStories"],
    "00fc7fe8ae0628ce25229c9a6180cf10c288ba00f3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserTokenInfo"],
    "401107552a8943c1611c7b58eff8fe7d51a2e5dda8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadFile"],
    "405c61017a61661ad7cde3354de7f4fd6705202b7f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUserProfile"],
    "40e178a40ed154f93d2a6fc15b9af3540dc26aedc0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleRegister"],
    "70d971e7f6a1b9bf0e9588e93236a715a85a201d66",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleLogin"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f2e$next$2d$internal$2f$server$2f$app$2f$stories$2f5b$username$5d2f5b$storyId$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$InstagramUI$2f$feature$2f$feed$2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/InstagramUI/.next-internal/server/app/stories/[username]/[storyId]/page/actions.js { ACTIONS_MODULE0 => "[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$feed$2f$services$2f$feed$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/feed/services/feed.service.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=InstagramUI_b2826285._.js.map