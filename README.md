# Brocolli

## Project Overview

### Next.js

- I chose this framework because the website needs to have good SEO, being a public-facing online service company. Using Next.js enables server-side rendering (SSR), which improves SEO by making the content and meta data crawlable by search engines like Google.
- SSR also improves the **First Contentful Paint (FCP)** since the main content is rendered on the server.
- I hosted the site, and it demonstrates [good performance metrics](#Appendix).

### ShadCN + Radix UI + Tailwind CSS

- I selected this UI library because it is more stable and lightweight compared to other UI libraries.
- It also allows for rapid prototyping, which speeds up the development process.

### React Hook Form + Zod

- I used these library to build the `<RequestInvitationForm>` taking advantage of its simplicity and efficiency in managing form state and validation.

### Unit Testing + E2E testing

- I focused on writing tests for the `<RequestInvitationForm>` since it is the most frequently used feature by users.
- Additionally, I wrote tests for the **validation schema** to ensure data constraints are consistently enforced.
- Used Playwright to carry out e2e testing for user request submission.

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

## Testing

Both e2e test and unit test are located in `/test` folder.

### Unit Test

Run the following command for Jest test:

```bash
npm run test
```

### E2e Test

Run the following command for e2e test:

```bash
npm run e2e
```

## Appendix

<img width="441" alt="Screenshot 2024-12-25 at 9 58 34 AM" src="https://github.com/user-attachments/assets/6bf36228-eae3-4c90-b5c4-14ece44f2a73" />

<img width="617" alt="Screenshot 2024-12-25 at 9 58 50 AM" src="https://github.com/user-attachments/assets/646d9d41-d0cf-4e2f-b2c9-4f34c0de0dd5" />




