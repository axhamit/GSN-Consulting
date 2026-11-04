# GSN Consulting (Next.js 14, App Router, Tailwind)
1. npm install
2. npm run dev  -> http://localhost:3000
3. Edit company details, services and jobs in lib/data.js
4. Contact form posts to app/api/contact/route.js (add email sending there)
5. Deploy: push to GitHub and import in Vercel

## Admin

Open `/admin/login` to access the dashboard for jobs, applications and contact enquiries.
Set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`, then run
`npm run seed` to create the administrator account. New contact form submissions are stored in MongoDB
and appear in the Enquiries section.
