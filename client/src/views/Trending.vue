<template>
  <div class="about">
    <ul class="list-unstyled">
      
      <h1>INI VIDEO YANG SEDANG TRENDING</h1>
      <li class="media my-4 ui segment" style="width: 100%" v-for="(tren, index) in trending" :key="index">
        <img style="float: left" class="mr-3" :src="tren.image" alt="Thumbnail">
        <div class="media-body">
          <h5 class="mt-0 mb-1"> {{tren.title}} </h5>
          {{tren.desc}}
          <br/>
          <button>Total Likes : {{tren.likes.length}}</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'like',
  props: ['isLogin'],
  data () {
    return{
    }
  },
  computed: {
    ...mapState([
      'trending'
    ])
  },
  created () {
    this.getTrending()
  }, 
  methods:{
    ...mapActions(['getTrending'])
  }
}
</script>