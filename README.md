# InterviewIQ - AI Interview Coach

Train with AI. Interview with confidence.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

InterviewIQ is a web application designed to help job seekers prepare for technical and behavioral interviews. It leverages the power of Google's Gemini API to generate role-specific questions and provide real-time, constructive feedback on user answers, simulating a realistic interview experience.

[**➡️ View Live Demo**](https://interviewiq.site)

---

## 🚀 Key Features

* **🤖 AI-Powered Question Generation:** Dynamically generates interview questions for a wide range of roles, including Frontend, DevOps, ML Engineer, QA, UI/UX Design, and Product Management.
* **🎯 Role-Specific Tracks:** Users can select a specific job role to receive a tailored set of relevant questions, covering various seniority levels.
* **📈 Instant Feedback & Evaluation:** The AI analyzes user-submitted answers and provides immediate, structured feedback on relevance, clarity, and depth.
* **🔐 Secure User Authentication:** Integrated with Clerk for secure sign-in and user session management.
* **📱 Fully Responsive UI:** A modern, responsive user interface built with Next.js and Tailwind CSS ensures a seamless experience on any device.

---

## 🛠️ Technology Stack

The application is built with a modern, full-stack JavaScript architecture.

| Component        | Technology                                   |
| :--------------- | :------------------------------------------- |
| **Frontend** | Next.js, React, Tailwind CSS                 |
| **Backend** | Node.js, Express.js                          |
| **AI / LLM** | Google Gemini API                            |
| **Authentication** | Clerk                                        |
| **Deployment** | Vercel (Frontend), Your-Cloud-Provider (Backend) |

### Architecture Flow

User (Browser) <--> Next.js Frontend <--> Express.js API <--> Gemini API
|                                        |
+----------------> Clerk <---------------+
(Authentication)


---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm / yarn / pnpm
* Git

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/interview-iq.git](https://github.com/your-username/interview-iq.git)
    cd interview-iq
    ```

2.  **Install dependencies for both frontend and backend:**
    ```sh
    # In the root directory
    npm install
    
    # Navigate to the backend directory
    cd backend
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and a `.env` file in the `/backend` directory. Add the necessary environment variables.

    * **Frontend (`.env.local`):**
        ```env
        # Clerk Authentication Keys
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        CLERK_SECRET_KEY=your_clerk_secret_key
        
        # Backend API URL
        NEXT_PUBLIC_API_URL=http://localhost:3001
        ```

    * **Backend (`/backend/.env`):**
        ```env
        # Google Gemini API Key
        GEMINI_API_KEY=your_gemini_api_key
        
        # Server Port
        PORT=3001
        ```

4.  **Run the application:**
    You'll need two terminal windows to run both the frontend and backend servers concurrently.

    * **Terminal 1 (Frontend):**
        ```sh
        # In the root directory
        npm run dev
        ```

    * **Terminal 2 (Backend):**
        ```sh
        # In the /backend directory
        npm start
        ```

    The application should now be running at `http://localhost:3000`.

---

## 📝 API Endpoints

The Express.js backend serves the following primary endpoints:

* `POST /api/generate-questions`: Accepts a job role and generates a list of interview questions.
* `POST /api/evaluate-answer`: Accepts a question and a user's answer, returning AI-driven feedback.
* `POST /api/sync-user`: A webhook to sync user data from Clerk to a local database (if applicable).

---

## 💡 Prompt Engineering

A key feature of this application is the structured prompting strategy used to interface with the Gemini API. Prompts are carefully engineered to request strict JSON output, ensuring reliable and parseable data for various job roles and questions. This minimizes errors and provides a consistent user experience.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📫 Contact

[karanamgagan@gmail.com](mailto:karanamgagan@gmail.com)

Project Link: [https://github.com/gaghackz/AIJOB](https://github.com/gaghackz/AIJOB)