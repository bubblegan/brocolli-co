# Brocolli

## Project Overview

### Next.js

- I chose this framework because the website needs to have good SEO, being a public-facing online service company. Using Next.js enables server-side rendering (SSR), which improves SEO by making the content crawlable by search engines like Google.
- SSR also improves the **First Contentful Paint (FCP)** since the main `<h1>` tag is rendered on the server.
- I hosted the site, and it demonstrates good performance metrics.

### ShadCN + Radix UI + Tailwind CSS

- I selected this UI library because it is more stable and lightweight compared to other UI libraries.
- It also allows for rapid prototyping, which speeds up the development process.

### React Hook Form

- I used this library to build the **invitation request form**, taking advantage of its simplicity and efficiency in managing form state and validation.

### Unit Testing

- I focused on writing tests for the **InvitationRequestForm** since it is the most frequently used feature by users.
- Additionally, I wrote tests for the **validation schema** to ensure data constraints are consistently enforced.

## Development

### Steps

1. Install all the required packages:

   ```bash
   npm install
   ```

2. Start the development server and navigate to [http://localhost:3000](http://localhost:3000).

   ```bash
   npm run dev
   ```

---

## Production Build

### Build Steps

1. Install all the required packages:

   ```bash
   npm install
   ```

2. Build the project

   ```bash
   npm run build
   ```

3. Run the project

   ```bash
   npm run start
   ```

---

## Testing

### E2E Test

1. Run the following command for Jest test:

   ```bash
   npm run test
   ```

---
