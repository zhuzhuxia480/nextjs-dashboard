import Task from "./task";

const cron = require('node-cron');

cron.schedule('* * * * *', async () => {
    console.log('执行定时任务');
    await Task();
});