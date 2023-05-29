<template>
  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Avance de Proyectos</h3>
        </b-col>
        <b-col class="text-right">
          <base-button size="sm" type="primary">Ver todo</base-button>
        </b-col>
      </b-row>
    </template>


    <el-table
      class="table-responsive table"
      :data="tableData"
      header-row-class-name="thead-light">
      <el-table-column label="Referral" min-width="115px" prop="name">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column label="Visitors" min-width="110px" prop="visitors">
      </el-table-column>

      <el-table-column min-width="220px" prop="progress">
        <template v-slot="{row}">
          <div class="d-flex align-items-center">
            <span class="mr-2">{{row.progress}}%</span>
            <base-progress :type="row.progressType" :value="row.progress" />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </b-card>
</template>
<script>
  import { BaseProgress } from '@/components';
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    name: 'social-traffic-table',
    components: {
      BaseProgress,
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
            name: 'JB',
            visitors: '1,480',
            progress: 60,
            progressType: 'gradient-danger',
          },
          {
            name: 'Proyecto A',
            visitors: '5,480',
            progress: 70,
            progressType: 'gradient-success',
          },
          {
            name: 'Proyecto B',
            visitors: '4,807',
            progress: 80,
            progressType: 'gradient-primary',
          },
          {
            name: 'Proyecto C',
            visitors: '3,678',
            progress: 75,
            progressType: 'gradient-info',
          },
          {
            name: 'Proyecto D',
            visitors: '2,645',
            progress: 30,
            progressType: 'gradient-warning',
          }
        ]
      }
    }

  }
</script>
<style>
</style>
