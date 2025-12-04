<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Epictetus - Lab of Experimental Ideas</h1>
          <p>Epictetus - Lab of Experimental Ideas: Empowering the Future of Electronic Engineering at HMU through Innovation, Collaboration, and Excellence</p>
          <div class="hero-btns">
            <router-link to="/projects" class="btn btn-primary">Explore Our Projects</router-link>
            <router-link to="/contact" class="btn btn-secondary">Join Our Team</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <h3>10+</h3>
            <p>Active Members</p>
          </div>
          <div class="stat-item">
            <h3>7+</h3>
            <p>Research Projects</p>
          </div>
          <!-- <div class="stat-item">
            <h3>8</h3>
            <p>Industry Partners</p>
          </div>
          <div class="stat-item">
            <h3>3</h3>
            <p>National Awards</p>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="section section-dark">
      <div class="container">
        <div class="section-title">
          <h2>Our Mission</h2>
          <p>Guiding principles that shape our work and community</p>
        </div>
        <div class="mission-cards">
          <div class="mission-card">
            <div class="mission-icon"><span>🎓</span></div>
            <h3>Academic Excellence</h3>
            <p>We foster deep understanding of electronic engineering concepts through collaborative learning, research, and knowledge sharing across all levels of expertise.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon"><span>💡</span></div>
            <h3>Innovation</h3>
            <p>We encourage creative problem-solving and the development of novel solutions to engineering challenges, bridging theory with practical application.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon"><span>🤝</span></div>
            <h3>Community</h3>
            <p>We build a supportive network of students, faculty, and industry professionals to advance our field together through mentorship and collaboration.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Approach Section -->
    <div class="section section-light approach">
      <div class="container">
        <div class="approach-content">
          <div class="approach-text">
            <h2>Our Approach</h2>
            <p>We believe that the best engineering solutions emerge from a structured yet flexible process that balances theoretical knowledge with hands-on experimentation.</p>
            <p>Our methodology integrates academic rigor with practical application, creating a dynamic environment where ideas can flourish and innovations can take shape.</p>
            
            <div class="approach-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Collaborative Ideation</h4>
                        <p>Brainstorming sessions with interdisciplinary teams to identify challenges and opportunities.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Research & Design</h4>
                        <p>Thorough research and systematic design processes to develop viable solutions.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Prototyping & Testing</h4>
                        <p>Building functional prototypes and rigorous testing in our state-of-the-art labs.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Implementation & Refinement</h4>
                        <p>Deploying solutions in real-world scenarios and continuously improving based on feedback.</p>
                    </div>
                </div>
            </div>
          </div>
          <div class="approach-image">
              <span>🔬</span>
          </div>
        </div>
      </div>
    </div>


    <!-- Project Gallery Section -->
    <div class="section section-light">
      <div class="container">
        <div class="section-title">
          <h2>Project Showcase</h2>
          <p>Highlights from our recent engineering innovations</p>
        </div>
        <div class="gallery-grid">
          <div class="gallery-item" @click="openModal('https://placehold.co/800x600/f59e0b/white?text=Transistor+Clock')">
            <img src="https://placehold.co/800x600/f59e0b/white?text=Transistor+Clock" alt="Transistor Clock Image">
            <div class="gallery-overlay">
                <h3 class="gallery-title">Transistor Clock</h3>
                <p class="gallery-desc">Text Here</p>
            </div>
          </div>
          <div class="gallery-item" @click="openModal('https://placehold.co/800x600/ef4444/white?text=Project+Here')">
            <img src="https://placehold.co/800x600/ef4444/white?text=Project+Here" alt="Project Here">
            <div class="gallery-overlay">
                <h3 class="gallery-title">Project Here</h3>
                <p class="gallery-desc">Text Here</p>
            </div>
          </div>
          <div class="gallery-item" @click="openModal('https://placehold.co/800x600/ef4444/white?text=Project+Here')">
            <img src="https://placehold.co/800x600/8b5cf6/white?text=Project+Here" alt="Project Here">
            <div class="gallery-overlay">
                <h3 class="gallery-title">Project Here</h3>
                <p class="gallery-desc">Text Here</p>
            </div>
          </div>
          <div class="gallery-item" @click="openModal('https://placehold.co/800x600/ef4444/white?text=Project+Here')">
            <img src="https://placehold.co/800x600/1e40af/white?text=Project+Here" alt="Project Here">
            <div class="gallery-overlay">
                <h3 class="gallery-title">Project Here</h3>
                <p class="gallery-desc">Text Here</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="section section-dark">
      <div class="container">
        <div class="section-title">
          <h2>Our Lab Members</h2>
        </div>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Gerogiannakis Nikolaos</h3>
              <div class="member-role">Team Lead / Manager</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Evripiotis Andreas</h3>
              <div class="member-role">Lab Coordinator</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Gamvropoulos Simeon</h3>
              <div class="member-role">Lab Coordinator</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Amoiradis Nektarios</h3>
              <div class="member-role">Lab Member</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- Team Section -->
    <div class="section section-dark">
      <div class="container">
        <div class="section-title">
          <h2>Our Team Members</h2>
        </div>
        <div class="team-grid">
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Menounos Nikitas</h3>
              <div class="member-role">Team Member</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Galanakis Stamatis</h3>
              <div class="member-role">Team Member</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
          <div class="team-member">
            <div class="member-image"><span>👨‍💼</span></div>
            <div class="member-info">
              <h3 class="member-name">Akoda David</h3>
              <div class="member-role">Team Member</div>
              <p class="member-bio">Bottom Text.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Content -->
    <div class="featured">
        <div class="container">
            <div class="section-title">
                <h2>Featured Resources</h2>
                <p>Explore our most important offerings</p>
            </div>
            <div class="featured-cards">
                <div class="featured-card">
                    <div class="card-image">
                        <span>📚</span>
                    </div>
                    <div class="card-content">
                        <h3>E-Library</h3>
                        <p>Access our curated collection of electronic engineering resources, textbooks, and research papers.</p>
                        <router-link to="/library" class="btn btn-outline">Explore Library</router-link>
                    </div>
                </div>
                <div class="featured-card">
                    <div class="card-image">
                        <span>⚡</span>
                    </div>
                    <div class="card-content">
                        <h3>Chaniathon Hackathon</h3>
                        <p>Join our flagship 48-hour innovation marathon where students build solutions to real-world challenges.</p>
                        <router-link to="/chaniathon" class="btn btn-primary">Learn More</router-link>
                    </div>
                </div>
                <div class="featured-card">
                    <div class="card-image">
                        <span>📰</span>
                    </div>
                    <div class="card-content">
                        <h3>Latest News</h3>
                        <p>Stay updated with our latest announcements, achievements, and upcoming events.</p>
                        <router-link to="/news" class="btn btn-outline">View News</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Latest News Feed -->
    <div class="news-feed">
        <div class="container">
            <div class="section-title">
                <h2>Latest News</h2>
                <p>What's happening in the Epictetus - Lab of Experimental Ideas</p>
            </div>
            <div class="news-grid">
                <div class="news-card">
                    <div class="news-image">
                        <span>🏆</span>
                    </div>
                    <div class="news-content">
                        <div class="news-date">November 28, 2025</div>
                        <h3 class="news-title">Chaniathon 2026 Registration Opens</h3>
                        <p>Registration for our flagship hackathon is now open! Join us for 48 hours of innovation.</p>
                        <a href="#" class="btn btn-outline" style="margin-top: 1rem;">Read More</a>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-image">
                        <span>🎓</span>
                    </div>
                    <div class="news-content">
                        <div class="news-date">November 15, 2025</div>
                        <h3 class="news-title">Team Wins National Engineering Competition</h3>
                        <p>Our autonomous robotics project secured first place at the National Engineering Challenge.</p>
                        <a href="#" class="btn btn-outline" style="margin-top: 1rem;">Read More</a>
                    </div>
                </div>
                <div class="news-card">
                    <div class="news-image">
                        <span>🔍</span>
                    </div>
                    <div class="news-content">
                        <div class="news-date">November 5, 2025</div>
                        <h3 class="news-title">New Research Lab Opens at HMU</h3>
                        <p>The department inaugurates a state-of-the-art embedded systems research facility.</p>
                        <a href="#" class="btn btn-outline" style="margin-top: 1rem;">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="cta">
      <div class="container">
        <h2>Join the Epictetus - Lab of Experimental Ideas</h2>
        <p>Whether you're a student, faculty member, or industry professional, there's a place for you in our community of innovators.</p>
        <div class="cta-btns">
          <router-link to="/signup" class="btn btn-secondary">Become a Member</router-link>
          <router-link to="/projects" class="btn btn-outline" style="background: rgba(255,255,255,0.2);">View Projects</router-link>
        </div>
      </div>
    </div>

    <!-- Photo Gallery Modal -->
    <div id="galleryModal" class="modal" :class="{ show: isModalOpen }" @click="closeModal">
      <span class="close-modal" @click.stop="closeModal">&times;</span>
      <div class="modal-content" @click.stop>
        <img id="modalImg" class="modal-img" :src="modalImageUrl" alt="Gallery image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isModalOpen = ref(false);
