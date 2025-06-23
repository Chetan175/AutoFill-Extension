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


