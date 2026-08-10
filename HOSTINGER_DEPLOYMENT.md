# RAWYAL — Step-by-Step Hostinger Deployment Guide

This guide explains how to replace an existing website hosted on **Hostinger** with your redesigned **THE RAWYAL** application.

---

## Overview Architecture

```
┌────────────────────────────────────────────────────────┐
│                   HOSTINGER SERVER                     │
│                                                        │
│  ┌───────────────────────────┐  ┌───────────────────┐  │
│  │   public_html/ (Frontend) │  │  Node.js Backend  │  │
│  │   Extracted dist/ files   │  │  server/server.js │  │
│  │   (index.html, assets)    │  │  Port / Proxy     │  │
│  └─────────────┬─────────────┘  └─────────▲─────────┘  │
│                │                          │            │
│                └────── Contact Form ──────┘            │
└────────────────────────────────────────────────────────┘
```

---

## Step 1: Prepare the Production Build Locally

Open your terminal in the project directory and run:

```bash
# 1. Ensure all packages are installed
npm install

# 2. Build the production bundle
npm run build
```

This generates a **`dist/`** folder containing all optimized static assets (`index.html`, CSS, JS chunks, images).

---

## Step 2: Backup Existing Site on Hostinger

Before overwriting your existing live website:

1. Log in to **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** -> Click **Manage** next to your domain (`therawyal.com`).
3. Open **Files** -> **File Manager**.
4. Double-click **`public_html`**.
5. Select all existing files -> Click **Compress** (name it `backup_old_website.zip`).
6. Download `backup_old_website.zip` to your computer or move it into a new folder named `old_backup/`.
7. Clear `public_html` (delete old files after backing up).

---

## Step 3: Deploy Frontend (`dist/`) to `public_html`

1. On your computer, open the `dist` folder.
2. Select all files & folders **inside** `dist` and zip them together (name it `dist_files.zip`).
3. In Hostinger File Manager (`public_html`), click **Upload** -> upload `dist_files.zip`.
4. Right-click `dist_files.zip` -> **Extract** -> set destination to `public_html`.
5. Verify that `index.html` is directly inside `public_html` (not inside a subfolder like `public_html/dist/`).
6. Delete `dist_files.zip` from `public_html`.

---

## Step 4: Configure SPA Routing (`.htaccess`)

Because React is a Single Page Application (SPA), direct browser reloads or subpages need to route back to `index.html`.

1. In Hostinger File Manager (`public_html`), check if a **`.htaccess`** file exists.
2. If `.htaccess` does not exist, click **New File** -> name it `.htaccess`.
3. Add the following rule:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

4. Save the file.

---

## Step 5: Setup the Node.js Backend Server (for Contact Form Emails)

If your Hostinger plan includes **Node.js Selector / Web Apps** (Cloud Hosting or Business Web Hosting):

### Method A: Hostinger hPanel Node.js App
1. In hPanel, search for **Node.js** in the search bar or left sidebar.
2. Click **Create Application**:
   - **Node.js version**: `18.x` or `20.x`
   - **Application mode**: `Production`
   - **Application root**: `server`
   - **Application startup file**: `server/server.js`
3. Upload the `server/`, `package.json`, and `package-lock.json` files to your Hostinger application directory.
4. Set Environment Variables in Hostinger Node.js app panel:
   - `EMAIL_SERVICE` = `gmail`
   - `EMAIL_USER` = `supportrawyal@gmail.com`
   - `EMAIL_PASSWORD` = `rbbu ccbs yjax ouea`
   - `EMAIL_FROM` = `supportrawyal@gmail.com`
   - `BUSINESS_EMAIL` = `supportrawyal@gmail.com`
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://therawyal.com` (replace with your domain)
5. Click **Run npm install** and click **Start Application**.

---

### Method B: Separate Free Node Host (If Hostinger plan lacks Node.js)
If your Hostinger plan is standard Web Hosting without a Node.js App manager:
1. Deploy the `server/` directory to **Render**, **Vercel**, **Railway**, or **Fly.io** (all offer free tiers for Node.js APIs).
2. Set the environment variables listed above in your Render / Railway dashboard.
3. Once deployed, copy your backend URL (e.g. `https://rawyal-backend.onrender.com`).
4. In your local `.env`, set:
   ```env
   VITE_API_URL=https://rawyal-backend.onrender.com
   ```
5. Run `npm run build` again and re-upload the `dist/` files to `public_html`.

---

## Step 6: Test & Verify

1. Open your domain (`https://therawyal.com`) in your browser.
2. Verify all sections load, GLSL shaders and globe render smoothly, and images display correctly.
3. Scroll down to **Get a Free Quote / Contact Form**.
4. Submit a test inquiry with your name and email address.
5. Check your `supportrawyal@gmail.com` inbox for the lead notification and customer auto-reply email!

---

## Quick Troubleshooting

| Issue | Solution |
|---|---|
| Page reloads give 404 Error | Ensure `.htaccess` file is placed in `public_html` with the rewrite rules from Step 4. |
| Contact form returns 500 error | Ensure Node.js server is running and `CORS_ORIGIN` matches your live domain (`https://therawyal.com`). |
| Images or icons not loading | Check file permissions in Hostinger File Manager (files should be `0644`, folders `0755`). |
| SSL certificate warning | Ensure Hostinger SSL is activated under **Security -> SSL** in hPanel. |
