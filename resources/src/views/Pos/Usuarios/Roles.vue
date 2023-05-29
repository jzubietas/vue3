<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
              <b-card-header class="border-0">
                  <h3 class="mb-0">Roles del Pos</h3>
              </b-card-header>
              <div class="card-body table-responsive p-0">
                <table id="ListRoles" class="table table-hover">
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Descripción</th>
                        <th>Estatus</th>
                        <th>Creado el</th>                                                
                        <th>Actualizado el</th>
                        <th>Acciones</th>
                    </tr>

                    <tr v-for="rol in roles" :key="rol.id">
                        <td>{{rol.id}}</td>
                        <td>{{rol.descripcion}}</td>
                        <td><span :class="{'badge badge-danger':!rol.activo, 'badge badge-success':rol.activo }">{{rol.activo | status}}</span></td>  
                        <td>{{rol.createdAt | myDate}}</td>
                        <td>{{rol.updatedAt | myDate}}</td>
                        <td>
                            <base-button size="sm"
                                v-b-popover.hover.top="'Editar Módulo'"
                                type="secondary"
                                @click="editModal(rol)"
                            >
                            <i class="fa fa-edit"></i>
                            </base-button>                    
                            <base-button size="sm"
                                v-b-popover.hover.top="'Asignar Acciones'"
                                type="primary"
                                @click="editModal(rol)"
                            >
                            <i class="fas fa-user-plus"></i>
                            </base-button>                            
                            <base-button size="sm"                            
                                v-b-popover.hover.top="'Eliminar Módulo'"
                                type="danger"
                                @click="deleteAccion(rol.Id)"
                            >
                            <i class="fa fa-trash"></i>
                            </base-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!-- /.card -->
              </div>
              <b-card-footer class="py-4 d-flex justify-content-end">
                  <base-pagination @change="getResults" aria-controls="ListRoles" v-model="currentPage" :per-page="perPage" :total="30"></base-pagination>
              </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>     
    </b-container>


    <!-- Modal -->
    <b-modal ref="modal-1" size="md" hide-backdrop centered hide-footer>
        <template #modal-title>
            <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Guardar Rol</h5>
            <h5 class="modal-title" v-show="editmode" id="addNewLabel">Actualizar Rol</h5>
        </template>
          <form @submit.prevent="editmode ? updateCaja() : createCaja()">
            <div class="modal-body">
              <div class="container">
                <h6 class="heading-small text-muted mb-4">Roles</h6>
                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="12">
                      <base-input
                        required       
                        type="text"
                        label="Descripción"
                        placeholder="Ej. rol A"                        
                        v-model="form.descripcion"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="12">
                        <label>Estatus</label>
                        <b-form-select v-model="form.activo" :options="estatusArr"></b-form-select>
                    </b-col>
                  </b-row>                    
                </div>
              </div>
            </div>
           
            <div class="modal-footer">
              <b-button size="sm" type="button" class="btn btn-danger" @click="hideModal" >Cerrar</b-button>
              <b-button size="sm" v-show="editmode" type="submit" class="btn btn-success">Actualizar</b-button>
              <b-button size="sm" v-show="!editmode" type="submit" class="btn btn-primary">Guardar</b-button>
            </div>
          </form>
    </b-modal>

    <!-- Modal Add Acciones -->
    <b-modal ref="modal-addAcciones" size="md" hide-backdrop centered hide-footer>
        <template #modal-title>
            <h5 class="modal-title" v-show="!editmode">Guardar Acción</h5>
            <h5 class="modal-title" v-show="editmode">Actualizar Acción</h5>
        </template>
          <form @submit.prevent="editmode ? updateCaja() : createCaja()">
            <div class="modal-body">
              <div class="container">
                <h6 class="heading-small text-muted mb-4">Módulos</h6>
                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="12">
                      <base-input
                        required       
                        type="text"
                        label="Descripción"
                        placeholder="Ej. accionA"                        
                        v-model="form.descripcion"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="12">
                        <label>Estatus</label>
                        <b-form-select v-model="form.activo" :options="estatusArr"></b-form-select>
                    </b-col>
                  </b-row>                    
                </div>
              </div>
            </div>
           
            <div class="modal-footer">
              <b-button size="sm" type="button" class="btn btn-danger" @click="hideModal" >Cerrar</b-button>
              <b-button size="sm" v-show="editmode" type="submit" class="btn btn-success">Actualizar</b-button>
              <b-button size="sm" v-show="!editmode" type="submit" class="btn btn-primary">Guardar</b-button>
            </div>
          </form>
    </b-modal>    
  </div>
</template>
<script>
  import { Dropdown, DropdownItem, DropdownMenu, Table, TableColumn } from 'element-ui';

  export default {
    components: {
      //LightTable,
      //DarkTable,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
      editmode: false,
      filtroActivo:false,
      perPage:10,
      currentPage: 1,
      roles:[],
      estatusArr:[
          { value: null, text: '-- Seleccione --' },
          { value: true, text: 'Activo' },
          { value: false, text: 'Inactivo' }       
      ],     
      form: new Form({
        id: -1,
        descripcion: '',
        activo: null,
      }),
      };
    },
    methods: {
      getResults(page = 1) {      
        axios.get(this.$gate.getApiUrl()+'Rol?page='+page+'&perPage='+this.perPage)
        .then(({ data }) => {
          this.roles = data;          
        }).catch( e => {
            /* si el token es invalido o esta vencido */
            if (e.response.status == 401) {
               this.$gate.removeLogin();
               this.$router.push("/Login");             
            }  
        });
      },
      editModal(modulo){
        this.editmode = true;
        this.form.reset();        
        this.$refs['modal-1'].show();       
        this.form.fill(modulo);    
      },
      updateCaja(){        
        //this.$gate.getApiUrl()+
        this.form.put(this.$gate.getApiUrl()+'Rol/'+this.form.id)
          .then(() => {
            // success            
            this.$refs['modal-1'].hide();

            this.$swal({
              title: 'Rol Actualizado',
              icon: 'success',
              showConfirmButton: false,
              toast: true,
              position: 'top-end',
              timer: 3000
            })
            Fire.$emit('AfterCreate');          
          //this.$Progress.finish();
        })
        .catch((e) => {
          //console.log(e)

          //this.$Progress.fail();
        });
        this.hideModal();
      },
      hideModal() {
        this.$refs['modal-1'].hide();
      },
      loadRoles(){
        //if(this.$gate.isAdminOrAuthor()){
           this.getResults();
          //await axios.get(this.$gate.getApiUrl()+"Accion").then(({ data }) => {this.roles = data; });
          //await axios.get(this.$gate.getApiUrl()+"Rol").then(({ data }) => {this.roles = data; this.getSelectRoles(); });
          //await axios.get(this.$gate.getApiUrl()+"Modulo").then(({ data }) => {this.roles = data; this.getSelectModulos(); });
        //}
      },

    },
    created(){
      this.loadRoles();
      Fire.$on('AfterCreate',() => {
        this.getResults();
      });      
    },
    computed:{
      rows() {
        return this.roles.length
      },
    }
  };
</script>
<style>

</style>