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
    <div class="w-full flex justify-center mt-64">
      <router-link to="/your_gallery">
        <base-button label="Go to Your Gallery >>>"></base-button>
      </router-link>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
 
};
</script>
