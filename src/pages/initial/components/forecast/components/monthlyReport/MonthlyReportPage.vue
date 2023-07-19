<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs( dataOptions );
const dataProvisionReport = reactive({
  titles: {
    initial: 'Relatório Mensal de Previsões de Vendas de Usados',
    search: 'Pesquisa de previsão vendas',
    year: 'Ano',
    month: 'Mês',
    labelYear: 'Select Ano',
    labelMonth: 'Select Month'
  },
  dataSelectProvisionReport: {
      year: '',
      month: ''
  }
});
const columnsInitial = [
  { name: 'calories', align: 'center', label: 'CONCESSÕES', field: 'calories' },
  { name: 'fat', label: 'OBJETIVO TUC', field: 'fat' },
  { name: 'carbs', label: 'TUC', field: 'carbs' },
  { name: 'protein', label: 'COMPRAS TCAP', field: 'protein' },
  { name: 'sodium', label: 'TUC/OBJETIVO', field: 'sodium' },
  { name: 'sodium', label: 'COMPRAS TCAP/TUC', field: 'sodium' },
];
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
                <div class="col-6">{{ dataProvisionReport.titles.year }}</div>
                <div class="col-6">{{ dataProvisionReport.titles.month }}</div>
            </div>
            <div class="row">
                <div class="col-6">
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
    
  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
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
</template>