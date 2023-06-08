<script setup lang="ts">
import { reactive } from 'vue';

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
    <div>
      OPTIONLEFT->{{ props.leftOption }}-
    </div>
  </q-card>
</template>
