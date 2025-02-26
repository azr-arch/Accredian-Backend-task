import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { sendEmail } from "../services/mail";
import { prismaDb } from "../lib/prisma-db";

const referralRouter = express.Router();

referralRouter.post(
    "/",
    [
        body("referrerName").notEmpty(),
        body("referrerEmail").isEmail(),
        body("candidateName").notEmpty(),
        body("candidateEmail").isEmail(),
        validateMiddleware,
    ],
    addReferral
);

function validateMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
}

// TODO: Move this to separate handler file, if grows more
async function addReferral(req: Request, res: Response) {
    const data = req.body;

    try {
        // 1. Add referral in database
        await prismaDb.referral.create({
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
        await sendEmail({
            candidateEmail: data.candidateEmail,
            candidateName: data.candidateName,
            refereeName: data.referrerName,
        });
        console.log("--Email sent--");

        res.status(200).json({ success: true });
    } catch (error: any) {
        if (error.code === "P2002") {
            // Handle unique constraint violation from prisma db (single user cant be referred multiple times)
            res.status(400).json({
                error: "This candidate has already been referred. Please use a different email.",
            });
            return;
        }
        res.status(500).json({ error: "Internal server error." });
    }
}

export default referralRouter;
