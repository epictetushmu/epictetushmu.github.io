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
          <a 
            href="https://epictetushmu.github.io/Chaniathon/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-accent"
          >
            💻 Join Chaniathon
          </a>
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

    <section class="hackathon">
      <div class="container">
        <div class="hackathon-content">
          <div class="hackathon-text">
            <h2>🚀 Join Chaniathon</h2>
            <p class="hackathon-description">
              Participate in Chaniathon, our premier hackathon event! Build innovative projects, collaborate with fellow engineering students, 
              and showcase your skills in exciting coding challenges. Compete for amazing prizes!
            </p>
            <div class="hackathon-features">
              <div class="hackathon-feature">
                <span class="feature-icon">🏆</span>
                <span>Competitive Programming</span>
              </div>
              <div class="hackathon-feature">
                <span class="feature-icon">👥</span>
                <span>Team Collaboration</span>
              </div>
              <div class="hackathon-feature">
                <span class="feature-icon">💡</span>
                <span>Innovation Focus</span>
              </div>
              <div class="hackathon-feature">
                <span class="feature-icon">🎁</span>
                <span>Great Prizes</span>
              </div>
            </div>
            <div class="hackathon-actions">
              <a 
                href="https://epictetushmu.github.io/Chaniathon/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-accent btn-large"
              >
                💻 Join Chaniathon
              </a>
              <a 
                href="https://epictetushmu.github.io/Chaniathon/" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn btn-outline"
              >
                View Projects
              </a>
            </div>
          </div>
          <div class="hackathon-visual">
            <div class="code-snippet">
              <div class="code-header">
                <span class="code-dot red"></span>
                <span class="code-dot yellow"></span>
                <span class="code-dot green"></span>
                <span class="code-title">hackathon.js</span>
              </div>
              <div class="code-content">
                <div class="code-line"><span class="keyword">const</span> <span class="variable">hackathon</span> = {</div>
                <div class="code-line">  <span class="property">theme</span>: <span class="string">'Electronic Engineering'</span>,</div>
                <div class="code-line">  <span class="property">duration</span>: <span class="string">'48 hours'</span>,</div>
                <div class="code-line">  <span class="property">participants</span>: <span class="number">100+</span>,</div>
                <div class="code-line">  <span class="property">prizes</span>: <span class="string">'Amazing rewards'</span></div>
                <div class="code-line">};</div>
                <div class="code-line"></div>
                <div class="code-line"><span class="comment">// Ready to code? Join us!</span></div>
              </div>
            </div>
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

.hero-actions .btn-accent {
  background-color: var(--accent-color);
  color: white;
  border: 2px solid var(--accent-color);
}

.hero-actions .btn-accent:hover {
  background-color: transparent;
  color: var(--accent-color);
  transform: translateY(-2px);
}

.about {
  padding: 4rem 0;
}

/* Hackathon Section */
.hackathon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.hackathon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hackathon-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hackathon-text h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.hackathon-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hackathon-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.hackathon-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.feature-icon {
  font-size: 1.2rem;
}

.hackathon-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-accent {
  background-color: var(--accent-color);
  color: white;
  border: 2px solid var(--accent-color);
}

.btn-accent:hover {
  background-color: transparent;
  color: var(--accent-color);
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background-color: white;
  color: var(--primary-color);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Code Snippet Visual */
.hackathon-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-snippet {
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

.code-header {
  background-color: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #404040;
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-dot.red { background-color: #ff5f56; }
.code-dot.yellow { background-color: #ffbd2e; }
.code-dot.green { background-color: #27ca3f; }

.code-title {
  color: #d4d4d4;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.5rem;
}

.code-content {
  padding: 1.5rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-line {
  margin-bottom: 0.25rem;
}

.keyword { color: #569cd6; }
.variable { color: #9cdcfe; }
.property { color: #9cdcfe; }
.string { color: #ce9178; }
.number { color: #b5cea8; }
.comment { color: #6a9955; font-style: italic; }

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
  
  .hackathon {
    padding: 3rem 0;
  }
  
  .hackathon-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hackathon-text h2 {
    font-size: 2rem;
  }
  
  .hackathon-features {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .hackathon-actions {
    justify-content: center;
  }
  
  .code-snippet {
    max-width: 100%;
  }
  
  .mission-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>