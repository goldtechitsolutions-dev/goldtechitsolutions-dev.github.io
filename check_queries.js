import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertQuery() {
    console.log("Inserting a test query with a phone number...");
    const { data, error } = await supabase
        .from('queries')
        .insert([{
            name: 'Test Setup',
            email: 'test@setup.com',
            phone: '123-456-7890',
            message: 'Testing phone insertion'
        }])
        .select();

    if (error) {
        console.error("Error inserting query:", error);
        return;
    }

    console.log("Inserted Query:", JSON.stringify(data, null, 2));
}

insertQuery();
