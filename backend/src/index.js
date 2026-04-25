"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Message_1 = __importDefault(require("./models/Message"));
const seed_1 = __importDefault(require("./seed"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const widgetRoutes_1 = __importDefault(require("./routes/widgetRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.use('/api/widget', widgetRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talknow';
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    (0, seed_1.default)();
})
    .catch(err => console.error('MongoDB connection error:', err));
// Socket.io for Real-time Chat
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });
    socket.on('send_message', async (data) => {
        // data: { visitorId, text, sender, visitorName, businessId, agentId }
        const { visitorId, text, sender, visitorName, businessId, agentId } = data;
        try {
            const message = new Message_1.default({
                businessId,
                visitorId,
                sender,
                text,
                visitorName,
                agentId
            });
            await message.save();
            io.to(visitorId).emit('receive_message', message);
            // Also notify business owner/agents if needed
        }
        catch (err) {
            console.error('Error saving message:', err);
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.get('/', (req, res) => {
    res.send('TalkNow API is running');
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map