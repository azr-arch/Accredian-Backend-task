"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const DUMMY_EMAIL_REGEX = /@(test|example|fake|dummy|tempmail)\./i;
// This is for testing purpose, we could use some sort of 3rd party api to verify email
const COMMON_DUMMY_DOMAINS = [
    "example.com",
    "test.com",
    "mailinator.com",
    "tempmail.com",
    "fake.com",
];
function isValidEmail(email) {
    const [localPart, domain] = email.split("@");
    // Check for common dummy patterns
    if (DUMMY_EMAIL_REGEX.test(email) ||
        COMMON_DUMMY_DOMAINS.includes(domain.toLowerCase()) ||
        localPart.toLowerCase().includes("dummy") ||
        localPart.toLowerCase().includes("test")) {
        return false;
    }
    return true;
}
exports.isValidEmail = isValidEmail;
