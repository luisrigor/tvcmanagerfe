<script setup lang="ts">
import { reactive, ref, onMounted, h } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';

import diskImg from 'src/assets/images/disk.png'
import Messages from '../../../../../modalMessages/MessagesPage.vue'
import ProvisionReportApi from './ProvisionReportApi';

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataProvisionReport = reactive({
  titles: {
    initial: 'Previsões de Vendas de Usados',
    search: 'Pesquisa',
    dealer: 'Concessões',
    year: 'Ano',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano',
    titleInitialTable: 'Por favor, seleccione o concessionário e o ano que pretende consultar',
    buttons: {
      save: 'Gravar',
      saveReport: 'Gravar & Enviar para report'
    }
  },
  dataSelectProvisionReport: {
    dealer: '',
    year: '',
  },
  dataMessages: {
    loading: false
  },
  dataSendPrevisionSales: {
    year: '',
    month: 12,
    oidDealer: ''
  },
  dataSendSavePrevisionSalesDealer: {
    actualYear: 0,
    actualMonth: 0,
    oidDealer: '',
    id: 0,
    previsionSn: 0,
    previsionTvc: 0,
    status: ''
  },
  headerTable: ['TUC', 'Previsões', 'Cumprimento %'],
  table: {
    pagination: { rowsPerPage: 0 },
    noData: '',
    separator: 'cell'
  },
  responsePrevisionSales: null,
  roles: '',
  stateButtons: false,
  stateInput: '',
  percentageDealer: ''
});
dataProvisionReport.roles = localStorage.getItem('roles')
const dataResponse = ref([])
const columnsInitial = [
  { name: 'month', align: 'center', label: 'MÊS', field: 'month' },
  { name: 'oTuc', align: 'center', label: 'OBJETIVO TUC', field: 'oTuc' },
  { name: 'tuc', align: 'center', label: 'TUC', field: 'tuc' },
  { name: 'tcap', align: 'center', label: 'COMPRAS TCAP', field: 'tcap' },
  { name: 'tObj', align: 'center', label: 'TUC/OBJETIVO', field: 'tObj' },
  { name: 'cTcap', align: 'center', label: 'COMPRAS TCAP/TUC', field: 'cTcap' }
]
dataProvisionReport.dataSelectProvisionReport.year = dataOptionsStore.value.yearActual

