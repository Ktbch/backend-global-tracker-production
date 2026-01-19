"use strict";
// src/db/schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.system_settings = exports.notifications = exports.documents = exports.partner_commissions = exports.payments = exports.tracking_events = exports.shipment_items = exports.shipments = exports.user_roles = exports.profiles = exports.paymentProvider = exports.paymentStatus = exports.shipmentStatus = exports.appRole = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.appRole = ['customer', 'partner', 'admin_ng', 'admin_uk'];
exports.shipmentStatus = [
    'draft', 'pending_payment', 'confirmed', 'picked_up', 'in_transit_ng',
    'customs_ng', 'departed_ng', 'in_transit_uk', 'customs_uk', 'cleared_uk',
    'out_for_delivery', 'delivered', 'returned', 'cancelled'
];
exports.paymentStatus = ['pending', 'processing', 'completed', 'failed', 'refunded'];
exports.paymentProvider = ['paystack', 'stripe', 'bank_transfer'];
exports.profiles = (0, mysql_core_1.mysqlTable)("profiles", {
    id: (0, mysql_core_1.varchar)("id", { length: 36 }).primaryKey(),
    email: (0, mysql_core_1.varchar)("email", { length: 255 }).notNull(),
    password: (0, mysql_core_1.varchar)("password", { length: 255 }).notNull(),
    full_name: (0, mysql_core_1.varchar)("full_name", { length: 255 }),
    phone: (0, mysql_core_1.varchar)("phone", { length: 50 }),
    company_name: (0, mysql_core_1.varchar)("company_name", { length: 255 }),
    address: (0, mysql_core_1.varchar)("address", { length: 1000 }),
    city: (0, mysql_core_1.varchar)("city", { length: 100 }),
    country: (0, mysql_core_1.varchar)("country", { length: 100 }).default("Nigeria"),
    avatar_url: (0, mysql_core_1.varchar)("avatar_url", { length: 1000 }),
    partner_code: (0, mysql_core_1.varchar)("partner_code", { length: 100 }),
    is_active: (0, mysql_core_1.boolean)("is_active").default(true),
    created_at: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)("updated_at").defaultNow(),
}, (table) => ([
    (0, mysql_core_1.uniqueIndex)("profiles_email_unique").on(table.email),
]));
exports.user_roles = (0, mysql_core_1.mysqlTable)('user_roles', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    user_id: (0, mysql_core_1.varchar)('user_id', { length: 36 }).references(() => exports.profiles.id).notNull(),
    role: (0, mysql_core_1.varchar)('role', { length: 36 }).notNull(), // Use TypeScript AppRole type
    assigned_by: (0, mysql_core_1.varchar)('assigned_by', { length: 36 }),
    assigned_at: (0, mysql_core_1.timestamp)('assigned_at').defaultNow(),
}, (table) => ([
    (0, mysql_core_1.uniqueIndex)('unique_user_role').on(table.user_id, table.role),
]));
exports.shipments = (0, mysql_core_1.mysqlTable)('shipments', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    tracking_number: (0, mysql_core_1.varchar)('tracking_number', { length: 50 }).unique().notNull(),
    customer_id: (0, mysql_core_1.varchar)('customer_id', { length: 36 }),
    partner_id: (0, mysql_core_1.varchar)('partner_id', { length: 36 }),
    status: (0, mysql_core_1.varchar)('status', { length: 36 }).default('draft'),
    // Sender details
    sender_name: (0, mysql_core_1.varchar)('sender_name', { length: 255 }).notNull(),
    sender_phone: (0, mysql_core_1.varchar)('sender_phone', { length: 50 }).notNull(),
    sender_email: (0, mysql_core_1.varchar)('sender_email', { length: 255 }),
    sender_address: (0, mysql_core_1.text)('sender_address').notNull(),
    sender_city: (0, mysql_core_1.varchar)('sender_city', { length: 100 }).notNull(),
    sender_country: (0, mysql_core_1.varchar)('sender_country', { length: 100 }).default('Nigeria'),
    // Receiver details
    receiver_name: (0, mysql_core_1.varchar)('receiver_name', { length: 255 }).notNull(),
    receiver_phone: (0, mysql_core_1.varchar)('receiver_phone', { length: 50 }).notNull(),
    receiver_email: (0, mysql_core_1.varchar)('receiver_email', { length: 255 }),
    receiver_address: (0, mysql_core_1.text)('receiver_address').notNull(),
    receiver_city: (0, mysql_core_1.varchar)('receiver_city', { length: 100 }).notNull(),
    receiver_country: (0, mysql_core_1.varchar)('receiver_country', { length: 100 }).default('United Kingdom'),
    // Package details
    total_weight_kg: (0, mysql_core_1.decimal)('total_weight_kg', { precision: 10, scale: 2 }),
    total_volume_cbm: (0, mysql_core_1.decimal)('total_volume_cbm', { precision: 10, scale: 4 }),
    declared_value_ngn: (0, mysql_core_1.decimal)('declared_value_ngn', { precision: 12, scale: 2 }),
    declared_value_gbp: (0, mysql_core_1.decimal)('declared_value_gbp', { precision: 12, scale: 2 }),
    // Pricing
    shipping_cost_ngn: (0, mysql_core_1.decimal)('shipping_cost_ngn', { precision: 12, scale: 2 }),
    shipping_cost_gbp: (0, mysql_core_1.decimal)('shipping_cost_gbp', { precision: 12, scale: 2 }),
    insurance_cost: (0, mysql_core_1.decimal)('insurance_cost', { precision: 12, scale: 2 }).default("0.00"),
    total_cost_ngn: (0, mysql_core_1.decimal)('total_cost_ngn', { precision: 12, scale: 2 }),
    total_cost_gbp: (0, mysql_core_1.decimal)('total_cost_gbp', { precision: 12, scale: 2 }),
    // Dates
    pickup_date: (0, mysql_core_1.timestamp)('pickup_date'),
    estimated_delivery: (0, mysql_core_1.timestamp)('estimated_delivery'),
    actual_delivery: (0, mysql_core_1.timestamp)('actual_delivery'),
    // Additional
    special_instructions: (0, mysql_core_1.text)('special_instructions'),
    is_fragile: (0, mysql_core_1.boolean)('is_fragile').default(false),
    requires_insurance: (0, mysql_core_1.boolean)('requires_insurance').default(false),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)('updated_at').defaultNow(),
});
exports.shipment_items = (0, mysql_core_1.mysqlTable)('shipment_items', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey().default('UUID()'),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).notNull(),
    description: (0, mysql_core_1.text)('description').notNull(),
    quantity: (0, mysql_core_1.int)('quantity').default(1),
    weight_kg: (0, mysql_core_1.decimal)('weight_kg', { precision: 10, scale: 2 }),
    length_cm: (0, mysql_core_1.decimal)('length_cm', { precision: 10, scale: 2 }),
    width_cm: (0, mysql_core_1.decimal)('width_cm', { precision: 10, scale: 2 }),
    height_cm: (0, mysql_core_1.decimal)('height_cm', { precision: 10, scale: 2 }),
    declared_value_ngn: (0, mysql_core_1.decimal)('declared_value_ngn', { precision: 12, scale: 2 }),
    hs_code: (0, mysql_core_1.varchar)('hs_code', { length: 50 }),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
