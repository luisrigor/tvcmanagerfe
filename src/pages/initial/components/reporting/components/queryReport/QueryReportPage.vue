<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';
import QueryReportApi from './QueryReportApi';
import Messages from '../../../../../modalMessages/MessagesPage.vue'
const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataQueryReport = reactive({
  titles: {
    initial: 'Consulta de relatórios',
    search: 'Pesquisa de relatórios',
    dealer: 'Concessões',
    year: 'Ano',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano',
    titleInitialTable: 'Não existem dados para os critérios de pesquisa indicados.'
  }, dataSelectQueryReport: {
    dealer: '',
    year: '',
  },
  dataSendFilesList: {
    oidDealer: '',
    year: '',
    uploadDir: 'C:'
  },
  dataMessages: {
    loading: false
  },
  responseFilesList: null,
  roles: '',
  stateTable: true
});
dataQueryReport.roles = localStorage.getItem('roles')
dataQueryReport.dataSelectQueryReport.year = dataOptionsStore.value.yearActual
const ListQueryReport = async () => {
  const indicatorsTemp = localStorage.getItem('indicators')
  const indicatorsTempOne = indicatorsTemp?.split(',')
  dataQueryReport.dataSendFilesList.year = dataQueryReport.dataSelectQueryReport.year
  if (dataQueryReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    dataQueryReport.dataSendFilesList.oidDealer = dataQueryReport.dataSelectQueryReport.dealer.value
  } else if (!dataQueryReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    dataQueryReport.dataSendFilesList.oidDealer = indicatorsTempOne[0]
  }
  try {
    dataQueryReport.dataMessages.loading = true
    dataQueryReport.responseFilesList = await QueryReportApi.tvcFilesList(dataQueryReport.dataSendFilesList)
    if (dataQueryReport.responseFilesList?.vecFilesList.length > 0) {
      dataQueryReport.stateTable = false
    } else {
      dataQueryReport.stateTable = true
    }
  } catch (e: any) {
    if (e.statusCode !== 200) {
      console.log('error->', e.statusCode)
      dataQueryReport.dataMessages.loading = false
    }
    dataQueryReport.dataMessages.loading = false
  } finally {
    dataQueryReport.dataMessages.loading = false
  }
}
onMounted(() => {
  ListQueryReport()
})
</script>
<template>
  <div class="text-h6 brand-secondary" style="color:var(--brand-secondary)">
    {{ dataQueryReport.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
    <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
      {{ dataQueryReport.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color:var(--brand-secondary)">
        <div class="col-6" v-if="dataQueryReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">{{
          dataQueryReport.titles.dealer }}</div>
        <div class="col-6">{{ dataQueryReport.titles.year }}</div>
      </div>
      <div class="row">
        <div class="col-6" v-if="dataQueryReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">
          <q-select style="width: 250px;" outlined v-model="dataQueryReport.dataSelectQueryReport.dealer"
            :options="dataOptionsStore.dealers" :label="dataQueryReport.titles.labelDealer"
            @update:model-value="ListQueryReport" />

        </div>
        <div class="col-3">
          <q-select style="width: 200px;" outlined v-model="dataQueryReport.dataSelectQueryReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataQueryReport.titles.labelYear"
            @update:model-value="ListQueryReport" />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card>
        <q-card-section>
          <p v-if="dataQueryReport.stateTable"
            style="margin: 100px 0px !important; text-align: center; font-weight: bold;">
            {{ dataQueryReport.titles.titleInitialTable }}
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <messages :loading="dataQueryReport.dataMessages.loading"> </messages>
</template>