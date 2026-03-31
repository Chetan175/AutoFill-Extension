<div align="center">

```
██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗
██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝
██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  
██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  
██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝

 █████╗ ██╗   ██╗████████╗ ██████╗ ███████╗██╗██╗     ██╗     ███████╗██████╗
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗██╔════╝██║██║     ██║     ██╔════╝██╔══██╗
███████║██║   ██║   ██║   ██║   ██║█████╗  ██║██║     ██║     █████╗  ██████╔╝
██╔══██║██║   ██║   ██║   ██║   ██║██╔══╝  ██║██║     ██║     ██╔══╝  ██╔══██╗
██║  ██║╚██████╔╝   ██║   ╚██████╔╝██║     ██║███████╗███████╗███████╗██║  ██║
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
```

### One upload. Any job board. AI-powered field detection. Your data never leaves your browser.

[![Chrome](https://img.shields.io/badge/Chrome-Supported-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](.)
[![Firefox](https://img.shields.io/badge/Firefox-Supported-FF7139?style=flat-square&logo=firefox&logoColor=white)](.)
[![Edge](https://img.shields.io/badge/Edge-Supported-0078D7?style=flat-square&logo=microsoftedge&logoColor=white)](.)
[![HuggingFace](https://img.shields.io/badge/Powered%20by-Hugging%20Face-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://huggingface.co)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black)](.)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=nodedotjs&logoColor=white)](.)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-22c55e?style=flat-square&logo=shield&logoColor=white)](.)
[![License](https://img.shields.io/badge/License-MIT-a855f7?style=flat-square)](.)

</div>

---

## 🧬 What Is This?

A browser extension that **automatically detects form fields on job application websites** and fills them intelligently using data extracted from your resume.

Under the hood, a **Hugging Face AI model** classifies each field's `id`, `name`, and `class` attributes to understand what it's asking for — then maps the right resume data to the right field. No manual mapping. No copy-pasting. Just apply.

> Zero tracking. Works on any ATS. Your resume never leaves your device.

---

## ⚡ Features

| | Feature | Description |
|---|---|---|
| 🔍 | **Instant Form Detection** | Automatically identifies every input field on any job application website |
| 🧠 | **AI-Powered Field Mapping** | HF model classifies field `id`/`class`/`name` to map your resume data accurately |
| 📄 | **Resume Parser** | Extracts structured information from PDF or DOCX files, client-side |
| ✏️ | **Custom Field Mapping** | Override any auto-detected field mapping before submitting |
| 🔒 | **Privacy-First** | Your resume data is processed and stored entirely in your browser |
| 💾 | **Save to Dashboard** | Click "Save to Dashboard" after autofill to archive every application |
| 🌐 | **Cross-Browser** | Works with Chrome, Firefox, and Edge |

---

## 🎬 Demo

> 📹 *Video walkthrough *

<!-- Replace this block with your actual video embed or a GIF -->
```
https://github.com/user-attachments/assets/ec5eb834-6e9d-4e86-bf15-b69ac6292811
```

---

## 🗺️ Architecture Flow

> 📊 *Flow diagram *

<!-- Replace this block with your flowchart image -->
```
<img width="971" alt="Image" src="https://github.com/user-attachments/assets/25b03ac5-80dc-41ce-b7d7-e7511ac319c5" />
```

---

## 🚀 Getting Started

### Step 1 — Upload Your Resume

1. Click the extension icon in your browser toolbar
2. Select **"Upload Resume"**
3. Choose your `.pdf` or `.docx` resume file

The parser extracts your info and stores it **locally** in your browser. No server involved.

---

### Step 2 — Configure Your Profile

1. Review the auto-extracted data
2. Edit any fields that didn't parse correctly
3. Hit **"Save Profile"** — you only need to do this once

---

### Step 3 — Autofill Any Job Application

1. Navigate to any job application page (Lever, Greenhouse, Workday, LinkedIn, etc.)
2. Click the extension icon
3. Select **"Autofill This Page"**

> The Hugging Face model reads each field's `id`, `name`, and `class` attributes, classifies what type of input it is, and maps it to your profile automatically.

---

### Step 4 — Review, Submit & Save

1. Check the pre-filled fields and make any final edits
2. Submit your application
3. Click **"Save to Dashboard"** to log it with a timestamp — your full application history lives there

---

## 🤗 Hugging Face API Key Setup

> [!IMPORTANT]
> **This step is required.** The extension uses a Hugging Face inference model to identify and classify HTML form field identifiers (`id`, `name`, `class`). Without a valid API key, autofill will not work.

### Why Is This Needed?

When the extension scans a job application page, it sees raw HTML like:

```html
<input id="applicant_first_name" class="form-control" type="text" />
<input name="resume_url" class="file-upload-field" type="file" />
```

The HF model reads these identifiers and classifies them — `applicant_first_name` → **First Name**, `resume_url` → **Resume Upload** — so it knows exactly what to fill and where.

> **Privacy note:** Only field metadata (`id`, `class`, `name` strings) is ever sent to the HF API. Your actual resume content **never leaves your device.**

---

### 1 — Get Your Free Hugging Face API Key

1. Go to **[huggingface.co](https://huggingface.co)** and create a free account
2. Navigate to **[huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)**
3. Click **"New token"**
4. Name it something like `resume-autofiller`
5. Set role to **Read**
6. Click **"Generate a token"** and copy it

---

### 2 — Create Your `.env` File

In the **root directory** of the project, create a `.env` file and paste:

```dotenv
# Hugging Face API — used for input field classification
# DO NOT commit this file to version control

REACT_APP_HF_API_KEY=ADD_YOU_HUGGING_FACE_API
```

---

### 3 — Add `.env` to `.gitignore`

Make sure your `.gitignore` includes:

```gitignore
# Environment variables — never commit these
.env
.env.local
.env.*.local
```

> [!WARNING]
> Never push your API key to a public repository. If it gets exposed, revoke and regenerate it immediately at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

---

### 4 — Restart the Dev Server

Environment variables are injected at build time — restart after adding the key:

```bash
npm start
# or
yarn start
```

---

### 5 — Verify It's Working

Open any job application page → trigger autofill → open **DevTools → Console**

✅ **Working** — fields are detected and filled automatically  
❌ **Not working** — `401 Unauthorized` from the HF API means your key in `.env` is missing or incorrect

---

### How the Key Is Used Internally

```js
// src/utils/fieldClassifier.js

const HF_API_KEY = process.env.REACT_APP_HF_API_KEY;

const response = await fetch(
  "https://api-inference.huggingface.co/models/<model-name>",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: fieldIdentifiers }),
  }
);
```

---

## 🛠️ Running the Project Locally

Follow these steps to set up both the extension and the backend server on your machine.

### 1 — Clone the Repository

```bash
git clone https://github.com/Chetan175/AutoFill-Extension.git
cd AutoFill-Extension
```

---

### 2 — Build the React Extension

```bash
npm install
npm run build
```

This generates a `build/` folder containing the production-ready extension files.

---

### 3 — Start the Backend Server

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Then start the server:

```bash
# Standard
node server.js

# With auto-reload (recommended for development)
nodemon server.js
```

---

### 4 — Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle at the top right)
3. Click **"Load unpacked"**
4. Select the `build/` folder generated in Step 2

The extension icon will now appear in your toolbar. You're ready to go. 🎉

---

## 🔒 Privacy

| What | Where it happens |
|---|---|
| Resume parsing | 100% in-browser, client-side only |
| Profile storage | Browser local storage — never synced |
| Field classification | Only `id`/`class`/`name` metadata sent to HF API |
| Resume content | **Never leaves your device** |
| Application history | Stored locally, never transmitted |

---

## 📁 Project Structure

```
AutoFill-Extension/
├── public/
│   └── manifest.json           # Extension manifest (permissions, metadata)
├── src/
│   ├── background/
│   │   └── index.js            # Background service worker
│   ├── content/
│   │   └── autofill.js         # Page-level field detection & injection
│   ├── popup/
│   │   └── App.jsx             # Extension popup UI (React)
│   ├── utils/
│   │   ├── fieldClassifier.js  # HF API integration ← API key used here
│   │   ├── resumeParser.js     # PDF/DOCX client-side extraction
│   │   └── storage.js          # Browser storage helpers
│   └── dashboard/
│       └── Dashboard.jsx       # Application history view
├── backend/
│   ├── server.js               # Express backend server
│   └── package.json
├── .env                        # ← YOUR HF API KEY GOES HERE (never commit)
├── .gitignore
└── package.json
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Extension UI | React |
| Field Classification | Hugging Face Inference API |
| Resume Parsing | PDF.js / Mammoth.js (client-side) |
| Backend Server | Node.js + Express |
| Storage | Chrome Storage API (local) |
| Browser APIs | Content Scripts, Background Worker, Popup |

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <b>Jay Hirapara</b>
    </td>
    <td align="center">
      <b>Chetan Ahuja</b>
    </td>
    <td align="center">
      <b>Darshit Khandelwal</b>
    </td>
  </tr>
</table>

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat: describe your change'`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT — use it, build on it, ship it.

---

<div align="center">

Built with 🤗 Hugging Face &nbsp;·&nbsp; Zero telemetry &nbsp;·&nbsp; Open source &nbsp;·&nbsp; Made for job seekers

</div>
















# Resume Autofiller Extension

A browser extension that automatically detects form fields on job application websites and intelligently fills them with information from your uploaded resume.

## Features

- **Instant Form Detection**: Automatically identifies form fields on any job application website
- **Smart Field Mapping**: Matches resume data to the appropriate form fields
- **Resume Parser**: Extracts structured information from PDF or DOCX resumes
- **Custom Field Mapping**: Override automatic field detection when needed
- **Privacy-Focused**: Your resume data never leaves your browser
- **Cross-Browser Support**: Works with Chrome, Firefox, and Edge

## How It Works

1. Upload your resume once through the extension
2. Browse to any job application website
3. Click the extension icon to activate autofill
4. Review and submit the pre-filled application

## Getting Started

1. **Upload Your Resume**
   - Click the extension icon in your toolbar
   - Select "Upload Resume"
   - Choose your PDF or DOCX resume file

2. **Configure Your Profile**
   - The extension will extract information from your resume
   - Review and edit the extracted data if needed
   - Save your profile

3. **Start Autofilling**
   - Navigate to any job application website
   - Click the extension icon
   - Select "Autofill This Page"
The page gets autofilled and all the information can be save to dashboard on clicking 'Save to dashboard'.


https://github.com/user-attachments/assets/ec5eb834-6e9d-4e86-bf15-b69ac6292811

<img width="971" alt="Image" src="https://github.com/user-attachments/assets/25b03ac5-80dc-41ce-b7d7-e7511ac319c5" />

Running the Project Locally
Follow these steps to set up the extension and backend locally:

1. Clone the Repository:

```
git clone https://github.com/Chetan175/AutoFill-Extension.git
```
4. Build the React Extension:

```
npm install
npm run build
```

This will generate a build folder containing the production-ready extension files.

6. Start the Backend Server
Navigate to the backend directory:
```
cd backend
npm install
```
Then start the server:
```
node server.js
```
Or if you're using nodemon for auto-reloading:
```
nodemon server.js
```
4. Load the Extension in Developer Mode
Open Google Chrome and go to chrome://extensions/

Enable Developer mode (toggle at the top right)

Click Load unpacked

Select the build folder generated in step 2

The extension icon should now appear in your toolbar

You're now ready to use the extension!

## Contributors

- [Jay Hirapara](https://github.com/JayH25)
- [Darshit Khandelwal](https://github.com/darshit2308) 
- [Chetan Ahuja](https://github.com/Chetan175)  




