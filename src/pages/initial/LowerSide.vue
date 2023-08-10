<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import Messages from '../modalMessages/MessagesPage.vue'
import ProvisionReport from 'src/pages/initial/components/forecast/components/provisionReport/ProvisionReportPage.vue';
import MonthlyReport from 'src/pages/initial/components/forecast/components/monthlyReport/MonthlyReportPage.vue';
import AnnualReport from 'src/pages/initial/components/forecast/components/annualReport/AnnualReportPage.vue';

import MonthlyReports from 'src/pages/initial/components/reporting/components/monthlyReports/MonthlyReportsPage.vue';
import QueryReport from 'src/pages/initial/components/reporting/components/queryReport/QueryReportPage.vue';

import LowerSideApi from './LowerSideApi';

import { storeToRefs } from 'pinia'
import { useDataOptions } from '../../shared/store/modules/data-options'

const dataOptions = useDataOptions()
const { dataOptionsStore } = storeToRefs(dataOptions)
interface Props {
  initialOptionSelected: string;
}
const props = defineProps<Props>();
const dataInitialPage = reactive({
  optionSideForecast: {
    dealer: {
      title: 'Relatório de previsão \nconcessionário',
      name: 'dealer',
    },
    monthly: {
      title: 'Relatório da previsão mensal',
      name: 'monthly',
    },
    annual: {
      title: 'Relatório da previsão anual',
      name: 'annual',
    }
  },
  optionSideReporting: {
    reporting: {
      title: 'Informação para Reporting Mensal de Usados',
      name: 'reporting',
    },
    reports: {
      title: 'Consulta de relatórios',
      name: 'reports',
    }
  },
  splitterModel: 28,
  tabInitial: 'op1',
  dataMessages: {
    loading: { isLoading: false }
  },
});
const listDealer = async () => {
  try {
    dataInitialPage.dataMessages.loading.isLoading = true
    const indicatorsTemp = localStorage.getItem('indicators')
    const indicatorsTempOne = indicatorsTemp.split(',')
    const responseDealers = await LowerSideApi.tvcDealers(indicatorsTempOne[0])
    for (const propertyD in responseDealers) {
      const dataDealerTemp = {
        label: responseDealers[propertyD].ivDesig,
        value: responseDealers[propertyD].ivOid_Parent
      }
      Array.prototype.push.call(dataOptionsStore.value.dealers, dataDealerTemp)
    }
    dataInitialPage.dataMessages.loading.isLoading = false
  } catch (e: any) {
    dataInitialPage.dataMessages.loading.isLoading = false
    if (e.statusCode !== 200) {
      console.log('error', e.statusCode)
    }
  } finally {
    dataInitialPage.dataMessages.loading.isLoading = false
  }
}
onMounted(() => {
  listDealer()
})
</script>
<template>
  <q-card>
    <q-card-section>
      <div v-if="props.initialOptionSelected == 'dealer'">
        <provision-report ></provision-report>
      </div>
      <div v-if="props.initialOptionSelected == 'monthly'">
        <monthly-report ></monthly-report>
      </div>
      <div v-if="props.initialOptionSelected == 'annual'">
        <annual-report ></annual-report>
      </div>
      <div v-if="props.initialOptionSelected == 'reporting'">
        <monthly-reports ></monthly-reports>
      </div>
      <div v-if="props.initialOptionSelected == 'reports'">
        <query-report ></query-report>
      </div>
    </q-card-section>
  </q-card>
  <div v-if="dataInitialPage.dataMessages.loading.isLoading">
    <messages :loading="dataInitialPage.dataMessages.loading"> </messages>
  </div>
</template>
