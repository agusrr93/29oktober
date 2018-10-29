<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-7">
          <div class="mt-4">
            <videolist></videolist>
          </div>
        </div>
        <div class="col-xl-5">
            <router-view :key="$route.fullPath" :isLogin="isLogin"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videolist from '@/components/VideoList.vue'

export default {
  name: 'home',
  props: ['isLogin'],
  components: {
    videolist
  }
}
</script>
