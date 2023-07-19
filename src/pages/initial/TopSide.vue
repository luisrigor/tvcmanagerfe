<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import LowerSide from 'src/pages/initial/LowerSide.vue';

import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../shared/store/modules/data-options';

interface Props {
  initialOptionSelected: string;
}
const props = defineProps<Props>();

const dataOptions = useDataOptions();
const { dataOptionsStore, userAsing } = storeToRefs( dataOptions );
const { asingListDealer, generateDataSelect } = dataOptions;

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
    },
  },
  optionSideReporting: {
    reporting: {
      title: 'Informação para Reporting Mensal de Usados',
      name: 'reporting',
    },
    reports: {
      title: 'Consulta de relatórios',
      name: 'reports',
    },
  },
  splitterModel: 28,
  tabLeftInitial: 'op1',
});
</script>
<template>
  <q-card>
    <q-card-section>
      <div>
        <!-- el valor de dataOptionsStore en store es ->{{ dataOptionsStore.dataSelect }}
        el valor de userAsing en store es ->{{ userAsing }} -->
          <q-tabs v-model="dataInitialPage.tabLeftInitial" align="left" class="bg-white shadow-2">
            <q-tab
              v-for="option in props.initialOptionSelected == 'previsao'
                ? dataInitialPage.optionSideForecast
                : dataInitialPage.optionSideReporting"
              :key="option.name"
              :name="option.name"
              :label="option.title"
            ></q-tab>
          </q-tabs>
          <q-tab-panels class="q-ma-xs" v-model="dataInitialPage.tabLeftInitial" >
            <q-tab-panel :name="dataInitialPage.tabLeftInitial">
              <lower-side
                :leftOption="dataInitialPage.tabLeftInitial"
              ></lower-side>
            </q-tab-panel>
          </q-tab-panels>
      </div>
    </q-card-section>
  </q-card>
</template>
