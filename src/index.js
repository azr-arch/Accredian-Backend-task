"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const referral_route_1 = __importDefault(require("./routes/referral.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// To parse form data
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.send({ ping: "pong" });
});
app.use("/api/referrals", referral_route_1.default);
app.listen(8080, () => {
    console.log("server is listening on 8080");
});
