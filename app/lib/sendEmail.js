import nodemailer from 'nodemailer';

const sendEmail = async (req) => {
    const {to, subject, text} = req;

    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465, // QQ邮箱的SMTP端口，也可以使用587
        secure: true, // 使用SSL
        auth: {
            user: '742491842@qq.com', // 你的QQ邮箱地址
            pass: process.env.EMAIL_PASSWORD, // 之前获取的授权码
        },
    });

    const mailOptions = {
        from: '"742491842" <742491842@qq.com>', // 发件人信息
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        // res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        // res.status(500).json({ error: 'Failed to send email' });
    }
};

export default async (req) => {
    await sendEmail(req);
};