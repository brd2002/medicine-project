"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./routes/user-routes");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/medicine', (req, res) => {
    res.send('Hello Medicine!');
});
app.get('/user', (req, res) => {
    res.send('Hello User!');
});
app.use('/api', user_routes_1.router);
app.listen(process.env["PORT"] || 3000, () => {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map