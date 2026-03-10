# ☁️ Aura Weather

**Aura** is a minimalist, airy weather application designed with a focus on atmospheric transitions and high-end UI/UX. Built as part of The Odin Project curriculum, it explores asynchronous data fetching, modular JavaScript, and dynamic CSS theming.

[**🌐 View Live Demo**](https://cmatsagka.github.io/weather-app/)

## 🌟 The Design Philosophy

Most weather apps feel static. **Aura** was built to feel like the sky itself. By using the **HSL (Hue, Saturation, Lightness)** color model and CSS Custom Properties (Variables), the entire application's mood—from the background gradient to the icon glow—morphs smoothly to match the current atmospheric conditions of the searched city.

### Key Features

- **Dynamic Theming:** Seamless 2-second transitions between Day, Night, Rain, Cloud, Snow, and Storm states.
- **Airy UI:** Utilizes **Glassmorphism** (`backdrop-filter: blur`) to create a sense of depth and lightness.
- **Fluid Animations:** Data drifts into view using custom CSS keyframes and JavaScript-triggered layout reflows.
- **Loading States:** A soft-focus blur effect during API fetching to reduce "UI snapping" and provide visual feedback.
- **Unit Toggling:** Instant Celsius to Fahrenheit conversion without redundant API calls.

---

## 🛠️ Technical Stack

- **JavaScript (ES6+):** Modular structure (API, DOM, and Logic separated).
- **Visual Crossing API:** For high-fidelity weather data fetching.
- **Erik Flowers Weather Icons:** Integrated via webfonts for scalable, CSS-styleable iconography.
- **CSS3:** Advanced HSL manipulation, Flexbox, and Keyframe animations.
- **Webpack:** Asset bundling and development environment.

---

## Technical Highlights

### The "Mood" Engine

Instead of switching hardcoded hex values, Aura uses a logic-gate in the DOM controller to categorize API strings into "Moods." These moods are applied to the `body` via a data-attribute, allowing the CSS to interpolate between HSL variables.

```javascript
// Example of the categorization logic
if (data.icon.includes('rain')) weatherMood = 'rain';
else if (data.icon.includes('clear')) weatherMood = 'clear';
document.body.setAttribute('data-weather', weatherMood);
```

---

## Project Structure

```
src/
├── weatherAPI.js # Fetching logic and error handling
├── domController.js # UI Mapping, HSL theme logic, and conversions
├── index.js # Event listeners and application state
└── styles.css # The "Aura" Design System (Glassmorphism & HSL)
```

---

## 🏁 How to Run

1. **Clone the repository:** `git clone https://github.com/cmatsagka/weather-app.git`

2. **Install dependencies:** `npm install`

3. **Launch the development server:** `npm run start`

4. **Experience the Aura:** Search for any city (try "London" for clouds or "Dubai" for sun) and watch the atmosphere change!
