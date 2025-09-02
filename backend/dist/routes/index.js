"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationRoutes_1 = __importDefault(require("./notificationRoutes"));
const router = (0, express_1.Router)();
router.use('/notifications', notificationRoutes_1.default);
// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
exports.default = router;
//# sourceMappingURL=index.js.map