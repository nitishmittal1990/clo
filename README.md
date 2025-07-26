# CLO React Project

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run the development server

```
npm run dev
```

This will start the app at [http://localhost:3000](http://localhost:3000) by default.

> **Note:** If you want to use a different port, run:
>
> ```
> npm run dev -- --port=YOUR_PORT
> ```

### 3. Build for production

```
npm run build
```

### 4. Preview the production build

```
npm run preview
```

---

## Key Dependencies

### **react-router-dom**

- Enables URL-based state management for filters and search
- Provides `useSearchParams` hook for syncing filter state with URL parameters
- Allows users to bookmark and share filtered views

### **react-infinite-scroll-component**

- Implements infinite scrolling for the product list
- Loads more items automatically as users scroll down
- Improves performance by not rendering all items at once
- Provides smooth user experience for large datasets

### **Zod**

- Runtime type validation for API responses
- Ensures data integrity and prevents runtime errors
- Provides detailed error messages for debugging
- Automatically infers TypeScript types from schemas
- Validates external data sources (APIs, user input) at runtime

---
