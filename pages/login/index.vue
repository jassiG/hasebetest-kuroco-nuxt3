<template>
  <div>
    <h1>Login Required</h1>
    <p>You need to log in to access this page.</p>
    <div>
      <h2>Available Login Options:</h2>
      <ul>
        <li><nuxt-link to="/login/for_document/common4">Standard Login</nuxt-link></li>
        <li><nuxt-link to="/login/2step_login">Two-Step Login</nuxt-link></li>
        <li><nuxt-link to="/login/cookie">Cookie Login</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// This is a basic login landing page that provides links to actual login methods
// we do not need to use this page if we just follow the tutorial
// we only need it here because the page structure of this project is different from the tutorial
// (we need a /login page for the site to not get stuck in a redirect loop)
</script> 
