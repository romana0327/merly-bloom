# 🌸 Merly Bloom — Luxury Flower Shop Web App

A full-stack flower shop application with an elegant, feminine aesthetic.
Built with **React**, **Node.js + Express**, and **MongoDB**.
Deployable to **Microsoft Azure** in a few steps.

---

## 📁 Project Structure

```
merly-bloom/
├── backend/                  # Node.js + Express API
│   ├── models/               # MongoDB schemas
│   │   ├── Flower.js
│   │   ├── Meaning.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/               # REST API routes
│   │   ├── flowers.js
│   │   ├── meanings.js
│   │   ├── auth.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── data/
│   │   └── seed.js           # Database seeder with sample data
│   ├── server.js             # Main Express entry point
│   ├── web.config            # Azure App Service config
│   └── package.json
│
├── frontend/                 # React application
│   ├── public/
│   │   ├── index.html
│   │   └── staticwebapp.config.json   # Azure Static Web Apps routing
│   └── src/
│       ├── components/       # Reusable UI components
│       │   ├── Navbar.js / .css
│       │   ├── Footer.js / .css
│       │   └── FlowerCard.js / .css
│       ├── context/          # Global state (React Context)
│       │   ├── AuthContext.js
│       │   └── CartContext.js
│       ├── pages/            # Full page components
│       │   ├── HomePage.js / .css
│       │   ├── CollectionPage.js / .css
│       │   ├── MeaningsPage.js / .css
│       │   ├── AuthPage.js / .css
│       │   └── CartPage.js / .css
│       ├── styles/
│       │   └── globals.css   # Global CSS variables + typography
│       ├── App.js
│       └── index.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD
└── README.md
```

---

## ✅ Prerequisites

Make sure you have these installed on your machine:

| Tool        | Version    | Download |
|-------------|------------|----------|
| Node.js     | 18+        | https://nodejs.org |
| npm         | 9+         | Comes with Node.js |
| MongoDB     | 6+         | https://www.mongodb.com/try/download/community |
| Git         | Any        | https://git-scm.com |

---

## 🚀 Local Setup (Step by Step)

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/merly-bloom.git
cd merly-bloom
```

### Step 2 — Set up the Backend

```bash
# Go into the backend folder
cd backend

# Install all dependencies
npm install

# Create your environment file from the example
cp .env.example .env
```

Now open `.env` and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/merlybloom
JWT_SECRET=pick_a_long_random_secret_string_here
PORT=5000
NODE_ENV=development
```

### Step 3 — Start MongoDB

If you installed MongoDB Community locally:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows — start from Services, or run:
mongod

# Linux (Ubuntu)
sudo systemctl start mongod
```

### Step 4 — Seed the database with sample data

```bash
# Still inside /backend
node data/seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
🌸 Inserted 12 flowers
📖 Inserted 8 flower meanings
✅ Database seeded successfully!
```

### Step 5 — Start the backend server

```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

Backend runs at: **http://localhost:5000**

Test it:
```bash
curl http://localhost:5000/api/flowers
```

### Step 6 — Set up the Frontend

Open a **new terminal** window:

```bash
cd frontend

# Install React dependencies
npm install

# Create environment file
cp .env.example .env
```

Your `.env` should have:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 7 — Start the React app

```bash
npm start
```

Frontend opens at: **http://localhost:3000** 🎉

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

### Flowers

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/flowers`         | Get all flowers           |
| GET    | `/flowers?category=Wedding` | Filter by category |
| GET    | `/flowers?featured=true`    | Get featured only  |
| GET    | `/flowers?bestseller=true`  | Get best sellers   |
| GET    | `/flowers/:id`     | Get single flower         |
| POST   | `/flowers`         | Create a flower (admin)   |
| PUT    | `/flowers/:id`     | Update a flower           |
| DELETE | `/flowers/:id`     | Delete a flower           |

### Flower Meanings

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/meanings`    | Get all meanings       |
| GET    | `/meanings/:id`| Get single meaning     |
| POST   | `/meanings`    | Create meaning         |

### Authentication

| Method | Endpoint          | Description       | Body |
|--------|-------------------|-------------------|------|
| POST   | `/auth/register`  | Register user     | `{ name, email, password }` |
| POST   | `/auth/login`     | Login             | `{ email, password }` |
| GET    | `/auth/me`        | Get current user  | Requires `Authorization: Bearer <token>` |