exports.tracking_events = (0, mysql_core_1.mysqlTable)('tracking_events', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).notNull(),
    status: (0, mysql_core_1.varchar)('status', { length: 30 }).notNull(),
    location: (0, mysql_core_1.varchar)('location', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description').notNull(),
    notes: (0, mysql_core_1.text)('notes'),
    created_by: (0, mysql_core_1.varchar)('created_by', { length: 36 }),
    event_time: (0, mysql_core_1.timestamp)('event_time').defaultNow(),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
exports.payments = (0, mysql_core_1.mysqlTable)('payments', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).notNull(),
    user_id: (0, mysql_core_1.varchar)('user_id', { length: 36 }).notNull(),
    amount: (0, mysql_core_1.decimal)('amount', { precision: 12, scale: 2 }).notNull(),
    currency: (0, mysql_core_1.varchar)('currency', { length: 10 }).default('NGN'),
    provider: (0, mysql_core_1.varchar)('provider', { length: 50 }).notNull(),
    provider_reference: (0, mysql_core_1.varchar)('provider_reference', { length: 100 }),
    status: (0, mysql_core_1.varchar)('status', { length: 20 }).default('pending'),
    metadata: (0, mysql_core_1.json)('metadata'),
    paid_at: (0, mysql_core_1.timestamp)('paid_at'),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)('updated_at').defaultNow(),
});
exports.partner_commissions = (0, mysql_core_1.mysqlTable)('partner_commissions', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    partner_id: (0, mysql_core_1.varchar)('partner_id', { length: 36 }).notNull(),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).references(() => exports.shipments.id).notNull(),
    payment_id: (0, mysql_core_1.varchar)('payment_id', { length: 36 }),
    commission_rate: (0, mysql_core_1.decimal)('commission_rate', { precision: 5, scale: 2 }).default("10.00"),
    commission_amount: (0, mysql_core_1.decimal)('commission_amount', { precision: 12, scale: 2 }).notNull(),
    currency: (0, mysql_core_1.varchar)('currency', { length: 10 }).default('NGN'),
    status: (0, mysql_core_1.varchar)('status', { length: 20 }).default('pending'),
    paid_at: (0, mysql_core_1.timestamp)('paid_at'),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
