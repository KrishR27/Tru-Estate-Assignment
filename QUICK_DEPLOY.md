# Quick Deployment Checklist

## Backend (Render) - Environment Variables

Set these in Render Dashboard → Your Service → Environment:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app (set after frontend deployment)
```

**Render Settings:**
- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## Frontend (Vercel) - Environment Variables

Set these in Vercel Dashboard → Your Project → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

**Important:** Include `/api` at the end of the backend URL!

**Vercel Settings:**
- Root Directory: `frontend`
- Framework: Vite (auto-detected)
- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)

## Deployment Order

1. ✅ Deploy Backend on Render first
2. ✅ Get Backend URL (e.g., `https://truestate-backend.onrender.com`)
3. ✅ Deploy Frontend on Vercel with `VITE_API_URL` set to `https://your-backend.onrender.com/api`
4. ✅ Get Frontend URL (e.g., `https://truestate-frontend.vercel.app`)
5. ✅ Update Backend `FRONTEND_URL` in Render with your Vercel URL
6. ✅ Test the application!

## Testing

- Backend Health: `https://your-backend.onrender.com/health`
- Frontend: `https://your-frontend.vercel.app`

