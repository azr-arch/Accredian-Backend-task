export const generateHtmlTemplate = ({
    candidateName,
    referreName,
}: {
    candidateName: string;
    referreName: string;
}) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Course Referral Invitation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff;">
                <!-- Header -->
                <div style="text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 20px;">
                    <h1 style="color: #2c3e50; margin: 0;">🎓 Course Referral Invitation</h1>
                </div>

                <!-- Content -->
                <div style="padding: 30px 20px;">
                    <p style="color: #34495e;">Hi ${candidateName},</p>
                    
                    <p style="color: #34495e;">
                        <strong>${referreName}</strong> has recommended you for our 
                        <strong style="color: #2980b9;">XYZ Course</strong> program!
                    </p>

                    <p style="color: #34495e;">
                        ${referreName} believes you would benefit from this course:
                        <br>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
                    </p>

                    <div style="text-align: center; margin: 40px 0;">
                        <a href="#" 
                        style="background-color: #2980b9; color: white; padding: 12px 25px; 
                                text-decoration: none; border-radius: 5px; display: inline-block;
                                font-weight: bold;">
                            View Course Details
                        </a>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
                        <p style="margin: 0; color: #7f8c8d;">
                            <strong>Why you received this:</strong>
                            <br>
                            Someone you know thinks this course matches your interests. 
                            This is not a spam message.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 20px; color: #95a5a6; font-size: 0.9em;
                            border-top: 1px solid #eeeeee;">
                    <p style="margin: 5px 0;">
                        Sent by Refer & Earn<br>
                        123 Education Street, Knowledge City, KC 12345
                    </p>
                    <p style="margin: 5px 0;">
                        <a href="#" style="color: #95a5a6;">Privacy Policy</a> | 
                        <a href="#" style="color: #95a5a6;">Unsubscribe</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
};
