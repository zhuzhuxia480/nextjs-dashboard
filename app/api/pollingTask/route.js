
import Task from "../../lib/task";

export async function GET(request) {
    startPolling();
    return new Response(JSON.stringify({ message: 'Polling task started' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

function startPolling() {
    const poll = async () => {
        try {
            await Task();
            setTimeout(poll, process.env.REQ_TIME_INTERVAL);
        } catch (error) {
            console.error('Error during polling:', error);
            setTimeout(poll, process.env.REQ_TIME_INTERVAL);
        }
    };

    // 初始调用轮询函数
    poll();
}