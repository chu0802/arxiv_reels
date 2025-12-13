<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ArXiv Reels (Next.js)

Swipeable arXiv paper browser with AI-powered Q&A, now running on Next.js with a secure server-side API.

## Run locally

**Prerequisites:** Node.js 18+ and npm

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Set `GOOGLE_GENAI_API_KEY` (kept server-side; never exposed to the client)
   - Set `SCHOLAR_MAGIC_TOKEN` (private login token used server-side before Scholar Inbox API calls)
3. Start the dev server:
   - `npm run dev`

## Notes

- AI requests are proxied through `/api/insights`, so your API key never reaches the browser.
- Run `npm run lint` for a quick static check.
