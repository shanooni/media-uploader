# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview
The Media Uploader is an Angular 20 application that allows users to upload media files (images, videos, audio) to an AI backend API for prediction/analysis. It features a modern, page-based architecture with drag-and-drop upload functionality and a dedicated response viewer.

## Development Commands

### Starting Development
```bash
npm start
# or
ng serve
```
Development server runs at `http://localhost:4200/`

### Building
```bash
# Development build
ng build

# Production build
ng build --configuration production

# Watch mode (auto-rebuild on changes)
npm run watch
```
Build artifacts are stored in `dist/`

### Testing
```bash
# Run all unit tests with Karma
npm test
# or
ng test
```

### Code Generation
```bash
# Generate new component
ng generate component component-name

# View all available schematics
ng generate --help
```

### SSR (Server-Side Rendering)
```bash
# Serve SSR build
npm run serve:ssr:media-uploader
```

## Architecture

### Application Structure
This is a **standalone component** Angular application (no NgModules). The codebase follows a clean separation between pages and shared components:

```
src/app/
├── pages/                      # Route-level page components
│   ├── media-upload/          # Main upload page (route: /)
│   └── response-details/      # Response display page (route: /response)
├── components/                 # Shared components
│   └── media-response/        # Reusable response display component
├── app.routes.ts              # Application routing configuration
├── app.config.ts              # App-level providers and configuration
└── app.ts                     # Root component
```

### Key Architectural Patterns

**1. Zoneless Change Detection**
- Application uses `provideZonelessChangeDetection()` in app.config.ts
- Angular 20's modern approach for better performance
- Components automatically detect changes without Zone.js overhead

**2. Standalone Components**
- All components are standalone (no NgModules)
- Each component explicitly declares its dependencies via `imports`
- Component selector convention: `app-{name}`

**3. Page-Based Routing with State Transfer**
- The app uses Angular Router with state passing for data flow between pages
- Upload page (MediaUpload) → Response page (ResponseDetailsPage)
- Navigation state carries: `response`, `mediaType`, `fileName`
- ResponseDetailsPage checks both `router.getCurrentNavigation()` and `window.history.state` for robustness

**4. Direct HTTP Client Injection**
- Uses `inject()` function pattern rather than constructor injection
- Example: `private http = inject(HttpClient);`
- HttpClient is provided with `withFetch()` for better performance

**5. TypeScript Strict Mode**
- `tsconfig.json` enables all strict compiler options
- `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`
- Write type-safe code with explicit types

### Backend Integration
- API base URL configured in `src/environment.ts` (currently `http://localhost:5040/api/v1`)
- Single upload endpoint: `POST /upload` with FormData containing the file
- Backend is expected to be running separately on port 5040

### Media Upload Flow
1. User selects media type (image/video/audio) on MediaUpload page
2. User drops/selects file (drag-and-drop or file input)
3. File validation ensures type matches selected media type
4. On submit, file is uploaded via FormData to backend API
5. After successful upload, app navigates to `/response` with response data
6. ResponseDetailsPage displays result using MediaResponse component
7. User can download JSON response or copy to clipboard

### Component Communication
- **Parent → Child**: MediaResponse component receives data via `@Input()` properties
- **Page Navigation**: Router state is used for data transfer between pages
- **No services layer**: HTTP calls are made directly in components (simple architecture for this use case)

### SSR Configuration
- Application supports Server-Side Rendering via Angular Universal
- Entry points: `main.server.ts` and `server.ts`
- SSR build configured in `angular.json` with `outputMode: "server"`
- Client hydration enabled with event replay for better UX

## Code Style
- Use Angular 20 standalone components exclusively
- Use `inject()` for dependency injection in component bodies
- Component naming: drop "Component" suffix (e.g., `MediaUpload` not `MediaUploadComponent`)
- File naming: use `.ts`, `.html`, `.css` extensions without "component" in filename
- Template files: named to match component (e.g., `media-upload.html` for `MediaUpload`)
- Strict TypeScript: all code must satisfy strict type checking rules

## Important Notes
- This is a thesis/research project in the `thesis-project/code/general/clients/` directory
- The application expects a separate backend API server running on port 5040
- No authentication or authorization is implemented
- Media files are uploaded to backend but not stored locally
- Response data is ephemeral and lost on page refresh (no state persistence)
