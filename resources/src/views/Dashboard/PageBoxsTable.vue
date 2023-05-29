<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Cajas por tienda</h3>
        </b-col>
        <b-col class="text-right">
          <a href="#!" class="btn btn-sm btn-primary">Ver todo</a>
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="tableData"
              header-row-class-name="thead-light">
      <el-table-column label="Tienda"
                       min-width="130px"
                       prop="page">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.page}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Clientes"
                       min-width="70px"
                       prop="visitors">
      </el-table-column>
      <el-table-column label="Transacciones"
                       min-width="90px"
                       prop="unique">
      </el-table-column>

      <el-table-column label="%"
                       min-width="90px"
                       prop="bounceRate">
        <template v-slot="{row}">
          {{row.bounceRate}}
        </template>
      </el-table-column>
    </el-table>
  </b-card>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    name: '                                                                                                    ',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        tableData: [
          {
            page: 'Playa el Angel',
            visitors: '4,569',
            unique: '340',
            bounceRate: '46,53%'
          },
          {
            page: 'Juan Bautista',
            visitors: '3,985',
            unique: '319',
            bounceRate: '46,53%'
          },
          {
            page: 'Traki',
            visitors: '3,513',
            unique: '294',
            bounceRate: '36,49%'
          },
          {
            page: 'Terranova',
            visitors: '2,050',
            unique: '147',
            bounceRate: '50,87%'
          },
          {
            page: 'Playa el Agua',
            visitors: '1,795',
            unique: '190',
            bounceRate: '46,53%'
          }
        ]
      }
    },
    methods: {
      async getResults() {
        await axios.get(this.$gate.getApiUrl()+'Report/ResumenCajaFecha/fecha/2021-02-15/caja/0')
          .then(({ data }) => {
            if(data){
             //this.tableData = data;
              //console.log(this.tableData)

            }else{
              //this.tableData =[];
            }
        }).catch( e => {
              /* si el token es invalido o esta vencido */
              if (e.response.status == 401) {
                this.$gate.removeLogin();
                this.$router.push("/Login");
              }
        });
      },
    },
    mounted(){
      this.getResults();
    },


  }
</script>
<style>
</style>
