<template>
  <div class="chaniathon-page">
    <!-- Hero Section -->
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Chaniathon</h1>
          <p>The flagship hackathon of Epictetus - Lab of Experimental Ideas.</p>
          <div class="hero-btns">
            <a href="https://epictetushmu.github.io/Chaniathon/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Register Now</a>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-light">
      <div class="container">
        <div class="section-title">
          <h2>About Chaniathon</h2>
        </div>
        <p>Chaniathon is a 48-hour innovation marathon where students, developers, designers, and entrepreneurs come together to build solutions to real-world challenges. It's a great opportunity to learn new skills, network with peers and mentors, and create something amazing.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    color: white;
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

.section {
    padding: 5rem 0;
}

.section-light {
    background-color: var(--light);
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
</style>