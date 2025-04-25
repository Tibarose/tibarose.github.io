console.log('[Service Worker] Starting firebase-messaging-sw.js...');

// Check if importScripts is available
if (typeof importScripts !== 'function') {
    console.error('[Service Worker] importScripts is not available in this context');
    throw new Error('importScripts is not available');
}

// Load Firebase scripts
try {
    importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
    console.log('[Service Worker] firebase-app-compat.js loaded successfully');

    importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");
    console.log('[Service Worker] firebase-messaging-compat.js loaded successfully');
} catch (error) {
    console.error('[Service Worker] Error loading Firebase scripts:', error);
    throw error;
}

// Initialize Firebase
try {
    if (typeof firebase === 'undefined') {
        console.error('[Service Worker] Firebase is not defined after importScripts');
        throw new Error('Firebase is not defined');
    }

    console.log('[Service Worker] Initializing Firebase...');
    firebase.initializeApp({
        apiKey: "AIzaSyCBWrU8jvaMjrachP9amOX1zJ-KavEPTjo",
        authDomain: "gardeniatodaynew.firebaseapp.com",
        projectId: "gardeniatodaynew",
        storageBucket: "gardeniatodaynew.firebasestorage.app",
        messagingSenderId: "805080687276",
        appId: "1:805080687276:web:8cfa2db1884f916b1ff509",
        measurementId: "G-0KWN75E378"
    });
    console.log('[Service Worker] Firebase initialized successfully');
} catch (error) {
    console.error('[Service Worker] Error initializing Firebase:', error);
    throw error;
}

// Set up Firebase Messaging
try {
    const messaging = firebase.messaging();
    console.log('[Service Worker] Firebase Messaging initialized');

    messaging.onBackgroundMessage(function(payload) {
        console.log('[Push] Background message received:', payload);
        const { title, body } = payload.notification || {};
        if (title && body) {
            console.log('[Push] Showing notification:', title, body);
            self.registration.showNotification(title, {
                body: body,
                icon: "https://tibarose.github.io/Gardeniamarket/icons/Icon-192.png"
            });
        } else {
            console.error('[Push] Invalid notification payload:', payload);
        }
    });
} catch (error) {
    console.error('[Service Worker] Error setting up Firebase Messaging:', error);
    throw error;
}

// Service Worker lifecycle events
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
    event.waitUntil(self.clients.claim());
});

console.log('[Service Worker] firebase-messaging-sw.js setup complete');
