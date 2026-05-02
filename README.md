# ClassClarity (Student Time Scheduler)

An AI-powered web application designed to help university students manage their time effectively, balance academic workload, and stay organized. Built with Next.js, Firebase, and the Gemini API, ClassClarity generates personalized weekly schedules based on student courses, interests, and daily routines, while also enabling peer collaboration.

---

## 🚀 Features

- **Secure Authentication**  
  User signup and login using Firebase Authentication (Email/Password and Google Sign-In).

- **Custom Semester Inputs**  
  Add university courses, hobbies, and daily activities with descriptions and time allocation.

- **AI Schedule Generation**  
  Uses **Gemini 1.5 Flash API** to generate structured, color-coded weekly schedules (Morning, Afternoon, Night), prioritizing difficult subjects.

- **Personalized Course Advice**  
  Provides AI-driven strategies and recommendations for managing specific courses.

- **Peer Matchmaking**  
  Connects students with similar courses using Firebase Firestore.

- **AI-Powered Collaboration**  
  Identifies overlapping free time between peers and suggests collaborative activities based on shared interests.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)  
- **Frontend:** React 18, Tailwind CSS, React Icons  
- **Backend & Database:** Firebase (Authentication & Firestore)  
- **AI Integration:** Gemini API (`gemini-1.5-flash-latest`) via Axios  

---

## 📂 Project Structure

```text
├── config.js                 # Firebase configuration
├── vars.js                   # Gemini API prompt templates
├── hooks/
│   └── useAuth.js            # Route protection with Firebase Auth
├── src/app/
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   ├── page.js               # Dashboard / landing page
│   ├── login/page.js         # Login page
│   ├── signup/page.js        # Signup page
│   └── student/
│       ├── peer/page.js      # Peer matching & AI suggestions
│       └── schedule/
│           ├── page.js       # Input form
│           └── output/page.js# Generated schedule & advice
