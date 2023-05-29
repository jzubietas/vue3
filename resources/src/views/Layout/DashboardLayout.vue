<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar v-if="$store.state.user ? $store.state.user.bar : false">
      <template slot="links">
        <!-- <sidebar-item
          :link="{
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'ni ni-tv-2 text-black',
          }"
        >
        </sidebar-item> -->
        <sidebar-item
          :link="{
            name: 'Inicio',
            path: '/dashboard',
            icon: 'fas fa-home text-black',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="$store.state.user.lxvl < 2"
          :link="{
            name: 'Proyectos',
            path: '/proyectos',
            icon: 'fas fa-book-open text-black',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="$store.state.user.lxvl < 2"
          :link="{
            name: 'Herramienta',
            path: '/herramienta?id=39',
            icon: 'ni ni-box-2 text-black',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Google Maps',
            path: '/google-maps',
            icon: 'fas fa-globe-americas text-black',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="$store.state.user.lxvl === 0"
          :link="{
            name: 'Configuración',
            path: '/profile',
            icon: 'ni ni-settings text-black',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Usuarios',
              path: '/usuarios',
              icon: 'ni ni-settings text-black',
            }"
          ></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
.bg-white {
  background-color: #f9fafc !important;
  border-right: 1px solid #d2d6de;
}
.navbar-light .navbar-nav .nav-link {
  color: rgba(0, 0, 0, 0.9);
}
</style>
