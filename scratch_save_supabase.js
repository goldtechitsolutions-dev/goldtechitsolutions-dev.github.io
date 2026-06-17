import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultServices = [
    { icon: 'Cpu', title: 'AI & Machine Learning', description: 'Intelligent systems that automate processes and enhance business efficiency. Specializing in AI Strategy and engineering, Data for AI, Process for AI, Agentic legacy modernization, Physical AI, and AI Trust.' },
    { icon: 'Code', title: 'Custom Software Development', description: 'Tailored software solutions designed to meet your specific business needs and challenges.' },
    { icon: 'Server', title: 'Cloud Infrastructure', description: 'Scalable and secure cloud solutions to power your enterprise applications.' },
    { icon: 'Shield', title: 'Cybersecurity', description: 'Advanced security protocols to protect your digital assets and sensitive data.' },
    { icon: 'Database', title: 'Data Analytics', description: 'Transform raw data into actionable insights for better decision making.' },
    { icon: 'Globe', title: 'Digital Transformation', description: 'Comprehensive strategies to modernize your business operations and customer experience.' },
    { icon: 'Smartphone', title: 'Web & Mobile Applications', description: 'Cutting-edge web and mobile solutions for iOS, Android, and cross-platform needs.' },
    { icon: 'Briefcase', title: 'IT Support & Service', description: 'Comprehensive managed IT support, system maintenance, and enterprise service management to ensure your business operations never miss a beat.' },
    { icon: 'Megaphone', title: 'Digital & Media Marketing', description: 'Strategic digital campaigns and media solutions to amplify your brand presence and engagement.' }
];

const defaultIndustries = [
    { icon: 'HeartPulse', title: "HEALTH CARE", description: "Advanced patient systems and telemedicine platforms." },
    { icon: 'Landmark', title: "BANKING & FINANCE", description: "Secure financial transactions and regulatory compliance." },
    { icon: 'ShoppingCart', title: "RETAIL & E-COMMERCE", description: "Omnichannel retail experiences and digital payment solutions." },
    { icon: 'Umbrella', title: "INSURANCE", description: "Digital policy management and risk assessment tools." },
    { icon: 'Hammer', title: "METALS & MINING", description: "IoT solutions for operational efficiency and safety." },
    { icon: 'Home', title: "REAL ESTATE", description: "Smart property management and virtual tour technologies." },
    { icon: 'Cpu', title: "HIGH TECH", description: "Innovative software solutions for technology companies." },
    { icon: 'GraduationCap', title: "EDUCATION", description: "E-learning platforms and student information systems." },
    { icon: 'Plane', title: "TRAVEL & HOSPITALITY", description: "Seamless booking engines and personalized guest experiences." },
    { icon: 'Tv', title: "MEDIA & ENTERTAINMENT", description: "Content management systems and digital distribution platforms." },
    { icon: 'Zap', title: "ENERGY & UTILITIES", description: "Smart grid management and renewable energy monitoring." },
    { icon: 'Factory', title: "MANUFACTURING & SUPPLY CHAIN", description: "Industrial IoT and resilient supply chain optimization." }
];

async function run() {
    try {
        console.log('Fetching existing company info...');
        const { data: existingRecords, error: fetchError } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', 'system-company-profile')
            .order('id', { ascending: true });

        if (fetchError) throw fetchError;

        console.log('Existing records count:', existingRecords.length);
        if (existingRecords.length === 0) {
            console.log('No records found to update.');
            return;
        }

        const primaryRecord = existingRecords[0];
        const currentContent = JSON.parse(primaryRecord.content);
        
        // Add a test service
        const updatedServices = [
            ...defaultServices,
            { icon: 'Heart', title: 'Test Service added by script', description: 'This is a test service added by node script.' }
        ];

        const updatedInfo = {
            ...currentContent,
            services: updatedServices,
            industries: defaultIndustries
        };

        const payload = {
            title: 'System Component: Company Profile',
            slug: 'system-company-profile',
            content: JSON.stringify(updatedInfo),
            author: 'System',
            category: 'Configuration'
        };

        console.log('Attempting to update record id:', primaryRecord.id);
        const { data, error: updateError } = await supabase
            .from('blogs')
            .update(payload)
            .eq('id', primaryRecord.id)
            .select();

        if (updateError) {
            console.error('Update error:', updateError);
        } else {
            console.log('Update successful! Result:', data);
        }
    } catch (e) {
        console.error('Exception:', e);
    }
}

run();
