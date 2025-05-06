<script setup>
import { ref } from 'vue'
</script>

<template>
  <div>
    <header>
      <nav class="topnav">
        <a href="https://ee.hmu.gr" target="_blank">
          <img src="/hmu.png" width="60px" height="40px" alt="HMU logo" />
        </a>
        <router-link to="/signup" class="other">Sign up</router-link>
        <router-link to="/contact" class="other">Contact</router-link>
        <router-link to="/login" class="other">Login</router-link>
        <router-link to="/news" class="other">News</router-link>
        <router-link to="/library" class="other">E-Library</router-link>
        <router-link to="/" class="active">Epictetus</router-link>
      </nav>
    </header>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
@import './style.css';
</style>
