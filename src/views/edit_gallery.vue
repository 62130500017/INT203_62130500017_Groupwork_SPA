<template>
     <nav class="flex flex-wrap items-center p-5 bg-black h-20 space-x-6 font-medium text-base">
      <img
        class="w-8"
        :src="require('../assets/Images/music_logo.svg')"
        alt="Music_logo"
      />
      <router-link to="/" class="text-white">Home</router-link> |
      <router-link to="/your_gallery" class="text-white">Your Gallery</router-link>
    </nav>
</template>
<script>
export default {
  name: "App",
};
</script>
