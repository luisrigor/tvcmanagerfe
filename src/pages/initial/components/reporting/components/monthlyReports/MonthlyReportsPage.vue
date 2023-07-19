<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs( dataOptions );
const dataProvisionReport = reactive({
  titles: {
    initial: 'Informação para Reporting Mensal de Usados',
    search: 'Pesquisa',
    dealer: 'Concessões',
    year: 'Ano',
    month: 'Mês',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano',
    labelMonth: 'Select Month'
  },
  dataSelectProvisionReport: {
    dealer:'',
    year: '',
    month: ''
  }
});
dataProvisionReport.dataSelectProvisionReport.year = dataOptionsStore.value.yearActual
dataProvisionReport.dataSelectProvisionReport.month = dataOptionsStore.value.monthActual
</script>
<template>
  <div class="text-h6 brand-secondary" style="color:var(--brand-secondary)">
        {{ dataProvisionReport.titles.initial }}
      </div>
      <q-separator class="background-Secondary"></q-separator>
      <div>&nbsp;</div>
    <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
        <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
            {{ dataProvisionReport.titles.search }}
        </span>
        <div class="bg-white q-pa-md example-row-column-width" >
            <div class="row text-h7" style="color:var(--brand-secondary)">
                <div class="col-3">{{ dataProvisionReport.titles.dealer }}</div>
                <div class="col-3">{{ dataProvisionReport.titles.year }}</div>
                <div class="col-3">{{ dataProvisionReport.titles.month }}</div>
            </div>
            <div class="row">
                <div class="col-3">
                    <q-select style="width: 250px;" outlined v-model="dataProvisionReport.dataSelectProvisionReport.dealer"
                    :label="dataProvisionReport.titles.labelDealer"  />
                </div>
                <div class="col-3">
                    <q-select style="width: 200px;" outlined v-model="dataProvisionReport.dataSelectProvisionReport.year"
                        :options="dataOptionsStore.dataSelect.years" :label="dataProvisionReport.titles.labelYear" />
                </div>
                <div class="col-3">
                    <q-select style="width: 200px;" outlined v-model="dataProvisionReport.dataSelectProvisionReport.month"
                        :options="dataOptionsStore.dataSelect.months" :label="dataProvisionReport.titles.labelMonth"/>
                </div>
            </div>
        </div>
    </div>
</template>