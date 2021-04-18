<template>
    <nav class="flex flex-wrap items-center p-5 bg-black h-20 space-x-6 font-medium text-base">
      <img
        class="w-8"
        :src="require('../assets/Images/music_logo.svg')"
        alt="Music_logo"
      />
      <router-link to="/" class="text-white">Home</router-link> |
      <router-link to="/your_gallery" class="text-white">Your Gallery</router-link>
      <Photosearch @toggle-search="toggleSearch" @toggle-cancel="toggleReset" @search-photo-items="searchPhotoItems"/>
      <div id="edit-button" class="pl-52">
      <router-link to="/edit_gallery">
       <base-button label="Add Your Music"></base-button>
      </router-link>
      </div>
    <p class="text-white font-semibold text-xl pl-32 absolute right-5">Favorite Music ({{countUndone}})</p> 
    </nav>
    <div class="bg-gray-800 w-full h-screen">
    <Photoitem :gallery="gallery" @toggle-fav="toggleFav" @toggle-zoom="toggleZoom"  @delete-song="deleteSong"/>
    <div class="text-white text-xl font-bold p-5" v-if="filterNoFound == gallery.length">
      No Music  :(
    </div>
    <Photoview :gallery="gallery" :photozoom="photo_zoom" @toggle-close-zoom="toggleCloseZoom"/>
    </div>
</template>
<script>
import Photosearch from "../components/Photosearch";
import Photoitem from "../components/Photoitem";
import Photoview from "../components/Photoview";
export default {
  name: "App",
  components: {
    Photosearch,
    Photoitem,
    Photoview
  },
  data() {
    return {
      gallery: [
        // { 
        //   picture_name: "รองช้ำ",
        //   src: "รองช้ำ.jpg",
        //   isFav: false,
        //   isPhotoitem: true,
        //   isCurrentPhoto: false,
        // },
        // {
        //   picture_name: "ไม่บอกเธอ",
        //   src: "เกิดมาเพื่ออกหัก.jpg",
        //   isFav: false,
        //   isPhotoitem: true,
        //   isCurrentPhoto: false,
        // },
        // {
        //   picture_name: "คลั่งรัก",
        //   src: "คลั่งรัก.jpg",
        //   isFav: false,
        //   isPhotoitem: true,
        //   isCurrentPhoto: false,
        // },
      ],
      photo_zoom: false,
      
    };
  },
  methods: {
    async fetchSongs(){
      try {
        const res = await fetch('http://localhost:3000/gallery')
        const data = await res.json()
        return data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSong(id) {
      const res = await fetch(`http://localhost:3000/gallery/${id}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.gallery = this.gallery.filter((gallery) => gallery.id !== id))
        : alert("Error to delete song");
    },
    toggleFav(index) {
      this.gallery[index].isFav = !this.gallery[index].isFav;
    },
    searchPhotoItems(textinput) {
      for (let i = 0; i < this.gallery.length; i++) {
        if (
          !this.gallery[i].picture_name
            .toLowerCase()
            .includes(textinput.toLowerCase())
        ) {
          this.gallery[i].isPhotoitem = false;
        } else {
          this.gallery[i].isPhotoitem = true;
        }
      }
    },
    toggleZoom(index) {
      this.photo_zoom = true;
      this.gallery[index].isCurrentPhoto = true;
    },
    toggleCloseZoom(index) {
      this.photo_zoom = false;
      this.gallery[index].isCurrentPhoto = false;
    },
    toggleReset() {
      for (let i = 0; i < this.gallery.length; i++) {
        this.gallery[i].isPhotoitem = true;
      }
    },
  },
  async created(){
       this.gallery = await this.fetchSongs()
  },
  computed: {
    countUndone() {
      return this.gallery.filter((gallery) => gallery.isFav).length;
    },
    filterNoFound() {
      return this.gallery.filter((gallery) => !gallery.isPhotoitem).length;
    },
  }
}

</script>
