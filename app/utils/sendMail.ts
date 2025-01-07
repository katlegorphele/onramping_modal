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

export async function sendPaymentTransactionEmail(
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
            from: 'UZAR Team',
            to: recipientEmail,
            subject: 'UZAR Purchase Confirmation',
            text: `
      Dear valued customer,
      
      Your purchase of ${amount} UZAR has been initiated.
      ${currency === "KES"
                    ? `Payment method: M-Pesa (${mpesaNumber})`
                    : `Payment method: Bank Transfer (${bankAccount})`
                }
      
      Transaction ID: ${transactionId}
      KotaniPay Reference: ${kotaniPayReference}
      
      You will receive a confirmation once the payment is processed.
      
      Thank you for using our service!
      
      Best regards,
      The UZAR Team
            `
        });
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
}

export async function sendWithdrawalTransactionEmail(
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
            from: 'UZAR Team',
            to: recipientEmail,
            subject: 'UZAR Withdrawal Confirmation',
            text: `
      Dear valued customer,
      
      Your withdrawal of ${amount} UZAR has been initiated.
      ${currency === "KES"
                    ? `Payment method: M-Pesa (${mpesaNumber})`
                    : `Payment method: Bank Transfer (${bankAccount})`
                }
      
      Transaction ID: ${transactionId}
      KotaniPay Reference: ${kotaniPayReference}
      
      You will receive a confirmation once the payment is processed.
      
      Thank you for using our service!
      
      Best regards,
      The UZAR Team
            `
        });
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
}

export async function sendTransferEmail(
    // needs amount, to
    recipientEmail: string | undefined,
    amount: number,
    to: string | undefined,
) {
    if (!recipientEmail) return;
    if(!to) return;

    try {
        await transporter.sendMail({
            from: 'UZAR Team',
            to: recipientEmail,
            subject: 'UZAR Transfer Confirmation',
            text: `
      Dear valued customer,
      
      You have successfully transferred ${amount} UZAR to ${to}.
      
      Thank you for using our service!
      
      Best regards,
      The UZAR Team
            `
        });
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
}

