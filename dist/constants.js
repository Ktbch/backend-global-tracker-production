"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOption = exports.APP_CONTANTS = exports.BASE_URL = void 0;
exports.BASE_URL = "/global-tracker/api/v1";
exports.APP_CONTANTS = {
    adminEndPoints: {
        allShipments: '/admin/all-shipments',
        partnerDetails: '/admin/partner-details',
        paymentDetails: '/admin/payment-details'
    },
    authEndPoints: {
        login: '/auth/login',
        singup: '/auth/signup',
        logout: '/auth/logout',
        me: '/auth/me',
        refresh: '/auth/refresh'
    },
    userEndPoints: {
        profileDetails: '/profile',
        profileUpdate: '/profile/update'
    },
    shipmentEndPoints: {
        shipment: '/shipment',
        createShipments: '/shipment/create-shipment',
        createShipmentItems: '/shipment/create-shipment-items',
        shipmentByTrackingNumber: "/shipment/:id"
    }
};
exports.cookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 100,
    path: "/"
};
