<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import Messages from '../modalMessages/MessagesPage.vue'
import LowerSide from 'src/pages/initial/LowerSide.vue';
import TopSideApi from './TopSideApi';

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
  dataMessages: {
    loading: { isLoading: false }
  },
});
const listDealer = async () => {
  try {
    dataInitialPage.dataMessages.loading.isLoading = true
    const indicatorsTemp = localStorage.getItem('indicators')
    const indicatorsTempOne = indicatorsTemp.split(',')
    const responseDealers = await TopSideApi.tvcDealers(indicatorsTempOne[0])
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
      <div>
        <q-tabs v-model="dataInitialPage.tabLeftInitial" align="left" class="bg-white shadow-2">
          <q-tab v-for="option in props.initialOptionSelected == 'previsao'
            ? dataInitialPage.optionSideForecast
            : dataInitialPage.optionSideReporting" :key="option.name" :name="option.name"
            :label="option.title"></q-tab>
        </q-tabs>
        <q-tab-panels class="q-ma-xs" v-model="dataInitialPage.tabLeftInitial">
          <q-tab-panel :name="dataInitialPage.tabLeftInitial">
            <lower-side :leftOption="dataInitialPage.tabLeftInitial"></lower-side>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card-section>
  </q-card>
  <div v-if="dataInitialPage.dataMessages.loading.isLoading">
    <messages :loading="dataInitialPage.dataMessages.loading"> </messages>
  </div>
</template>
