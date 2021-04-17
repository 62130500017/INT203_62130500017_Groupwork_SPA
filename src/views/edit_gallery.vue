<template>
  <nav
    class="flex flex-wrap items-center p-5 bg-black h-20 space-x-6 font-medium text-base"
  >
    <img
      class="w-8"
      :src="require('../assets/Images/music_logo.svg')"
      alt="Music_logo"
    />
    <router-link to="/" class="text-white">Home</router-link> |
    <router-link to="/your_gallery" class="text-white"
      >Your Gallery</router-link
    >
  </nav>
  <form @submit.prevent="submitForm">
    <label class="text-white text-lg">Song title:</label><br/>
    <input
      v-model="song.songname"
      type="text"
      id="songname"
      name="songname"
    /><br />
    <label class="text-white text-lg">image src:</label><br/>
    <input
      v-model="song.songsrc"
      type="text"
      id="songsrc"
      name="songsrc"
    /><br />
    <base-button label="Submit"></base-button>
  </form>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      song: [{ songname: null, songsrc: null }],
    };
  },
  methods: {
    submitForm() {
      this.addSong({
        picture_name: this.song.songname,
        src: this.song.songsrc,
      });
    },
    async addSong(song) {
      try {
        await fetch("http://localhost:3000/gallery", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            picture_name: song.picture_name,
            src: song.src,
            isFav: false,
            isPhotoitem: true,
            isCurrentPhoto: false,
          }),
        });
      } catch (error) {
        console.log(`Failed to add song! + ${error}`)
      }
    },
  },
};
</script>