const ListPrevisionSales = async () => {
  if (dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && dataProvisionReport.dataSelectProvisionReport.dealer !== '') {
    try {
      dataProvisionReport.dataSendPrevisionSales.year = dataProvisionReport.dataSelectProvisionReport.year
      dataProvisionReport.dataMessages.loading = true
      dataProvisionReport.dataSendPrevisionSales.oidDealer = dataProvisionReport.dataSelectProvisionReport.dealer.value
      dataProvisionReport.responsePrevisionSales = await ProvisionReportApi.tvcPrevisionSales(dataProvisionReport.dataSendPrevisionSales)
      await updateRows(dataProvisionReport.responsePrevisionSales)
      dataProvisionReport.dataMessages.loading = false
    } catch (e: any) {
      dataProvisionReport.dataMessages.loading = false
      if (e.statusCode !== 200) {
        console.log('error->', e.statusCode)
      }
    } finally {
      dataProvisionReport.dataMessages.loading = false
    }
  } else if (!dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && dataProvisionReport.dataSelectProvisionReport.year !== '') {
    try {
      const indicatorsTemp = localStorage.getItem('indicators')
      const indicatorsTempOne = indicatorsTemp.split(',')
      dataProvisionReport.dataSendPrevisionSales.oidDealer = indicatorsTempOne[0]
      dataProvisionReport.dataSendSavePrevisionSalesDealer.oidDealer = indicatorsTempOne[0]
      dataProvisionReport.dataSendPrevisionSales.year = dataProvisionReport.dataSelectProvisionReport.year
      dataProvisionReport.dataMessages.loading = true
      dataProvisionReport.responsePrevisionSales = await ProvisionReportApi.tvcPrevisionSales(dataProvisionReport.dataSendPrevisionSales)
      await updateRows(dataProvisionReport.responsePrevisionSales)
      dataProvisionReport.dataMessages.loading = false
    } catch (e: any) {
      dataProvisionReport.dataMessages.loading = false
      if (e.statusCode !== 200) {
        console.log('error->', e.statusCode)
      }
    } finally {
      dataProvisionReport.dataMessages.loading = false
    }
  }
}
const updateRows = async (data: object) => {
  dataResponse.value.length = 0
  if (dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    for (const propertyM in dataOptionsStore.value.dataSelect.months) {
      const dataMont = {
        monthNumber: parseInt(propertyM, 10) + 1,
        month: dataOptionsStore.value.dataSelect.months[propertyM],
        oTuc: '',
        tuc: '',
        tcap: '',
        tObj: '',
        cTcap: '',
        check: null
      }
      for (const propertyPS in data) {
        if (propertyPS === 'hstUsedCarsPrevisionSales' && data['hstUsedCarsPrevisionSales'].length > 0) {
          for (const propertyUP in data[propertyPS]) {
            if ((parseInt(propertyM, 10) + 1) === data[propertyPS][propertyUP].month) {
              dataMont.tuc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
              dataMont.tcap = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
            }
          }
        }
        if (propertyPS === 'hstAnualPrevision' && data['hstAnualPrevision'].length > 0) {
          for (const propertyAP in data[propertyPS]) {
            if ((parseInt(propertyM, 10) + 1) === data[propertyPS][propertyAP].month) {
              dataMont.oTuc = data[propertyPS][propertyAP].previsionTvc ? data[propertyPS][propertyAP].previsionTvc : ''
            }

          }
        }
      }
      if (dataMont.oTuc !== '') {
        dataMont.tObj = (dataMont.tuc !== '' && dataMont.tuc > 0) ? ((dataMont.tuc * 100) / dataMont.oTuc).toFixed(1) + '%' : ''
        dataMont.cTcap = (dataMont.tcap !== '' && dataMont.tcap > 0) ? ((dataMont.tcap * 100) / dataMont.tuc).toFixed(1) + '%' : ''
      } else if (dataMont.oTuc === '') {
        dataMont.oTuc = ''
        dataMont.tuc = ''
        dataMont.tcap = ''
        dataMont.tObj = ''
        dataMont.cTcap = ''
        dataMont.check = null
      }
      Array.prototype.push.call(dataResponse.value, dataMont)
    }
  } else if (!dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    for (const propertyM in dataOptionsStore.value.dataSelect.months) {
      const dataMont = {
        monthNumber: parseInt(propertyM, 10) + 1,
        month: dataOptionsStore.value.dataSelect.months[propertyM],
        oTuc: '',
        tuc: '',
        tcap: '',
        tObj: '',
        cTcap: ''
      }
      for (const propertyPS in data) {
        if (propertyPS === 'hstUsedCarsPrevisionSales' && data['hstUsedCarsPrevisionSales'].length > 0) {
          for (const propertyUP in data[propertyPS]) {
            dataProvisionReport.dataSendSavePrevisionSalesDealer.id = data[propertyPS][propertyUP].id
            dataProvisionReport.dataSendSavePrevisionSalesDealer.actualYear = parseInt(dataProvisionReport.dataSelectProvisionReport.year, 10)

            if ((parseInt(propertyM, 10) + 1) === data[propertyPS][propertyUP].month) {
              dataProvisionReport.dataSendSavePrevisionSalesDealer.actualMonth = parseInt(propertyM, 10) + 1
              if (data[propertyPS][propertyUP].status === 'Fechado') {
                dataProvisionReport.stateButtons = false
                dataProvisionReport.stateInput = 'Fechado'
                dataMont.tuc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
                dataMont.tcap = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
                dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
                dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
                
              } else if (data[propertyPS][propertyUP].status === 'Aberto') {
                dataProvisionReport.stateButtons = true
                dataProvisionReport.stateInput = 'Aberto'
                dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
                dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
                dataMont.tuc = data[propertyPS][propertyUP].previsionTvc !== 0 ? data[propertyPS][propertyUP].previsionTvc : ''
                dataMont.tcap = data[propertyPS][propertyUP].previsionSn !== 0 ? data[propertyPS][propertyUP].previsionSn : ''
              }
            }
          }
        }
      }
      if (dataMont.tuc !== '') {
        dataMont.cTcap = (dataMont.tcap !== '' && dataMont.tcap > 0) ? ((dataMont.tcap * 100) / dataMont.tuc).toFixed(1) + '%' : ''
        dataProvisionReport.percentageDealer = dataMont.cTcap
      } else if (dataMont.tuc === '') {
        dataMont.oTuc = ''
        dataMont.tuc = ''
        dataMont.tcap = ''
        dataMont.tObj = ''
        dataMont.cTcap = ''
      }
      Array.prototype.push.call(dataResponse.value, dataMont)
    }
  }
}
const saveReport = async (status: string) => {
  dataProvisionReport.dataSendSavePrevisionSalesDealer.status = status
  dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn = typeof dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn === "string" ? parseInt(dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn, 10) : dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn
  dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc = typeof dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc === "string" ? parseInt(dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc, 10) : dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc
  if (dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn > 0 && dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc > 0) {
    try {
      dataProvisionReport.dataMessages.loading = true
      await ProvisionReportApi.tvcSave(dataProvisionReport.dataSendSavePrevisionSalesDealer)
    } catch (e: any) {
      dataProvisionReport.dataMessages.loading = false
      if (e.statusCode !== 200) {
        console.log('error->', e.statusCode)
      }
    } finally {
      dataProvisionReport.dataMessages.loading = false
      await ListPrevisionSales()
    }
  }
}
const updatePercentageDealer = async () => {
  if (dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc > 0 && dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn > 0) {
    dataProvisionReport.percentageDealer = ((dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn * 100) / dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc).toFixed(1) + '%'
  }
  
}

