<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

import Messages from '../../../../../modalMessages/MessagesPage.vue'
import MonthlyReportApi from './MonthlyReportApi';
import { FileUtils } from '../../../../../../shared/utils/FileUtils';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs( dataOptions );
const dataMonthlyReport = reactive({
  titles: {
    initial: 'Relatório Mensal de Previsões de Vendas de Usados',
    search: 'Pesquisa de previsão vendas',
    year: 'Ano',
    month: 'Mês',
    labelYear: 'Select Ano',
    labelMonth: 'Select Month',
    buttonExport: 'Exportar relatório'
  },
  dataSelectMonthlyReport: {
      year: '',
      month: ''
  },
  dataMessages: {
    loading: { isLoading: false }
  },
  dataSendExcel: {
    data: {
      isOnlyYear: false,
      month: 0,
      oidDealer: '',
      year: 0
    }
  },
});
const columnsInitial = [
  { name: 'calories', align: 'center', label: 'CONCESSÕES', field: 'calories' },
  { name: 'fat', label: 'OBJETIVO TUC', field: 'fat' },
  { name: 'carbs', label: 'TUC', field: 'carbs' },
  { name: 'protein', label: 'COMPRAS TCAP', field: 'protein' },
  { name: 'sodium', label: 'TUC/OBJETIVO', field: 'sodium' },
  { name: 'sodium', label: 'COMPRAS TCAP/TUC', field: 'sodium' },
];
dataMonthlyReport.dataSelectMonthlyReport.year = dataOptionsStore.value.yearActual
dataMonthlyReport.dataSelectMonthlyReport.month = dataOptionsStore.value.monthActual
const downloadExcelComponent = async () => {
  dataMonthlyReport.dataSendExcel.data.year = parseInt(dataMonthlyReport.dataSelectMonthlyReport.year, 10)
  dataMonthlyReport.dataSendExcel.data.month = dataOptionsStore.value.dataSelect.months.indexOf(dataMonthlyReport.dataSelectMonthlyReport.month) + 1
  const indicatorsTemp = localStorage.getItem('indicators')
  const indicatorsTempOne = indicatorsTemp.split(',')
  dataMonthlyReport.dataSendExcel.data.oidDealer = indicatorsTempOne[1]
  dataMonthlyReport.dataMessages.loading.isLoading = true
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
    dataMonthlyReport.dataMessages.loading.isLoading = false
  }
  dataMonthlyReport.dataMessages.loading.isLoading = false
}
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
        <div class="bg-white q-pa-md example-row-column-width" >
            <div class="row text-h7" style="color:var(--brand-secondary)">
                <div class="col-6">{{ dataMonthlyReport.titles.year }}</div>
                <div class="col-6">{{ dataMonthlyReport.titles.month }}</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-select style="width: 200px;" outlined v-model="dataMonthlyReport.dataSelectMonthlyReport.year"
                        :options="dataOptionsStore.dataSelect.years" :label="dataMonthlyReport.titles.labelYear" />
                </div>
                <div class="col-3">
                    <q-select style="width: 200px;" outlined v-model="dataMonthlyReport.dataSelectMonthlyReport.month"
                        :options="dataOptionsStore.dataSelect.months" :label="dataMonthlyReport.titles.labelMonth"/>
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
            <q-btn push :label="dataMonthlyReport.titles.buttonExport" icon="timeline" style="width: 200px;" color="green-5"
              flat square @click="downloadExcelComponent()" />
          </div>
          <br>
          <q-table
            flat
            :rows="rows"
            :columns="columnsInitial"
            row-key="name"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-if="dataMonthlyReport.dataMessages.loading.isLoading">
    <messages :loading="dataMonthlyReport.dataMessages.loading"> </messages>
  </div>
</template>