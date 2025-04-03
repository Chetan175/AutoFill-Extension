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

flowchart TB
    A[User Uploads Resume] --> B[Extension Parses Resume]
    B --> C[Extracted Data Stored Locally]
    
    D[User Visits Job Application Site] --> E{Extension Activated?}
    E -->|No| D
    E -->|Yes| F[Scan Page for Form Fields]
    
    F --> G[Map Resume Data to Form Fields]
    G --> H{Perfect Match?}
    
    H -->|Yes| I[Autofill Forms]
    H -->|No| J[Present Field Mapping UI]
    J --> K[User Adjusts Mapping]
    K --> I
    
    I --> L[User Reviews Form]
    L --> M[User Submits Application]
    
    C -.-> G