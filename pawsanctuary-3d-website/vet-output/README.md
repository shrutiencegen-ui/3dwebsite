# 🌿 PawSanctuary — Immersive 3D Veterinary Website

Inspired by larevoltosa.es — cinematic scroll-driven storytelling with a procedural 3D cat model in a garden environment.

## Tech Stack
- **React 18** + **Vite 5**
- **Three.js** — 3D scene, procedural cat model, garden environment
- **GSAP + ScrollTrigger** — scroll-driven camera & model animations
- **Lenis** — buttery smooth scrolling
- **Custom CSS** — garden / biophilic aesthetic

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## File Structure

```
src/
├── main.jsx              # React entry
├── App.jsx               # Root — Lenis + GSAP setup, scene composition
├── index.css             # All global styles (garden theme)
├── components/
│   ├── Scene3D.jsx       # ★ Three.js 3D scene + scroll animations
│   ├── Cursor.jsx        # Custom magnetic cursor
│   ├── Loader.jsx        # Cinematic loading screen
│   ├── Nav.jsx           # Navigation
│   ├── Particles.jsx     # Floating gold particles
│   └── ScrollProgress.jsx# Right-side progress dots
└── sections/
    ├── HeroSection.jsx   # Hero with stats bar
    ├── StorySection.jsx  # Reusable scroll story panel (left/right)
    ├── ServicesSection.jsx # 6-card services grid
    ├── TeamSection.jsx   # Team members
    └── CTASection.jsx    # Final CTA + footer
```

## 3D Scene Details (Scene3D.jsx)

The entire 3D scene is built procedurally with Three.js primitives — **no external 3D model files needed**.

### Cat Model Features
- Detailed body, head, cheeks, muzzle, nose
- Realistic eyes with pupils + specular highlight
- Tri-cone ears with pink inner
- Curved CatmullRom tail
- 4 legs with paws and claws
- Stripe markings
- Whiskers as tube geometry

### Garden Environment
- Foggy ground disc
- 80 procedural grass tufts
- 40 procedural flowers (6 petal types, random colors)
- 12 weathered stones (DodecahedronGeometry)
- 8 glowing fireflies with random float animation

### Scroll-Driven Camera Animations
| Section   | Camera Move         | Cat Behavior      |
|-----------|---------------------|-------------------|
| Hero      | Centered, wide      | Sitting, idle bob |
| Story 1   | Circles right       | Turns left        |
| Story 2   | Low angle left      | Looks up          |
| Services  | Pulls back          | Small, background |
| Team      | Close, side angle   | Turns away coyly  |
| Contact   | Straight-on, close  | Faces camera      |

## Customization

### To swap the cat for a dog model
Edit `buildCat()` in `Scene3D.jsx`:
- Change body to more elongated (scale x=1.3, z=1.5)
- Replace cone ears with folded ear geometry
- Add snout extension (BoxGeometry)
- Widen the muzzle sphere

### Colors
All palette vars are in `index.css` `:root`:
```css
--sage, --moss, --earth, --cream, --gold, --charcoal, --midnight
```

### Sections
Add new story sections in `App.jsx` using `<StorySection>` and a corresponding entry in the `sections` array inside `Scene3D.jsx`.

## Build

```bash
npm run build
```
Output is in `dist/`. Deploy to Vercel/Netlify directly.
