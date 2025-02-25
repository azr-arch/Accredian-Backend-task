import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import { MailOptions } from "nodemailer/lib/ses-transport";
import { generateHtmlTemplate } from "../lib/template";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail({
    candidateEmail,
    candidateName,

    refereeName,
}: {
    candidateEmail: string;
    candidateName: string;
    refereeName: string;
}) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
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

        const mailOption: MailOptions = {
            from: "DUMMYACCC <dummyaccc023@gmail.com>",
            to: candidateEmail,
            subject: "You've been REFERRED",
            // texnt: "Hey you just go reffered by ssomeone you know",
            html: generateHtmlTemplate({
                candidateName: candidateName,
                referreName: refereeName,
            }),
        };

        const result = await transport.sendMail(mailOption);
        console.log({ result });
    } catch (error) {
        console.log({ error });
    }
}
