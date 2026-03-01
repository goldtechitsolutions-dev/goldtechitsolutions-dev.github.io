import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkChatLogs() {
    console.log("Checking chat logs for 'Final2' or any recent logs...");
    const { data, error } = await supabase
        .from('gt_chat_logs')
        .select('*')
        .limit(5);

    if (error) {
        console.error("Error fetching chat logs:", error);
        return;
    }

    if (data && data.length > 0) {
        data.forEach(log => {
            console.log(`Log ID: ${log.id}, User: ${log.user}`);
            if (log.messages && log.messages.length > 0) {
                console.log("First message structure:", JSON.stringify(log.messages[0], null, 2));
                console.log("Total messages:", log.messages.length);
            }
        });
    } else {
        console.log("No chat logs found.");
    }
}

checkChatLogs();
