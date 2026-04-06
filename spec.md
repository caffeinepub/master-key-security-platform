# MASTER KEY - Security Intelligence Platform

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full-stack security intelligence platform with dark theme + red alert UI
- Role-based auth system: Admin (username + password) and Member (mobile + access code)
- Admin dashboard with overview stats, user management (CRUD), photo/ID upload, criminal status marking
- User panel with search by mobile number, face match by photo upload, result display with RED ALERT for criminals
- Face recognition system using face-api.js (client-side JS) — compare uploaded photo against stored profiles
- Activity/search logs tracking per user with IP tracking
- Notification system for alerts
- Report suspicious activity form
- Legal disclaimer displayed on every search
- All key pages: Home, About, Login, Dashboard, Search, Reports, Admin Panel, Privacy Policy, Terms & Conditions

### Modify
N/A — new project

### Remove
N/A — new project

## Implementation Plan

### Backend (Motoko on ICP)
1. Auth: Admin accounts (username/password hashed) and Member accounts (mobile + access code), role field
2. Users table: id, name, mobile, address, photoBlob (blob-storage key), idProofBlob (blob-storage key), status (normal/suspicious/criminal), faceDescriptor (float array for face matching), createdAt
3. Search Logs: id, searcherId, searchType (mobile/face), query, ipAddress, timestamp
4. Admin operations: createUser, updateUser, deleteUser, resetAccessCode, listUsers, getUserById
5. Member operations: searchByMobile, logSearch, reportSuspicious
6. Face data: storeFaceDescriptor per user profile
7. Activity logs: getActivityLogs (admin only)
8. Stats: getTotalUsers, getTotalAlerts, getTotalReports

### Frontend (React + TypeScript)
1. Home page: dark hero, intro text, security message, legal disclaimer
2. Auth pages: Admin login, Member login
3. Admin dashboard: stats cards, user management table, add/edit/delete modals, status badge system
4. Search page: mobile search + photo upload for face match, result card with RED ALERT for criminals, legal disclaimer on page
5. Reports page: suspicious activity reports list (admin) or submit form (member)
6. Admin panel: manage users, access code reset, activity logs, export
7. About, Privacy Policy, Terms & Conditions pages
8. Notification system: toast alerts, animated red alert for criminal results
9. Face recognition: face-api.js client-side, compare uploaded face to stored descriptors
10. Fully mobile responsive, dark theme, red accent
