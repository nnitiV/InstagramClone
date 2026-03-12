(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/InstagramUI/feature/message/components/ChatHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ChatHeader({ user }) {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatHeader.useEffect": ()=>{
            const checkWidth = {
                "ChatHeader.useEffect.checkWidth": ()=>{
                    setIsMobile(window.innerWidth <= 368);
                }
            }["ChatHeader.useEffect.checkWidth"];
            checkWidth();
            window.addEventListener("resize", checkWidth);
            return window.removeEventListener("resize", checkWidth);
        }
    }["ChatHeader.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border-bottom p-3 d-flex justify-content-between align-items-center ${isMobile && "flex-column"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "d-flex cursor-pointer transparent-background-hover rounded px-2",
                "data-bs-dismiss": "offcanvas",
                "data-mdb-ripple-init": true,
                "data-mdb-ripple-color": "light",
                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])(`/profile/${user?.username}`),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-1 rounded-circle position-relative me-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: user?.profilePictureUrl ? "http://localhost:5000/" + user?.profilePictureUrl : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
                            alt: "Story",
                            className: "rounded-circle",
                            style: {
                                width: "46px",
                                height: "46px",
                                objectFit: "cover"
                            }
                        }, void 0, false, {
                            fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                        lineNumber: 25,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "d-flex flex-column justify-content-center",
                        style: {
                            fontSize: "14px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 p-0",
                                children: user?.name
                            }, void 0, false, {
                                fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "m-0 p-0",
                                style: {
                                    color: "rgba(75,75,75,0.75)"
                                },
                                children: user?.username
                            }, void 0, false, {
                                fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "d-flex justify-content-between px-3 fs-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "bi bi-telephone"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "bi bi-camera px-3"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "bi bi-info-circle"
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/InstagramUI/feature/message/components/ChatHeader.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(ChatHeader, "0VTTNJATKABQPGLm9RVT0tKGUgU=");
_c = ChatHeader;
var _c;
__turbopack_context__.k.register(_c, "ChatHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/InstagramUI/feature/message/components/ChatMessages.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ChatMessages({ chat, loggedUserId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "d-flex flex-column h-100 overflow-y-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-grow-1  p-3",
            children: chat.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `d-flex mb-2 ${msg.senderId === loggedUserId ? 'justify-content-end' : 'justify-content-start'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-2 rounded-3 ${msg.senderId === loggedUserId ? 'bg-primary text-white' : 'bg-light border'}`,
                        style: {
                            maxWidth: '70%'
                        },
                        children: msg.content
                    }, void 0, false, {
                        fileName: "[project]/InstagramUI/feature/message/components/ChatMessages.tsx",
                        lineNumber: 14,
                        columnNumber: 25
                    }, this)
                }, msg.id, false, {
                    fileName: "[project]/InstagramUI/feature/message/components/ChatMessages.tsx",
                    lineNumber: 13,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/InstagramUI/feature/message/components/ChatMessages.tsx",
            lineNumber: 11,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/InstagramUI/feature/message/components/ChatMessages.tsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
_c = ChatMessages;
var _c;
__turbopack_context__.k.register(_c, "ChatMessages");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/InstagramUI/hooks/useChat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f40$microsoft$2f$signalr$2f$dist$2f$esm$2f$HubConnectionBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f40$microsoft$2f$signalr$2f$dist$2f$esm$2f$HubConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/@microsoft/signalr/dist/esm/HubConnection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$data$3a$88d664__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/data:88d664 [app-client] (ecmascript) <text/javascript>");
var _s = __turbopack_context__.k.signature();
;
;
;
const useChat = (groupId)=>{
    _s();
    const [connection, setConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // Troque 'any' pelo seu MessageDto
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useChat.useEffect": ()=>{
            // 1. Cria a conexão
            const connect = {
                "useChat.useEffect.connect": async ()=>{
                    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$data$3a$88d664__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserToken"])();
                    const newConnection = new __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f40$microsoft$2f$signalr$2f$dist$2f$esm$2f$HubConnectionBuilder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HubConnectionBuilder"]().withUrl(`http://localhost:5000/hubs/chat`, {
                        accessTokenFactory: {
                            "useChat.useEffect.connect.newConnection": ()=>token || ""
                        }["useChat.useEffect.connect.newConnection"]
                    }).withAutomaticReconnect().build();
                    // 2. Configura os "ouvintes" (Eventos que o C# dispara)
                    newConnection.on("ReceiveMessage", {
                        "useChat.useEffect.connect": (message)=>{
                            // Adiciona a nova mensagem na lista
                            setMessages({
                                "useChat.useEffect.connect": (prev)=>[
                                        ...prev,
                                        message
                                    ]
                            }["useChat.useEffect.connect"]);
                        }
                    }["useChat.useEffect.connect"]);
                    try {
                        // 3. Inicia a conexão
                        await newConnection.start();
                        console.log("SignalR Connected!");
                        // Se passou um groupId, entra no grupo logo após conectar
                        if (groupId) {
                            await newConnection.invoke("JoinGroup", groupId);
                        }
                        setConnection(newConnection);
                    } catch (error) {
                        console.error("Erro ao conectar no SignalR:", error);
                    }
                }
            }["useChat.useEffect.connect"];
            connect();
            // 4. Limpeza: Sai do grupo e desliga quando o usuário sair da tela
            return ({
                "useChat.useEffect": ()=>{
                    if (connection) {
                        if (groupId) {
                            connection.invoke("LeaveGroup", groupId).catch(console.error);
                        }
                        connection.stop();
                    }
                }
            })["useChat.useEffect"];
        }
    }["useChat.useEffect"], [
        groupId
    ]); // Se o groupId mudar, ele refaz a conexão
    // 5. Função para enviar mensagem pelo seu form do React
    const sendMessage = async (sendMessageDto)=>{
        if (connection && connection.state === __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f40$microsoft$2f$signalr$2f$dist$2f$esm$2f$HubConnection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HubConnectionState"].Connected) {
            try {
                await connection.invoke("SendMessage", sendMessageDto);
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        }
    };
    return {
        messages,
        sendMessage,
        connection
    };
};
_s(useChat, "koCgjKHtG9KAwuPgyBI8NHWOWu8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/InstagramUI/app/messages/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageContentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$data$3a$b897c8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/InstagramUI/feature/auth/services/data:b897c8 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$components$2f$ChatHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/message/components/ChatHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$components$2f$ChatMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/message/components/ChatMessages.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/message/services/profile.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$profile$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/feature/profile/services/profile.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/hooks/useChat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/InstagramUI/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
function MessageContentPage({ params }) {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const { messages, sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [loggedUserId, setLoggedUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [chat, setChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageContentPage.useEffect": ()=>{
            const getInfo = {
                "MessageContentPage.useEffect.getInfo": async ()=>{
                    const loggedUserId = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$auth$2f$services$2f$data$3a$b897c8__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLoggedUserInfo"])()).id;
                    setLoggedUserId(loggedUserId);
                    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$profile$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(id);
                    setUser(user);
                    const chatHistory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChatHistory"])(id);
                    setChat(chatHistory.messages);
                }
            }["MessageContentPage.useEffect.getInfo"];
            getInfo();
        }
    }["MessageContentPage.useEffect"], []);
    const handleSendMessage = async (e)=>{
        if (e.key == "Enter") {
            if (message.length > 0) {
                const messageToSend = {
                    receiverId: Number(id),
                    content: message
                };
                // const res = await sendMessageService(messageToSend);
                await sendMessage(messageToSend);
                setMessage("");
            }
        }
    };
    const fullChat = [
        ...chat,
        ...messages
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-100 h-100 d-flex flex-column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$components$2f$ChatHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                user: user
            }, void 0, false, {
                fileName: "[project]/InstagramUI/app/messages/[id]/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$feature$2f$message$2f$components$2f$ChatMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                chat: fullChat,
                loggedUserId: loggedUserId
            }, void 0, false, {
                fileName: "[project]/InstagramUI/app/messages/[id]/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 border-top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    className: "form-control rounded-pill",
                    placeholder: "Message...",
                    value: message,
                    onChange: (e)=>setMessage(e.target.value),
                    onKeyDown: handleSendMessage
                }, void 0, false, {
                    fileName: "[project]/InstagramUI/app/messages/[id]/page.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/InstagramUI/app/messages/[id]/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/InstagramUI/app/messages/[id]/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(MessageContentPage, "9P/guAGn/Ymc29NFZo9b9B90vbM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$InstagramUI$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = MessageContentPage;
var _c;
__turbopack_context__.k.register(_c, "MessageContentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=InstagramUI_e95d7c70._.js.map