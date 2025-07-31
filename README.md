# Quizelle

**Quizelle** is a real-time quiz web app that I built as a learning project.

My purpose for this project was to learn

- React and TypeScript,
- to use authentication with Firebase (handling users, login, signup)
- and to use a live database (to store quiz questions and user information).

## 🚀 Play a round of Quizelle

Quizelle is live on the web. Try it out!
<a href="https://quizelle.web.app"  target="_blank">
https://quizelle.web.app
</a>

<a href="https://quizelle.web.app"  target="_blank">
<img src="https://github.com/jonasclick/hosting-images/blob/main/MainPageQuizelle.png?raw=true"  alt="Image of the Quizelle App"  style="max-width: 100%; height: auto;">
</a>

## 🔭 Features

- 🔐 User authentication (signup, login)
- ❓ Multiple-choice quiz questions for users collect points
- 🏆 Live leaderboard to see the top players
- ⚡ Fast and responsive UI, styled with TailwindCSS and DaisyUI
- 🔄 Real-time updates (e.g. score syncing, answer feedback)

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite and TypeScript
- **Auth & Backend:** Friebase (Auth and Firestore)
- **Styling:** TailwindCSS v4, DaisyUI

## 🧪 Development

- All components are written in **TypeScript**.
- Uses **modular, composable React components**.
- Tailwind & DaisyUI made it easy to style the app consistently without spending too much time, as design was not the project focus.

## 📁 Folder Structure

```
src/
├── assets/          # logo
├── components/      # Reusable UI components (header etc.)
├── contexts/        # AuthContext etc.
├── hooks/           # custom react hook simplifies quiz logic
├── model/           # Interface for the questions
├── pages/           # Route-level pages (e.g. MainPage, LoginPage)
└── services/        # incl. FirebaseInit
```

## 🧯 License

MIT – feel free to fork and contribute your improvements!

---

Want to contribute or have questions? [Open an issue](https://github.com/jonasclick/Quizelle/issues) or reach out! 🚀
