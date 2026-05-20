# APRI-Based Liver Risk Assessment System

A web-based healthcare application developed during Practice School at Yashoda Hospitals, Hyderabad. Enables non-invasive liver fibrosis risk assessment using the APRI (AST-to-Platelet Ratio Index) scoring method — eliminating the need for invasive liver biopsy in preliminary screening.

---

## Features

- Step-by-step APRI score calculation (AST, AST Upper Limit, Platelet Count)
- Automatic liver fibrosis risk interpretation (Minimal / Moderate / Severe)
- Downloadable patient report
- Admin login with Email OTP authentication (via EmailJS)
- Patient record search by Patient ID
- Age-group analytics dashboard with average APRI scores
- PDF chart export
- Data persistence via MongoDB Atlas
- Google Sheets integration for legacy data access

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | EmailJS OTP |
| Analytics | Chart.js, jsPDF |
| Legacy Integration | Google Apps Script, Google Sheets |

---

## Project Structure

```text
apri-liver-risk-assessment/
│
├── backend/
│   ├── controllers/
│   │   └── patientController.js
│   ├── models/
│   │   └── Patient.js
│   ├── routes/
│   │   └── patientRoutes.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env              ← not committed (see .env.example)
│
├── assets/
│   └── images/
│
├── pages/
│   ├── themed_index.html
│   ├── themed_step1.html
│   ├── themed_step2.html
│   ├── themed_step3.html
│   ├── analysis.html
│   ├── chart.html
│   └── admin_login.html
│
├── index.html
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account (free tier works)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/apri_db?appName=Cluster0
PORT=5005
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5005`.

### Frontend

Open `index.html` directly in your browser, or serve the root folder with a local server (e.g. VS Code Live Server extension).

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/patients` | Save a new patient record |
| GET | `/api/patients` | Fetch all records |
| GET | `/api/patients/:id` | Fetch a single record |

---

## APRI Formula

```
APRI = (AST / AST_Upper_Limit) / Platelet_Count × 100
```

| Score | Interpretation |
|---|---|
| < 0.5 | Minimal or No Fibrosis |
| 0.5 – 1.5 | Moderate Fibrosis |
| > 1.5 | Severe Fibrosis / Cirrhosis |

---

## My Contribution

- Full backend development (Node.js, Express, MongoDB)
- Patient data schema design and API implementation
- APRI calculation engine with dynamic AST Upper Limit
- Admin authentication workflow (Email OTP)
- Google Sheets integration for legacy data
- Age-group analytics dashboard
- Performance optimisation and debugging

---

## Developed At

**Yashoda Hospitals, Hyderabad** — Practice School internship project  
In collaboration with **BITS Pilani**

---

## Important Notes

- Never commit your `.env` file — it contains database credentials
- The `.gitignore` file already excludes it (see setup below)