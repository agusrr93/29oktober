<template>
  <div>
    <div class="mt-4">
      <div class="card mb-2" style="width: 100%;">  
        <div class="card-body">
          <h5 class="card-title">YouTube Player goes here</h5>
          <div id="videoContainer">
            <iframe width="450" height="283" :src=url frameborder="0" allowfullscreen wmode="Opaque"></iframe>
        </div>
        </div>
      </div>
      <strong>{{data.title}}</strong>&nbsp;
      <button class="btn btn-sm btn-primary" v-if="isLogin&&!statuslike" @click="getLike(data)">Like this Video!</button><br />
       <button class="btn btn-sm btn-dark" v-if="isLogin&&statuslike" @click="getUnlike(data)">Unlike this Video!</button><br />
      <br />
      <pre class="card">{{data.desc}}</pre>
      <br />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'video-detail',
  props: ['isLogin'],
  data () {
    return {
      data: this.$router.history.current.query,
      url:'',
      statuslike:''
    }
  },
  methods: {
    ...mapActions([
      'LikeAction',
      'UnlikeAction',
      'getAllLike'
    ]),
    getLike(val){
        this.LikeAction(val)
        this.getStatus()
        this.getAllLike()
    },
    getUnlike(val){
        this.UnlikeAction(val)
        this.getStatus()
        this.getAllLike()
    },
    getStatus(){
      
      axios({
        method: 'GET',
        url: `http://localhost:3000/videos/stat/${this.data.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
           this.statuslike=response.data.status
        })
        .catch(error => {
          alert(error)
        })
    }
  },
  computed: {
    ...mapState([
      'likes',
      'like'
    ])
  },
  watch:{
    statuslike:function(val){
       this.getStatus()
    }
  },
  created () {
    this.data=this.$router.history.current.query
    if(this.data.id)
    {
        this.url="https://www.youtube.com/embed/"+this.data.id+"?wmode=transparent"
    }
    else{
      this.url="https://www.youtube.com/embed/"+this.data.channelid+"?wmode=transparent"
    }
    
    this.getStatus()
    this.getAllLike()
  }
}
</script>
