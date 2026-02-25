export const MOCK_MESSAGES = [
    { "id": 1, "username": "ArchLover", "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg", "lastMessage": "That facade design is incredible!", "timestamp": "11h", "isUnread": false, "isOnline": true },
    { "id": 2, "username": "UrbanPlanner", "profilePicture": "https://randomuser.me/api/portraits/women/68.jpg", "lastMessage": "Did you see the new zoning laws?", "timestamp": "2h", "isUnread": true, "isOnline": false },
    { "id": 3, "username": "MinimalVibes", "profilePicture": "https://randomuser.me/api/portraits/women/2.jpg", "lastMessage": "Sent a photo", "timestamp": "45m", "isUnread": true, "isOnline": true },
    { "id": 4, "username": "BrutalismGuy", "profilePicture": "https://randomuser.me/api/portraits/men/41.jpg", "lastMessage": "Concrete is life.", "timestamp": "1d", "isUnread": false, "isOnline": false },
    { "id": 5, "username": "SkylineChaser", "profilePicture": "https://randomuser.me/api/portraits/men/22.jpg", "lastMessage": "Check out this rooftop view!", "timestamp": "5h", "isUnread": false, "isOnline": true },
    { "id": 6, "username": "PixelPioneer", "profilePicture": "https://randomuser.me/api/portraits/women/12.jpg", "lastMessage": "The render finished early.", "timestamp": "12h", "isUnread": false, "isOnline": false },
    { "id": 7, "username": "NeonNights", "profilePicture": "https://randomuser.me/api/portraits/women/90.jpg", "lastMessage": "Meet at the gallery?", "timestamp": "15m", "isUnread": true, "isOnline": true },
    { "id": 8, "username": "ConcreteJungle", "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg", "lastMessage": "I prefer the raw finish.", "timestamp": "3h", "isUnread": false, "isOnline": false },
    { "id": 9, "username": "GlassAndSteel", "profilePicture": "https://randomuser.me/api/portraits/men/55.jpg", "lastMessage": "Structure is solid.", "timestamp": "2d", "isUnread": false, "isOnline": false },
    { "id": 10, "username": "Metropolis", "profilePicture": "https://randomuser.me/api/portraits/women/55.jpg", "lastMessage": "Traffic is a nightmare.", "timestamp": "6h", "isUnread": true, "isOnline": true },
    { "id": 11, "username": "ThePenthouse", "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg", "lastMessage": "Reserved the space.", "timestamp": "8h", "isUnread": false, "isOnline": true },
    { "id": 12, "username": "Modernist", "profilePicture": "https://randomuser.me/api/portraits/men/33.jpg", "lastMessage": "Less is definitely more.", "timestamp": "1w", "isUnread": false, "isOnline": false },
    { "id": 13, "username": "BauhausBabe", "profilePicture": "https://randomuser.me/api/portraits/women/11.jpg", "lastMessage": "Form follows function!", "timestamp": "1h", "isUnread": true, "isOnline": true },
    { "id": 14, "username": "Draftsman", "profilePicture": "https://randomuser.me/api/portraits/men/20.jpg", "lastMessage": "Fixed the blueprint.", "timestamp": "10h", "isUnread": false, "isOnline": false },
    { "id": 15, "username": "CivicDesigner", "profilePicture": "https://randomuser.me/api/portraits/women/30.jpg", "lastMessage": "The park project is live.", "timestamp": "4h", "isUnread": false, "isOnline": true },
    { "id": 16, "username": "RetroRefit", "profilePicture": "https://randomuser.me/api/portraits/men/15.jpg", "lastMessage": "Check these tiles.", "timestamp": "30m", "isUnread": true, "isOnline": true },
    { "id": 17, "username": "ZahaFan", "profilePicture": "https://randomuser.me/api/portraits/women/40.jpg", "lastMessage": "Curves over corners.", "timestamp": "14h", "isUnread": false, "isOnline": false },
    { "id": 18, "username": "BluePrintKing", "profilePicture": "https://randomuser.me/api/portraits/men/5.jpg", "lastMessage": "Scaling looks off.", "timestamp": "5m", "isUnread": true, "isOnline": true },
    { "id": 19, "username": "SteelFrame", "profilePicture": "https://randomuser.me/api/portraits/women/50.jpg", "lastMessage": "Delivery at 9 AM.", "timestamp": "16h", "isUnread": false, "isOnline": false },
    { "id": 20, "username": "AdobeQueen", "profilePicture": "https://randomuser.me/api/portraits/women/60.jpg", "lastMessage": "Exporting the assets.", "timestamp": "22h", "isUnread": false, "isOnline": true },
    { "id": 21, "username": "GreenRoof", "profilePicture": "https://randomuser.me/api/portraits/men/70.jpg", "lastMessage": "Eco-friendly materials?", "timestamp": "7h", "isUnread": true, "isOnline": false },
    { "id": 22, "username": "MarbleMaven", "profilePicture": "https://randomuser.me/api/portraits/women/25.jpg", "lastMessage": "The kitchen looks elite.", "timestamp": "19h", "isUnread": false, "isOnline": false },
    { "id": 23, "username": "PillarOfSociety", "profilePicture": "https://randomuser.me/api/portraits/men/45.jpg", "lastMessage": "Meeting at noon.", "timestamp": "20m", "isUnread": true, "isOnline": true },
    { "id": 24, "username": "ShadowGrapher", "profilePicture": "https://randomuser.me/api/portraits/men/80.jpg", "lastMessage": "Lighting is everything.", "timestamp": "18h", "isUnread": false, "isOnline": false },
    { "id": 25, "username": "InteriorEye", "profilePicture": "https://randomuser.me/api/portraits/women/5.jpg", "lastMessage": "Found the perfect sofa.", "timestamp": "9h", "isUnread": false, "isOnline": true }
];

