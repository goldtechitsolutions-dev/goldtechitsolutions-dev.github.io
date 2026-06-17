import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    try {
        console.log('Restoring company profile...');
        const payload = {
            title: 'System Component: Company Profile',
            slug: 'system-company-profile',
            content: JSON.stringify({
                address: '3141, VIDYUTH NAGAR, NEW MIG,PH-2 BHEL, HYDERABAD - 502032',
                email: 'contact@goldtech.in',
                phone: '+91 7332209653',
                footerOpacity: 1
            }),
            author: 'System',
            category: 'Configuration'
        };

        const { data, error } = await supabase
            .from('blogs')
            .update(payload)
            .eq('slug', 'system-company-profile')
            .select();

        if (error) {
            console.error('Error during cleanup:', error);
        } else {
            console.log('Successfully cleaned up! Current row:', data);
        }
    } catch (e) {
        console.error('Exception:', e);
    }
}

run();
