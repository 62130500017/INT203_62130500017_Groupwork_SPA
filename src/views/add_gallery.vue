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
    <Photosearch
      @toggle-search="toggleSearch"
      @toggle-cancel="toggleReset"
      @search-photo-items="searchPhotoItems"
    />
  </nav>
  <form @submit.prevent="submitForm">
    <label class="text-white text-lg">Song title:</label><br />
    <input
      v-model="song.title"
      type="text"
      id="songname"
      name="songname"
    /><br />
    <div class="text-red-500 text-lg font-base" v-if="invalidTitleSong">
      Failed to add!!
    </div>
    <label class="text-white text-lg">image src:</label><br />
    <input v-model="song.src" type="text" id="songsrc" name="songsrc" placeholder="ex: [ชื่อเพลง].jpg"/><br />

    <div class="text-red-500 text-lg font-base" v-if="invalidSrcSong">
      Failed to add!!
    </div>
    <br />
    <base-button label="Submit"></base-button>
    <div class="text-green-400 text-lg font-base" v-if="isSubmit">
      Added Successfully
    </div>
  </form>
</template>
<script>
import Photosearch from "../components/Photosearch";
export default {
  name: "App",
  components: {
    Photosearch,
  },
  data() {
    return {
      song: { title: "", src: "" },
      invalidTitleSong: false,
      invalidSrcSong: false,
      isSubmit: false,
    };
  },
  methods: {
    submitForm() {
      this.invalidTitleSong = this.song.title === "" ? true : false;
      this.invalidSrcSong = this.song.src === "" ? true : false;
      if (this.invalidTitleSong || this.invalidSrcSong === true) {
        this.isSubmit = false;
        return;
      } else {
        this.addSong({
          picture_name: this.song.title,
          src: this.song.src,
        });
        this.isSubmit = true;
        this.invalidTitleSong = false;
        this.invalidSrcSong = false;
      }
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
        console.log(`Failed to add song! + ${error}`);
      }
    },
  },
};
</script>
