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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mail_1 = require("../services/mail");
const prisma_db_1 = require("../lib/prisma-db");
const referralRouter = express_1.default.Router();
referralRouter.post("/", [
    (0, express_validator_1.body)("referrerName").notEmpty(),
    (0, express_validator_1.body)("referrerEmail").isEmail(),
    (0, express_validator_1.body)("candidateName").notEmpty(),
    (0, express_validator_1.body)("candidateEmail").isEmail(),
    validateMiddleware,
], addReferral);
function validateMiddleware(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
}
// TODO: Move this to separate handler file, if grows more
function addReferral(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            // 1. Add referral in database
            yield prisma_db_1.prismaDb.referral.create({
                data: {
                    referrerEmail: data.referrerName,
                    referrerName: data.referrerName,
                    candidateName: data.candidateName,
                    candidateEmail: data.candidateEmail,
                },
            });
            console.log("--Added referral in database--");
            // 2. Send an email to the user
            console.log("--Sending email to candidate--");
            yield (0, mail_1.sendEmail)({
                candidateEmail: data.candidateEmail,
                candidateName: data.candidateName,
                refereeName: data.referrerName,
            });
            console.log("--Email sent--");
            res.status(200).json({ success: true });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    });
}
exports.default = referralRouter;
