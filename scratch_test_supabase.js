import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    try {
        console.log('Fetching system-company-profile...');
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', 'system-company-profile');
        
        if (error) {
            console.error('Fetch error:', error);
            return;
        }

        console.log('Fetched data:', data);
        if (data && data.length > 0) {
            const content = JSON.parse(data[0].content);
            console.log('Parsed content:', content);
        } else {
            console.log('No data found for system-company-profile');
        }
    } catch (e) {
        console.error('Exception:', e);
    }
}

run();
