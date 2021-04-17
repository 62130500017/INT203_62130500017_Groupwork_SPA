<template>
<div>
    <button class="py-2 px-4 rounded focus:outline-none" :class="[textcolor,bgcolor,fontwidth,hovercolor]">{{label}}</button>
</div>
    
</template>
<script>

export default {
  name: 'App',
  props: {
        textcolor: {
          type: String,
          default: 'text-white'
        },
        bgcolor:{
          type: String,
          default: 'bg-blue-700'
        },
        fontwidth:{
          type: String,
          default: 'font-bold'
        },
        label:{
          type: String,
          required: true
        },
        hovercolor:{
          type: String,
          default: 'hover:bg-blue-900'
        }

    }
}
</script>
