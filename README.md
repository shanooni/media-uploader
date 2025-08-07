# Media Uploader Application

## Overview
The Media Uploader is a dynamic Angular application designed to allow users to upload media files (images, videos, audio) and receive AI-powered predictions. The application has been recently improved to enhance user experience by introducing a dedicated response page and better UI designs.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Recent Improvements

### 1. 🔄 Moved MediaResponse Component
- **From:** `src/app/media-upload/media-response/`
- **To:** `src/app/components/media-response/`
- **Benefit:** Now it's a shared component that can be used anywhere in the app

### 2. 📄 Created Separate Response Page
- **New page:** `src/app/pages/response-details/`
- **Features:**
  - Dedicated page for displaying response details
  - Clean header with back button
  - Professional styling with animations
  - Error handling for missing data
  - Responsive design

### 3. 🏗️ Restructured MediaUpload as a Page
- **Moved:** From `src/app/media-upload/` to `src/app/pages/media-upload/`
- **Updated functionality:**
  - Added loading state during upload
  - Navigates to response page after successful upload
  - Better error handling with user feedback

### 4. 🛣️ Implemented Proper Routing
- **Set up routes:**
  - `/` → MediaUpload page
  - `/response` → ResponseDetails page
  - Wildcard redirect to home
- **Navigation with state:** Passes response data, media type, and filename securely

### 5. ✨ Enhanced User Experience
- **Loading states:** Button shows "Processing..." during upload
- **Better navigation:** Clean separation between upload and response views
- **Professional styling:** Each page has its own focused design
- **Error handling:** Graceful handling of navigation without data

## 🚀 How It Works Now
1. **User uploads a file** on the main page (`/`)
2. **During processing**, the button shows a loading state
3. **After successful upload**, the app navigates to `/response` with the data
4. **Response page loads** with a dedicated, focused view of the results
5. **User can go back** to upload more files using the back button

## 🎨 UI Benefits
- **Cleaner separation** between upload and response functionality
- **Professional page transitions** with animations
- **Better focus** - each page has a single, clear purpose
- **Improved navigation** with intuitive back button
- **Responsive design** that works on all devices
- **Loading feedback** so users know something is happening

## Features

### Media Type Support
- 🖼️ **Images** - Upload and analyze image files
- 🎬 **Videos** - Upload and process video content
- 🎵 **Audio** - Upload and analyze audio files

### User Interface
- Drag and drop file upload
- Media type selection cards
- File validation and preview
- Real-time upload progress
- Professional response display
- Download and copy response features

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── media-response/          # Shared response component
│   ├── pages/
│   │   ├── media-upload/            # Main upload page
│   │   └── response-details/        # Dedicated response page
│   ├── app.routes.ts                # Application routing
│   └── ...
└── ...
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
