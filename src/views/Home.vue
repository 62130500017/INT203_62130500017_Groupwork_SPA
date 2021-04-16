<template>
  <div class="home">
    <nav class="flex flex-wrap items-center p-5 bg-black h-20 space-x-6 font-medium text-base">
      <img
        class="w-8"
        :src="require('../assets/Images/music_logo.svg')"
        alt="Music_logo"
      />
      <router-link to="/" class="text-white">Home</router-link> |
      <router-link to="/about" class="text-white">About</router-link>
    </nav>
    <div class="w-full flex justify-center mt-64">
      <router-link to="/about">
        <button
          class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Go to your Gallery
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
};
</script>
