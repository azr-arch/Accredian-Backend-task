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
const USER_EMAIL = process.env.USER_EMAIL;

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
                user: USER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token || "",
            },
        });

        const mailOption: MailOptions = {
            from: `DUMMYACCC <${USER_EMAIL}>`,
            to: candidateEmail,
            subject: "You've been REFERRED",
            text: "Hey you just go reffered by someone you know",
            html: generateHtmlTemplate({
                candidateName: candidateName,
                referreName: refereeName,
            }),
        };

        await transport.sendMail(mailOption);
    } catch (error) {
        console.log({ error });
    }
}
