<template>
  <div class="about">
    <ul class="list-unstyled">
      
      <li class="media my-4 ui segment" style="width: 100%" v-for="(like, index) in likes" :key="index">
        <img style="float: left" class="mr-3" :src="like.image" alt="Thumbnail">
        <div class="media-body">
          <h5 class="mt-0 mb-1"> {{like.title}} </h5>
          {{like.desc}}
          <br/>
          <button>Total Likes : {{like.likes.length}}</button>
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
      'likes',
      'like'
    ])
  },
  created () {
    this.getAllLike()
  }, 
  methods:{
    ...mapActions(['getAllLike'])
  }
}
</script>