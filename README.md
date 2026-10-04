# ⏳ Zen Timer – Pomodoro Focus Timer

> A simple and clean Pomodoro timer designed to help you stay focused, manage work sessions, and take breaks at the right time.

<p align="center">
  <a href="https://zen-timer-three.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Zen%20Timer-blue?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <a href="https://zen-timer-three.vercel.app/">🚀 Open Live Project</a> •
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

---

## 📌 About the Project

Zen Timer is a browser-based Pomodoro timer built using HTML, CSS, and JavaScript.

The idea behind this project is simple: break work into focused sessions, take regular breaks, and make time management easier.

I built this project to practice JavaScript logic, timer functionality, UI design, and handling different timer states.

## ✨ Features

- ⏱️ **Customizable Timer:** Set your preferred work and break durations.
- ▶️ **Start and Pause:** Control the timer whenever needed.
- 🔄 **Reset Timer:** Restart the current session.
- 🔁 **Automatic Session Switching:** Switch between work and break sessions when the timer ends.
- 📊 **Session Counter:** Keep track of completed sessions.
- 🎨 **Clean Interface:** A simple and distraction-free design.
- 📱 **Responsive Layout:** Designed to work across different screen sizes.

*Note: Features should match the actual implementation in the source code.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Timer logic and interactions |
| Vercel | Deployment and hosting |
| GitHub | Source code management |

## 🚀 Live Demo

Try the project here:

🔗 https://zen-timer-three.vercel.app/

## 📂 Project Structure

```text
Zen-Timer/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` – Main structure of the application.
- `style.css` – Styling and layout.
- `script.js` – Timer functionality and interactive logic.
- `README.md` – Project documentation.

## 💻 Getting Started

You can run this project locally in a few simple steps.

### 1. Clone the repository

```bash
git clone https://github.com/satyamshuklaSS07/FocusFlow-Pomodoro-Timer.git
```

### 2. Open the project folder

```bash
cd FocusFlow-Pomodoro-Timer
```

### 3. Run the project

Open `index.html` in your browser.

You can also open the folder in VS Code and use the Live Server extension.

No additional packages are required for the basic HTML, CSS, and JavaScript version.

## ⚙️ How It Works

The timer follows a simple session-based workflow:

```text
       Start Timer
            |
            v
       Work Session
            |
            v
      Work Completed
            |
            v
       Break Session
            |
            v
      Break Completed
            |
            v
       Next Work Session
```

The timer tracks the active session and updates the countdown as time passes.

## 🧠 What I Learned

While building Zen Timer, I practiced:

- JavaScript event handling.
- Countdown timer logic.
- Managing application states.
- Working with user interactions.
- Structuring a small frontend project.
- Styling responsive web interfaces.
- Deploying a static website using Vercel.

## 🔮 Future Improvements

Some ideas I would like to explore in future versions:

- 🔔 Browser notifications when sessions end.
- 💾 Save timer settings between visits.
- 🎵 Optional focus sounds.
- 📈 Daily productivity statistics.
- 🌙 Dark and light themes.
- ⌨️ Keyboard shortcuts.

## 🎯 Interview Questions

### 1. How would you model the timer's work/break states?

I would use three states: `work`, `break`, and `idle`. The timer would switch between work and break when a session ends, while idle represents a stopped or inactive timer.

### 2. How would you request permission for browser notifications?

I would check whether the browser supports notifications and then use `Notification.requestPermission()`. If permission is granted, I would show a notification when a session ends.

### 3. How would you keep the countdown accurate over time?

I would calculate the target end time when the timer starts. Then I would calculate the remaining time using the current time and the target end time, instead of relying only on repeated interval callbacks.

## 👨‍💻 Author

**Satyam Shukla**

MCA Student | Frontend Development | Java | Python

- GitHub: [@satyamshuklaSS07](https://github.com/satyamshuklaSS07)
- Project Repository: [FocusFlow-Pomodoro-Timer](https://github.com/satyamshuklaSS07/FocusFlow-Pomodoro-Timer)
- Live Demo: [Zen Timer](https://zen-timer-three.vercel.app/)

---

<p align="center">
  Made with ❤️ by Satyam Shukla
</p>
