import React from 'react';
import pako from "pako";
import async from "./sendEmail"

const reqUrl = "https://mcpwxp.motherchildren.com/cloud/appointment/publicClient/selDoctorListPagingBiz"
const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323a) NetType/WIFI Language/zh_CN"
const referer = "https://servicewechat.com/wx38285c6799dac2d1/168/page-frame.html"

const selDoctorScheduleUrl = "https://mcpwxp.motherchildren.com/cloud/appointment/publicClient/selDoctorSchedule"

async function Task() {
    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: {
                'accessToken': process.env.ACCESS_TOKEN,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip',
                'User-Agent': userAgent,
                'Referer': referer,
            },
            body: process.env.REQ_JSON,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        await dealWithResult(result)
    } catch (error) {
        console.error('Error:', error);
    }
}

function isBetween08() {
    const now = new Date();
    const hours = now.getHours();
    console.log(hours);
    return hours > 0 && hours <= 8;
}

function get14DaysAfter() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 14);

    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
    const day = String(futureDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // 输出类似 "2024-09-02" 的格式
    return formattedDate;
}

async function getDocSchedule(docId) {
    const reqJson = `{"organCode":"platform","appCode":"HXFYAPP","channelCode":"PATIENT_WECHAT_APPLET","doctorId":"${docId}","sourceOrganCode":"HXD2"}`
    try {
        const response = await fetch(selDoctorScheduleUrl, {
            method: 'POST',
            headers: {
                'accessToken': process.env.ACCESS_TOKEN,
                'Content-Type': 'application/json',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip',
                'User-Agent': userAgent,
                'Referer': referer,
            },
            body: reqJson,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('req doc schedule:', result);
        return result.data.scheduleRespVo.scheduleRespVos;
    } catch (error) {
        console.error('Error:', error);
    }
}

//{docId, scheduleRespVos[]}
async function getAllDocDate(docs) {
    let docsSchedule = [];
    for (const doc of docs) {
        let docSchedule;
        docSchedule.docId = doc.doctorId;
        let schedule = await getDocSchedule(doc.doctorId);
        if (schedule && schedule.length > 0) {
            docSchedule.scheduleRespVos = schedule;
            docsSchedule.push(docSchedule)
        }
    }
    return docsSchedule;
}

function scheduleOnlyAfter14d(docsSchedule) {

}

//每天0-8点之间：不检查第14天
//其他时间：检查所有
async function dealWithResult(result) {
    if (result.data.hxPageDoctorList.content.length > 0) {
        //all doc`s schedule
        let docsSchedule = await getAllDocDate(result.data.hxPageDoctorList.content);
        console.log("get data", docsSchedule);
        if (isBetween08()) {

        }
        await async({to: "742491842@qq.com,lihaoggb@gmail.com", subject: "test email", text: JSON.stringify(result)});
    }

}


export default Task;