<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Epictetus EE Team</h1>
        <p class="hero-subtitle">
          Empowering Electronic Engineering at Hellenic Mediterranean University
        </p>
        <div class="hero-actions">
          <router-link to="/library" class="btn btn-primary">
            Explore E-Library
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            Get in Touch
          </router-link>
        </div>
      </div>
    </section>

    <section class="about">
      <div class="container">
        <h2>About Our Mission</h2>
        <div class="mission-grid">
          <div class="mission-item">
            <h3>🎓 Academic Excellence</h3>
            <p>
              We aim to develop initiatives that showcase our institution's strengths 
              and capabilities while addressing relevant challenges and opportunities.
            </p>
          </div>
          <div class="mission-item">
            <h3>🚀 Innovation</h3>
            <p>
              By focusing on innovative and impactful projects, we strive to bring forth 
              positive changes that benefit our university community.
            </p>
          </div>
          <div class="mission-item">
            <h3>🤝 Community</h3>
            <p>
              Epictetus is a student-led group organized by students of the Department 
              of Electronic Engineering, fostering collaboration and growth.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>What We Offer</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>📚 Digital Library</h3>
            <p>Access our comprehensive collection of electronic engineering resources, books, and research materials.</p>
            <router-link to="/library" class="btn btn-primary">Browse Library</router-link>
          </div>
          <div class="feature-card">
            <h3>📰 Latest News</h3>
            <p>Stay updated with the latest developments, events, and announcements from our department.</p>
            <router-link to="/news" class="btn btn-primary">Read News</router-link>
          </div>
          <div class="feature-card">
            <h3>💬 Connect</h3>
            <p>Join our community, share ideas, and collaborate on exciting engineering projects.</p>
            <router-link to="/signup" class="btn btn-primary">Join Us</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Any initialization logic for the home page
  document.title = 'Epictetus EE Team - Home'
})
</script>

<style scoped>
.home {
  min-height: calc(100vh - 120px);
}

.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-actions .btn {
  background-color: white;
  color: var(--primary-color);
  text-decoration: none;
}

.hero-actions .btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.hero-actions .btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.hero-actions .btn-secondary:hover {
  background-color: white;
  color: var(--primary-color);
}

.about {
  padding: 4rem 0;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.mission-item {
  text-align: center;
  padding: 1.5rem;
}

.mission-item h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.features {
  background-color: var(--background-secondary);
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card p {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .mission-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>