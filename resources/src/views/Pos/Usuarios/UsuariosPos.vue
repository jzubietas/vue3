<template>
    <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-6 bg-gradient-success">
      <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h3 class="card-title"><b-button size="sm" v-b-toggle.accordion-1 variant="info"><i class="fa fa-filter"></i></b-button>Filtros </h3>
            
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <!--b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
              <b-card-text>{{ text }}</b-card-text>-->
              <b-row>
                <b-col sm="3">
                    <select name="rolId" v-on:change="onFiltroChange" v-model="filtro.rolId" id="rolId" class="form-control form-control-sm" :class="{ 'is-invalid': filtro.errors.has('rolId') }">
                        <option value="-1">Seleccione Rol</option>
                        <option v-for="itemc in roles" :value="itemc.id"  v-bind:key="itemc.id">
                            {{itemc.descripcion}}
                        </option>                                  
                    </select>
                    <has-error :form="form" field="rolId"></has-error>
                </b-col>
                <b-col sm="3">
                    <select name="estatus" v-on:change="onFiltroChange" v-model="filtro.estatus" id="estatus" class="form-control form-control-sm" :class="{ 'is-invalid': filtro.errors.has('estatus') }">
                        <option value="">Seleccione Estatus Usuario</option>
                        <option value="0">Inactivo</option>
                        <!--<option value="-1">Vencido</option>-->
                        <option value="1">Activo</option>                                
                    </select>
                    <has-error :form="form" field="estatus"></has-error>                  
                    <!--<select name="estado" v-on:change="onFiltroChange" v-model="filtro.estado" id="estado" class="form-control form-control-sm" :class="{ 'is-invalid': filtro.errors.has('estado') }">
                        <option value="">Seleccione Region</option>
                        <option v-for="itemc in selectEdo" :value="itemc.id"  v-bind:key="itemc.id">
                            {{itemc.nombre}}
                        </option>                                  
                    </select>-->
                      <has-error :form="form" field="selecSorteo"></has-error>
                </b-col>
                <b-col sm="3">
                    <b-form-input size="sm" id="nombreUser" type="text" v-on:change="onFiltroChange" v-model="filtro.nombreUser" name="nombreUser" placeholder="Nombre usuario"></b-form-input>
                </b-col>
                <b-col sm="3" class="text-center">
                        <b-button title="Aplicar filtro" :class="{'btn btn-success' :filtroActivo, 'btn btn-light':!filtroActivo}" @click="aplicarFiltro()"><i :class="{'fas fa-check':filtroActivo,'fas fa-ban':!filtroActivo}"></i></b-button>
                        <b-button title="Resetear filtro" variant="primary" @click="resetFiltro()"><i class="fas fa-undo"></i></b-button>
                </b-col>
              </b-row>
              <b-row>
                  <b-col sm="3">
                    <b-form-input class="form-control form-control-sm float-right" id="fechaI" type="date" v-on:change="onFiltroChange" v-model="filtro.fechaI" name="fechaI" min="01-01-2000"
              max="31-12-3000"></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <b-form-input size="sm" id="fechaF" type="date" v-on:change="onFiltroChange" v-model="filtro.fechaF" name="fechaF" min="01-01-2000"
                max="31-12-3000"></b-form-input>
                  </b-col>
                  <b-col sm="3">
                    <b-input-group size="sm" prepend="V">
                      <b-form-input size="sm" pattern="^([VJEG])\d{8,11}$" id="cedula" type="number" v-on:change="onFiltroChange" v-model="filtro.cedula" value="" placeholder="00000000"></b-form-input>
                    </b-input-group>
                  </b-col>                                                                       
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <!-- Card stats -->
      <!--<b-row>
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
      </b-row>-->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
              <b-card-header class="border-0">
                <h3 class="mb-0">Usuarios Pos</h3>
                    <div class="text-right">
                    <base-button size="md"
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
                <table id="ListUsers" class="table table-hover">
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Apellidos y Nombres</th>
                        <th>Cédula</th>
                        <th>Nick</th>
                        <th>Rol Asignado</th>
                        <th>Estatus</th>
                        <!--<th>Creado el</th>                                                -->
                        <th>Actualizado el</th>
                        <th>Acciones</th>
                    </tr>

                    <tr v-for="userPos in usuarios" :key="userPos.id">
                        <td>{{userPos.id}}</td>
                        <td>{{userPos.apellido}}, {{userPos.nombre}} </td>
                        <td>{{userPos.cedula}}</td>
                        <td>{{userPos.nick}}</td>
                        <td><h3><b-badge variant="light">{{getNombreRol(userPos.rolId)}}</b-badge></h3></td>
                        <td><span :class="{'badge badge-danger':!userPos.estatus, 'badge badge-success':userPos.estatus }">{{userPos.estatus | status}}</span></td>  
                        <!--<td>{{userPos.createdAt | myDate}}</td>-->
                        <td>{{userPos.updatedAt | myDate}}</td>
                        <td>
                            <base-button size="sm"
                                v-b-popover.hover.top="'Editar Usuario'"
                                type="secondary"
                                @click="editModal(userPos)"
                            >
                            <i class="fa fa-edit"></i>
                            </base-button>                           
                            <base-button size="sm"                            
                                v-b-popover.hover.top="'Eliminar Usuario'"
                                type="danger"
                                @click="deleteUsuarioPos(userPos.Id)"
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
                  <base-pagination @change="getResults" aria-controls="ListUsers" v-model="currentPage" :per-page="perPage" :total="totalItemsRow"></base-pagination>
              </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <div class="mt-5"></div>     
    </b-container>


    <!-- Modal -->
    <b-modal id="modalUser" ref="modal-1" size="xl" hide-backdrop hide-footer>
        <template #modal-title>
            <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Guardar Usuario</h5>
            <h5 class="modal-title" v-show="editmode" id="addNewLabel">Actualizar Usuario</h5>
        </template>
          <form @submit.prevent="editmode ? updateUsuarioPos() : createUsuarioPos()">
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
                                        name="Nick"       
                                        type="text"
                                        label="Nombre de Usuario"
                                        placeholder="Ej. FCajero"                        
                                        v-model="form.nick"
                                    >
                                    </base-input>
                                </div> 
                                <div class="form-group col-sm-6">
                                    <base-input                                               
                                        type="text"
                                        label="Contraseña"
                                        placeholder="ApellidoN"
                                        pattern="[A-Za-z0-9!?-]{6,20}"                        
                                        v-model="form.password"                                        
                                    >
                                    </base-input>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-4">
                            <label for="sucursal">Sucursal</label>
                            <select id="sucursal" v-model="form.sucursal" name="sucursal" required class="form-control">
                                <option value="-1">Seleccione una Sucursal</option>
                                <option value="1">Juan Bautista</option>
                                <option value="2">Traki</option>
                                <option value="3">Playa El Angel</option>
                                <option value="4">Terranova</option>
                                <option value="5">31 de Julio</option>
                                <!--<option :value="elt.id" v-for="elt of sucursales" :key="elt.Id">
                                {{elt.Descripcion}}
                                </option>-->
                            </select>
                            </div>
                        </b-row>
                        <b-row>
                            <div class="col-sm-3">
                                <base-input
                                    required
                                    name="cedula"
                                    type="text"
                                    label="Cédula"
                                    pattern="^([VJEG])\d{5,12}$" 
                                    placeholder="Ej. V12345678"                       
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
                                    placeholder="Ej. Pedro"                       
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
                                    placeholder="Ej. Perez"                       
                                    v-model="form.apellido"
                                >
                                </base-input>                   
                            </div>
                        </b-row>  
                        <b-row>
                            <div class="form-group col-sm-6">
                            <label for="tipo">Tipo de Usuario</label>
                            <select name="tipo" v-model="form.tipo" id="tipo" required class="form-control">
                                <option value="-1">Seleccione el Tipo</option>
                                <option value="3">Usuario POSRIO</option>
                                <option value="2">Caja Administrativa (Sup)</option>
                                <option value="21">Arqueo</option>
                            </select>                      
                            </div>      
                            <div class="form-group col-sm-6">
                                <label for="estatus">Estatus</label>        
                                <select name="estatus" v-model="form.estatus" id="estatus" required class="form-control">
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
                            <label for="selectroles">Roles de Usuario</label>
                            <select id="selectroles" v-model="form.rolId" name="selectroles" required class="form-control">
                                <option value="-1">Seleccione un Rol</option>
                                <option :value="rol.id" v-for="rol of roles" :key="rol.id">
                                {{rol.descripcion}}
                                </option>
                            </select>
                            <!--<div class="list-group" id="list-tab" role="tablist" :class="{'scrollitem':roles.length>6}">
                            <a href="#" v-for="title of roles" :key="title.id" :active="title.active" @click="activeItem(title)"   class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">{{title.descripcion}}</a>
                            </div>-->
                        </div>
                        <div class="col-sm-4">
                                                        
                            <div v-if="modulos" id="list-modulos" role="tablist-modulo" :class="{'scrollitem':modulos.length>6}">
                                <a href="#" @click="accionesxModulo(modulo.acciones)" v-for="modulo of modulos" :key="modulo.id" :class="{'active':modulo.selected}" class="list-group-item list-group-item-action">
                                  <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" :name="'check_'+modulo.id" :id="'check_'+modulo.id">
                                      <label class="form-check-label" for="exampleRadios1">
                                        {{modulo.descripcion}}
                                      </label>
                                  </div>
                                </a>                            
                            </div>
                            <div v-if="modulos.length == 0 || modulos == []">No hay Módulos o Acciones cargados en el sistema para este Rol</div>
                        </div>
                        <div class="col-sm-4">
                          <h4>Acciones (*) No editables</h4>                            
                            <div id="list-acciones" role="tablist-accion"  :class="{'scrollitem':acciones.length>6}">
                            <a v-for="action of acciones" :key="action.id" class="list-group-item list-group-item-action">
                              <div class="form-check" >
                                <input :class="{'disable':!action.enable}" class="form-check-input" type="checkbox" :checked="action.enable" value="" :name="'accionCheck_'+action.id" :id="'accionCheck_'+action.id">
                                  <label class="form-check-label" for="exampleRadios1">
                                    {{mostrarDescripcion(action)}}
                                  </label>
                              </div>                              
                              <!--<div  :class="{'disableAcccion':!action.enable}"><span class="indent"></span><span class="indent"></span>
                              <span class="icon glyphicon"></span>
                              <span @click="setCheckSubItem(action)" :class="{'glyphicon-unchecked':action.selected==false, 'glyphicon-check':action.selected==true}" class="icon check-icon glyphicon glyphicon-unchecked"></span>{{mostrarDescripcion(action)}}</div>-->
                            </a>
                            </div>
                            <div v-if="acciones.length == 0 || acciones == []">No hay Acciones cargados en el sistema para este Rol</div>
                        </div>
                        </div>
                        <!--End Configuracion-->
                        
                      </b-tab>
                    </b-tabs>                   
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
      totalItemsRow:10,
      usuarios:[],
      roles:[],
      modulos:[],
      acciones:[],
      sucursales :[{Id:1, Descripcion:'Juan Bautista'},{Id:2, Descripcion:'Traki'},{Id:3, Descripcion:'Playa El Angel'},{Id:4, Descripcion:'Terranova'}],
      category: { sucursal: -1 },
      estatusArr:[
          { value: null, text: '-- Seleccione --' },
          { value: true, text: 'Activo' },
          { value: false, text: 'Inactivo' }       
      ],     
      form: new Form({
        id: -1,
        accionesAdc: [],
        apellido: '',
        cedula: '',        
        estatus: 1,        
        nick: '',
        nombre: '',
        password: '',
        rolId: 0,
        sucursal: -1,
        tipo: -1,
      }),
      filtro: new Form({
        cedula:'',
        nombreUser:'',
        estatus:1,
        fechaF:'',
        fechaI:'',
        rolId:-1,
      }),
      };
    },
    methods: {
      async getResults(page = 1) {      
        await axios.get(this.$gate.getApiUrl()+'Usuario?page='+page+'&perPage='+this.perPage,{ params: this.filtro })
        .then(({ data }) => {
          this.usuarios = data.usuarios;
          this.totalItemsRow = data.totalrow;
        }).catch( e => {
            /* si el token es invalido o esta vencido */
            if (e.response.status == 401) {
               this.$gate.removeLogin();
               this.$router.push("/Login");             
            }
        });
      },
      resetFiltro(){
        this.filtro.reset();      
        this.filtroActivo = false;
        this.loadUsuariosPos();
      },
      onFiltroChange(){
        this.filtroActivo = true;
      },
      aplicarFiltro(){
        //if(this.$gate.isAdmin()){
          let loader = this.$loading.show({
            // Optional parameters
            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: true,
            loader: 'dots',
          });
          this.getResults();
          loader.hide();
         /* if(!this.$gate.isAdmin()){
            this.filtro.user_id = this.$gate.idUser();
          }

          axios.get("api/polizas",{ params: this.filtro }).then(({ data }) => {
            this.polizas = data;
            loader.hide();
          });*/
        //}else{
          //  var tipoUser = (this.$gate.isAuthor())?1:2;                 
          //axios.get("/api/polizas",{ params: this.filtro }).then(({ data }) => this.polizas = data);
        //}
        //this.montoTotalVentasComision();
        //this.montoTotalVentasPremios();      
      },      
      accionesxModulo(accMod){        
        this.acciones = accMod;
      },
      newUser(){
        this.editmode = false;
        this.form.reset();
        this.$refs['modal-1'].show();        
      },
      createUsuarioPos(){
        this.form.post(this.$gate.getApiUrl()+'Usuario', this.form)
          .then(() => {
            // success            
            this.$refs['modal-1'].hide();

            this.$swal({
              title: 'Usuario Creado Exitosamente!!',
              icon: 'success',
              showConfirmButton: false,
              toast: true,
              position: 'top-end',
              timer: 3000
            })
            Fire.$emit('AfterCreate');
            this.hideModal();
          //this.$Progress.finish();
        })
        .catch((e) => {
          if (e.response.status == 400) {  
            this.$swal(
                  '',
                  e.response.data.message,
                  'error'
            )
          }

          //this.$Progress.fail();
        });
        
      },
      editModal(modulo){
        this.editmode = true;
        this.form.reset();        
        this.$refs['modal-1'].show();       
        this.form.fill(modulo);
      },
      updateUsuarioPos(){                
        this.form.put(this.$gate.getApiUrl()+'Usuario/'+this.form.id)
          .then(() => {
            // success            
            this.$refs['modal-1'].hide();

            this.$swal({
              title: 'Usuario Actualizado',
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
      async getModulosAccionByIdRol(IdRol){
        await axios.get(this.$gate.getApiUrl()+"Usuario/ModuloAccionRolConfig/"+IdRol).then(({ data }) => {          
            this.modulos = data;          
        }).catch( e => {
            /* si el token es invalido o esta vencido */
            if (e.response.status == 401) {                             
               this.$gate.removeLogin();
               this.$router.push("/Login");             
            }
        });
      },
      async getProfileUser(IdUser){
        await axios.get(this.$gate.getApiUrl()+"Usuario/PerfilUsuario/"+IdUser).then(({ data }) => {          
            this.modulos = data;          
        }).catch( e => {
            /* si el token es invalido o esta vencido */
            if (e.response.status == 401) {                             
               this.$gate.removeLogin();
               this.$router.push("/Login");             
            }
        });
      },      
      activeItem(title){       
        this.modulos = this.acciones =[];
        if(this.editmode){
          this.getProfileUser(this.form.id);
        }else{
          this.getModulosAccionByIdRol(title.id);
        }        
      },
      mostrarDescripcion(accion){
        return (accion.enable)?accion.descripcion:accion.descripcion+' *';
      },
      async loadUsuariosPos(){
        //if(this.$gate.isAdminOrAuthor()){
          await axios.get(this.$gate.getApiUrl()+"Rol").then(({ data }) => {this.roles = data; });
          this.getResults();
          //await axios.get(this.$gate.getApiUrl()+"Accion").then(({ data }) => {this.acciones = data; });
         
          //await axios.get(this.$gate.getApiUrl()+"Modulo").then(({ data }) => {this.modulos = data; });
        //}
      },
      getNombreRol(rolId){        
        if(rolId>0 && this.roles){
          let itemEnc = this.roles.find(m => m.id === rolId);
          return itemEnc.descripcion;
        }else{ 
          return "Administrador";
        }
      }
    },
    created(){
      this.loadUsuariosPos();
      Fire.$on('AfterCreate',() => {
        this.getResults();
      });      
    },
    computed:{
      rows() {
        return this.usuarios.length
      },
    }
  };
</script>

<style>
 #modalUser{
   font-size: 13px;
 }
  .modal-header {    
    padding-bottom : 0rem;
    padding: 0.5rem;
  }
.ocultar{
    display: none;
 }

 .scrollitem{
    width: 100%;
    height:300px;
    overflow: scroll;
 }

 .disableAcccion{
   font-weight: bold;
   /*background-color: #f1f1f1;*/
 }  
</style>