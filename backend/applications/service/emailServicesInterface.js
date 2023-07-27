export default function emailService(repositories) {
    const sentEmail = (mailOptions) => repositories.sentEmail(mailOptions)
    return {
        sentEmail
    }
}