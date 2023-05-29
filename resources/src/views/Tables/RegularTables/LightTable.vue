<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Administración de Cajas</h3>
        </b-card-header>
        <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr class="thead-light">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Estatus</th>
                        <th>Registrado el</th>
                        <th>Acciones</th>
                  </tr>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.product}}</td>
                    <td>                <div class="avatar-group">
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Ryan Tompson">
                        <img alt="Image placeholder" src="img/theme/team-1.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Romina Hadid">
                        <img alt="Image placeholder" src="img/theme/team-2.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Alexander Smith">
                        <img alt="Image placeholder" src="img/theme/team-3.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Jessica Doe">
                        <img alt="Image placeholder" src="img/theme/team-4.jpg">
                    </a>
                </div></td>
                    <td><span :class="{'badge badge-danger':parseInt(user.active) === -1, 'badge badge-success':parseInt(user.active) === 1, 'badge badge-warning':parseInt(user.active) === 0 }">{{user.active | statusUser}}</span></td>
                    <td>{{user.createdAt | myDate}}</td>

                    <td>
                        <a title="Procesar Paquete" class="btn btn-light" 
                        @click="pagaruser(user)"
                        :class="{'disabled':(user.active == -1 || user.active == 0)}">
                            <i class="fa fa-tasks"></i>
                        </a>                        
                        <a class="btn btn-warning" href="#" @click="editModal(user)">
                            <i class="fa fa-edit"></i>
                        </a>
                        
                        <a class="btn btn-danger" href="#" @click="deleteUser(user.id)">
                            <i class="fa fa-trash"></i>
                        </a>

                    </td>
                  </tr>
                </tbody></table>
            
              <!-- /.card-body 
              <div class="card-footer">
                  <pagination :data="users" @pagination-change-page="getResults"></pagination>
              </div>
         -->
            <!-- /.card -->
        </div>
        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import cajas from './../cajas'
  import users from './../users'
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        cajas,
        users,
        currentPage: 1
      };
    }
  }
</script>
<style>

</style>