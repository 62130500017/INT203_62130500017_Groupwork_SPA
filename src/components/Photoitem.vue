<template>
    <div class="p-10 grid grid-cols-4 space-x-10">
        <div v-show="pic.isPhotoitem" v-for="(pic,index) in gallery" :key="index">
        <img :src="require(`../assets/Images/${pic.src}`)" v-on:click="toggleZoom(index)" class="w-full h-52 cursor-pointer">
        <div class="inline-flex w-full">
            <div class="w-1/2 text-gray-300 py-2 text-base">{{pic.picture_name}}</div>
            <div class="text-right w-1/2 py-2">
            <i v-show="!pic.isFav" class="material-icons text-pink-600 text-2xl cursor-pointer" v-on:click="toggleFav(index)">
            favorite_border
            </i>
            <i v-show="pic.isFav" class="material-icons text-pink-600 text-2xl cursor-pointer" v-on:click="toggleFav(index)">
            favorite
            </i>
            <i class="material-icons text-red-500 cursor-pointer" v-on:click="deleteSong(pic.id)">
            delete
            </i>
            </div>
        </div>
        </div>
    </div>

    
</template>
<script>

export default {
  name: 'App',
  props: {
        gallery:{
            type: Array,
            require: true
        }
    },
        
    methods:{
        toggleFav(index) {
            this.$emit('toggle-fav',index)
        },
        toggleZoom(index) {
            this.$emit('toggle-zoom',index)
        },
        deleteSong(id){
            this.$emit('delete-song',id)
        }
    }
}
</script>