const modalImageUrl = ref('');

const openModal = (imgSrc) => {
  modalImageUrl.value = imgSrc;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const handleEsc = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEsc);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc);
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    padding: 6rem 0 4rem;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transform: rotate(30deg);
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 700px;
}

.hero h1 {
    font-size: 3.8rem;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    color: white; /* Ensure hero text is white */
}

.hero p {
    font-size: 1.35rem;
    opacity: 0.95;
    margin-bottom: 2.5rem;
    max-width: 650px;
}

.hero-btns {
    display: flex;
    gap: 1.25rem;
}

/* Stats Section */
.stats {
    background: white;
    padding: 3rem 0;
    border-bottom: 1px solid var(--light-gray);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
}

.stat-item h3 {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.stat-item p {
    color: var(--gray);
    font-weight: 500;
}

/* Section Styles */
.section {
    padding: 5rem 0;
}

.section-light {
    background-color: var(--light);
}

.section-dark {
    background-color: white;
}

.section-title {
    text-align: center;
    margin-bottom: 3.5rem;
}

.section-title h2 {
    font-size: 2.8rem;
    color: var(--primary);
    margin-bottom: 1.25rem;
    position: relative;
    display: inline-block;
}

.section-title h2::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--accent);
    border-radius: 2px;
}

.section-title p {
    color: var(--gray);
    max-width: 700px;
    margin: 1.5rem auto 0;
    font-size: 1.15rem;
}

