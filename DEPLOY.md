# Deploying to Vercel and moving adysphere.com from Wix

## 1. Deploy the site on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project**, choose the `AdySphere-Website-2026` repository and click **Import**. Vercel detects Next.js; keep the defaults.
3. Under **Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | Your Resend API key |
   | `CONTACT_TO` | `mallicka@adysphere.com` |
   | `CONTACT_FROM` | `AdySphere Co. website <website@adysphere.com>` (domain must be verified in Resend) |
   | `NEXT_PUBLIC_BOOKING_URL` | Optional Calendly / Microsoft Bookings link |

4. Click **Deploy**. You get a preview URL like `adysphere-website.vercel.app`. Check every page there before touching DNS.

Every push to the main branch then redeploys automatically. Pull requests get their own preview URLs.

## 2. Add the domain in Vercel

1. In the Vercel project: **Settings → Domains**.
2. Add `www.adysphere.com` and `adysphere.com`. Choose `www.adysphere.com` as the primary domain and let `adysphere.com` redirect to it. (The site's canonical URLs and sitemap use `https://www.adysphere.com`.)
3. Vercel shows the DNS records it needs. Usually:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   Use the exact values Vercel shows you; they can differ per project.

## 3. Move DNS away from Wix

Where your DNS is managed decides the steps.

### If the domain was bought through Wix (DNS managed in Wix)

1. In Wix: **Settings → Domains → adysphere.com → Manage DNS records**.
2. Edit the **A record** for the root (`@` / `adysphere.com`) to `76.76.21.21`.
3. Edit the **CNAME** for `www` to `cname.vercel-dns.com`.
4. **Do not touch MX, TXT (SPF/DKIM/DMARC) or Microsoft 365 records.** Email keeps working only if those stay as they are.
5. Add the Resend DNS records (TXT/MX for a sending subdomain) shown in your Resend dashboard.

Wix may say the domain is "not connected to a site" afterwards. That is expected.

To leave Wix fully, you can later transfer the domain to another registrar (Wix: **Domains → Transfer away from Wix**), then recreate the same DNS records there.

### If the domain is at another registrar (GoDaddy, Namecheap, etc.) and only points to Wix

Change the A and CNAME records at that registrar as above, and remove the Wix-specific records (Wix A records and `www` CNAME). Keep email records.

## 4. Check and switch off Wix

1. DNS can take from minutes to 48 hours. Check progress at [dnschecker.org](https://dnschecker.org).
2. Vercel shows **Valid Configuration** and issues the SSL certificate automatically.
3. Open `https://www.adysphere.com` and `https://adysphere.com` (it should redirect to `www`). Submit the contact form once to confirm email arrives.
4. In Google Search Console, add the `adysphere.com` property if it is not there, and submit `https://www.adysphere.com/sitemap.xml`.
5. Old Wix URLs that had traffic: add redirects in `next.config.ts` (`redirects()`) so they land on the matching new page.
6. Only then cancel the Wix premium plan. Keep the Wix domain registration until you have transferred it, if it was bought there.

## After launch

- WhatsApp: a "Message us on WhatsApp" link (`https://wa.me/971585323522`) beside the contact form and in the footer.
- Local compliance: a UAE VAT and e-invoicing section or blog post.
- Microsoft listing: link the Microsoft partner directory listing once it is live.
- Arabic: an Arabic version of the homepage if targeting government or semi-government clients.
