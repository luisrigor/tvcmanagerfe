<script setup lang="ts">
import { reactive } from 'vue';

import RightSide from 'src/pages/initial/RightSide.vue'
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
  tabLeftInitial: 'op1',
});
</script>
<template>
  <q-card>
    <div>
      <q-splitter v-model="dataInitialPage.splitterModel"  disable  >
        <template v-slot:before >
          <q-tabs
            v-model="dataInitialPage.tabLeftInitial"
            vertical
            class="text-red"
            
          >
          <q-tab v-for="option in (props.initialOptionSelected == 'previsao' ? dataInitialPage.optionSideForecast :dataInitialPage.optionSideReporting )" :key="option.name"
              :name="option.name"
              :label="option.title"
            ></q-tab>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="dataInitialPage.tabLeftInitial"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel :name="dataInitialPage.tabLeftInitial">
              <right-side
                :leftOption="dataInitialPage.tabLeftInitial"
              ></right-side>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-card>
</template>