export const MOCK_CHAT_HISTORY: Record<number, any[]> = {
    1: [
        { id: 101, senderId: 1, text: "Hey! Did you finish those blueprints?", timestamp: "10:30 AM" },
        { id: 102, senderId: "me", text: "Almost, just working on the facade details now.", timestamp: "10:32 AM" },
        { id: 103, senderId: 1, text: "That facade design is incredible!", timestamp: "11:00 AM" }
    ],
    2: [
        { id: 201, senderId: 2, text: "The city council meeting is tomorrow.", timestamp: "Yesterday" },
        { id: 202, senderId: 2, text: "Did you see the new zoning laws?", timestamp: "2:00 PM" }
    ],
    3: [
        { id: 301, senderId: "me", text: "How does the living room look?", timestamp: "12:15 PM" },
        { id: 302, senderId: 3, text: "Sent a photo", type: "image", imageUrl: "https://picsum.photos/400/500", timestamp: "12:45 PM" }
    ],
    4: [
        { id: 401, senderId: 4, text: "Concrete is life.", timestamp: "Monday" }
    ],
    5: [
        { id: 501, senderId: 5, text: "Check out this rooftop view!", timestamp: "5:30 PM" }
    ],
    6: [
        { id: 601, senderId: "me", text: "Is the render done?", timestamp: "9:00 AM" },
        { id: 602, senderId: 6, text: "The render finished early.", timestamp: "9:15 AM" }
    ],
    7: [
        { id: 701, senderId: 7, text: "Meet at the gallery?", timestamp: "11:00 AM" }
    ],
    8: [
        { id: 801, senderId: 8, text: "I prefer the raw finish.", timestamp: "3:45 PM" }
    ],
    9: [
        { id: 901, senderId: 9, text: "Structure is solid.", timestamp: "Tuesday" }
    ],
    10: [
        { id: 1001, senderId: 10, text: "Traffic is a nightmare.", timestamp: "8:10 AM" }
    ],
    11: [
        { id: 1101, senderId: 11, text: "Reserved the space.", timestamp: "10:00 AM" }
    ],
    12: [
        { id: 1201, senderId: 12, text: "Less is definitely more.", timestamp: "Jan 15" }
    ],
    13: [
        { id: 1301, senderId: 13, text: "Form follows function!", timestamp: "1:20 PM" }
    ],
    14: [
        { id: 1401, senderId: 14, text: "Fixed the blueprint.", timestamp: "4:00 PM" }
    ],
    15: [
        { id: 1501, senderId: 15, text: "The park project is live.", timestamp: "6:30 PM" }
    ],
    16: [
        { id: 1601, senderId: 16, text: "Check these tiles.", timestamp: "11:45 AM" }
    ],
    17: [
        { id: 1701, senderId: 17, text: "Curves over corners.", timestamp: "9:00 PM" }
    ],
    18: [
        { id: 1801, senderId: 18, text: "Scaling looks off.", timestamp: "10:25 AM" }
    ],
    19: [
        { id: 1901, senderId: 19, text: "Delivery at 9 AM.", timestamp: "Yesterday" }
    ],
    20: [
        { id: 2001, senderId: 20, text: "Exporting the assets.", timestamp: "3:15 PM" }
    ],
    21: [
        { id: 2101, senderId: 21, text: "Eco-friendly materials?", timestamp: "11:50 AM" }
    ],
    22: [
        { id: 2201, senderId: 22, text: "The kitchen looks elite.", timestamp: "2:10 PM" }
    ],
    23: [
        { id: 2301, senderId: 23, text: "Meeting at noon.", timestamp: "11:40 AM" }
    ],
    24: [
        { id: 2401, senderId: 24, text: "Lighting is everything.", timestamp: "5:00 PM" }
    ],
    25: [
        { id: 2501, senderId: 25, text: "Found the perfect sofa.", timestamp: "8:30 AM" }
    ]
};