<template>
  <div>
    <!-- Search Form -->
    <form>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search videos across YouTube..."
          aria-label="Search videos across YouTube..."
          aria-describedby="go-button-addon"
          auto-complete="off"
          autofocus v-model="search">
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="go-button-addon" @click="getSearch()">
            Go!
          </button>
        </div>
      </div>
    </form>

    <ul class="list-unstyled">
      <li class="media my-4 ui segment" style="width: 100%" v-for="(video, index) in videos" :key="index">
        
      
        <img style="float: left" class="mr-3" :src="video.snippet.thumbnails.default.url" alt="Thumbnail">
        <router-link :to="{path: '/details', query: {id:video.id.videoId||video.id.channelId,image: video.snippet.thumbnails.high.url, tinyimage: video.snippet.thumbnails.default.url, title: video.snippet.title, desc: video.snippet.description }}">
        <div class="media-body">
          <h5 class="mt-0 mb-1"> {{video.snippet.title}} </h5>
          {{video.snippet.description}}
          <br/>
        </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home-list',
  data () {
    return {
      search: '',
      videos: []
    }
  },
  methods: {
    fetchVideo(val) {
      if (val) {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyACLEAMeSI3kBBqjILBTCraU3ILqLwhp4o&part=snippet&maxResults=20&q=${val}`)
          .then(response => {
            this.videos = response.data.items
            console.log(response.data.items)
          })
          .catch(err => {
            console.log('get error', err.response)
          })
      } else {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyACLEAMeSI3kBBqjILBTCraU3ILqLwhp4o&part=snippet&maxResults=20&q=cr7`)
          .then(response => {
            this.videos = response.data.items
            console.log(this.videos)
          })
          .catch(err => {
            console.log('get error', err.response)
          })
      }
    },
    getSearch () {
      this.fetchVideo(this.search)
    }
  },
  created() {
    this.fetchVideo()
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: #42b983;
  text-decoration: none;
}
</style>
