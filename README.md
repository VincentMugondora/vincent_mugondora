# Vincent Mugondora - Personal Portfolio & Blog

This is the source code for Vincent Mugondora's personal website, portfolio, and blog.
Vincent is a Software Developer, AI Builder, Educator, and Entrepreneur based in Harare, Zimbabwe.

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)

## 🛠️ Project Structure

```text
/
├── db/                   # Database schema, migrations, and seed files
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   └── pages/            # File-based routing for Astro pages
├── astro.config.mjs      # Astro configuration
├── drizzle.config.ts     # Drizzle ORM configuration
└── wrangler.jsonc        # Cloudflare configuration
```

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the local database:**
   Apply migrations to your local Cloudflare D1 instance:
   ```bash
   npm run db:migrate:local
   ```

3. **Seed the database:**
   Populate the database with initial data:
   ```bash
   npx wrangler d1 execute vincent-mugondora-db --local --file=db/seed.sql
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Your site will be available at `http://localhost:4321`.

## 🗄️ Database Management

This project uses Cloudflare D1 and Drizzle ORM.

- **Generate new migrations:** `npm run db:generate`
- **Apply migrations locally:** `npm run db:migrate:local`
- **Apply migrations remotely (production):** `npm run db:migrate:remote`
- **Open Drizzle Studio:** `npm run db:studio`

## 🌍 Deployment

This project is configured to be deployed on Cloudflare Pages using the Astro Cloudflare adapter (`@astrojs/cloudflare`). 

To deploy manually via Wrangler:
```bash
npm run build
npx wrangler pages deploy dist
```
