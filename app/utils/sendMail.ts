import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_BURNER_USERNAME,
        pass: process.env.NEXT_PUBLIC_BURNER_PASSWORD
    }
});

async function sendTransactionEmail(
    recipientEmail: string | undefined,
    amount: number,
    currency: string | undefined,
    mpesaNumber?: string | undefined,
    bankAccount?: string | undefined,
    transactionId?: string | undefined,
    kotaniPayReference?: string | undefined,
    receiverAddress?: string | undefined,
) {
    if (!recipientEmail) return;

    try {
        await transporter.sendMail({
            from: 'uZAR Team',
            to: recipientEmail,
            subject: 'uZar Purchase Confirmation',
            text: `
      Dear valued customer,
      
      Your purchase of ${amount} uZar has been initiated.
      ${currency === "KES"
                    ? `Payment method: M-Pesa (${mpesaNumber})`
                    : `Payment method: Bank Transfer (${bankAccount})`
                }
      
      Transaction ID: ${transactionId}
      KotaniPay Reference: ${kotaniPayReference}
      
      You will receive a confirmation once the payment is processed.
      
      Thank you for using our service!
      
      Best regards,
      The uZar Team
            `
        });
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
}

export default sendTransactionEmail;