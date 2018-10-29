import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    like: '',
    likes: [],
    trending:[]
  },
  mutations: {
    populatelike (state, payload) {
      state.likes = payload
    },
    recalculatelike (state, payload) {
      state.like = payload
    },
    populatetrending(state,payload){
      state.trending=payload
    }
  },
  actions: {
    getTrending(context){
        console.log('ini token dari store',localStorage.getItem('token'))
        axios.get(`http://localhost:3000/videos/sorted`,{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log('ini response dari trennding',response.data.videos)
          context.commit('populatetrending', response.data.videos)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getAllLike(context) {
      axios.get(`http://localhost:3000/videos/list`,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
        .then(response => {
          context.commit('populatelike', response.data.videos)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    LikeAction (context, data) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/videos/like/${data.title}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          videoId:data.id,
          title: data.title,
          image: data.image,
          desc: data.desc,
          url:"https://www.youtube.com/embed/"+data.id+"?wmode=transparent"
        }
      })
        .then(response => {
          context.commit('recalculatelike', response.data.like)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    UnlikeAction (context, data) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/videos/unlike/${data.title}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: data.title,
          image: data.image,
          desc: data.desc,
        }
      })
        .then(response => {
          context.commit('recalculatelike', response.data.unlike)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
})
