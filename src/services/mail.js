"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
const template_1 = require("../lib/template");
dotenv_1.default.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
function sendEmail({ candidateEmail, candidateName, refereeName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield oAuth2Client.getAccessToken();
            const transport = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "dummyaccc023@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken.token || "",
                },
            });
            const mailOption = {
                from: "DUMMYACCC <dummyaccc023@gmail.com>",
                to: candidateEmail,
                subject: "You've been REFERRED",
                // texnt: "Hey you just go reffered by ssomeone you know",
                html: (0, template_1.generateHtmlTemplate)({
                    candidateName: candidateName,
                    referreName: refereeName,
                }),
            };
            const result = yield transport.sendMail(mailOption);
            console.log({ result });
        }
        catch (error) {
            console.log({ error });
        }
    });
}
exports.sendEmail = sendEmail;
