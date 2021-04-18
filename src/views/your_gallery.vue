<template>
    <nav-bar>
      <Photosearch @toggle-search="toggleSearch" @toggle-cancel="toggleReset" @search-photo-items="searchPhotoItems"/>
          <div id="edit-button" class="pl-52">
            <router-link to="/add_gallery">
              <base-button label="Add Your Music"></base-button>
            </router-link>
          </div>
          <p class="text-white font-semibold text-xl pl-32 absolute right-5">Favorite Music ({{countUndone}})</p> 
    </nav-bar>
    <div class="bg-gray-800 w-full h-screen">
    <Photoitem :gallery="gallery" @edit-fav="editFav" @toggle-zoom="toggleZoom"  @delete-song="deleteSong"/>
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
    Photoview,
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
    async editFav(pic) {
    pic.isFav = !pic.isFav
      try {
        await fetch(`http://localhost:3000/gallery/${pic.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            picture_name: pic.picture_name,
            src: pic.src,
            isFav: pic.isFav,
            isPhotoitem: true,
            isCurrentPhoto: false,
          }),
        });
      } catch (error) {
        console.log(error)
      }
    },
    // toggleFav(index) {
    //   this.gallery[index].isFav = !this.gallery[index].isFav;
    // },
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
