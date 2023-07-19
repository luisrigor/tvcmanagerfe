<script setup lang="ts">
import { reactive } from 'vue';

import ProvisionReport from 'src/pages/initial/components/forecast/components/provisionReport/ProvisionReportPage.vue';
import MonthlyReport from 'src/pages/initial/components/forecast/components/monthlyReport/MonthlyReportPage.vue';
import AnnualReport from 'src/pages/initial/components/forecast/components/annualReport/AnnualReportPage.vue';

import MonthlyReports from 'src/pages/initial/components/reporting/components/monthlyReports/MonthlyReportsPage.vue';
import QueryReport from 'src/pages/initial/components/reporting/components/queryReport/QueryReportPage.vue';

interface Props {
  leftOption: string;
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
});
</script>
<template>
  <q-card>
    <q-card-section>
      <div v-if="props.leftOption == 'dealer'">
        <provision-report ></provision-report>
      </div>
      <div v-if="props.leftOption == 'monthly'">
        <monthly-report ></monthly-report>
      </div>
      <div v-if="props.leftOption == 'annual'">
        <annual-report ></annual-report>
      </div>
      <div v-if="props.leftOption == 'reporting'">
        <monthly-reports ></monthly-reports>
      </div>
      <div v-if="props.leftOption == 'reports'">
        <query-report ></query-report>
      </div>
    </q-card-section>
  </q-card>
</template>
