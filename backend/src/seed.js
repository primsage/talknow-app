"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("./models/User"));
const Business_1 = __importDefault(require("./models/Business"));
const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@talknow.com';
        const existingAdmin = await User_1.default.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await bcryptjs_1.default.hash('Admin@123', 10);
            const admin = new User_1.default({
                name: 'Super Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin created: admin@talknow.com / Admin@123');
        }
    }
    catch (err) {
        console.error('Error seeding admin:', err);
    }
};
exports.default = seedAdmin;
//# sourceMappingURL=seed.js.map