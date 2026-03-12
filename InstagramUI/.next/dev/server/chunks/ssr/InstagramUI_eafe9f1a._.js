module.exports = [
"[project]/InstagramUI/constants/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_ROUTE_URL",
    ()=>BASE_ROUTE_URL,
    "URL",
    ()=>URL,
    "tokenName",
    ()=>tokenName
]);
const tokenName = 'ig_token';
const URL = `http://localhost:5000`;
const BASE_ROUTE_URL = URL + '/api';
}),
"[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0005ad5fbcf636cfe426ddefad5a30834885c931c6":"getLoggedUserInfo","002f686fe21cc78705f62933b7656b7afb268fa84a":"getLoggedUserToken","0074ad7e855f67980be7205906e8f3d3c99d59403b":"handleLogout","00a0f5f7f58f99876abaada2e99edc43e9b72e31a1":"isAuthenticated","00fc7fe8ae0628ce25229c9a6180cf10c288ba00f3":"getLoggedUserTokenInfo","401107552a8943c1611c7b58eff8fe7d51a2e5dda8":"uploadFile","405c61017a61661ad7cde3354de7f4fd6705202b7f":"updateUserProfile","40e178a40ed154f93d2a6fc15b9af3540dc26aedc0":"handleRegister","70d971e7f6a1b9bf0e9588e93236a715a85a201d66":"handleLogin"},"",""] */ __turbopack_context__.s([
    "getLoggedUserInfo",
    ()=>getLoggedUserInfo,
    "getLoggedUserToken",
    ()=>getLoggedUserToken,
    "getLoggedUserTokenInfo",
    ()=>getLoggedUserTokenInfo,
    "handleLogin",
    ()=>handleLogin,
    "handleLogout",
    ()=>handleLogout,
    "handleRegister",
    ()=>handleRegister,
    "isAuthenticated",
    ()=>isAuthenticated,
    "updateUserProfile",
    ()=>updateUserProfile,
    "uploadFile",
    ()=>uploadFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/constants/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/jwt-decode/build/esm/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const route = "/auth";
const handleLogin = async (login, password, rememberMe)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}${route}/login`, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            rememberMe
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        let errorMessage = "Login failed";
        const text = await res.text();
        const error = JSON.parse(text);
        throw new Error(error.Message + " " + errorMessage);
    }
    const data = await res.json();
    if (rememberMe) {
        const decode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtDecode"])(data.token);
        const expireDate = new Date(decode.exp * 1000);
        cookieStore.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"],
            httpOnly: true,
            value: data.token,
            expires: expireDate
        });
    } else {
        cookieStore.set({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"],
            value: data.token,
            httpOnly: true,
            secure: true
        });
    }
};
const handleRegister = async (registerInfo)=>{
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}${route}/register`, {
        method: "POST",
        body: JSON.stringify(registerInfo),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        const text = await res.text();
        const json = JSON.parse(text);
        throw new Error(json.Message);
    }
};
const handleLogout = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
};
const isAuthenticated = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const cookie = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"]);
    const token = cookie?.value;
    return !!token;
};
const getLoggedUserToken = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"])?.value;
    return token || null;
};
const getLoggedUserTokenInfo = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const cookie = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tokenName"]);
    const token = cookie?.value;
    if (token == null) {
        // throw new Error("Not logged in!!");
        return null;
    }
    const decode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$jwt$2d$decode$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtDecode"])(token);
    return decode;
};
const getLoggedUserInfo = async ()=>{
    const userId = (await getLoggedUserTokenInfo())?.sub;
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/user/${userId}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    if (!res.ok) {
        return;
    }
    const data = await res.json();
    return data;
};
const updateUserProfile = async (editUser)=>{
    const userToken = await getLoggedUserToken();
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/user`, {
        method: "PUT",
        body: JSON.stringify(editUser),
        headers: {
            'authorization': `Bearer ${userToken}`,
            'content-type': 'application/json'
        }
    });
    if (!res.ok) {
        return false;
    }
    return true;
};
const uploadFile = async (selectedFile)=>{
    const formData = new FormData();
    formData.append('file', selectedFile);
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$constants$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BASE_ROUTE_URL"]}/files/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getLoggedUserToken()}`
        },
        body: formData
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data.url;
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated,
    getLoggedUserToken,
    getLoggedUserTokenInfo,
    getLoggedUserInfo,
    updateUserProfile,
    uploadFile
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleLogin, "70d971e7f6a1b9bf0e9588e93236a715a85a201d66", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleRegister, "40e178a40ed154f93d2a6fc15b9af3540dc26aedc0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleLogout, "0074ad7e855f67980be7205906e8f3d3c99d59403b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(isAuthenticated, "00a0f5f7f58f99876abaada2e99edc43e9b72e31a1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLoggedUserToken, "002f686fe21cc78705f62933b7656b7afb268fa84a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLoggedUserTokenInfo, "00fc7fe8ae0628ce25229c9a6180cf10c288ba00f3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLoggedUserInfo, "0005ad5fbcf636cfe426ddefad5a30834885c931c6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserProfile, "405c61017a61661ad7cde3354de7f4fd6705202b7f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadFile, "401107552a8943c1611c7b58eff8fe7d51a2e5dda8", null);
}),
"[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/InstagramUI/components/layout/SidebarWrapper.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/InstagramUI/components/layout/SidebarWrapper.tsx <module evaluation>", "default");
}),
"[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/InstagramUI/components/layout/SidebarWrapper.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/InstagramUI/components/layout/SidebarWrapper.tsx", "default");
}),
"[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$components$2f$layout$2f$SidebarWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$components$2f$layout$2f$SidebarWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$components$2f$layout$2f$SidebarWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/InstagramUI/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/auth-service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$components$2f$layout$2f$SidebarWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/components/layout/SidebarWrapper.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function RootLayout({ children }) {
    const [token] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$auth$2d$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLoggedUserTokenInfo"])()
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        "data-bs-theme": "light",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Instagram CLONE"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/app/layout.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css",
                        rel: "stylesheet",
                        integrity: "sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/app/layout.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "stylesheet",
                        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/app/layout.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/InstagramUI/app/layout.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$components$2f$layout$2f$SidebarWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        picture: token != null ? token.picture : "",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/app/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js",
                        integrity: "sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/app/layout.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/InstagramUI/app/layout.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/InstagramUI/app/layout.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=InstagramUI_eafe9f1a._.js.map