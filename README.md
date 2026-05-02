This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

##  Usage

1.  **Sign Up/Login:** Create a new account providing your University details, or log in with Google.
2.  **Input Details:** Navigate to the *Input Semester Details* section to log your current university courses, hobbies, and mandatory daily tasks.
3.  **Generate Schedule:** Hit generate. The app will save your parameters to Firestore, pass them through the Gemini API, and return a tailored, highly specific weekly planner and course advice.
4.  **Find Peers:** Visit the *Peer Group* tab to find classmates taking the same courses. Click "View Plan" to let the AI find when you are
```markdown
# ClassClarity (Student Time Scheduler)

An AI-powered web application designed to help university students manage their time effectively, balance classes, and stay organized. Built with Next.js, Firebase, and the Gemini API, ClassClarity generates personalized weekly schedules based on student courses, interests, and daily routines, while also facilitating peer connections.

---

##  Features

*   **Secure Authentication:** User signup and login powered by Firebase Authentication (Email/Password and Google Sign-In).
*   **Custom Semester Inputs:** Add university courses, personal interests, and day-to-day activities with descriptions and time allocations.
*   **AI Schedule Generation:** Utilizes the **Gemini 1.5 Flash API** to generate a structured, color-coded weekly schedule (Morning, Afternoon, Night) prioritizing difficult courses and integrating personal interests.
*   **Actionable Course Advice:** Generates personalized advice and strategies for tackling specific courses efficiently based on student feedback.
*   **Peer Matchmaking:** Connects students sharing the same courses using Firebase Firestore.
*   **AI Collaborative Activities:** Analyzes the schedules of matched peers to find overlapping free time and suggests customized activities based on shared interests.

---

##  Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Frontend:** React 18, [Tailwind CSS](https://tailwindcss.com/), React Icons
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
*   **AI Integration:** [Gemini API](https://ai.google.dev/) (`gemini-1.5-flash-latest`) via Axios

---

##  Project Structure

```text
├── config.js                 # Firebase initialization and configuration
├── vars.js                   # Prompt templates for the Gemini API
├── hooks/
│   └── useAuth.js            # Custom hook for protecting routes via Firebase Auth
├── src/app/
│   ├── globals.css           # Global Tailwind CSS directives
│   ├── layout.js             # Root layout and font configuration
│   ├── page.js               # Landing page dashboard
│   ├── login/page.js         # User login interface
│   ├── signup/page.js        # User registration interface
│   └── student/
│       ├── peer/page.js            # Peer matchmaking and AI activity generation
│       └── schedule/
│           ├── page.js             # Input form for courses, interests, and activities
│           └── output/page.js      # Displays generated AI schedule and course advice
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
"# ClassClarity" 