/* Mission Section */
.mission-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
}

.mission-card {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
    border-top: 4px solid var(--primary);
}

.mission-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.mission-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.75rem;
    color: white;
    font-size: 2rem;
}

.mission-card h3 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
    color: var(--primary);
}

/* Approach Section */
.approach {
    position: relative;
    overflow: hidden;
}

.approach::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(30, 64, 175, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%);
    z-index: 0;
}

.approach-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.approach-text h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
}

.approach-text p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.approach-steps {
    margin-top: 2rem;
}

.step {
    display: flex;
    margin-bottom: 1.5rem;
}

.step-number {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
    margin-right: 1rem;
}

.step-content h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
}

.approach-image {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    height: 450px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
}

/* Gallery Section */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.gallery-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    height: 300px;
    position: relative;
    cursor: pointer;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.gallery-item:hover img {
    transform: scale(1.05);
}

.gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    padding: 1.5rem;
    color: white;
}

.gallery-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: white;
}

.gallery-desc {
    font-size: 0.95rem;
    opacity: 0.9;
}

/* Team Section */
.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.team-member {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
}

.team-member:hover {
    transform: translateY(-5px);
}

.member-image {
    height: 280px;
    background: linear-gradient(135deg, #60a5fa, #c084fc);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
}

.member-info {
    padding: 1.5rem;
    text-align: center;
}

.member-name {
    font-size: 1.35rem;
    margin-bottom: 0.25rem;
    color: var(--dark);
}

.member-role {
    color: var(--primary);
    font-weight: 600;
}

/* Featured Content */
.featured {
    background-color: var(--light);
    padding: 5rem 0;
}

.featured-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
}

.featured-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
}

.featured-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.card-image {
    height: 220px;
    background-color: #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: var(--primary);
}

.card-content {
    padding: 2rem;
}

.card-content h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--primary);
}

/* News Feed */
.news-feed {
    background: white;
    padding: 5rem 0;
}

.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}

.news-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
}

.news-card:hover {
    transform: translateY(-5px);
}

.news-image {
    height: 200px;
    background-color: #e0f2fe;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: var(--secondary);
}

.news-content {
    padding: 1.5rem;
}

.news-date {
    font-size: 0.9rem;
    color: var(--gray);
    margin-bottom: 0.75rem;
}

.news-title {
    font-size: 1.35rem;
    margin-bottom: 1rem;
    color: var(--dark);
}

/* CTA Section */
.cta {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
    color: white;
    padding: 5rem 0;
    text-align: center;
}

.cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: white; /* Ensure CTA text is white */
}

.cta p {
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto 2.5rem;
    opacity: 0.9;
}

.cta-btns {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

/* Photo Gallery Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
}

.modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
}

.modal-content {
    max-width: 90%;
    max-height: 90%;
    position: relative;
}

.modal-img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
}

.close-modal {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    background: rgba(0,0,0,0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Responsive */
@media (max-width: 992px) {
    .approach-content {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .hero h1 {
        font-size: 3rem;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 4rem 0 3rem;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero p {
        font-size: 1.15rem;
    }
    
    .hero-btns {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .section {
        padding: 3.5rem 0;
    }
    
    .section-title h2 {
        font-size: 2.2rem;
    }
}
</style>