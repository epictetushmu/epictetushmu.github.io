# Epictetus EE Team

**Epictetus** is a student-led initiative by the Department of Electronic Engineering at the Hellenic Mediterranean University (HMU). Our mission is to develop projects that enhance the academic environment, showcase our institution's strengths, and address relevant challenges and opportunities.

## 🌐 Project Overview

This repository hosts the source code for our website, designed to make HMU a better place to study. The site includes:

- **Home Page**: Introduction to our mission and initiatives.
- **News Section**: Updates on recent and upcoming events.
- **Authentication Pages**: Login and signup interfaces for users.
- **Contact Page**: Form for visitors to reach out to the team.
- **E-Library**: Digital library with searchable catalog of electronics and engineering resources.

## 🛠️ Technologies Used

- Vue.js 3 - Progressive JavaScript Framework
- Vue Router - Official router for Vue.js
- HTML5 & CSS3
- JavaScript (ES6+)
- Vite - Fast development build tool

## 📁 Project Structure

```
epictetus/
├── public/
│   ├── hmu.png
│   ├── logo.jpg
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── ContactView.vue
│   │   ├── HomeView.vue
│   │   ├── LibraryView.vue
│   │   ├── LoginView.vue
│   │   ├── NewsView.vue
│   │   └── SignupView.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

To run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nikitasmen/epictetus.git
   cd epictetus
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in your terminal (typically `http://localhost:5173`) to view the site.

## ✨ Features

- **Responsive Design**: Optimized for various screen sizes
- **Vue Components**: Modular and reusable UI components
- **Vue Router**: Client-side routing with navigation guards
- **E-Library System**: Search, filter, and view electronic resources
- **Form Validation**: Client-side validation for all forms

## 📚 E-Library

Our E-Library feature offers:

- Searchable catalog of electronic resources
- Category filtering
- Detailed book information
- "Add to Favorites" functionality
- Mobile-responsive design

## 🔮 Future Enhancements

- Add backend API integration for dynamic content
- Implement user authentication system
- Expand E-Library with more resources and download capabilities
- Create an admin panel for content management
- Add dark mode theme option

## 🤝 Contributing

We welcome contributions from the community! If you're interested in collaborating, please fork the repository and submit a pull request. For major changes, open an issue first to discuss your ideas.

## 📄 License

This project is licensed under the MIT License.

---

*Inspired by the Stoic philosopher Epictetus — "It's not what happens to you, but how you react to it that matters."*