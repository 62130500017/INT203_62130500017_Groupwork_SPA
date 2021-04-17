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
    <form @submit.prevent="submitForm">
      <label class="text-white text-lg">Song title:</label><br>
      <input v-model="songname" type="text" id="songname" name="songname" value=""><br>
      <label class="text-white text-lg">image src:</label><br>
      <input v-model="songsrc" type="text" id="songname" name="songname" value=""><br>
      <base-button label="Submit"></base-button>
    </form> 

</template>
<script>
export default {
  name: "App",
  data() {
        return {
                songname: null,
                songsrc: null    
        }
  },
  props: {
        gallery:{
            type: Array,
            require: true
        }
  },
  methods:{
    submitForm(){
      this.addSong({picture_name: this.songname,
                   src: this.songsrc})
    },
    async addSong(song){
      try {
              const res = await fetch(this.url,{
        method: 'POST',
        headers:{
          'Context-type': 'application/json',
        },
        body: JSON.stringify({
            picture_name: song.picture_name,
            src: song.src
            
        })
      })
      const data = await res.json()
      this.gallery = [...this.gallery,data]
      } catch (error) {
        console.log(`Failed to add song! ${error}`)
      }
    }
  }
}

</script>
