# Sandra Portfolio

A professional, interactive portfolio website built with Next.js, Three.js, and GSAP animations.

## Features

- 🎨 **Modern Design**: Clean, professional design with white and black mode
- 🌙 **Dark Mode**: Beautiful dark theme with cream (#DAC5A7) accents
- ✨ **Animations**: Smooth GSAP animations throughout
- 🎭 **Three.js**: Interactive 3D particle background
- 📱 **Responsive**: Fully responsive design for all devices
- ⚡ **Performance**: Optimized for speed and smooth interactions

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Three.js & React Three Fiber
- GSAP (GreenSock Animation Platform)
- Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with theme provider
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/
│   ├── Loader.tsx        # Animated loader
│   ├── Navigation.tsx    # Navigation bar
│   ├── Hero.tsx          # Hero section with Three.js
│   ├── About.tsx         # About section
│   ├── Skills.tsx        # Skills section
│   ├── Projects.tsx      # Projects showcase
│   ├── Contact.tsx       # Contact form
│   ├── ThemeProvider.tsx # Theme context
│   └── ThreeBackground.tsx # Three.js particle background
└── package.json
```

## Customization

- Update personal information in each component
- Modify colors in `tailwind.config.js`
- Add your own projects in `components/Projects.tsx`
- Customize animations in individual components

## Build

```bash
npm run build
npm start
```

## License

MIT

