<script setup lang="ts">
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

import Messages from '../../../../../modalMessages/MessagesPage.vue'
import ProvisionReportApi from './ProvisionReportApi';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataProvisionReport = reactive({
  titles: {
    initial: 'Previsões de Vendas de Usados',
    search: 'Pesquisa',
    dealer: 'Concessões',
    year: 'Ano',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano',
    titleInitialTable: 'Por favor, seleccione o concessionário e o ano que pretende consultar'
  },
  dataSelectProvisionReport: {
    dealer: '',
    year: '',
  },
  dataMessages: {
    loading: { isLoading: false }
  },
  dataSendPrevisionSales: {
    year: '',
    month: 12,
    oidDealer: ''
  },
  headerTable: ['TUC', 'Previsões', 'Cumprimento %'],
  table: {
    pagination: { rowsPerPage: 0 },
    noData: '',
    separator: 'cell'
  },
  responsePrevisionSales: null
});
const dataResponse = ref([])
const columnsInitial = [
  { name: 'month', align: 'center', label: 'MÊS', field: 'month' },
  { name: 'oTuc', align: 'center', label: 'OBJETIVO TUC', field: 'oTuc' },
  { name: 'tuc', align: 'center', label: 'TUC', field: 'tuc' },
  { name: 'tcap', align: 'center', label: 'COMPRAS TCAP', field: 'tcap' },
  { name: 'tObj', align: 'center', label: 'TUC/OBJETIVO', field: 'tObj' },
  { name: 'cTcap', align: 'center', label: 'COMPRAS TCAP/TUC', field: 'cTcap' }
];
dataProvisionReport.dataSelectProvisionReport.year =
  dataOptionsStore.value.yearActual;

const ListPrevisionSales = async () => {
  if (dataProvisionReport.dataSelectProvisionReport.dealer !== '') {
    try {
      dataProvisionReport.dataMessages.loading.isLoading = true
      const roles = localStorage.getItem('roles')
      if (roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
        dataProvisionReport.dataSendPrevisionSales.oidDealer = dataProvisionReport.dataSelectProvisionReport.dealer.value
      } else if (!roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
        dataProvisionReport.dataSendPrevisionSales.oidDealer = 'SC00020003'
      }
      dataProvisionReport.dataSendPrevisionSales.year = dataProvisionReport.dataSelectProvisionReport.year
      dataProvisionReport.responsePrevisionSales = await ProvisionReportApi.tvcPrevisionSales(dataProvisionReport.dataSendPrevisionSales)
      await updateRows(dataProvisionReport.responsePrevisionSales)
      dataProvisionReport.dataMessages.loading.isLoading = false
    } catch (e: any) {
      dataProvisionReport.dataMessages.loading.isLoading = false
      if (e.statusCode !== 200) {
        console.log('error->', e.statusCode)
      }
    } finally {
      dataProvisionReport.dataMessages.loading.isLoading = false
    }
  }
}
const updateRows = async (data: object) => {
  dataResponse.value.length = 0
  for (const propertyM in dataOptionsStore.value.dataSelect.months) {
    const dataMont = {
      monthNumber: propertyM + 1,
      month: dataOptionsStore.value.dataSelect.months[propertyM],
      oTuc: '',
      tuc: '',
      tcap: '',
      tObj: '',
      cTcap: ''
    }
    for (const propertyPS in data) {
      if (propertyPS === 'hstUsedCarsPrevisionSales' && data['hstUsedCarsPrevisionSales'].length > 0) {
        for (const propertyUP in data[propertyPS]) {
            if ((parseInt(propertyM, 10) + 1) === data[propertyPS][propertyUP].month) {
              dataMont.tuc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
              dataMont.tcap = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
            }
        }
      }
      if (propertyPS === 'hstAnualPrevision' && data['hstAnualPrevision'].length > 0) {
        for (const propertyAP in data[propertyPS]) {
          if ((parseInt(propertyM, 10) + 1)  === data[propertyPS][propertyAP].month) {
              dataMont.oTuc = data[propertyPS][propertyAP].previsionTvc ? data[propertyPS][propertyAP].previsionTvc : ''
            }
  
        }
      }
    }
    if (dataMont.oTuc !== '') {
      dataMont.tObj = (dataMont.tuc !== '' && dataMont.tuc > 0) ? ((dataMont.tuc*100)/dataMont.oTuc).toFixed(1) + '%' : ''
      dataMont.cTcap = (dataMont.tcap !== '' && dataMont.tcap  > 0) ? ((dataMont.tcap*100)/dataMont.tuc).toFixed(1) + '%' : ''
    } else if (dataMont.oTuc === '') {
      dataMont.oTuc = ''
      dataMont.tuc = ''
      dataMont.tcap = ''
      dataMont.tObj = ''
      dataMont.cTcap = ''
    }
    Array.prototype.push.call(dataResponse.value, dataMont)
  }
}
</script>
<template>
  <div class="text-h6 brand-secondary" style="color: var(--brand-secondary)">
    {{ dataProvisionReport.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="
      border: 2px;
      border-style: solid;
      border-color: var(--brand-secondary);
    ">
    <span class="text-h7" style="padding-left: 5px; color: var(--brand-secondary)">
      {{ dataProvisionReport.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color: var(--brand-secondary)">
        <div class="col-6">{{ dataProvisionReport.titles.dealer }}</div>
        <div class="col-6">{{ dataProvisionReport.titles.year }}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <q-select style="width: 250px" outlined v-model="dataProvisionReport.dataSelectProvisionReport.dealer"
            :options="dataOptionsStore.dealers" :label="dataProvisionReport.titles.labelDealer"
            @update:model-value="ListPrevisionSales" />
        </div>
        <div class="col-3">
          <q-select style="width: 200px" outlined v-model="dataProvisionReport.dataSelectProvisionReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataProvisionReport.titles.labelYear"
            @update:model-value="ListPrevisionSales" />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card>
        <q-card-section>
          <p v-if="dataProvisionReport.dataSelectProvisionReport.dealer === ''"
            style="margin: 100px 0px !important; text-align: center; font-weight: bold;">
            {{ dataProvisionReport.titles.titleInitialTable }}
          </p>
          <q-table v-if="dataProvisionReport.dataSelectProvisionReport.dealer !== ''" flat :rows="dataResponse"
            :columns="columnsInitial" :rows-per-page-options="[0]" :pagination=dataProvisionReport.table.pagination
            :separator="dataProvisionReport.table.separator" :no-data-label="dataProvisionReport.table.noData" bordered>
            <template v-slot:header="props">
              <q-tr
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                <q-th colspan="2" v-for="header in dataProvisionReport.headerTable"
                  style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;"
                  :key="header">
                  {{ header }}
                </q-th>
              </q-tr>
              <q-th v-for="col in props.cols" :key="col.name" :props="props" style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                {{ col.label }}
              </q-th>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-if="dataProvisionReport.dataMessages.loading.isLoading">
    <messages :loading="dataProvisionReport.dataMessages.loading"> </messages>
  </div>
</template>
