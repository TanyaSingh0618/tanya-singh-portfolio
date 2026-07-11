# 🌐 Step-by-Step Guide to Publishing Your Portfolio & Sharing the Live URL

Here are the 3 easiest, completely free, and production-ready ways to deploy your portfolio so anyone across the world can visit it via a professional public URL!

---

## 🏆 Option 1: GitHub Pages (Recommended & Easiest)

Because your GitHub handle is **`TanyaSingh0618`**, you can get a custom personal domain directly on GitHub (`https://tanyasingh0618.github.io`) for free!

### Step 1: Create the GitHub Repository
1. Log in to [github.com/TanyaSingh0618](https://github.com/TanyaSingh0618).
2. Click the **`+`** icon in the top-right and select **New repository**.
3. Name your repository either:
   * **`TanyaSingh0618.github.io`** (This makes the site accessible directly at `https://tanyasingh0618.github.io/`)
   * OR **`tanya-singh-portfolio`** (Accessible at `https://tanyasingh0618.github.io/tanya-singh-portfolio/`)
4. Make sure **Public** is selected and click **Create repository**.

### Step 2: Push Your Code from Terminal
Open your terminal on your Mac and run the following exact commands:

```bash
# 1. Go to your portfolio folder on your Desktop
cd /Users/tanyasingh/Desktop/tanya-singh-portfolio

# 2. Initialize Git repository
git init

# 3. Add all your portfolio files (index.html, styles.css, script.js, enhanced_resume.md, README.md)
git add .

# 4. Commit your initial portfolio release
git commit -m "feat: initial release of Tanya Singh cloud-native & OR-Tools portfolio"

# 5. Rename branch to main
git branch -M main

# 6. Add your GitHub remote repository (replace with your exact repo name if needed)
git remote add origin https://github.com/TanyaSingh0618/TanyaSingh0618.github.io.git

# 7. Push your code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On GitHub, go to your repository's **Settings** tab.
2. In the left sidebar, click on **Pages**.
3. Under **Branch**, select `main` from the dropdown and click **Save**.
4. Within 60–90 seconds, GitHub will display your live site URL:
   👉 **`https://tanyasingh0618.github.io/`**

---

## ⚡ Option 2: Vercel (Lightning Fast CDN Deployment)

If you prefer Vercel (which offers automatic continuous deployments every time you push to GitHub):

1. Go to [vercel.com](https://vercel.com/) and sign up / log in with your **GitHub (`TanyaSingh0618`)** account.
2. Click **Add New > Project** and select your newly pushed repository (`tanya-singh-portfolio` or `TanyaSingh0618.github.io`).
3. Leave all settings as default (Framework Preset: Other / Static HTML) and click **Deploy**.
4. In under 15 seconds, Vercel will generate a custom production URL like:
   👉 **`https://tanya-singh-portfolio.vercel.app`**

---

## ☁️ Option 3: Netlify (Drag-and-Drop Instant Live Link)

If you want a live URL right this second without even touching Git commands:

1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Open Finder on your Mac and navigate to your **Desktop** (`/Users/tanyasingh/Desktop/`).
3. Drag and drop the **`tanya-singh-portfolio`** folder directly into the Netlify drop box on your web browser.
4. Netlify will upload the files and generate an instant live link (e.g., `https://tanya-singh-engineer.netlify.app`)! You can also click **Domain Settings** on Netlify to customize the name.

---

## 💡 Quick Tips for Sharing Your Portfolio URL

* **LinkedIn Profile Enhancement:**
  Add your live URL (`https://tanyasingh0618.github.io/` or your Vercel/Netlify link) directly under your LinkedIn Contact Info and in the **Featured Section** of your profile (`https://www.linkedin.com/in/devtanya/`).
* **Resume Header Link:**
  Your new resume header inside `enhanced_resume.md` already includes your LinkedIn and GitHub links; make sure to also hyperlink your live Portfolio URL right next to your email and phone number when submitting job applications!
* **GitHub Profile Readme:**
  Feature your portfolio link directly in your GitHub profile bio at `https://github.com/TanyaSingh0618` so visiting developers or recruiters see it instantly.
