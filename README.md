# Local Food Lovers Network 🍕

**Local Food Lovers Network** is a vibrant, full-stack MERN application that connects food enthusiasts who love exploring local restaurants, street food, and home-cooked meals. Built with React, Tailwind CSS, and DaisyUI for a delightful user experience, this platform celebrates great food, honest opinions, and local flavor.

---

## 🧩 Features

- 🎠 **Hero Slider** — Dynamic carousel showcasing food experiences with smooth transitions
- ⭐ **Featured Reviews** — Display top-rated food reviews with photos and ratings
- 🔍 **Search & Filter** — Find food posts by category, location, and rating
- 📝 **CRUD Operations** — Create, read, update, and delete food reviews
- 💬 **Comments System** — Engage with the community through comments
- ❤️ **Favorites** — Save and manage your favorite food reviews
- 🔒 **Firebase Authentication** — Secure user login and registration
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- 🎨 **Warm Color Scheme** — Orange and yellow gradients for an appetizing feel

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| React            | Frontend UI framework            |
| Node.js          | Backend runtime environment      |
| Express.js       | RESTful API server               |
| MongoDB          | NoSQL database                   |
| Mongoose         | MongoDB object modeling          |
| Firebase         | Authentication service           |
| Tailwind CSS     | Utility-first styling            |
| DaisyUI          | Tailwind component library       |
| React Router DOM | Client-side routing              |
| Lucide React     | Modern icon library              |
| React Icons      | Additional icon components       |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 
- **npm**  or **yarn**
- **MongoDB** 
- **Firebase Project** (for authentication)

### Installation

#### Clone the repository

```bash
git clone https://github.com/yourusername/local-food-lovers.git
cd local-food-lovers
```

#### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DB_USER=local-food-lovers-project
DB_PASS=vTavoOIHVG9gPnwF
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

#### Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
VITE_FIREBASE_API_KEY=AIzaSyBu_aZwBs2quYPVtQgvlpfI5G_pjC-Y-b8
VITE_FIREBASE_AUTH_DOMAIN=local-food-lovers.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=local-food-lovers
VITE_FIREBASE_STORAGE_BUCKET=local-food-lovers.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=278385185647
VITE_FIREBASE_APP_ID=1:278385185647:web:83309e8aa583285bcf0e9a
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

#### Open your browser

Navigate to `http://localhost:5173` to see the application running.

---

## 📦 Build for Production

### Frontend

```bash
cd frontend
npm run build
# or
yarn build
```

The optimized production build will be generated in the `dist` folder.

### Backend

```bash
cd backend
npm start
```

---

## 📋 Dependencies

### Frontend

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "firebase": "^10.7.0",
  "tailwindcss": "^3.3.0",
  "daisyui": "^4.4.0",
  "lucide-react": "^0.294.0",
  "react-icons": "^4.12.0"
}
```

### Backend

```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
},
"devDependencies": {
  "nodemon": "^3.0.2"
}
```

---

## 🎨 Color Scheme

The application uses a warm, appetizing color palette:

- **Primary Orange**: `#d35400`
- **Secondary Yellow**: `#f1c40f`
- **Background Cream**: `#fff8f0`
- **Gradient**: Linear gradient from orange to yellow

---



## 📱 Live Demo

**Netlify Live Link:**
```
https://local-food-lovers-amin-ur-rahman.netlify.app/
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## 🙏 Credits

Built with passion and love for food by **[AMinur Rahman]** using the MERN stack, Firebase, Tailwind CSS, and a dedication to creating beautiful, functional web applications.

**Special Thanks:**
- Unsplash and imgbb for food photography
- Lucide React for minimal icons
- The food lover community for inspiration

---

## 📞 Contact

Have questions or suggestions? Feel free to reach out!

- **Email**: your.email@example.com
- **GitHub**: [Amin-ur-Rahman](https://github.com/Amin-ur-Rahman)
- **LinkedIn**: [Aminur Rahman](https://www.linkedin.com/in/aminur-rahman-116506360/)

---

**Happy Eating! 🍽️✨**
