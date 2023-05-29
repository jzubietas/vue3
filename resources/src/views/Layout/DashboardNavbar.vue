<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <b-button-group>
      <b-button @click="showMenuBarHide()" size="sm" variant="success"
        >&laquo;</b-button
      >
      <b-button @click="showMenuBarShow()" size="sm" variant="success"
        >&raquo;</b-button
      >
    </b-button-group>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb-links breadcrumb-dark mb-0">
        <li class="breadcrumb-item d-inline-block">
          <a target="_self" href="#" class="">
            <a data-v-99912124="" href="#/" class="active">
              <i class="fas fa-home text-white"></i>
              </a>
          </a>
        </li>
        <li
          class="breadcrumb-item d-inline-block"
          v-for="(breadcrumb, idx) in $route.meta.breadcrumb"
          :key="idx"
          :class="{ active: !!breadcrumb.link }"
        >
          <a v-if="!!breadcrumb.link" :href="breadcrumb.link">{{
            breadcrumb.name
          }}</a>
          {{ !breadcrumb.link ? breadcrumb.name : "" }}
        </li>
      </ol>
    </nav>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="img/theme/user-online.png" />
            </span>
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{
                user?user.nombre:''
              }}</span>
            </b-media-body>
          </b-media>
        </a>

        <template>
          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Bienvenid@!</h6>
          </b-dropdown-header>
          <b-dropdown-item href="#!">
            <i class="ni ni-single-02"></i>
            <span>Mi Perfil</span>
          </b-dropdown-item>
          <b-dropdown-item href="#!">
            <i class="ni ni-settings-gear-65"></i>
            <span>Configuración</span>
          </b-dropdown-item>

          <!-- <b-dropdown-item href="#!">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Actividad</span>
          </b-dropdown-item>
          <b-dropdown-item href="#!">
            <i class="ni ni-support-16"></i>
            <span>Soporte</span>
          </b-dropdown-item> -->

          <div class="dropdown-divider"></div>
          <b-dropdown-item @click="cerrar">
            <i class="ni ni-user-run"></i>
            <span>Salir</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import { mapGetters } from "vuex";

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    cerrar() {
      //this.$gate.removeLogin();
      this.$store.dispatch("user", null);
      localStorage.clear();
      this.$router.push("login");
    },
    showMenuBarShow() {
      this.user.bar = true;
      this.$root.$emit("estilo1");
    },
    showMenuBarHide() {
      this.user.bar = false;
      this.$root.$emit("estilo2");
    },
  },
  created() {},
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
