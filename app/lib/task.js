import React from 'react';
import pako from "pako";
import async from "./sendEmail"
const reqUrl = "https://mcpwxp.motherchildren.com/cloud/appointment/publicClient/selDoctorListPagingBiz"
const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323a) NetType/WIFI Language/zh_CN"
const referer = "https://servicewechat.com/wx38285c6799dac2d1/168/page-frame.html"

async function Task() {
    // const reqJson = `{"appCode":"HXFYAPP","channelCode":"PATIENT_WECHAT_APPLET","pageNum":1,"pageSize":10,"query":{"channelCode":"PATIENT_WECHAT_APPLET","organCode":"HXD2","interRangfaceIndex":"","deptId":"117","isHaveNo":true,"selectionTypeId":"","bizIndex":"","scheduleDate":"","keyWord":"","keyWordType":"doctorName"},"channel":"MOBILE"}`
    const reqJson = `{"appCode":"HXFYAPP","channelCode":"PATIENT_WECHAT_APPLET","pageNum":1,"pageSize":10,"query":{"channelCode":"PATIENT_WECHAT_APPLET","organCode":"HXD2","interRangfaceIndex":"","deptId":"115","isHaveNo":true,"selectionTypeId":"","bizIndex":"","scheduleDate":"","keyWord":"","keyWordType":"doctorName"},"channel":"MOBILE"}`

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
            body: reqJson,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 注意：大部分情况下，这段逻辑不需要，因为浏览器会自动解压。
        // // 但为了演示，我们假设需要手动处理。
        // const arrayBuffer = await response.arrayBuffer();
        // const gzipData = new Uint8Array(arrayBuffer);
        //
        // // 使用pako解压
        // const decompressedData = pako.inflate(gzipData);
        //
        // // 将解压后的Uint8Array转换为字符串
        // const decompressedText = new TextDecoder('utf-8').decode(decompressedData);
        //
        // console.log(decompressedText);
        const result = await response.json();
        console.log('Success:', result);
        if (result.data.hxPageDoctorList.content.length > 0) {
            console.log("get data");
            // await async({to: "742491842@qq.com,lihaoggb@gmail.com", subject: "test email", text: "邮件测试"})
        }

    } catch (error) {
        console.error('Error:', error);
    }
}


export default Task;