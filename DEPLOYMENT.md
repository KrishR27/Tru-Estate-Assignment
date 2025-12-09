# Deployment Guide

This guide will help you deploy the TruEstate application with the backend on Render and frontend on Vercel.

## Prerequisites

1. MongoDB Atlas account (or any MongoDB instance)
2. Render account
3. Vercel account
4. GitHub repository (already set up)

## Backend Deployment on Render

### Step 1: Prepare MongoDB

1. Create a MongoDB Atlas cluster (or use your existing MongoDB instance)
2. Get your MongoDB connection string
3. Make sure your IP is whitelisted (or use 0.0.0.0/0 for Render)

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `truestate-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: (Leave empty for now, will set after frontend deployment)
   - `CORS_ORIGIN`: (Optional, defaults to `*` if not set)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your Render service URL (e.g., `https://truestate-backend.onrender.com`)

### Step 3: Update Environment Variables

After getting your Render URL, update the `FRONTEND_URL` environment variable in Render:
1. Go to your Render service → Environment
2. Update `FRONTEND_URL` with your Vercel frontend URL (after frontend deployment)

## Frontend Deployment on Vercel

### Step 1: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
5. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL + `/api`
     - Example: `https://truestate-backend.onrender.com/api`
6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your Vercel deployment URL (e.g., `https://truestate-frontend.vercel.app`)

### Step 2: Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend service (or it will auto-redeploy)

## Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
CORS_ORIGIN=* (optional)
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Post-Deployment

1. **Seed Database** (if needed):
   - You can run the seed script locally pointing to your production MongoDB:
     ```bash
     cd backend
     MONGODB_URI=your_production_mongodb_uri npm run seed
     ```
   - Or create a one-time script on Render to seed the database

2. **Test the Application**:
   - Visit your Vercel frontend URL
   - Test the API endpoints
   - Verify CORS is working correctly

3. **Monitor**:
   - Check Render logs for backend issues
   - Check Vercel logs for frontend issues
   - Monitor MongoDB Atlas for database connections

## Troubleshooting

### CORS Issues
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check browser console for CORS errors
- Verify the backend is allowing requests from your frontend domain

### API Connection Issues
- Verify `VITE_API_URL` in Vercel is set correctly
- Check that the backend URL includes `/api` at the end
- Test the backend health endpoint: `https://your-backend.onrender.com/health`

### Build Issues
- Check build logs in Render/Vercel
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Notes

- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-50 seconds
- Consider upgrading to paid tier for always-on service
- Vercel has generous free tier with no spin-down

