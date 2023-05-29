]<template>
  <div>
    <base-header class="pb-1 pt-5 pt-md-6 bg-gradient-success"> </base-header>
    <b-container fluid class="mt-4">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Nuevo Proyecto</h3>
              <div class="text-right">
                <base-button
                  size="md"
                  body-class="text-left"
                  v-b-popover.hover.top="'Nuevo Proyecto'"
                  type="success"
                  @click="showModal('modal-proyecto')"
                >
                  <i class="fas fa-save"></i>
                </base-button>
              </div>
            </b-card-header>
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-center">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Proyecto</th>
                    <th>Promotor</th>
                    <th>Sector</th>
                    <th>Registrado el</th>
                    <th>Acciones</th>
                  </tr>
                  <tr v-for="item in proyectos" :key="item.id">
                    <td>{{ item.Id }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.promotor ? item.promotor : "---" }}</td>
                    <td>{{ item.sector ? item.sector : "---" }}</td>
                    <td>{{ item.created_at | myDate }}</td>
                    <td>
                      <b-btn
                        size="sm"
                        href="#"
                        @click="editModal(item)"
                        variant="ligth"
                      >
                        <i class="fa fa-edit"></i>
                      </b-btn>

                      <b-btn
                        size="sm"
                        href="#"
                        @click="deleteProyecto(item.Id)"
                        variant="danger"
                      >
                        <i class="fa fa-trash"></i>
                      </b-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- /.card -->
            </div>
            <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination
                @change="getResults"
                v-model="currentPage"
                :per-page="perPage"
                :total="totalItemsRow"
              ></base-pagination>
            </b-card-footer>
          </b-card>
          <!--<light-table/>
          <dark-table/>-->
        </b-col>
      </b-row>
      <div class="mt-5"></div>
    </b-container>

    <!--Modal Proyecto-->
    <b-modal
      id="modal-prevent-closing"
      ref="modal-proyecto"
      title="Nuevo Proyecto"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form
        ref="formProyecto"
        @submit.prevent="editmode ? updateProyecto() : createProyecto()"
      >
        <b-form-group
          id="fgPromotor"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description=""
          label="Unidad Operativa"
          label-for="nombre-promotor"
          label-size="sm"
          v-if="step == 1"
        >
          <b-form-input
            name="promotor"
            size="sm"
            id="nombre-promotor"
            v-model="proyecto.promotor"
            :class="{ 'is-invalid': proyecto.errors.has('promotor') }"
          ></b-form-input>
          <has-error :form="proyecto" field="promotor"></has-error>
        </b-form-group>
        <b-button
          variant="primary"
          size="sm"
          class="float-left"
          @click="step++"
          v-if="step == 1"
        >
          Siguiente
        </b-button>
        <b-form-group
          id="fgSector"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description=""
          label="Sector"
          label-for="sector-proyecto"
          label-size="sm"
          v-if="step == 2"
        >
          <b-form-input
            size="sm"
            id="sector-proyecto"
            v-model="proyecto.sector"
          ></b-form-input>
        </b-form-group>
        <b-button
          variant="primary"
          size="sm"
          class="float-left"
          @click="step++"
          v-if="step == 2"
        >
          Siguiente
        </b-button>
        <b-form-group
          id="fgProyecto"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description=""
          label="Nombre del Proyecto"
          label-for="nombreProyecto"
          label-size="sm"
          v-if="step == 3"
        >
          <b-form-input
            size="sm"
            id="nombreProyecto"
            v-model="proyecto.nombre"
          ></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-row>
            <b-col>
              <b-button
                variant="primary"
                size="sm"
                class="float-left"
                @click="guardarProyecto"
                v-if="step == 3"
              >
                Guardar
              </b-button>
            </b-col>
            <b-col class="text-rigth">
              <b-button
                variant="danger"
                size="sm"
                class="float-right"
                @click="hideModal('modal-proyecto')"
              >
                Cerrar
              </b-button>
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  Table,
  TableColumn,
} from "element-ui";
export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      step: 1,
      filtroActivo: false,
      perPage: 10,
      currentPage: 1,
      totalItemsRow: 10,
      proyectos: [],
      proyecto: new Form({
        nombre: "",
        sector: "",
        promotor: "",
      }),
      //------------------------------------------
      filtro: new Form({
        nroFactura: "",
        codigoCaja: "",
        nroDocumento: "",
        idTurno: "",
        tiendaId: "-1",
        formaPagoId: "-1",
        Caja: 0,
        fechaI: this.getDate(),
        fechaF: this.getDate(),
        monto: 0,
        idCaja: "0",
      }),
      status: [
        { value: true, text: "Activo" },
        { value: false, text: "Inactivo" },
      ],
      factMayor: [
        { value: true, text: "Si" },
        { value: false, text: "No" },
      ],
    };
  },
  methods: {
    async getResults(page = 1) {
      await axios
        .get(
          this.$gate.getApiUrl() +
            "proyectos?page=" +
            page +
            "&perPage=" +
            this.perPage,
          { params: this.filtro }
        )
        .then(({ data }) => {
          this.proyectos = data.data;
          this.totalItemsRow = data.total;
        })
        .catch((e) => {
          /* si el token es invalido o esta vencido */
          if (e.response.status == 401) {
            this.$gate.removeLogin();
            this.$router.push("/Login");
          }
        });
    },
    async deleteProyecto(proyectoId) {
      this.$swal({
        title: "Esta Seguro de Eliminar el Proyecto?",
        text: "No podra revertir los cambios!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar!",
      }).then((result) => {
        // Send request to the server
        if (result.value) {
          this.proyecto
            .delete(this.$gate.getApiUrl() + "proyectos/" + proyectoId)
            .then(() => {
              this.$swal("Eliminado!", "Registro Borrado.", "success");
              Fire.$emit("AfterCreate");
            })
            .catch(() => {
              this.$swal("Failed!", "There was something wronge.", "warning");
            });
        }
      });
    },
    async guardarProyecto() {
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // this.show=false;
      this.proyecto
        .post(this.$gate.getApiUrl() + "proyectos")
        .then((req) => {
          //console.log(req);
          // success
          // this.$refs['modal-proyecto'].hide();
          this.$swal({
            title: "Proyecto Creado Exitosamente!!",
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
          //this.hideModal();
          //this.$Progress.finish();
        })
        .catch((e) => {
          //console.log(e);
          //if (e.response.status == 400) {
          // this.$swal(
          //     '',
          //     e.response,
          //     'error'
          // )
          //}
          /* si el token es invalido o esta vencido */
          if (e.response.status == 401) {
            this.$gate.removeLogin();
            this.$router.push("/Login");
          }
          //this.$Progress.fail();
        });
    },
    //----------------------------------------------------
    checkFormValidity() {
      //console.log(this.$refs);
      const valid = this.$refs.formProyecto.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    //----------------------------------------------------
    checkFormValiditySector() {
      const valid = this.$refs.sector.checkValidity();
      this.sectorState = valid;
      return valid;
    },
    resetModalSector() {
      this.sector = "";
      this.sectorState = null;
    },
    //----------------------------------------------------
    checkFormValidityProyecto() {
      const valid = this.$refs.proyecto.checkValidity();
      this.proyectoState = valid;
      return valid;
    },
    resetModalProyecto() {
      this.proyecto = "";
      this.proyectoState = null;
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
      // this.editmode = true;
      // this.form.reset();
      // this.$refs['modal-1'].show();
      // this.form.fill(caja);
    },
    aplicarFiltro() {
      //if(this.$gate.isAdmin()){
      let loader = this.$loading.show({
        // Optional parameters
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
      //this.loadUsuariosPos();
    },
    onFiltroChange() {
      this.filtroActivo = true;
      //this.onChangeSelectCajas();
    },
    getDate() {
      var currentDate = new Date();
      return (
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() < 9
          ? "0" + (currentDate.getMonth() + 1)
          : currentDate.getMonth() + 1) +
        "-" +
        (currentDate.getDate() < 10
          ? "0" + currentDate.getDate()
          : currentDate.getDate())
      );
    },
    updateCaja() {
      //console.log("Actualizar Data");
      this.hideModal();
    },
    getHora() {
      var currentDate = new Date();
      var hora = currentDate.getHours();
      var min = currentDate.getMinutes();
      //var seg = currentDate.getSeconds();
      return (
        (hora < 10 ? "0" + hora : hora) + ":" + (min < 10 ? "0" + min : min)
      );
    },
    calculardiferencia(hora_desde = "12:00T12:00") {
      var hora_inicio = hora_desde.split("T")[1];
      hora_inicio = hora_inicio.slice(0, 5);
      //var hora_iniciop = hora_desde;
      var hora_final = this.getHora();

      if (hora_desde > hora_final) {
        hora_inicio = hora_final;
        hora_final = hora_desde;
      }

      // Expresión regular para comprobar formato
      var formatohora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

      // Si algún valor no tiene formato correcto sale
      if (!(hora_inicio.match(formatohora) && hora_final.match(formatohora))) {
        return;
      }

      // Calcula los minutos de cada hora
      var minutos_inicio = hora_inicio
        .split(":")
        .reduce((p, c) => parseInt(p) * 60 + parseInt(c));
      var minutos_final = hora_final
        .split(":")
        .reduce((p, c) => parseInt(p) * 60 + parseInt(c));

      // Si la hora final es anterior a la hora inicial sale
      if (minutos_final < minutos_inicio) return;

      // Diferencia de minutos
      var diferencia = minutos_final - minutos_inicio;

      // Cálculo de horas y minutos de la diferencia
      var horas = Math.floor(diferencia / 60);
      var minutos = diferencia % 60;

      return horas + ":" + (minutos < 10 ? "0" : "") + minutos;
    },
    zfill(number, width = 6) {
      var numberOutput = Math.abs(number); /* Valor absoluto del número */
      var length = number.toString().length; /* Largo del número */
      var zero = "0"; /* String de cero */

      if (width <= length) {
        if (number < 0) {
          return "-" + numberOutput.toString();
        } else {
          return numberOutput.toString();
        }
      } else {
        if (number < 0) {
          return "-" + zero.repeat(width - length) + numberOutput.toString();
        } else {
          return zero.repeat(width - length) + numberOutput.toString();
        }
      }
    },
    async loadProyectos() {
      await axios
        .get(this.$gate.getApiUrl() + "proyectos")
        .then(({ data }) => {
          this.proyectos = data.data;
          this.totalItemsRow = data.total;
          //console.log("Carga de datos Exitosa");
        })
        .catch((e) => {
          //console.log(e);
          /* si el token es invalido o esta vencido */
          if (e.response.status == 401) {
            this.$gate.removeLogin();
            this.$router.push("/Login");
          }
        });
      //this.getResults();
      //axios.get(this.$gate.getApiUrl()+"Tienda").then(({ data }) => {this.tiendas = data; this.getSelectTienda(); });
      //axios.get(this.$gate.getApiUrl()+"FormaPago").then(({ data }) => {this.formasPago = data; });

      //if(this.$gate.isAdminOrAuthor()){
      //axios.get(this.$gate.getApiUrl()+"CajaAdministrativa/ListadoFactura?Fecha="+this.filter.fecha+"&Turno="+this.filter.turno+"&Caja="+this.filter.codigoCaja).then(({ data }) => {this.facturas = data.data; });

      //}
    },
  },
  created() {
    this.loadProyectos();
    Fire.$on("AfterCreate", () => {
      this.loadProyectos();
    });
  },
};
</script>
<style>
.statscard {
  font-size: 13px;
}
.fondotasa {
  background: #f5f5f5;
  font-weight: bold;
}
.detallefactura {
  font-size: 0.8125rem;
  white-space: nowrap;
}
.bckgmontobs {
  background: #e2e6e7;
  font-weight: bold;
}
.ocultar {
  display: none;
}
</style>
