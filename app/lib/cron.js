import Task from "./task";

const cron = require('node-cron');
import async from "./sendEmail"

cron.schedule('* * * * *', async () => {
    console.log('执行定时任务');
    let rsp;
    // await async({to: "742491842@qq.com,lihaoggb@gmail.com", subject: "test email", text: "邮件测试"})
    await Task();
    console.log(rsp)
});