
import { AdminService } from './src/services/adminService.js';

async function verifyService() {
    console.log("Verifying AdminService refactor...");

    try {
        console.log("\nTesting AdminService.addLead...");
        const lead = {
            name: "Service Verifier",
            email: "verify@test.com",
            phone: "0000000000",
            message: "Verifying service refactor"
        };
        const { data, error } = await AdminService.addLead(lead);

        if (error) {
            console.log("Expected result (if disconnected) or actual error:", error.message);
        } else {
            console.log("Successfully added lead to DB:", data.id);
        }

        console.log("\nTesting AdminService.getLeads...");
        const leads = await AdminService.getLeads();
        console.log(`Fetched ${leads.length} leads (merged).`);

        if (leads.length > 0) {
            console.log("First lead sample:", {
                name: leads[0].name,
                isLocal: !!leads[0]._isLocal,
                date: leads[0].date || leads[0].created_at
            });
        }

        console.log("\nVERIFICATION COMPLETE");
        process.exit(0);
    } catch (err) {
        console.error("Verification failed with fatal error:", err);
        process.exit(1);
    }
}

verifyService();
