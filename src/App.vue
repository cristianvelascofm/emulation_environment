<template>
  <div id="app" class="col-12 m-0 p-0 w-100 h-100"> 

    <b-navbar toggleable="md" type="dark" id="bar-principal">
      <b-container class="m-0">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Environment</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item v-for="list of environments" v-bind:key="list.id" :to="{ name: list.name}" exact>{{list.text}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container id="abuela" class="p-0 mr-0 ml-0 col-12">
      <router-view />
    </b-container>
     <footer class="font-small pt-0" >
      <div class="footer-copyright my-1 py-1 text-center" id='foot' >
        <b-container fluid>
          
          <a> Universidad del Cauca | Facultad Ingeniería Electrónica y Telecomunicaciones | TELCO 2.0 </a>
          &copy; 2021 Copyright 
        </b-container>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#bar-principal {
  background-color: #112979;
}
#foot{
  color: rgb(252, 249, 249);
  background-color: rgb(119, 23, 14);
}
</style>

<script>
export default {
  data() {
    return {
      environments: [
        {
          id: "0",
          text: "Inicio",
          name: "Home",
        },
        {
          id: "1",
          text: "Mininet",
          name: "MiniNet",
        },
        {
          id: "2",
          text: "Maxinet",
          name: "Maxinet",
        },
        {
          id: "3",
          text: "Mininet Wifi",
          name: "MininetWifi",
        },
        {
          id: "4",
          text: "Mininet IoT",
          name: "MininetIoT",
        },
      ],
    };
  },
};
</script>