### Orders

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | `/orders`     | Place an order           |
| GET    | `/orders/my`  | Get my orders (auth)     |
| GET    | `/orders/:id` | Get single order         |

---

## ☁️ Deploying to Microsoft Azure

You'll need:
- A **Microsoft Azure account** (free tier works): https://azure.microsoft.com/free
- **Azure CLI** installed: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
- A **MongoDB Atlas** account (free tier): https://www.mongodb.com/atlas

---

### Part 1 — Set up MongoDB Atlas (Cloud Database)

1. Go to https://cloud.mongodb.com and create a free account
2. Click **"Build a Database"** → choose **Free (M0)** tier
3. Select a cloud provider and region (choose one near your Azure region)
4. Create a database user:
   - Username: `merlybloom`
   - Password: Generate a secure password (save it!)
5. Under "Network Access", click **"Add IP Address"** → **"Allow Access from Anywhere"** (`0.0.0.0/0`)
6. Click **"Connect"** → **"Connect your application"**
7. Copy your connection string — it looks like:
   ```
   mongodb+srv://merlybloom:<password>@cluster0.xxxxx.mongodb.net/merlybloom?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password

---

### Part 2 — Deploy the Backend to Azure App Service

```bash
# Step 1: Login to Azure
az login

# Step 2: Create a Resource Group (replace 'eastus' with your preferred region)
az group create --name merly-bloom-rg --location eastus

# Step 3: Create an App Service Plan (free tier)
az appservice plan create \
  --name merly-bloom-plan \
  --resource-group merly-bloom-rg \
  --sku F1 \
  --is-linux

# Step 4: Create the Web App (choose a globally unique name)
az webapp create \
  --name merly-bloom-api \
  --resource-group merly-bloom-rg \
  --plan merly-bloom-plan \
  --runtime "NODE:18-lts"

# Step 5: Set environment variables (replace values with yours)
az webapp config appsettings set \
  --name merly-bloom-api \
  --resource-group merly-bloom-rg \
  --settings \
    MONGO_URI="mongodb+srv://merlybloom:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/merlybloom" \
    JWT_SECRET="your_super_secret_jwt_key_min_32_chars" \
    NODE_ENV="production" \
    FRONTEND_URL="https://YOUR_STATIC_WEB_APP.azurestaticapps.net"

# Step 6: Configure startup command
az webapp config set \
  --name merly-bloom-api \
  --resource-group merly-bloom-rg \
  --startup-file "node server.js"

# Step 7: Deploy backend code via ZIP
cd backend
zip -r backend.zip . -x "node_modules/*"
az webapp deployment source config-zip \
  --name merly-bloom-api \
  --resource-group merly-bloom-rg \
  --src backend.zip

# Step 8: Seed the database (run from your local machine with the Atlas URI)
MONGO_URI="mongodb+srv://..." node data/seed.js
```

Your backend will be live at: `https://merly-bloom-api.azurewebsites.net`

Test it:
```bash
curl https://merly-bloom-api.azurewebsites.net/api/flowers
```

---

### Part 3 — Deploy the Frontend to Azure Static Web Apps

```bash
# Step 1: Build the React app with your live API URL
cd frontend
echo "REACT_APP_API_URL=https://merly-bloom-api.azurewebsites.net/api" > .env
npm run build

# Step 2: Create the Static Web App resource
az staticwebapp create \
  --name merly-bloom-frontend \
  --resource-group merly-bloom-rg \
  --location "eastus2" \
  --source https://github.com/YOUR_USERNAME/merly-bloom \
  --branch main \
  --app-location /frontend \
  --output-location build \
  --login-with-github
```

Alternatively, deploy via the Azure Portal:
1. Go to https://portal.azure.com
2. Search for **"Static Web Apps"** → **"+ Create"**
3. Fill in:
   - Resource Group: `merly-bloom-rg`
   - Name: `merly-bloom-frontend`
   - Plan: Free
   - Region: East US 2
   - Source: GitHub → your repository → branch `main`
   - App location: `/frontend`
   - Output location: `build`
4. Click **Review + Create** → **Create**
5. Azure will create a GitHub Action automatically and deploy!

Set the API URL environment variable in Azure Portal:
1. Open your Static Web App resource
2. Go to **Configuration** → **Application settings**
3. Add: `REACT_APP_API_URL` = `https://merly-bloom-api.azurewebsites.net/api`
4. Save and wait for redeploy

---

### Part 4 — CI/CD with GitHub Actions (Automatic Deployments)

