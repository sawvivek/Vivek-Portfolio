# Vivek Saw - Portfolio

A modern, animated, responsive personal portfolio for Vivek Saw, built with React and Vite. The portfolio presents his profile, technical skills, projects, hackathon experience, achievements, and contact information in a single-page experience.

## Live Portfolio Flow

1. **Intro animation**
   - The portfolio opens with a full-screen animated sequence that displays greetings in multiple languages.
   - When the sequence finishes, the main portfolio interface slides into view.

2. **Navigation**
   - A fixed navigation bar displays the portfolio logo/name and a menu button.
   - The navbar hides while scrolling down and reappears while scrolling up.
   - It remains visible in the Home section.
   - On large screens, a **Reach Out** button links directly to the contact section.
   - The animated overlay menu provides links to Home, About, Skills, Projects, Experience, Testimonials, and Contact.

3. **Home section**
   - Displays animated role text for Web, React, and Frontend Developer roles.
   - Introduces Vivek Saw and summarizes his frontend development focus.
   - Provides **View My Work**, **My Resume**, Twitter, LinkedIn, and GitHub actions.
   - Shows a particle background and a responsive profile illustration.

4. **About section**
   - Presents Vivek's profile image, role, technical toolkit, experience level, specialty, and focus.
   - Includes quick profile cards and links to Projects and Contact.
   - Provides a longer introduction covering problem-solving, modern web development, and continuous learning.

5. **Skills section**
   - Displays a continuous, scroll-responsive skill carousel.
   - Technologies include Java, React, Next.js, TypeScript, Tailwind CSS, FastAPI, Python, Docker, Node.js, MongoDB, and Angular.

6. **Projects section**
   - Uses a scroll-controlled, sticky project showcase.
   - Each project has a title, subtitle, description, preview image, and external action.
   - The active project and background color change as the visitor scrolls.

   | Project | Description | Action |
   | --- | --- | --- |
   | HopeBridge | NGO donation platform for managing campaigns and tracking money or item donations. | GitHub |
   | FoolProof | Exam integrity platform with offline support, audit tracking, exam sessions, and result generation. | Live demo |
   | TrustFAQ | NLP FAQ assistant for verified answers, uncertain questions, and knowledge-base management. | GitHub |

7. **Experience and achievements section**
   - Presents hackathons, competitions, and Python certification through a scroll-animated timeline.
   - Uses a horizontal timeline on desktop and a vertical timeline on mobile.
   - Current entries include J.P. Morgan GenTech Hackathon, HackNEXT 1.0, Technologia wins, and Python 3.11 certification from IIT Bombay.

8. **Contact section**
   - Accepts a name, email address, and message or project idea.
   - Validates required fields and email format before submission.
   - Sends the data to EmailJS using Vite environment variables.
   - Shows sending, success, or error status and resets the form after a successful submission.

9. **Footer**
   - Displays the portfolio name, social links, a short collaboration message, and the dynamic copyright year.

## Page Interaction Summary

```text
Load
  -> Intro language animation
  -> Main portfolio
       -> Fixed navigation
       -> Home
       -> About
       -> Skills
       -> Scroll-controlled projects
       -> Scroll-controlled timeline
       -> Validated contact form
       -> Footer and social links
```

## Tech Stack

- **React 19**
- **Vite 8**
- **React Router DOM**
- **Tailwind CSS 4**
- **Framer Motion**
- **React Icons**
- **EmailJS Browser SDK**

## Features

- Animated multilingual intro
- Scroll-aware fixed navigation
- Full-screen animated menu
- Typewriter-style role animation
- Interactive custom cursor
- Animated particle background
- Responsive desktop/mobile layouts
- Scroll-triggered Framer Motion effects
- Infinite skill carousel
- Scroll-controlled project showcase
- Desktop and mobile timelines
- Resume download
- Social profile links
- EmailJS contact form with validation and feedback
- Vercel SPA deployment configuration

## Project Structure

```text
my-portfolio/
|-- public/
|   `-- Resume.pdf
|-- src/
|   |-- assets/                 # Images and project previews
|   |-- components/
|   |   |-- CustomCursor.jsx
|   |   |-- IntroAnimation.jsx
|   |   |-- Navbar.jsx
|   |   |-- OverlayMenu.jsx
|   |   `-- ParticlesBackground.jsx
|   |-- sections/
|   |   |-- Home.jsx
|   |   |-- About.jsx
|   |   |-- Skills.jsx
|   |   |-- Projects.jsx
|   |   |-- Experience.jsx
|   |   |-- Contact.jsx
|   |   `-- Footer.jsx
|   |-- App.jsx                 # Main section composition
|   |-- App.css
|   |-- index.css               # Global styles and Tailwind theme
|   `-- main.jsx                # React entry point
|-- vercel.json                 # Vite build and SPA routing settings
|-- vite.config.js
`-- package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- An EmailJS account for the contact form

### Installation

```bash
git clone <your-repository-url>
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
```

The contact form sends these template parameters:

- `from_name`
- `from_email`
- `reply_to`
- `message`

Configure matching variables in the corresponding EmailJS template.

### Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The optimized output is generated in `dist/`.

### Preview the Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

The included `vercel.json` configures Vite as the framework and rewrites all routes to `index.html`, allowing the portfolio to work as an SPA.

Add the three `VITE_*` variables to the Vercel project environment settings before building. Never expose private EmailJS secrets; only public client configuration belongs in Vite environment variables.

## Customization

- Update portfolio content in `src/sections/`.
- Update navigation links in `src/components/Navbar.jsx` and `src/components/OverlayMenu.jsx`.
- Replace profile and project images in `src/assets/`.
- Replace the resume in `public/Resume.pdf`.
- Update social URLs in `Home.jsx` and `Footer.jsx`.
- Update the project list in `src/sections/Projects.jsx`.
- Update timeline entries in `src/sections/Experience.jsx`.
- Update global colors and fonts in `src/index.css`.

## Author

**Vivek Saw**

- GitHub: https://github.com/sawvivek
- LinkedIn: https://www.linkedin.com/in/vivek-kumar-saw-47a552324/
- Twitter/X: https://twitter.com/viveksaw_