onMounted(() => {
  dataResponse.value.length = 0
  if (!dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    ListPrevisionSales()
  }
}) 
</script>
<template>
  <div class="text-h6 brand-secondary" style="color: var(--brand-secondary)">
    {{ dataProvisionReport.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="
      border: 2px;
      border-style: solid;
      border-color: var(--brand-secondary);
    ">
    <span class="text-h7" style="padding-left: 5px; color: var(--brand-secondary)">
      {{ dataProvisionReport.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color: var(--brand-secondary)">
        <div class="col-6" v-if="dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">{{
          dataProvisionReport.titles.dealer }}</div>
        <div class="col-6">{{ dataProvisionReport.titles.year }}</div>
      </div>
      <div class="row">
        <div class="col-6" v-if="dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">
          <q-select style="width: 250px" outlined v-model="dataProvisionReport.dataSelectProvisionReport.dealer"
            :options="dataOptionsStore.dealers" :label="dataProvisionReport.titles.labelDealer"
            @update:model-value="ListPrevisionSales" />
        </div>
        <div class="col-3">
          <q-select style="width: 200px" outlined v-model="dataProvisionReport.dataSelectProvisionReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataProvisionReport.titles.labelYear"
            @update:model-value="ListPrevisionSales" />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card>
        <q-card-section>
          <p v-if="dataResponse.length === 0"
            style="margin: 100px 0px !important; text-align: center; font-weight: bold;">
            {{ dataProvisionReport.titles.titleInitialTable }}
          </p>
          <q-table
            v-if="dataResponse.length > 0 && dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')"
            flat :rows="dataResponse" :columns="columnsInitial" :rows-per-page-options="[0]"
            :pagination=dataProvisionReport.table.pagination :separator="dataProvisionReport.table.separator"
            :no-data-label="dataProvisionReport.table.noData" bordered>
            <template v-slot:header="props">
              <q-tr
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                <q-th colspan="2" v-for="header in dataProvisionReport.headerTable"
                  style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;"
                  :key="header">
                  {{ header }}
                </q-th>
              </q-tr>
              <q-th v-for="col in props.cols" :key="col.name" :props="props"
                style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                {{ col.label }}
              </q-th>
            </template>
          </q-table>
        </q-card-section>
        <q-card-section
          v-if="dataResponse.length > 0 && !dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">
          <div id="q-app">
            <div class="q-pa-md">
              <q-table flat :rows="dataResponse" :columns="columnsInitial" row-key="name" :rows-per-page-options="[0]"
                :pagination=dataProvisionReport.table.pagination :separator="dataProvisionReport.table.separator"
                :no-data-label="dataProvisionReport.table.noData" bordered>
                <template v-slot:header="props">
                  <q-tr
                    style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                    <q-th colspan="2" v-for="header in dataProvisionReport.headerTable"
                      style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;"
                      :key="header">
                      {{ header }}
                    </q-th>
                  </q-tr>
                  <q-th v-for="col in props.cols" :key="col.name" :props="props"
                    style="border-width: 1px;  border-style: outset;  border-color: var(--brand-primary);  border-collapse: separate;">
                    {{ col.label }}
                  </q-th>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="month" :props="props">
                      {{ props.row.month }}
                    </q-td>
                    <q-td key="oTuc" :props="props">
                      {{ props.row.oTuc }}
                    </q-td>
                    <q-td key="tuc" :props="props" style="width: 60px; height: 30px;">
                      <p v-if="props.row.tuc > 0 && dataProvisionReport.stateInput === 'Aberto'"
                        style="width: 60px; height: 30px; margin-top: 5px;margin-bottom: 5px;">
                        <q-input outlined v-model="dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc"
                          @update:model-value="updatePercentageDealer()" mask='######'  />
                      </p>
                      <p v-if="props.row.tuc > 0 && dataProvisionReport.stateInput === 'Fechado'">
                        {{ dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionTvc }}
                      </p>
                    </q-td>
                    <q-td key="tcap" :props="props" style="width: 60px; height: 30px;">
                      <p v-if="props.row.tcap > 0 && dataProvisionReport.stateInput === 'Aberto'"
                        style="width: 60px; height: 30px; margin-top: 5px;margin-bottom: 5px;">
                        <q-input outlined v-model="dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn"
                          @update:model-value="updatePercentageDealer()" mask='######'  />
                      </p>
                      <p v-if="props.row.tcap > 0 && dataProvisionReport.stateInput === 'Fechado'">
                        {{ dataProvisionReport.dataSendSavePrevisionSalesDealer.previsionSn }}
                      </p>
                    </q-td>
                    <q-td key="tObj" :props="props">
                      {{ props.row.tObj }}
                    </q-td>
                    <q-td key="cTcap" :props="props">
                      <p v-if="props.row.cTcap !== ''">
                        {{ dataProvisionReport.percentageDealer }}
                      </p>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>

        </q-card-section>
        <q-card-actions
          v-if="!dataProvisionReport.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && dataProvisionReport.stateButtons && dataProvisionReport.dataSelectProvisionReport.year === dataOptionsStore.yearActual">
          <q-btn
            style="border: 1px; border-style: solid; border-color:var(--brand-secondary);font-size: 12px;padding-left: 22px;padding-right: 8px;padding-top: 5px;"
            :label="dataProvisionReport.titles.buttons.save" @click="saveReport('Aberto')"><img :src="diskImg"
              style="transform: translateY(-55%);position: absolute;left: 2px;top: 60%;" />
          </q-btn>
          <q-btn
            style="border: 1px; border-style: solid; border-color:var(--brand-secondary);font-size: 12px;padding-left: 22px;padding-right: 8px;padding-top: 5px;"
            :label="dataProvisionReport.titles.buttons.saveReport" @click="saveReport('Fechado')"><img :src="diskImg"
              style="transform: translateY(-55%);position: absolute;left: 2px;top: 60%;" />
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <messages :loading="dataProvisionReport.dataMessages.loading"> </messages>
</template>
