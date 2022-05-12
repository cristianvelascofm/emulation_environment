<template>
  <div id="container"  class="home col-12 m-0 p-0 text-center">
    <b-container id="abuela" class="p-0 mr-0 ml-0 col-12 h-100 align-items-center" color="red">
      <b-row  class="mt-5 pa-5 justify-content-md-center">
        <b-img :src="require('../assets/logo_ambiente_vsdn.gif')"  id="logo" @click="$router.push('mininet')"></b-img>
        
     <!-- <b-card
    id="card"
    :img-src="require('../assets/logo_ambiente_vsdn.gif')"
    img-height="500"
    img-width="600"
    img-alt="Image"
    img-top
    tag="article"
    style="min-width:500;max-width: 800;max-height: 500;min-height: 500"
    class="mt-5 pl-5 pr-5 "
    @click="hello"
    
    
  > -->
    <!-- <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text> -->

    <!-- <b-button href="#"  size="sm" pill small class="mt-5 mb-0" variant="outline-primary">Iniciar</b-button> -->
  <!-- </b-card> -->
  </b-row>
      <!-- <b-col >
      <img alt="Vue logo" src="../assets/logo_ambiente_.gif">
      </b-col>
      <b-col>
      <b-button>INICIAR</b-button>
      </b-col>       -->
    </b-container>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    
  },
  data(){

  },
  methods:{
    hello(){
      console.log('AAAAA')
      this.$router.push({ path: '/mininet' });
    }
  }
}
</script>

<style scoped>
#logo{
  /* border: solid 1px; */
  background-color: rgba(243, 253, 253, 0.281);
  box-shadow:  -1em 0 0.4em rgba(51, 51, 49, 0.363);
}
#container{
  overflow-x: hidden;
  overflow-y: hidden;
  height:88%;
  width:100%
}
#card{
  background-color: rgba(243, 253, 253, 0.281);
  box-shadow:  -1em 0 0.4em rgba(51, 51, 49, 0.363);
}
</style>