After connecting GitHub in Part 3, set these secrets in your GitHub repo:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `AZURE_BACKEND_APP_NAME` | `merly-bloom-api` |
| `AZURE_BACKEND_PUBLISH_PROFILE` | Download from Azure Portal (App Service → Get publish profile) |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Found in Static Web App → Manage deployment token |
| `REACT_APP_API_URL` | `https://merly-bloom-api.azurewebsites.net/api` |

Now every push to `main` automatically deploys both frontend and backend! 🎉

---

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────────┐
│                     User's Browser                         │
└───────────────────┬────────────────────────────────────────┘
                    │ HTTPS
                    ▼
┌───────────────────────────────────────┐
│   Azure Static Web Apps (Frontend)    │
│   React App (HTML/CSS/JS)            │
│   - HomePage                         │
│   - CollectionPage                   │
│   - MeaningsPage                     │
│   - AuthPage                         │
│   - CartPage                         │
└───────────────────┬───────────────────┘
                    │ REST API calls (HTTPS)
                    ▼
┌───────────────────────────────────────┐
│   Azure App Service (Backend)         │
│   Node.js + Express                   │
│   - /api/flowers                      │
│   - /api/meanings                     │
│   - /api/auth                         │
│   - /api/orders                       │
└───────────────────┬───────────────────┘
                    │ MongoDB Driver
                    ▼
┌───────────────────────────────────────┐
│   MongoDB Atlas (Database)            │
│   Collections:                        │
│   - flowers                           │
│   - meanings                          │
│   - users                             │
│   - orders                            │
└───────────────────────────────────────┘
```

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--rose` | `#c9637a` | Primary brand color, CTAs |
| `--blush` | `#f9e8ec` | Backgrounds, card fills |
| `--charcoal` | `#3a3228` | Body text, headings |
| `--warm-gray` | `#8c7b70` | Secondary text |
| `--sage` | `#8a9e7e` | Category labels, accents |
| `--ivory` | `#fefaf6` | Page background |
| Font Display | Cormorant Garamond | Headings, hero text |
| Font Body | Jost | All body text, UI |

---

## 🌸 Pages Summary

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, categories, featured bouquets, story, testimonials |
| Collection | `/collection` | Full grid with category filter + sort |
| Flower Meanings | `/meanings` | Cards with symbolism, occasions, fun facts |
| Auth | `/auth` | Login + Register with tab switcher |
| Cart | `/cart` | Cart items, quantity controls, checkout form |

---

## 🧩 Adding Your Logo

To add your own logo image:

1. Place your logo file in `frontend/public/` (e.g., `logo.png`)
2. Open `frontend/src/components/Navbar.js`
3. Find the `navbar__logo` section and replace the emoji with:
   ```jsx
   <img src="/logo.png" alt="Merly Bloom" className="navbar__logo-img" />
   ```
4. Add to `Navbar.css`:
   ```css
   .navbar__logo-img {
     height: 40px;
     width: auto;
     object-fit: contain;
   }
   ```

---

## 💡 Common Issues & Solutions

**Backend won't start:**
- Make sure MongoDB is running locally (`mongod`)
- Check your `.env` has all required variables
- Run `npm install` inside `/backend`

**Frontend shows "Could not load flowers":**
- Make sure the backend is running on port 5000
- Check `REACT_APP_API_URL` in your `.env`
- Look for CORS errors in browser DevTools console

**Seeding fails:**
- Verify MongoDB is accessible via the URI in `.env`
- Make sure you're running `node data/seed.js` from inside `/backend`

**Azure deployment fails:**
- Check App Service logs: `az webapp log tail --name merly-bloom-api --resource-group merly-bloom-rg`
- Ensure `NODE_ENV=production` and all env vars are set in Azure

---

## 📝 Environment Variables Summary

### Backend (`/backend/.env`)
```env
MONGO_URI=mongodb://localhost:27017/merlybloom
JWT_SECRET=your_jwt_secret_min_32_chars
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (`/frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🤝 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI components and routing |
| Styling | Pure CSS + CSS Variables | Responsive design |
| State | React Context API | Auth + Cart global state |
| Backend | Node.js + Express | REST API server |
| Auth | JWT + bcrypt | Secure user sessions |
| Database | MongoDB + Mongoose | Data persistence |
| Cloud | Microsoft Azure | Hosting and deployment |
| CI/CD | GitHub Actions | Automatic deployments |

---

*Built with 🌸 — Merly Bloom*
