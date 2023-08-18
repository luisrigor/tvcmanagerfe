<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

import Messages from '../../../../../modalMessages/MessagesPage.vue'
import AnnualReportApi from './AnnualReportApi';
import { FileUtils } from '../../../../../../shared/utils/FileUtils';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataAnualReport = reactive({
  titles: {
    initial: 'Relatório de Previsões de Vendas Anual',
    search: 'Pesquisa de previsão vendas anual',
    year: 'Ano',
    labelYear: 'Select Ano',
    buttonExport: 'Exportar relatório',
    total: 'TOTAL'
  },
  dataSelectAnualReport: {
    year: '',
    month: ''
  },
  dataMessages: {
    loading: false
  },
  dataSendPrevisionSales: {
    year: '',
    month: 0
  },
  headerTable: ['Rede TUC', 'Previsão |', 'Cumprimento %'],
  table: {
    pagination: { rowsPerPage: 0 },
    noData: '',
    separator: 'cell'
  },
  responsePrevisionSales: null,
  dataSendExcel: {
    data: {
      isOnlyYear: true,
      month: 0,
      oidDealer: '',
      year: 0
    }
  },
  listTotal: []
});
const dataResponse = ref([])
dataAnualReport.dataSelectAnualReport.year = dataOptionsStore.value.yearActual;
dataAnualReport.dataSelectAnualReport.month = dataOptionsStore.value.monthActual;
const columnsInitial = [
  { name: 'dealer', align: 'center', label: 'CONCESSÕES', field: 'dealer' },
  { name: 'oTuc', label: 'OBJETIVO TUC', field: 'oTuc' },
  { name: 'tuc', label: 'TUC', field: 'tuc' },
  { name: 'tcap', label: 'COMPRAS TCAP', field: 'tcap' },
  { name: 'tObj', label: 'TUC/OBJETIVO', field: 'tObj' },
  { name: 'cTcap', label: 'COMPRAS TCAP/TUC', field: 'cTcap' }
];
const ListAnnualReport = async () => {
  const headerTableTemp = dataAnualReport.headerTable[1].split(' ')
  dataAnualReport.headerTable[1] = headerTableTemp[0] + ' ' + dataAnualReport.dataSelectAnualReport.year
  try {
    dataAnualReport.dataMessages.loading = true
    dataAnualReport.dataSendPrevisionSales.year = dataAnualReport.dataSelectAnualReport.year
    dataAnualReport.dataSendPrevisionSales.month = dataOptionsStore.value.dataSelect.months.indexOf(dataAnualReport.dataSelectAnualReport.month) + 1
    dataAnualReport.responsePrevisionSales = await AnnualReportApi.tvcPrevisionSales(dataAnualReport.dataSendPrevisionSales)
    await updateRows(dataAnualReport.responsePrevisionSales)
    dataAnualReport.dataMessages.loading = false
  } catch (e: any) {
    dataAnualReport.dataMessages.loading = false
    if (e.statusCode !== 200) {
      console.log('error->', e.statusCode)
    }
  } finally {
    dataAnualReport.dataMessages.loading = false
  }
}
const updateRows = async (data: object) => {
  dataResponse.value.length = 0
  for (const propertyVC in data['vecDealers']) {
    const dataMont = {
      numDealer: '',
      dealer: '',
      oTuc: '',
      tuc: '',
      tcap: '',
      tObj: '',
      cTcap: ''
    }
    dataMont.numDealer = data['vecDealers'][propertyVC].ivOid_Parent
    dataMont.dealer = data['vecDealers'][propertyVC].ivDesig
    if (data['hstUsedCarsPrevisionSales'].length > 0) {
      for (const propertyUP in data['hstUsedCarsPrevisionSales']) {

        if (dataMont.numDealer === data['hstUsedCarsPrevisionSales'][propertyUP].oidDealer) {
          dataMont.tuc = data['hstUsedCarsPrevisionSales'][propertyUP].previsionTvc !== 0 ? data['hstUsedCarsPrevisionSales'][propertyUP].previsionTvc : ''
          dataMont.tcap = data['hstUsedCarsPrevisionSales'][propertyUP].previsionSn !== 0 ? data['hstUsedCarsPrevisionSales'][propertyUP].previsionSn : ''
        }
      }
    }
    if (data['hstAnualPrevision'].length > 0) {
      for (const propertyAP in data['hstAnualPrevision']) {
        if (dataMont.numDealer === data['hstAnualPrevision'][propertyAP].oidDealer) {
          dataMont.oTuc = data['hstAnualPrevision'][propertyAP].previsionTvc ? data['hstAnualPrevision'][propertyAP].previsionTvc : ''
        }

      }
    }
    if (dataMont.oTuc !== '') {
      dataMont.tObj = (dataMont.tuc !== '' && dataMont.tuc > 0) ? ((dataMont.tuc * 100) / dataMont.oTuc).toFixed(2) + '%' : ''
      dataMont.cTcap = (dataMont.tcap !== '' && dataMont.tcap > 0) ? ((dataMont.tcap * 100) / dataMont.tuc).toFixed(2) + '%' : ''
    }
    Array.prototype.push.call(dataResponse.value, dataMont)
  }
  await listTotal()
}
const listTotal = async () => {
  dataAnualReport.listTotal.length = 0
  const dataTempTotal = {
    oTuc: 0,
    tuc: 0,
    tcap: 0,
    tObj: '',
    cTcap: ''
  }
  for (const propertyDR in dataResponse.value) {
    dataTempTotal.oTuc = dataResponse.value[propertyDR].oTuc !== '' ? dataTempTotal.oTuc + parseInt(dataResponse.value[propertyDR].oTuc, 10) : dataTempTotal.oTuc
    dataTempTotal.tuc = dataResponse.value[propertyDR].tuc !== '' ? dataTempTotal.tuc + parseInt(dataResponse.value[propertyDR].tuc, 10) : dataTempTotal.tuc
    dataTempTotal.tcap = dataResponse.value[propertyDR].tcap !== '' ? dataTempTotal.tcap + parseInt(dataResponse.value[propertyDR].tcap, 10) : dataTempTotal.tcap
  }
  dataTempTotal.cTcap = dataTempTotal.tcap !== 0 ? ((dataTempTotal.tcap * 100) / dataTempTotal.tuc).toFixed(2) + '%' : ''
  dataTempTotal.tObj = dataTempTotal.tuc !== 0 ? ((dataTempTotal.tuc * 100) / dataTempTotal.oTuc).toFixed(2) + '%' : ''
  for (const propertyDT in dataTempTotal) {
    Array.prototype.push.call(dataAnualReport.listTotal, dataTempTotal[propertyDT])
  }
}
const downloadExcelComponent = async () => {
  dataAnualReport.dataSendExcel.data.year = parseInt(dataAnualReport.dataSelectAnualReport.year, 10)
  const indicatorsTemp = localStorage.getItem('indicators')
  const indicatorsTempOne = indicatorsTemp.split(',')
  dataAnualReport.dataSendExcel.data.oidDealer = indicatorsTempOne[1]
  dataAnualReport.dataMessages.loading = true
  try {
    const res = await AnnualReportApi.downloadExcel(dataAnualReport.dataSendExcel.data)
    const blob = new Blob([res], { type: 'application/octet-stream' })
    const fileRename = `Previsao_vendas_TUC_${dataAnualReport.dataSelectAnualReport.year}.xls`
    FileUtils.open({
      file: blob,
      fileName: fileRename
    })

  } catch (e) {
    console.log('error', e)
  } finally {
    dataAnualReport.dataMessages.loading = false
  }
  dataAnualReport.dataMessages.loading = false
}
onMounted(() => {
  ListAnnualReport()
})
</script>
<template>
  <div class="text-h6 brand-secondary" style="color: var(--brand-secondary)">
    {{ dataAnualReport.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="
      border: 2px;
      border-style: solid;
      border-color: var(--brand-secondary);
    ">
    <span class="text-h7" style="padding-left: 5px; color: var(--brand-secondary)">
      {{ dataAnualReport.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color: var(--brand-secondary)">
        <div class="col-6">{{ dataAnualReport.titles.year }}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <q-select style="width: 200px" outlined v-model="dataAnualReport.dataSelectAnualReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataAnualReport.titles.labelYear"
            @update:model-value="ListAnnualReport" />
        </div>
      </div>
    </div>
  </div>

  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <div class="q-gutter-md row" align="right">
            <q-space />
            <q-btn push :label="dataAnualReport.titles.buttonExport" icon="timeline" style="width: 200px;" color="green-5"
              flat square @click="downloadExcelComponent()" />
          </div>
          <br>
          <q-table flat :rows="dataResponse" :columns="columnsInitial" :rows-per-page-options="[0]"
            :pagination=dataAnualReport.table.pagination :separator="dataAnualReport.table.separator"
            :no-data-label="dataAnualReport.table.noData" bordered>
            <template v-slot:header="props">
              <q-tr
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                <q-th colspan="2" v-for="header in dataAnualReport.headerTable"
                  style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;"
                  :key="header">
                  {{ header }}
                </q-th>
              </q-tr>
              <q-th v-for="col in props.cols" :key="col.name" :props="props"
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                {{ col.label }}
              </q-th>
            </template>
            <template v-slot:bottom-row>
              <q-tr style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate; background-color: var(--brand-primary);
  color: var(--brand-secondary);">
                <q-td align="center">
                  {{ dataAnualReport.titles.total }}
                </q-td>
                <q-td v-for="col in dataAnualReport.listTotal" :key="col" align="center">
                  {{ col }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <messages :loading="dataAnualReport.dataMessages.loading"> </messages>
</template>
