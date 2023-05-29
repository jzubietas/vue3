<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-5 py-lg-5 pt-lg-5">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Bienvenid@!</h1>
              <p class="text-lead text-white">Sistema de Administración Proyectos.</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"  >
              <!--<div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div> onSubmit , email: true-->
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Ingrese sus credenciales</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(login)">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              :rules="{required: true}"
                              prepend-icon="ni ni-single-02"
                              placeholder="Usuario"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 4}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe">Recuerdame</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Entrar</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"><small>Olvidó su Contraseña?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"><small>Crear Usuario</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        model: {
          email: 'admin@admin.com',
          password: '12300123',
          rememberMe: false
        }
      };
    },
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do api call here to login
      },
      getAbsolutePath() {
        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        return loc.origin;
      },
      async login(){
      try {
          const userData = { email: this.model.email, password: this.model.password };
          //var data = {  data: { success: 1, data:{ token:"akjhaksjdhkasjdk", lxvl:0, id:1, nombre:"admin" }} };//await axios.post(this.$gate.getApiUrl() + "usuario/LoginAdmin", userData);
          var data = await axios.post(this.$gate.getApiUrl() + "auth/login", userData);
          if(data){
            if(data.data.success==0){
              this.$swal(
                '',
                data.data.message,
                'error'
              )
            }else{
              /*const loguser = {
                email: this.model.email,
                type: "admin",
                nombre: "Administrador",
                token:"jfjdwejhwejhfwe8fdlkdjlsdflksd32ds3d2"
              };*/
              //windows.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.user.token;

              data.data.bar = true;
              data.data.lxvl = data.data.user.lxvl;
              this.$store.dispatch('user',data.data);
              //console.log(data.data.token)
              window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.token;
              //const { origin } = window.location
              //console.log(origin)
              this.$router.push("/dashboard");
              //window.location.href = origin +'/dashboard'
            }
          }
        } catch (error) {
          //if (error.response.status == 400) {
            this.$swal(
                  '',
                  error.response.statusText + " Code:" + error.response.status,
                  'error'
            )
          //}
          //this.error = true;
        }

      }
    },
    computed:{
      ...mapGetters(['user'])
    }
  };
</script>
