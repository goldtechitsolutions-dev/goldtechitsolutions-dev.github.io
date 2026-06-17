
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnygqubocyzrnqqmbpeg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhueWdxdWJvY3l6cm5xcW1icGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODY1NTUsImV4cCI6MjA4NzY2MjU1NX0.2tATlgjAQ_y4i9PE-nArtMtaa0L3DVRnsGtdmKbVrH4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log("Testing connection to queries table...")
    const { data: qData, error: qError } = await supabase
        .from('queries')
        .insert([{
            name: 'Test Device',
            email: 'test@example.com',
            phone: '1234567890',
            message: 'Testing connection permissions',
            date: new Date().toISOString().split('T')[0]
        }])
        .select()

    if (qError) {
        console.error("Error inserting into 'queries' table:", qError)
    } else {
        console.log("Successfully inserted into 'queries' table:", qData)
    }

    console.log("\nTesting connection to gt_leads table...")
    const { data: lData, error: lError } = await supabase
        .from('gt_leads')
        .insert([{
            name: 'Test Lead',
            contact: 'Test Contact',
            email: 'lead@example.com',
            phone: '1234567890',
            message: 'Testing lead permissions',
            stage: 'New',
            value: 0,
            source: 'Test Script',
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        }])
        .select()

    if (lError) {
        console.error("Error inserting into 'gt_leads' table:", lError)
    } else {
        console.log("Successfully inserted into 'gt_leads' table:", lData)
    }

    console.log("\nTesting retrieval (SELECT) from gt_leads table...")
    const { data: fetchL, error: fetchLError } = await supabase
        .from('gt_leads')
        .select('*')

    if (fetchLError) {
        console.error("Error selecting from 'gt_leads' table:", fetchLError)
    } else {
        console.log(`Successfully fetched ${fetchL.length} leads from 'gt_leads'.`)
    }

    console.log("\nTesting retrieval (SELECT) from queries table...")
    const { data: fetchQ, error: fetchQError } = await supabase
        .from('queries')
        .select('*')

    if (fetchQError) {
        console.error("Error selecting from 'queries' table:", fetchQError)
    } else {
        console.log(`Successfully fetched ${fetchQ.length} queries from 'queries'.`)
    }

    console.log("\nTesting connection to gt_meetings table...")
    const { data: mData, error: mError } = await supabase
        .from('gt_meetings')
        .insert([{
            name: 'Test Meeting',
            email: 'meeting@example.com',
            mobile: '+91 1234567890',
            topic: 'Test Topic',
            date: '2026-12-31',
            time: '10:00 AM',
            status: 'Scheduled',
            link: 'https://meet.google.com/test'
        }])
        .select()

    if (mError) {
        console.error("Error inserting into 'gt_meetings' table:", mError)
    } else {
        console.log("Successfully inserted into 'gt_meetings' table:", mData)
    }

    console.log("\nTesting retrieval (SELECT) from gt_meetings table...")
    const { data: fetchM, error: fetchMError } = await supabase
        .from('gt_meetings')
        .select('*')

    if (fetchMError) {
        console.error("Error selecting from 'gt_meetings' table:", fetchMError)
    } else {
        console.log(`Successfully fetched ${fetchM.length} meetings from 'gt_meetings'.`)
    }
}

testConnection()
