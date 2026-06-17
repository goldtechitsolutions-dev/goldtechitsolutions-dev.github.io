import AdminService from './src/services/adminService.js';

const defaultServices = [
    { icon: 'Cpu', title: 'AI & Machine Learning', description: 'Intelligent systems that automate processes and enhance business efficiency.' }
];
const defaultIndustries = [
    { icon: 'HeartPulse', title: 'HEALTH CARE', description: 'Advanced patient systems.' }
];

async function run() {
    try {
        console.log('Fetching current info...');
        const currentInfo = await AdminService.getCompanyInfo();
        console.log('Current info fetched:', currentInfo);

        const updatedInfo = {
            ...currentInfo,
            services: [
                ...currentInfo.services,
                { icon: 'Flame', title: 'New service added by adminService test', description: 'Test desc' }
            ],
            industries: [
                ...currentInfo.industries,
                { icon: 'Zap', title: 'New industry added by adminService test', description: 'Test desc' }
            ]
        };

        console.log('Updating info using AdminService.updateCompanyInfo...');
        await AdminService.updateCompanyInfo(updatedInfo);
        console.log('Update complete!');

        console.log('Fetching info again to verify...');
        const newInfo = await AdminService.getCompanyInfo();
        console.log('New info services count:', newInfo.services.length);
        console.log('New info services:', newInfo.services);
    } catch (e) {
        console.error('Exception:', e);
    }
}

run();
