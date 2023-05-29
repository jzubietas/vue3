<template>
  <div class="">
    <base-header class="pb-1 pt-5 pt-md-6 bg-gradient-success"> </base-header>
    <b-container fluid class="mt-4">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h1 class="mb-0">Bienvenido: Empresa Minera Buenaventura</h1>
              <div class="d-flex align-items-center mt-2">
                <h3 class="mb-0 d-flex align-items-center">
                  Ingrese unidad de operaciones
                </h3>
                <base-button
                  class="rounded-circle ml-2"
                  style="height: 27px; padding: 0px 4px"
                  size="md"
                  body-class="text-left"
                  v-b-popover.hover.top="'Nueva unidad de operaciones'"
                  type="success"
                  @click="showModal('modal-unidad')"
                >
                  <i class="fas fa-plus"></i>
                </base-button>
              </div>
            </b-card-header>
            <hr class="my-0" />
            <div class="row">
              <b-card-body class="d-flex align-items-center" style="gap: 10px">
                <div class="col-lg-3 d-flex flex-wrap">
                  <select
                    name="tipo"
                    id="tipoPais"
                    class="form-control form-control-sm"
                  >
                    <option value="-1">Selecione el País</option>
                    <option value="0">Perú</option>
                    <option value="1">Alemania</option>
                    <option value="2">Noruega</option>
                  </select>
                </div>
                <div class="col-lg-3 d-flex">
                  <select
                    name="tipo"
                    id="tipoContinente"
                    class="form-control form-control-sm"
                  >
                    <option value="-1">Selecione el Continente</option>
                    <option value="0">America</option>
                    <option value="1">Europa</option>
                    <option value="2">Asia</option>
                    <option value="3">Africa</option>
                    <option value="4">Oceania</option>
                  </select>
                </div>
                <div class="col-lg-3">
                  <b-input-group size="sm" prepend="Proyecto:">
                    <b-form-input
                      size="sm"
                      id="nick"
                      type="text"
                      v-on:change="onFiltroChange()"
                      value=""
                      placeholder="Nombre del proyecto"
                    ></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-lg-3 text-center">
                  <b-button
                    title="Aplicar filtro"
                    :class="{
                      'btn btn-success': filtroActivo,
                      'btn btn-light': !filtroActivo,
                    }"
                    @click="aplicarFiltro()"
                    ><i
                      :class="{
                        'fas fa-check': filtroActivo,
                        'fas fa-ban': !filtroActivo,
                      }"
                    ></i
                  ></b-button>
                  <b-button
                    title="Resetear filtro"
                    variant="primary"
                    @click="resetFiltro()"
                    ><i class="fas fa-undo"></i
                  ></b-button>
                </div>
              </b-card-body>
            </div>

            <hr class="my-0" />
          </b-card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>

    <b-container fluid class="mt-4">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <details class="card p-3" open>
            <summary>Unidad Minera 1 (UM1)</summary>
            <details class="ml-4" open>
              <summary>Educación</summary>
              <details class="ml-4">
                <summary>Nacional</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
              <details class="ml-4">
                <summary>Particular</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
            </details>
            <details class="ml-4">
              <summary>Salud</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
            <details class="ml-4">
              <summary>Infraestructura</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
          </details>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <details class="card p-3" open>
            <summary>Unidad Minera 2 (UM2)</summary>
            <details class="ml-4" open>
              <summary>Educación</summary>
              <details class="ml-4">
                <summary>Nacional</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
              <details class="ml-4">
                <summary>Particular</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
            </details>
            <details class="ml-4">
              <summary>Salud</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
            <details class="ml-4">
              <summary>Infraestructura</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
          </details>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <details class="card p-3" open>
            <summary>Unidad Minera 3 (UM3)</summary>
            <details class="ml-4" open>
              <summary>Educación</summary>
              <details class="ml-4">
                <summary>Nacional</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
              <details class="ml-4">
                <summary>Particular</summary>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
                <p class="ml-4 mb-0">
                  <a href="#">Nombre de proyecto</a>
                </p>
              </details>
            </details>
            <details class="ml-4">
              <summary>Salud</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
            <details class="ml-4">
              <summary>Infraestructura</summary>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
              <p class="ml-4 mb-0">
                <a href="#">Nombre de proyecto</a>
              </p>
            </details>
          </details>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
      filtroActivo: false,
      form: new Form({
        proyecto: "",
        tipoP: "",
        tipoC: "",
        nick: "",
      }),
      filtro: new Form({
        nomProyecto: "",
        tipoPais: "-1",
        tipoContinente: "-1",
        dni: "",
      }),
    };
  },
  methods: {
    async guardarUnidad() {
      this.proyecto
        .post(this.$gate.getApiUrl() + "proyectos")
        .then((req) => {
          this.$swal({
            title: "Unidad Creada Exitosamente!!",
            icon: "success",
            showConfirmButton: false,
            toast: true,
            position: "top-end",
            timer: 3000,
          });
          Fire.$emit("AfterCreate");

          this.$router.push({
            path: "/herramienta",
            query: { id: req.data.data.id },
          });
        })
        .catch((e) => {
          if (e.response.status == 401) {
            this.$gate.removeLogin();
            this.$router.push("/Login");
          }
        });
    },
    //----------------------------------------------------
    checkFormValidity() {
      // +console.log(this.$refs);
      const valid = this.$refs.formUnidad.checkValidity();
      this.nameState = valid;
      return valid;
    },

    //----------------------------------------------------
    checkFormValidityUnidad() {
      const valid = this.$refs.proyecto.checkValidity();
      this.proyectoState = valid;
      return valid;
    },
    //----------------------------------------------------
    showModal(modal) {
      this.$refs[modal].show();
    },
    hideModal(modal) {
      this.$refs[modal].hide();
    },
    editModal(proyecto) {
      this.$router.push({ path: "/herramienta", query: { id: proyecto.Id } });
    },
    aplicarFiltro() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        loader: "dots",
      });
      this.getResults();
      loader.hide();
    },
    resetFiltro() {
      this.filtro.reset();
      this.filtroActivo = false;
      this.getResults();
    },
    onFiltroChange() {
      this.filtroActivo = true;
    },
  },
};
</script>
<style scoped>
.accordion dl dt {
  cursor: pointer;
  padding: 0.5em;
  color: #fff;
  transition-duration: 1s;
  transition-property: background;
  background: rgba(132, 109, 77, 1);
  border-bottom: 1px solid #fff;
}
.accordion dl dd {
  display: none;
  height: auto;
  margin-left: 0;
  padding: 1em;
}
.accordion-nested {
  margin: -1em;
}
.accordion-nested dl {
  width: 100%;
  margin-left: 0;
}
.accordion-nested dl dt {
  background: rgba(132, 109, 77, 0.8);
}
.accordion-nested .accordion-nested dl dt {
  background: rgba(132, 109, 76, 0.6);
}
.accordion-nested .accordion-nested .accordion-nested dl dt {
  background: rgba(132, 109, 77, 0.4);
}
.accordion-nested .accordion-nested .accordion-nested .accordion-nested dl dt {
  background: rgba(132, 109, 77, 0.2);
}

.border-line {
  border-right: 2px solid #e5e5e5ed;
}
</style>
