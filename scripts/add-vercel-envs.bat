@echo off
echo|set /p="your_form_id"|npx vercel env add NEXT_PUBLIC_FORMSPREE_ID production
echo|set /p="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4735234567!2d78.0952!3d9.9727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c8ba89bdca27%3A0xd3c40654930009a0!2sHERO%20VELMURUGAN%20MOTORS%20-%20Madurai!5e0!3m2!1sen!2sin!4v1713883396!5m2!1sen!2sin"|npx vercel env add NEXT_PUBLIC_MAPS_EMBED_URL production
echo|set /p="917490835159"|npx vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
echo|set /p="info@velmuruganmotors.in"|npx vercel env add COMPANY_EMAIL production
echo|set /p="your_gmail_app_password"|npx vercel env add COMPANY_EMAIL_PASSWORD production
echo|set /p="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YmR1ZmNvZmprbmJ6ZHVpd3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjQwOTUsImV4cCI6MjA5Njg0MDA5NX0.KfK0BVJT7o7WJ4E6XyPydZB8WVm5G3a6E3A1puk5_L0"|npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo|set /p="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YmR1ZmNvZmprbmJ6ZHVpd3p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTI2NDA5NSwiZXhwIjoyMDk2ODQwMDk1fQ.ADPhuDGXDGTzsScAf3wx6sLjPknOFAKL1_LDEfT26og"|npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
