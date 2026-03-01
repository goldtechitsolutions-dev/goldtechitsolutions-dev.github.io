import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
    console.log("Fetching users from 'Users' table...");
    const { data, error } = await supabase
        .from('Users')
        .select('*');

    if (error) {
        console.error("Error fetching users:", error);
        return;
    }

    if (data && data.length > 0) {
        data.forEach(user => {
            console.log(`User: ${user.name}, Email: ${user.email}, Password: ${user.password}, Role: ${user.role}, Status: ${user.status}`);
        });
    } else {
        console.log("No users found.");
    }
}

checkUsers();
