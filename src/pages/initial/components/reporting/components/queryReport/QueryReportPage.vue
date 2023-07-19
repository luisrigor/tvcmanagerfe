<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs( dataOptions );
const dataProvisionReport = reactive({
  titles: {
    initial: 'Consulta de relatórios',
    search: 'Pesquisa de relatórios',
    dealer: 'Concessões',
    year: 'Ano',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano'
  },
  dataSelectProvisionReport: {
    dealer: '',
    year: ''
  }
});
dataProvisionReport.dataSelectProvisionReport.year = dataOptionsStore.value.yearActual
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
                <div class="col-6">{{ dataProvisionReport.titles.dealer }}</div>
                <div class="col-6">{{ dataProvisionReport.titles.year }}</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-select style="width: 250px;" outlined v-model="dataProvisionReport.dataSelectProvisionReport.dealer"
                    :label="dataProvisionReport.titles.labelDealer"  />

                </div>
                <div class="col-3">
                    <q-select style="width: 200px;" outlined v-model="dataProvisionReport.dataSelectProvisionReport.year"
                        :options="dataOptionsStore.dataSelect.years" :label="dataProvisionReport.titles.labelYear" />
                </div>
                <!-- <div class="col-3">
                    <q-btn style="
                    border: 1px; border-style: solid; border-color:var(--brand-secondary);
                    font-size: 12px;
                    padding-left: 18px;
                    padding-right: 8px;
                    padding-top: 5px;
                  " @click="downloadExcel(1)" label="Pesquisar"><img :src="iconSearch" style="
                      transform: translateY(-55%);
                      position: absolute;
                      left: 1px;
                      top: 50%;
                    " />
                    </q-btn>
                </div> -->
            </div>
        </div>
    </div>
</template>