exports.documents = (0, mysql_core_1.mysqlTable)('documents', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).references(() => exports.shipments.id).notNull(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    type: (0, mysql_core_1.varchar)('type', { length: 100 }).notNull(),
    file_path: (0, mysql_core_1.text)('file_path').notNull(),
    file_size: (0, mysql_core_1.int)('file_size'),
    uploaded_by: (0, mysql_core_1.varchar)('uploaded_by', { length: 36 }),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
exports.notifications = (0, mysql_core_1.mysqlTable)('notifications', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    user_id: (0, mysql_core_1.varchar)('user_id', { length: 36 }).notNull(),
    shipment_id: (0, mysql_core_1.varchar)('shipment_id', { length: 36 }).references(() => exports.shipments.id),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    message: (0, mysql_core_1.text)('message').notNull(),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).default('info'),
    channel: (0, mysql_core_1.varchar)('channel', { length: 50 }).default('in_app'),
    is_read: (0, mysql_core_1.boolean)('is_read').default(false),
    sent_at: (0, mysql_core_1.timestamp)('sent_at'),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
exports.system_settings = (0, mysql_core_1.mysqlTable)('system_settings', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    key: (0, mysql_core_1.varchar)('key', { length: 255 }).notNull(),
    value: (0, mysql_core_1.json)('value').notNull(),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updated_at: (0, mysql_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    uniqueKey: (0, mysql_core_1.uniqueIndex)('unique_key').on(table.key),
}));
exports.sessions = (0, mysql_core_1.mysqlTable)('sessions', {
    id: (0, mysql_core_1.varchar)('id', { length: 36 }).primaryKey(),
    user_id: (0, mysql_core_1.varchar)('user_id', { length: 36 }).references(() => exports.profiles.id).notNull(),
    refresh_token_hash: (0, mysql_core_1.varchar)('refresh_token_hash', { length: 255 }).notNull(),
    user_agent: (0, mysql_core_1.text)('user_agent'),
    ip_address: (0, mysql_core_1.varchar)('ip_address', { length: 45 }),
    expires_at: (0, mysql_core_1.timestamp)('expires_at').notNull(),
    revoked_at: (0, mysql_core_1.timestamp)('revoked_at'),
    created_at: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
