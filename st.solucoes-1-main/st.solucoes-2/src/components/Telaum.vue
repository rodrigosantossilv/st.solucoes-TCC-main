<template>
    <div class="intro-container">
      <div class="intro-header">
        <img src="/images/ST.png" alt="Logotipo" />
        <h1>ST SOLUCOES</h1>
      </div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
      <p class="empressa">@DiguinhoTech</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "IntroAnimation",
  };
  </script>
  
  <style scoped>
  /* Reset básico */
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }
  .empressa{
    margin-top: 150px;
    color: rgb(255, 255, 255) ;
  }
  .intro-container {
    position: relative;
    text-align: center;
    background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
    color: white;
    height: 100vh;
    overflow: hidden;
  }
  
  .intro-header {
    height: 65vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .logo {
    width: 50px;
    fill: white;
    padding-right: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  
  .waves {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100vw;
    height: 15vh;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 150px;
    transform: translateX(-50%);
  }
  
  .parallax > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% { transform: translateX(-90%) translateY(0); }
    100% { transform: translateX(85%) translateY(-10px); }
  }
  </style>
  