<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

import Messages from '../../../../../modalMessages/MessagesPage.vue'
import MonthlyReportApi from './MonthlyReportApi';
import { FileUtils } from '../../../../../../shared/utils/FileUtils';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataMonthlyReport = reactive({
  titles: {
    initial: 'Relatório Mensal de Previsões de Vendas de Usados',
    search: 'Pesquisa de previsão vendas',
    year: 'Ano',
    month: 'Mês',
    labelYear: 'Select Ano',
    labelMonth: 'Select Month',
    buttonExport: 'Exportar relatório',
    openMonth: 'Abrir Mês',
    total: 'TOTAL'
  },
  dataSelectMonthlyReport: {
    year: '',
    month: ''
  },
  dataSendMonthlyReport: {
    year: '',
    month: 0
  },
  headerTable: ['Rede TUC', 'Previsão |', 'Cumprimento %'],
  dataMessages: {
    loading: false,
    confirmationData: {
      state: false,
      dataModalAction: {
        title: '',
        icon: '',
        colorIcon: '',
        action: ''
      }
    },
    confirmationModal: {
      state: false,
      dataModalAction: {
        title: '',
        data: '',
        icon: '',
        colorIcon: ''
      }
    }
  },
  table: {
    pagination: { rowsPerPage: 0 },
    noData: '',
    separator: 'cell'
  },
  dataSendExcel: {
    data: {
      isOnlyYear: false,
      month: 0,
      oidDealer: '',
      year: 0
    }
  },
  listTotal: [],
  status: '',
  selectedInitial: []
});
const columnsInitial = [
  { name: 'dealer', align: 'center', label: 'CONCESSÕES', field: 'dealer' },
  { name: 'oTuc', label: 'OBJETIVO TUC', field: 'oTuc' },
  { name: 'tuc', label: 'TUC', field: 'tuc' },
  { name: 'tcap', label: 'COMPRAS TCAP', field: 'tcap' },
  { name: 'tObj', label: 'TUC/OBJETIVO', field: 'tObj' },
  { name: 'cTcap', label: 'COMPRAS TCAP/TUC', field: 'cTcap' }
];
dataMonthlyReport.dataSelectMonthlyReport.year = dataOptionsStore.value.yearActual
dataMonthlyReport.dataSelectMonthlyReport.month = dataOptionsStore.value.monthActual
const dataResponse = ref([])
const ListAnnualReport = async () => {
  dataMonthlyReport.status = ''
  const headerTableTemp = dataMonthlyReport.headerTable[1].split(' ')
  dataMonthlyReport.headerTable[1] = headerTableTemp[0] + ' ' + dataMonthlyReport.dataSelectMonthlyReport.year
  try {
    dataMonthlyReport.dataMessages.loading = true
    dataMonthlyReport.dataSendMonthlyReport.year = dataMonthlyReport.dataSelectMonthlyReport.year
    dataMonthlyReport.dataSendMonthlyReport.month = dataOptionsStore.value.dataSelect.months.indexOf(dataMonthlyReport.dataSelectMonthlyReport.month) + 1
    dataMonthlyReport.responsePrevisionSales = await MonthlyReportApi.tvcPrevisionSales(dataMonthlyReport.dataSendMonthlyReport)
    await updateRows(dataMonthlyReport.responsePrevisionSales)
    dataMonthlyReport.dataMessages.loading = false
  } catch (e: any) {
    dataMonthlyReport.dataMessages.loading = false
    if (e.statusCode !== 200) {
      console.log('error->', e.statusCode)
    }
  } finally {
    dataMonthlyReport.dataMessages.loading = false
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
      cTcap: '',
      id: 0
    }
    dataMont.numDealer = data['vecDealers'][propertyVC].ivOid_Parent
    dataMont.dealer = data['vecDealers'][propertyVC].ivDesig
    if (data['hstUsedCarsPrevisionSales'].length > 0) {
      for (const propertyUP in data['hstUsedCarsPrevisionSales']) {

        if (dataMont.numDealer === data['hstUsedCarsPrevisionSales'][propertyUP].oidDealer && data['hstUsedCarsPrevisionSales'][propertyUP].status === "Fechado") {
          dataMonthlyReport.status = data['hstUsedCarsPrevisionSales'][propertyUP].status
          dataMont.id = data['hstUsedCarsPrevisionSales'][propertyUP].id
          dataMont.tuc = data['hstUsedCarsPrevisionSales'][propertyUP].previsionTvc !== 0 ? data['hstUsedCarsPrevisionSales'][propertyUP].previsionTvc : ''
          dataMont.tcap = data['hstUsedCarsPrevisionSales'][propertyUP].previsionSn !== 0 ? data['hstUsedCarsPrevisionSales'][propertyUP].previsionSn : ''
          const obsjectAction = {
            name: 'action',
            align: 'center',
            field: ''
          }
          const headerTableAdd = 'Abrir Mês'
          Array.prototype.push.call(columnsInitial, obsjectAction)
          Array.prototype.push.call(dataMonthlyReport.headerTable, headerTableAdd)
        }
      }
    }
    if (data['hstAnualPrevision'].length > 0) {
      for (const propertyAP in data['hstAnualPrevision']) {
        if (dataMont.numDealer === data['hstAnualPrevision'][propertyAP].oidDealer && data['hstAnualPrevision'][propertyAP].status === "Fechado") {
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
  dataMonthlyReport.listTotal.length = 0
  const dataTempTotal = {
    oTuc: 0,
    tuc: 0,
    tcap: 0,
    tObj: '',
    cTcap: '',
  }
  if (dataMonthlyReport.status === 'Fechado') {
    dataTempTotal['add'] = ''
  }
  for (const propertyDR in dataResponse.value) {
    dataTempTotal.oTuc = dataResponse.value[propertyDR].oTuc !== '' ? dataTempTotal.oTuc + parseInt(dataResponse.value[propertyDR].oTuc, 10) : dataTempTotal.oTuc
    dataTempTotal.tuc = dataResponse.value[propertyDR].tuc !== '' ? dataTempTotal.tuc + parseInt(dataResponse.value[propertyDR].tuc, 10) : dataTempTotal.tuc
    dataTempTotal.tcap = dataResponse.value[propertyDR].tcap !== '' ? dataTempTotal.tcap + parseInt(dataResponse.value[propertyDR].tcap, 10) : dataTempTotal.tcap
  }
  dataTempTotal.cTcap = dataTempTotal.tcap !== 0 ? ((dataTempTotal.tcap * 100) / dataTempTotal.tuc).toFixed(2) + '%' : ''
  for (const propertyDT in dataTempTotal) {
    Array.prototype.push.call(dataMonthlyReport.listTotal, dataTempTotal[propertyDT])
  }
}
const openMonthValidation = async () => {

  try {
    dataMonthlyReport.dataMessages.confirmationData.state = true
    dataMonthlyReport.dataMessages.confirmationData.dataModalAction.title = 'Confirma abertura do mês?'
    dataMonthlyReport.dataMessages.confirmationData.dataModalAction.icon = 'outbound'
    dataMonthlyReport.dataMessages.confirmationData.dataModalAction.colorIcon = 'blue'
    dataMonthlyReport.dataMessages.confirmationData.dataModalAction.action = 'send'
  } catch (e) {
    console.log('error', e)
  }
}
const openMonth = async () => {
  try {
    dataMonthlyReport.dataMessages.loading = true
    await MonthlyReportApi.tvcCloseMonth(dataMonthlyReport.selectedInitial)
    dataMonthlyReport.dataMessages.loading = false
  } catch (e: any) {
    dataMonthlyReport.dataMessages.loading = false
    if (e.statusCode !== 200) {
      console.log('error->', e.statusCode)
    }
  } finally {
    dataMonthlyReport.dataMessages.loading = false
    await ListAnnualReport()
  }
  dataMonthlyReport.dataMessages.loading = false
}
const updateStateConfirmationBudget = async (data: object) => {
  if (data.selectionSend === 'close') {
    dataMonthlyReport.dataMessages.confirmationData.state = false
  } else if (data.selectionSend === 'success') {
    dataMonthlyReport.dataMessages.confirmationModal.state = false
  } else if (data.selectionSend === 'check') {
    dataMonthlyReport.dataMessages.confirmationData.state = false
    openMonth()
  }
}
const downloadExcelComponent = async () => {
  dataMonthlyReport.dataSendExcel.data.year = parseInt(dataMonthlyReport.dataSelectMonthlyReport.year, 10)
  dataMonthlyReport.dataSendExcel.data.month = dataOptionsStore.value.dataSelect.months.indexOf(dataMonthlyReport.dataSelectMonthlyReport.month) + 1
  const indicatorsTemp = localStorage.getItem('indicators')
  const indicatorsTempOne = indicatorsTemp.split(',')
  dataMonthlyReport.dataSendExcel.data.oidDealer = indicatorsTempOne[1]
  dataMonthlyReport.dataMessages.loading = true
  try {
    const res = await MonthlyReportApi.downloadExcel(dataMonthlyReport.dataSendExcel.data)
    const blob = new Blob([res], { type: 'application/octet-stream' })
    const fileRename = `Previsao_vendas_TUC_${dataMonthlyReport.dataSelectMonthlyReport.month.substr(0, 3)}_${dataMonthlyReport.dataSelectMonthlyReport.year}.xls`
    FileUtils.open({
      file: blob,
      fileName: fileRename
    })

  } catch (e) {
    console.log('error', e)
  } finally {
    dataMonthlyReport.dataMessages.loading = false
  }
  dataMonthlyReport.dataMessages.loading = false
}
onMounted(() => {
  ListAnnualReport()
})
</script>
<template>
  <div class="text-h6 brand-secondary" style="color:var(--brand-secondary)">
    {{ dataMonthlyReport.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
    <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
      {{ dataMonthlyReport.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color:var(--brand-secondary)">
        <div class="col-6">{{ dataMonthlyReport.titles.year }}</div>
        <div class="col-6">{{ dataMonthlyReport.titles.month }}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <q-select style="width: 200px;" outlined v-model="dataMonthlyReport.dataSelectMonthlyReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataMonthlyReport.titles.labelYear"
            @update:model-value="ListAnnualReport" />
        </div>
        <div class="col-3">
          <q-select style="width: 200px;" outlined v-model="dataMonthlyReport.dataSelectMonthlyReport.month"
            :options="dataOptionsStore.dataSelect.months" :label="dataMonthlyReport.titles.labelMonth"
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
            <q-btn v-if="dataMonthlyReport.status === 'Fechado'" push :label="dataMonthlyReport.titles.openMonth"
              icon="drive_file_move" style="width: 200px;" color="red-5" flat square @click="openMonthValidation()"
              :disabled="dataMonthlyReport.selectedInitial.length === 0" />
            <q-btn push :label="dataMonthlyReport.titles.buttonExport" icon="timeline" style="width: 200px;"
              color="green-5" flat square @click="downloadExcelComponent()" />
          </div>

          <br>
          <q-table v-if="dataMonthlyReport.status === ''" flat :rows="dataResponse" :columns="columnsInitial"
            :rows-per-page-options="[0]" :pagination=dataMonthlyReport.table.pagination
            :separator="dataMonthlyReport.table.separator" :no-data-label="dataMonthlyReport.table.noData" bordered>
            <template v-slot:header="props">
              <q-tr
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                <q-th colspan="2" v-for="header in dataMonthlyReport.headerTable"
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
                  {{ dataMonthlyReport.titles.total }}
                </q-td>
                <q-td v-for="col in dataMonthlyReport.listTotal" :key="col" align="center">
                  {{ col }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-table v-if="dataMonthlyReport.status === 'Fechado'" flat :rows="dataResponse" :columns="columnsInitial"
            :rows-per-page-options="[0]" :pagination=dataMonthlyReport.table.pagination
            :separator="dataMonthlyReport.table.separator" :no-data-label="dataMonthlyReport.table.noData" bordered>
            <template v-slot:header="props">
              <q-tr
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                <q-th colspan="2" v-for="header in dataMonthlyReport.headerTable"
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
                  {{ dataMonthlyReport.titles.total }}
                </q-td>
                <q-td v-for="col in dataMonthlyReport.listTotal" :key="col" align="center">
                  {{ col }}
                </q-td>
              </q-tr>
            </template>

            <template #body-cell-action="props">
              <q-td :props="props">
                <q-checkbox v-model="dataMonthlyReport.selectedInitial" :val="props.row.id" color="teal"
                  v-if="props.row.id > 0">
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                    <strong>Não existem registos</strong>
                  </q-tooltip>
                </q-checkbox>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <messages :loading="dataMonthlyReport.dataMessages.loading"
    :confirmationData="dataMonthlyReport.dataMessages.confirmationData"
    :confirmationModal="dataMonthlyReport.dataMessages.confirmationModal"
    @update-state-confirmation="updateStateConfirmationBudget"> </messages>
</template>