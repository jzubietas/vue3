<template>
  <div>
    <base-header class="pb-1 pt-5 pt-md-6 bg-gradient-success">
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h3 class="card-title">
              <b-button size="sm" v-b-toggle.accordion-1 variant="info"
                ><i class="fa fa-filter"></i></b-button
              >Filtros
            </h3>
          </b-card-header>
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <!--b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
              <b-card-text>{{ text }}</b-card-text>-->
              <b-row>
                <b-col sm="3">
                  <select
                    name="tipo"
                    v-on:change="onFiltroChange"
                    v-model="filtro.tipo"
                    id="tipo"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': filtro.errors.has('tipo') }"
                  >
                    <option value="-1">Todos los Tipos</option>
                    <option value="0">Administrador</option>
                    <option value="1">Autorizado</option>
                    <option value="2">Limitado</option>
                  </select>
                </b-col>
                <b-col sm="3">
                  <b-input-group size="sm" prepend="Email">
                    <b-form-input
                      size="sm"
                      id="nick"
                      type="text"
                      v-on:change="onFiltroChange"
                      v-model="filtro.email"
                      value=""
                      placeholder="ejemplo@gmail.com"
                    ></b-form-input>
                  </b-input-group>
                  <!--<b-input-group size="sm" prepend="Documento">
                      <b-form-input size="sm" id="nroDocumento" type="text" v-on:change="onFiltroChange" v-model="filtro.nroDocumento" value="" placeholder="000"></b-form-input>
                    </b-input-group>-->
                </b-col>
                <b-col sm="3">
                  <b-input-group size="sm" prepend="Nombre">
                    <b-form-input
                      size="sm"
                      id="NombreUser"
                      type="text"
                      v-on:change="onFiltroChange"
                      v-model="filtro.NombreUser"
                      value=""
                      placeholder="María Perez"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col sm="3" class="text-center">
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
                </b-col>
              </b-row>
              <b-row>
                <!--<b-col sm="3">
                    <b-form-input class="form-control form-control-sm float-right" id="fechaI" type="date" v-on:change="onFiltroChange" v-model="filtro.fechaI" name="fechaI" min="01-01-2000"
              max="31-12-3000"></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input size="sm" id="fechaF" type="date" v-on:change="onFiltroChange" v-model="filtro.fechaF" name="fechaF" min="01-01-2000"
                max="31-12-3000"></b-form-input>
                  </b-col>-->
                <b-col sm="3">
                  <b-input-group size="sm" prepend="DNI">
                    <b-form-input
                      size="sm"
                      id="cedula"
                      type="text"
                      v-on:change="onFiltroChange"
                      v-model="filtro.cedula"
                      value=""
                      placeholder="00000000"
                    ></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </base-header>
    <b-container fluid class="mt-4">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Usuarios</h3>
              <div class="text-right">
                <base-button
                  size="md"
                  body-class="text-left"
                  v-b-popover.hover.top="'Nuevo Usuario'"
                  type="success"
                  @click="newUser()"
                >
                  <i class="fas fa-save"></i>
                </base-button>
              </div>
            </b-card-header>
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-center">
                <tbody>
                  <tr>
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Email/Usuario</th>
                    <th>Tipo</th>
                    <th>Registrado el</th>
                    <th>Acciones</th>
                  </tr>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.cedula }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.lxvl | tipoUser }}</td>
                    <td>{{ user.created_at | myDate }}</td>
                    <td>
                      <b-btn
                        size="sm"
                        href="#"
                        @click="editModal(user)"
                        variant="ligth"
                      >
                        <i class="fa fa-edit"></i>
                      </b-btn>

                      <b-btn
                        size="sm"
                        href="#"
                        @click="deleteUser(user.id)"
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

    <!-- Modal -->
    <b-modal id="modalUser" ref="modal-1" size="xl" hide-backdrop hide-footer>
      <template #modal-title>
        <h5 class="modal-title" v-show="!editmode" id="addNewLabel">
          Guardar Usuario
        </h5>
        <h5 class="modal-title" v-show="editmode" id="addNewLabel">
          Actualizar Usuario
        </h5>
      </template>
      <form
        @submit.prevent="editmode ? updateUsuarioPos() : createUsuarioPos()"
      >
        <div class="modal-body">
          <div class="container">
            <div class="pl-lg-4">
              <b-tabs card>
                <b-tab title="Datos de Usuario" active>
                  <b-row>
                    <div class="col-sm-8">
                      <div class="row">
                        <div class="form-group col-sm-6">
                          <base-input
                            required
                            name="email"
                            type="text"
                            label="Email"
                            placeholder="ejemplo@gmail.com"
                            v-model="form.email"
                          >
                          </base-input>
                        </div>
                        <div class="form-group col-sm-6">
                          <base-input
                            name="password"
                            type="text"
                            label="Contraseña"
                            placeholder="******"
                            pattern="[A-Za-z0-9!?-]{6,20}"
                            v-model="form.password"
                          >
                          </base-input>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <label for="sucursal">Grupo</label>
                      <select
                        id="sucursal"
                        v-model="form.sucursal"
                        name="sucursal"
                        required
                        class="form-control"
                      >
                        <option value="0">Seleccione un Grupo</option>
                        <option selected value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                        <option value="4">D</option>
                        <option value="5">E</option>
                        <!--<option :value="elt.id" v-for="elt of sucursales" :key="elt.Id">
                                {{elt.Descripcion}}
                                </option>-->
                      </select>
                    </div>
                  </b-row>
                  <b-row>
                    <!--pattern="^([VJEG])\d{5,12}$"-->
                    <div class="col-sm-3">
                      <base-input
                        name="dni"
                        type="text"
                        label="DNI"
                        placeholder="Ej. 12345678"
                        v-model="form.cedula"
                      >
                      </base-input>
                    </div>
                    <div class="col-sm-4">
                      <base-input
                        required
                        type="text"
                        name="nombres"
                        label="Nombres"
                        placeholder="Pedro"
                        v-model="form.nombre"
                      >
                      </base-input>
                    </div>
                    <div class="col-sm-5">
                      <base-input
                        required
                        type="text"
                        name="apellidos"
                        label="Apellidos"
                        placeholder="Perez"
                        v-model="form.apellido"
                      >
                      </base-input>
                    </div>
                  </b-row>
                  <b-row>
                    <div class="form-group col-sm-6">
                      <label for="tipo">Tipo de Usuario</label>
                      <select
                        name="tipo"
                        v-model="form.tipo"
                        id="tipo"
                        required
                        class="form-control"
                      >
                        <option value="0">Seleccione el Tipo</option>
                        <option value="1">Administración</option>
                        <option selected value="2">Autorizado</option>
                        <option value="3">Limitado</option>
                      </select>
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="estatus">Estatus</label>
                      <select
                        name="estatus"
                        v-model="form.estatus"
                        id="estatus"
                        required
                        class="form-control"
                      >
                        <option value="">Seleccione el Estatus</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    </div>

                    <!--End Data user -->
                  </b-row>
                </b-tab>
                <b-tab title="Configuración">
                  <!-- Configuracion de usuario-->
                  <div class="row">
                    <div class="col-sm-4">
                      <label for="rol">Rol de Usuario</label>
                      <select
                        id="rol"
                        v-model="form.rolId"
                        name="rol"
                        class="form-control"
                      >
                        <option value="0">Administrativo</option>
                        <option value="3">Supervisora Caja</option>
                        <!--<option :value="rol.id" v-for="rol of roles" :key="rol.id">
                                {{rol.descripcion}}
                                </option>-->
                      </select>
                      <!--<div class="list-group" id="list-tab" role="tablist" :class="{'scrollitem':roles.length>6}">
                            <a href="#" v-for="title of roles" :key="title.id" :active="title.active" @click="activeItem(title)"   class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">{{title.descripcion}}</a>
                            </div>-->
                    </div>
                    <div class="col-sm-4">
                      <div
                        v-if="modulos"
                        id="list-modulos"
                        role="tablist-modulo"
                        :class="{ scrollitem: modulos.length > 6 }"
                      >
                        <a
                          href="#"
                          @click="accionesxModulo(modulo.acciones)"
                          v-for="modulo of modulos"
                          :key="modulo.id"
                          :class="{ active: modulo.selected }"
                          class="list-group-item list-group-item-action"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              :name="'check_' + modulo.id"
                              :id="'check_' + modulo.id"
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {{ modulo.descripcion }}
                            </label>
                          </div>
                        </a>
                      </div>
                      <div v-if="modulos.length == 0 || modulos == []">
                        No hay Módulos o Acciones cargados en el sistema para
                        este Rol
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <h4>Acciones (*) No editables</h4>
                      <div
                        id="list-acciones"
                        role="tablist-accion"
                        :class="{ scrollitem: acciones.length > 6 }"
                      >
                        <a
                          v-for="action of acciones"
                          :key="action.id"
                          class="list-group-item list-group-item-action"
                        >
                          <div class="form-check">
                            <input
                              :class="{ disable: !action.enable }"
                              class="form-check-input"
                              type="checkbox"
                              :checked="action.enable"
                              value=""
                              :name="'accionCheck_' + action.id"
                              :id="'accionCheck_' + action.id"
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {{ mostrarDescripcion(action) }}
                            </label>
                          </div>
                          <!--<div  :class="{'disableAcccion':!action.enable}"><span class="indent"></span><span class="indent"></span>
                              <span class="icon glyphicon"></span>
                              <span @click="setCheckSubItem(action)" :class="{'glyphicon-unchecked':action.selected==false, 'glyphicon-check':action.selected==true}" class="icon check-icon glyphicon glyphicon-unchecked"></span>{{mostrarDescripcion(action)}}</div>-->
                        </a>
                      </div>
                      <div v-if="acciones.length == 0 || acciones == []">
                        No hay Acciones cargados en el sistema para este Rol
                      </div>
                    </div>
                  </div>
                  <!--End Configuracion-->
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <b-button
            size="sm"
            type="button"
            class="btn btn-danger"
            @click="hideModal"
            >Cerrar</b-button
          >
          <b-button
            size="sm"
            v-show="editmode"
            type="submit"
            class="btn btn-success"
            >Actualizar</b-button
          >
          <b-button
            size="sm"
            v-show="!editmode"
            type="submit"
            class="btn btn-primary"
            >Guardar</b-button
          >
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editmode: false,
      filtroActivo: false,
      perPage: 10,
      currentPage: 1,
      totalItemsRow: 10,
      users: [],
      roles: [],
      modulos: [],
      acciones: [],
      agencias: {},
      typeusers: {},
      form: new Form({
        id: 0,
        name: "",
        nombre: "",
        apellido: "",
        nick: "",
        email: "",
        cedula: "",
        sucursal: 0,
        password: "",
        tipo: 0,
        rolId: 0,
        estatus: 1,
      }),
      filtro: new Form({
        cedula: "",
        NombreUser: "",
        email: "",
        monto: 0,
        tipo: "-1",
        estatus: "1",
      }),
    };
  },
  methods: {
    async getResults(page = 1) {
      await axios
        .get(
          this.$gate.getApiUrl() +
            "usuarios?page=" +
            page +
            "&perPage=" +
            this.perPage +
            "&Tipo=" +
            this.filtro.tipo,
          { params: this.filtro }
        )
        .then(({ data }) => {
          this.users = data.data;
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
    editModal(usuario) {
      this.editmode = true;
      this.form.reset();
      this.$refs["modal-1"].show();
      //$('#addNew').modal('show');
      this.form.fill(usuario);
      this.form.nombre = usuario.name.split(" ")[0];
      this.form.apellido = usuario.name.split(" ")[1];
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
      this.getResults();
    },
    onFiltroChange() {
      this.filtroActivo = true;
    },
    hideModal() {
      this.$refs["modal-1"].hide();
    },
    newUser() {
      this.editmode = false;
      this.form.reset();
      this.$refs["modal-1"].show();
    },
    createUsuarioPos() {
      this.form
        .post(this.$gate.getApiUrl() + "usuarios", this.form)
        .then(() => {
          // success
          this.$refs["modal-1"].hide();

          this.$swal({
            title: "Usuario Creado Exitosamente!!",
            icon: "success",
            showConfirmButton: false,
            toast: true,
            position: "top-end",
            timer: 3000,
          });
          Fire.$emit("AfterCreate");
          this.hideModal();
          //this.$Progress.finish();
        })
        .catch((e) => {
          if (e.response.status == 400) {
            this.$swal("", e.response.data.message, "error");
          }

          if (e.response.status == 422) {
            this.$swal("", e.response.data.message, "error");
          }

          //this.$Progress.fail();
        });
    },
    updateUsuarioPos() {
      this.form
        .put(this.$gate.getApiUrl() + "usuarios/" + this.form.id)
        .then(() => {
          // success
          this.$refs["modal-1"].hide();
          this.$swal({
            title: "Usuario Actualizado",
            icon: "success",
            showConfirmButton: false,
            toast: true,
            position: "top-end",
            timer: 3000,
          });
          Fire.$emit("AfterCreate");
          //this.$Progress.finish();
        })
        .catch((e) => {
          //console.log(e)
          //this.$Progress.fail();
        });
      this.hideModal();
    },
    deleteUser(id) {
      this.$swal({
        title: "Esta Seguro de Eliminar?",
        text: "No podra revertir los cambios!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        // Send request to the server
        if (result.value) {
          this.form
            .delete(this.$gate.getApiUrl() + "usuarios/" + id)
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
    loadUsers() {
      if (this.$gate.isAdminOrAuthor()) {
        this.getResults();
      }
    },

    createUser() {
      this.$Progress.start();

      this.form
        .post("api/user")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");

          toast({
            type: "success",
            title: "Usuario Creado!",
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },
  },
  created() {
    Fire.$on("searching", () => {
      let query = this.$parent.search;
      axios
        .get("api/findUser?q=" + query)
        .then((data) => {
          this.users = data.data;
        })
        .catch(() => {});
    });
    this.loadUsers();
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
    //    setInterval(() => this.loadUsers(), 3000);
  },
  mounted() {
    //axios.get("/api/agencia").then(({ data }) => this.agencias = data.data);
    //axios.get("/api/typeusers/"+this.$gate.idUser()).then(({ data }) => this.typeusers = data);
  },
};
</script>
