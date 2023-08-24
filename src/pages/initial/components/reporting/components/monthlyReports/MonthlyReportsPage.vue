<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataOptions } from '../../../../../../shared/store/modules/data-options';
import MonthlyReportsApi from './MonthlyReportsApi';

import diskImg from 'src/assets/images/disk.png'
import saveReport from 'src/assets/images/saveReport.png'

import Messages from '../../../../../modalMessages/MessagesPage.vue'

const dataOptions = useDataOptions();
const { dataOptionsStore } = storeToRefs(dataOptions);
const dataMonthlyReportsPage = reactive({
  titles: {
    initial: 'Informação para Reporting Mensal de Usados',
    search: 'Pesquisa',
    dealer: 'Concessões',
    year: 'Ano',
    month: 'Mês',
    labelDealer: 'Seleccione a Concessão',
    labelYear: 'Select Ano',
    labelMonth: 'Select Month',
    obligatory: '* Todos os campos são obrigatórios',
    titleInitialTableTcap: 'Por favor, selecione os dados do ano e mês que pretende consultar',
    titleInitialTableDealer: 'Por favor, selecione os dados do concessionário, ano e mês que pretende consultar',
    openMonth: 'Abrir Mês',
    saveButton: 'Gravar',
    saveAndReport: 'Gravar & Enviar para report',
    titlesBox: {
      stock: {
        title: 'Stock Expostos p/ Venda',
        subTitles: {
          TotUsedCarsField: 'Total de viaturas expostas para venda a particular',
          UsedCarsIndicatorsSalesLinesField39: 'Das quais, viaturas TP (Toyota Plus) em exposição para venda a particular',
          UsedCarsIndicatorsSalesLinesField40: 'Das quais, seminovos de origem importador',
          UsedCarsIndicatorsSalesLinesField41: 'Das quais, outras viaturas usadas em exposição para venda a particular',
          UsedCarsIndicatorsSalesLinesField38: 'Capacidade de exposição de viaturas para venda a particular',
          UsedCarsIndicatorsSalesLinesField19: 'Viaturas usadas em stock (início do mês)',
          UsedCarsIndicatorsSalesLinesField20: 'Viaturas usadas em stock (fim do mês)',
          UsedCarsIndicatorsSalesLinesField36: 'Média de dias das viaturas usadas em stock',
          UsedCarsIndicatorsSalesLinesField11: 'Média de dias em stock dos VU vendidos',
          UsedCarsIndicatorsSalesLinesField26: 'Compras seminovos origem importador',
          UsedCarsIndicatorsSalesLinesField27: 'Retomas de viaturas novas',
          UsedCarsIndicatorsSalesLinesField58: 'Das quais, retomas de VN da(s) marcas(s) representada(s)',
          UsedCarsIndicatorsSalesLinesField28: 'Avaliações de retomas de VN efectuadas no mês',
          UsedCarsIndicatorsSalesLinesField65: 'Das quais, avaliações retomas de VN da(s) marcas(s) representada(s)',
          UsedCarsIndicatorsSalesLinesField29: 'Retomas de viaturas usadas',
          UsedCarsIndicatorsSalesLinesField30: 'Avaliações de retomas de VU efectuadas no mês',
          UsedCarsIndicatorsSalesLinesField33: 'Viaturas usadas em stock com + de 90 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField46: 'Viaturas usadas em stock 90-180 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField47: 'Viaturas usadas em stock 180-365 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField48: 'Viaturas usadas em stock com + 365 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField34: 'Viaturas usadas em stock marca(s) representadas(s) (fim do mês)',
          UsedCarsIndicatorsSalesLinesField35: 'Viaturas Toyota Valor Certificado em stock (fim do mês)'
        }
      },
      salesFinance: {
        title: 'Vendas: Informação Financeira',
        subTitles: {
          UsedCarsIndicatorsSalesLinesField13: 'Recondicionamentos dos VU vendidos',
          UsedCarsIndicatorsSalesLinesField14: 'Custo das garantias emitidas',
          UsedCarsIndicatorsSalesLinesField16: 'Comissões de financiamento recebidas',
          UsedCarsIndicatorsSalesLinesField59: 'Comissões de seguros recebidas',
          UsedCarsIndicatorsSalesLinesField23: 'Viaturas usadas em stock (início do mês)',
          UsedCarsIndicatorsSalesLinesField24: 'Viaturas usadas em stock (fim do mês)',
          UsedCarsIndicatorsSalesLinesField37: 'Viaturas usadas em stock com + de 90 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField60: 'Viaturas usadas em stock 90-180 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField61: 'Viaturas usadas em stock 180-365 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField62: 'Viaturas usadas em stock com + 365 dias (fim do mês)',
          UsedCarsIndicatorsSalesLinesField12: 'Custo dos VU vendidos',
          UsedCarsIndicatorsSalesLinesField15: 'Faturação do mês',
          UsedCarsIndicatorsSalesLinesField18A: 'Margem bruta média comercial por VU vendido a particular',
          note: 'Nota: Preencher com valores mensais, sem IVA'
        }
      },
      salesVolume: {
        title: 'Vendas: Informação Volume',
        subTitles: {
          UsedCarsIndicatorsSalesLinesField2: 'Vendas TP (Toyota Plus)',
          UsedCarsIndicatorsSalesLinesField44: 'Das quais, vendas com financiamento',
          UsedCarsIndicatorsSalesLinesField4: 'Das quais, seminovos de origem importador',
          UsedCarsIndicatorsSalesLinesField3: 'Das quais, ao abrigo de campanhas em vigor',
          UsedCarsIndicatorsSalesLinesField6: 'Total de vendas a particulares',
          UsedCarsIndicatorsSalesLinesField7: 'Das quais, vendas com financiamento',
          UsedCarsIndicatorsSalesLinesField63: 'Das quais, vendas com seguro',
          UsedCarsIndicatorsSalesLinesField5: 'Outras vendas a particulares',
          UsedCarsIndicatorsSalesLinesField8: 'Total de vendas a profissionais',
          UsedCarsIndicatorsSalesLinesField9: 'Das quais, seminovos de origem importador',
          UsedCarsIndicatorsSalesLinesField10: 'Total de vendas de usados',
          UsedCarsIndicatorsSalesLinesField67: 'Dos quais, retomas de VN',
          UsedCarsIndicatorsSalesLinesField68: 'Dos quais, retomas de VU',
          UsedCarsIndicatorsSalesLinesField69: 'Dos quais, viaturas de serviço e demonstração',
          UsedCarsIndicatorsSalesLinesField70: 'Dos quais, viaturas em buy-back da concessão'
        }
      },
      customerContacts: {
        title: 'Contactos a Clientes',
        subTitles: {
          UsedCarsIndicatorsSalesLinesField55: 'Contactos via internet',
          UsedCarsIndicatorsSalesLinesField56: 'Vendas via contactos internet',
          UsedCarsIndicatorsSalesLinesField57: 'Tráfego de clientes de viaturas usadas nos espaços de usados',
          UsedCarsIndicatorsSalesLinesField64: 'Contactos de clientes de viaturas novas'
        }
      },
      finalColumn: {
        units: 'Unidades',
        valueMonth: 'Valor Mensal(€)'
      }
    }
  },
  dataListSaveIndicators: {
    p_39: '',
    p_40: '',
    p_41: '',
    p_38: '',
    p_19: '',
    p_20: '',
    p_36: '',
    p_11: '',
    p_26: '',
    p_27: '',
    p_58: '',
    p_28: '',
    p_65: '',
    p_29: '',
    p_30: '',
    p_33: '',
    p_46: '',
    p_47: '',
    p_48: '',
    p_34: '',
    p_35: '',
    p_13: '',
    p_14: '',
    p_16: '',
    p_59: '',
    p_23: '',
    p_24: '',
    p_37: '',
    p_60: '',
    p_61: '',
    p_62: '',
    p_12: '',
    p_15: '',
    p_18: '',
    p_2: '',
    p_44: '',
    p_4: '',
    p_3: '',
    p_6: '',
    p_7: '',
    p_63: '',
    p_5: '',
    p_8: '',
    p_9: '',
    p_10: '',
    p_67: '',
    p_68: '',
    p_69: '',
    p_70: '',
    p_55: '',
    p_56: '',
    p_57: '',
    p_64: ''
  },
  dataSendSaveIndicators: {
    id: '',
    month: '',
    oidDealer: '',
    salesLinesList: [],
    status: '',
    totUsedCars: '',
    year: ''
  },
  dataSelectProvisionReport: {
    dealer: '',
    year: '',
    month: ''
  },
  dataSendPrevisionSales: {
    year: '',
    month: 0,
    oidDealer: ''
  },
  dataMessages: {
    loading: false,
    confirmationData: {
      state: false,
      dataModalAction: {
        title: '',
        icon: '',
        colorIcon: '',
        action: ''
      }
    },
    confirmationModal: {
      state: false,
      dataModalAction: {
        title: '',
        data: '',
        icon: '',
        colorIcon: ''
      }
    }
  },
  responseIndicatorSales: null,
  responseSalesLines: null,
  lastMonthNumber: 0,
  lastMonth: '',
  roles: '',
  widthSpace: '1000px',
  stateInputs: true,
  stateViewlistTcap: false,
  viewButtonOpenMonth: false,
  viewButtonOpenMonthDealer: false,
  stateNotHasEuroLinea: false,
  stateIsca: false,
  actionPrevisionSales: '',
  stateConfirmation: false
});

dataMonthlyReportsPage.roles = localStorage.getItem('roles')
const dataResponse = ref([])
const dataResponseListSaveIndicators = ref([])
dataMonthlyReportsPage.dataSelectProvisionReport.year = dataOptionsStore.value.yearActual
dataMonthlyReportsPage.lastMonthNumber = dataOptionsStore.value.dataSelect.months.indexOf(dataOptionsStore.value.monthActual) - 1
dataMonthlyReportsPage.lastMonth = dataOptionsStore.value.dataSelect.months[dataMonthlyReportsPage.lastMonthNumber]
dataMonthlyReportsPage.dataSelectProvisionReport.month = dataMonthlyReportsPage.lastMonth
const ListIndicatorSales = async () => {
  dataMonthlyReportsPage.stateConfirmation = false
  const monthActualNumber = dataOptionsStore.value.dataSelect.months.indexOf(dataMonthlyReportsPage.dataSelectProvisionReport.month)
  dataResponse.value.length = 0
  dataMonthlyReportsPage.stateNotHasEuroLinea = false
  dataMonthlyReportsPage.stateIsca = false
  dataMonthlyReportsPage.stateViewlistTcap = false
  dataMonthlyReportsPage.viewButtonOpenMonth = false
  dataMonthlyReportsPage.dataSendSaveIndicators.status = ''
  if (monthActualNumber > dataMonthlyReportsPage.lastMonthNumber && dataMonthlyReportsPage.dataSelectProvisionReport.year === dataOptionsStore.value.yearActual) {

    dataMonthlyReportsPage.dataMessages.loading = false
    dataMonthlyReportsPage.dataMessages.confirmationModal.state = true
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.title = 'Introdução de dados indisponível para o mês selecionado'
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.icon = 'warning_amber'
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.colorIcon = 'amber'
  } else {
    dataMonthlyReportsPage.dataSendPrevisionSales.year = dataMonthlyReportsPage.dataSelectProvisionReport.year
    dataMonthlyReportsPage.dataSendPrevisionSales.month = parseInt(monthActualNumber + 1, 10)
    if (dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && dataMonthlyReportsPage.dataSelectProvisionReport.dealer !== '') {
      try {
        dataMonthlyReportsPage.stateInputs = true
        dataMonthlyReportsPage.dataMessages.loading = true
        dataMonthlyReportsPage.dataSendPrevisionSales.oidDealer = dataMonthlyReportsPage.dataSelectProvisionReport.dealer.value
        dataMonthlyReportsPage.responseIndicatorSales = await MonthlyReportsApi.tvcIndicadorSales(dataMonthlyReportsPage.dataSendPrevisionSales)
        dataMonthlyReportsPage.stateNotHasEuroLinea = dataMonthlyReportsPage.responseIndicatorSales['notHasEuroLinea']
        dataMonthlyReportsPage.stateIsca = dataMonthlyReportsPage.responseIndicatorSales['isCa']
        for (const propertyVC in dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales']) {
          if (propertyVC === 'status') {
            if (dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC] === 'Reaberto') {
              dataMonthlyReportsPage.viewButtonOpenMonth = false
            } else if (dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC] === 'Fechado') {
              dataMonthlyReportsPage.viewButtonOpenMonth = true
            }
            dataMonthlyReportsPage.stateViewlistTcap = true
          }
          if (propertyVC === 'id') {
            dataMonthlyReportsPage.dataSendSaveIndicators.id = '' + dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC].toString()
          }
          if (propertyVC === 'totUsedCars') {
            dataMonthlyReportsPage.dataSendSaveIndicators.totUsedCars = dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC].toString()
          }
        }
        dataMonthlyReportsPage.responseSalesLines = await MonthlyReportsApi.tvcSalesLines(dataMonthlyReportsPage.dataSendSaveIndicators.id)
        await createDataListSaveIndicators(dataMonthlyReportsPage.responseSalesLines)
        dataMonthlyReportsPage.dataMessages.loading = false
      } catch (e: any) {
        dataMonthlyReportsPage.dataMessages.loading = false
        if (e.statusCode !== 200) {
          console.log('error-status->', e.statusCode)
        }
        console.log('error->', e)
      } finally {
        dataMonthlyReportsPage.dataMessages.loading = false
      }
    } else if (!dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && dataMonthlyReportsPage.dataSelectProvisionReport.year !== '') {
      if (monthActualNumber > dataMonthlyReportsPage.lastMonthNumber && dataMonthlyReportsPage.dataSelectProvisionReport.year === dataOptionsStore.value.yearActual) {
        dataMonthlyReportsPage.dataMessages.loading = false
        dataMonthlyReportsPage.dataMessages.confirmationModal.state = true
        dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.title = 'Introdução de dados indisponível para o mês selecionado'
        dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.icon = 'warning_amber'
        dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.colorIcon = 'amber'
      } else {
        dataMonthlyReportsPage.dataSendPrevisionSales.year = dataMonthlyReportsPage.dataSelectProvisionReport.year
        dataMonthlyReportsPage.dataSendPrevisionSales.month = parseInt(monthActualNumber + 1, 10)
        try {
          dataMonthlyReportsPage.stateInputs = false
          const indicatorsTemp = localStorage.getItem('indicators')
          const indicatorsTempOne = indicatorsTemp.split(',')
          dataMonthlyReportsPage.dataSendPrevisionSales.oidDealer = indicatorsTempOne[0]
          dataMonthlyReportsPage.dataMessages.loading = true
          dataMonthlyReportsPage.responseIndicatorSales = await MonthlyReportsApi.tvcIndicadorSales(dataMonthlyReportsPage.dataSendPrevisionSales)
          dataMonthlyReportsPage.stateNotHasEuroLinea = dataMonthlyReportsPage.responseIndicatorSales['notHasEuroLinea']
          dataMonthlyReportsPage.stateIsca = dataMonthlyReportsPage.responseIndicatorSales['isCa']
          for (const propertyVC in dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales']) {
            if (propertyVC === 'status') {
              if (dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC] === 'Reaberto') {
                dataMonthlyReportsPage.viewButtonOpenMonthDealer = true
              } else if (dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC] === 'Fechado') {
                dataMonthlyReportsPage.viewButtonOpenMonthDealer = false
              }
              dataMonthlyReportsPage.stateViewlistTcap = true
            }
            if (propertyVC === 'id') {
              dataMonthlyReportsPage.dataSendSaveIndicators.id = dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC].toString()
            }
            if (propertyVC === 'totUsedCars') {
              dataMonthlyReportsPage.dataSendSaveIndicators.totUsedCars = dataMonthlyReportsPage.responseIndicatorSales['usedCarsIndicatorsSales'][propertyVC].toString()
            }
          }
          dataMonthlyReportsPage.responseSalesLines = await MonthlyReportsApi.tvcSalesLines(dataMonthlyReportsPage.dataSendSaveIndicators.id)
          await createDataListSaveIndicators(dataMonthlyReportsPage.responseSalesLines)
          dataMonthlyReportsPage.dataMessages.loading = false
        } catch (e: any) {
          dataMonthlyReportsPage.dataMessages.loading = false
          if (e.statusCode !== 200) {
            console.log('error-status->', e.statusCode)
          }
          console.log('error->', e)
        } finally {
          dataMonthlyReportsPage.dataMessages.loading = false
        }

      }
    }
  }
}
const createDataListSaveIndicators = async (data: object) => {
  dataResponseListSaveIndicators.value.length = 0
  for (const propertyVC in data) {
    const dataSalesLinesListTemp = { indicatorValue: '', usedCarsIndicators: '' }
    dataSalesLinesListTemp.usedCarsIndicators = data[propertyVC]['usedCarsIndicators']
    dataSalesLinesListTemp.indicatorValue = data[propertyVC]['indicatorValue']
    for (const propertyLSI in dataMonthlyReportsPage.dataListSaveIndicators) {
      const propertyLSITemp = propertyLSI.split('_')
      if (propertyLSITemp[1] === dataSalesLinesListTemp.usedCarsIndicators && dataMonthlyReportsPage.dataListSaveIndicators[propertyLSI] === '') {
        dataMonthlyReportsPage.dataListSaveIndicators[propertyLSI] = dataSalesLinesListTemp.indicatorValue
      }
    }
    Array.prototype.push.call(dataMonthlyReportsPage.dataSendSaveIndicators.salesLinesList, dataSalesLinesListTemp)
  }
}
const openMonthValidation = async (action: string) => {
  dataMonthlyReportsPage.dataSendSaveIndicators.status = action
  try {
    dataMonthlyReportsPage.dataMessages.confirmationData.state = true
    dataMonthlyReportsPage.dataMessages.confirmationData.dataModalAction.title = 'Confirma abertura do mês?'
    dataMonthlyReportsPage.dataMessages.confirmationData.dataModalAction.icon = 'outbound'
    dataMonthlyReportsPage.dataMessages.confirmationData.dataModalAction.colorIcon = 'blue'
    dataMonthlyReportsPage.dataMessages.confirmationData.dataModalAction.action = 'send'
  } catch (e) {
    console.log('error', e)
  }
}
const updateStateConfirmationBudget = async (data: object) => {
  if (data.selectionSend === 'close') {
    dataMonthlyReportsPage.dataMessages.confirmationData.state = false
  } else if (data.selectionSend === 'success') {
    dataMonthlyReportsPage.dataMessages.confirmationModal.state = false
    if (dataMonthlyReportsPage.stateConfirmation) {
      ListIndicatorSales()
    }
  } else if (data.selectionSend === 'check') {
    dataMonthlyReportsPage.dataMessages.confirmationData.state = false
    savePrevisionSales()
  }
}
const savePrevisionSales = async () => {
  dataMonthlyReportsPage.dataSendSaveIndicators.year = dataMonthlyReportsPage.dataSelectProvisionReport.year
  dataMonthlyReportsPage.dataSendSaveIndicators.month = dataOptionsStore.value.dataSelect.months.indexOf(dataMonthlyReportsPage.dataSelectProvisionReport.month) + 1
  dataMonthlyReportsPage.dataSendSaveIndicators.month = dataMonthlyReportsPage.dataSendSaveIndicators.month.toString()
  dataMonthlyReportsPage.dataSendSaveIndicators.oidDealer = dataMonthlyReportsPage.dataSendPrevisionSales.oidDealer
  if (!dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    for (const propertySSI in dataMonthlyReportsPage.dataSendSaveIndicators.salesLinesList) {
      for (const propertyLSI in dataMonthlyReportsPage.dataListSaveIndicators) {
        const propertyLSITemp = propertyLSI.split('_')
        if (propertyLSITemp[1] === dataMonthlyReportsPage.dataSendSaveIndicators.salesLinesList[propertySSI].usedCarsIndicators) {
          dataMonthlyReportsPage.dataSendSaveIndicators.salesLinesList[propertySSI].indicatorValue = dataMonthlyReportsPage.dataListSaveIndicators[propertyLSI]
        }
      }
    }
  } else if (dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')) {
    const salesLinesListTemp: never[] = []
    dataMonthlyReportsPage.dataSendSaveIndicators.salesLinesList = salesLinesListTemp
  }
  dataMonthlyReportsPage.dataMessages.loading = true
  try {
    await MonthlyReportsApi.tvcSave(dataMonthlyReportsPage.dataSendSaveIndicators)
    dataMonthlyReportsPage.dataMessages.confirmationModal.state = true
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.title = '¡Operação efectuada com sucesso!'
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.icon = 'check_circle_outline'
    dataMonthlyReportsPage.dataMessages.confirmationModal.dataModalAction.colorIcon = 'green'
    dataMonthlyReportsPage.stateConfirmation = true

  } catch (e: any) {
    dataMonthlyReportsPage.dataMessages.loading = false
    if (e.statusCode !== 200) {
      console.log('error-status->', e.statusCode)
    }
    console.log('error->', e)
  } finally {
    dataMonthlyReportsPage.dataMessages.loading = false
  }
}
onMounted(() => {
  dataResponse.value.length = 0
  ListIndicatorSales()
}) 
</script>
<template>
  <div class="text-h6 brand-secondary" style="color:var(--brand-secondary)">
    {{ dataMonthlyReportsPage.titles.initial }}
  </div>
  <q-separator class="background-Secondary"></q-separator>
  <div>&nbsp;</div>
  <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
    <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
      {{ dataMonthlyReportsPage.titles.search }}
    </span>
    <div class="bg-white q-pa-md example-row-column-width">
      <div class="row text-h7" style="color:var(--brand-secondary)">
        <div class="col-6" v-if="dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">{{
          dataMonthlyReportsPage.titles.dealer }}</div>
        <div class="col-3">{{ dataMonthlyReportsPage.titles.year }}</div>
        <div class="col-3">{{ dataMonthlyReportsPage.titles.month }}</div>
      </div>
      <div class="row">
        <div class="col-6" v-if="dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')">
          <q-select style="width: 250px" outlined v-model="dataMonthlyReportsPage.dataSelectProvisionReport.dealer"
            :options="dataOptionsStore.dealers" :label="dataMonthlyReportsPage.titles.labelDealer"
            @update:model-value="ListIndicatorSales" />
        </div>
        <div class="col-3">
          <q-select style="width: 200px;" outlined v-model="dataMonthlyReportsPage.dataSelectProvisionReport.year"
            :options="dataOptionsStore.dataSelect.years" :label="dataMonthlyReportsPage.titles.labelYear"
            @update:model-value="ListIndicatorSales" />
        </div>
        <div class="col-3">
          <q-select style="width: 200px;" outlined v-model="dataMonthlyReportsPage.dataSelectProvisionReport.month"
            :options="dataOptionsStore.dataSelect.months" :label="dataMonthlyReportsPage.titles.labelMonth"
            @update:model-value="ListIndicatorSales" />
        </div>
      </div>
      <div class="row text-h7" style="color:var(--brand-secondary)">
        <div class="col-3">{{ dataMonthlyReportsPage.titles.obligatory }}</div>
      </div>
    </div>
  </div>
  <div class="row q-pa-md" style="padding-top: 10px">
    <div class="col-12 col-md-12">
      <q-card>
        <q-card-section>
          <p v-if="dataResponse.length === 0 && dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && !dataMonthlyReportsPage.stateViewlistTcap"
            style="margin: 100px 0px !important; text-align: center; font-weight: bold;">
            {{ dataMonthlyReportsPage.titles.titleInitialTableTcap }}
          </p>
          <p v-if="dataResponse.length === 0 && !dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP') && !dataMonthlyReportsPage.stateViewlistTcap"
            style="margin: 100px 0px !important; text-align: center; font-weight: bold;">
            {{ dataMonthlyReportsPage.titles.titleInitialTableDealer }}
          </p>
        </q-card-section>
        <q-card-section v-if="dataMonthlyReportsPage.stateViewlistTcap"> <br>
          <!-- Stock -->
          <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
            <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
              {{ dataMonthlyReportsPage.titles.titlesBox.stock.title }}
            </span>
            <div class="bg-white q-pa-md example-row-column-width">
              <div class="row text-h7" style="padding-bottom: 5px;">
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" align="center">{{ dataMonthlyReportsPage.titles.titlesBox.finalColumn.units }}</div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.TotUsedCarsField
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataSendSaveIndicators.totUsedCars" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField39
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_39" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div class="col-2">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField40
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_40" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">

                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField41
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_41" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField38
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_38" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea">
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField19
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_19" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>

                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField20
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_20" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>

                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField36
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_36" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField11
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_11" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField26
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_26" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField27
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_27" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField58
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_58" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField28
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_28" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField65
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_65" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea">
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField29
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_29" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>

                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField30
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_30" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>

                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField33
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_33" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField46
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_46" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField47
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_47" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField48
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_48" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField34
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_34" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.stock.subTitles.UsedCarsIndicatorsSalesLinesField35
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_35" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
            </div>
          </div> <br>
          <!-- Financeira -->
          <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
            <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
              {{ dataMonthlyReportsPage.titles.titlesBox.salesFinance.title }}
            </span>
            <div class="bg-white q-pa-md example-row-column-width">
              <div class="row text-h7" style="padding-bottom: 5px;">
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" align="center">{{ dataMonthlyReportsPage.titles.titlesBox.finalColumn.valueMonth }}
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField13
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_13" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField14
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_14" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div v-if="!dataMonthlyReportsPage.stateIsca">
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField16
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_16" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField59
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_59" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
              <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea">
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField23
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_23" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField24
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_24" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField37
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_37" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField60
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_60" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField61
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_61" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField62
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_62" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField12
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_12" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField15
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_15" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.UsedCarsIndicatorsSalesLinesField18A
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_18A" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
              <div class="row text-h7">
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <b style=" font-style: italic; color:var(--brand-secondary)">
                  {{ dataMonthlyReportsPage.titles.titlesBox.salesFinance.subTitles.note }}
                </b>
              </div>
            </div>
          </div> <br>
          <!-- Volume -->
          <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
            <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
              {{ dataMonthlyReportsPage.titles.titlesBox.salesVolume.title }}
            </span>
            <div class="bg-white q-pa-md example-row-column-width">
              <div class="row text-h7" style="padding-bottom: 5px;">
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" align="center">{{ dataMonthlyReportsPage.titles.titlesBox.finalColumn.units }}</div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField2
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea" class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_2" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
                <div v-else class="col-1" style="padding-bottom: 20px;">
                  &nbsp;
                </div>
              </div>
              <div v-if="!dataMonthlyReportsPage.stateIsca">
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField44
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_44" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
              <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea">
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField4
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_4" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>
              <div class="row text-h7">
                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField3
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_3" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div style="padding-bottom: 20px;">{{
                  dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField6
                }}</div>
              </div>
              <div class="row text-h7">
                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField7
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_7" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div class="col-1">&nbsp;</div>
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField63
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_63" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div v-if="dataMonthlyReportsPage.stateNotHasEuroLinea">
                <div class="row text-h7">
                  <div>{{ dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField5
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_5" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>

                <div class="row text-h7">
                  <div>{{ dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField8
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_8" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{ dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField9
                  }}</div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_9" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField10 }}
                  </div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_10" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField67 }}
                  </div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_67" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField68 }}
                  </div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_68" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField69 }}
                  </div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_69" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
                <div class="row text-h7">
                  <div class="col-1">&nbsp;</div>
                  <div>{{
                    dataMonthlyReportsPage.titles.titlesBox.salesVolume.subTitles.UsedCarsIndicatorsSalesLinesField70 }}
                  </div>
                  <q-space :width='dataMonthlyReportsPage.widthSpace' />
                  <div class="col-1" style="padding-bottom: 5px;">
                    <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_70" outlined mask='######'
                      :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                  </div>
                </div>
              </div>

            </div>
          </div> <br>
          <!-- Clientes -->
          <div class="background-Primary" style="border: 2px; border-style: solid; border-color:var(--brand-secondary);">
            <span class="text-h7" style="padding-left: 5px; color:var(--brand-secondary)">
              {{ dataMonthlyReportsPage.titles.titlesBox.customerContacts.title }}
            </span>
            <div class="bg-white q-pa-md example-row-column-width">
              <div class="row text-h7" style="padding-bottom: 5px;">
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" align="center">{{ dataMonthlyReportsPage.titles.titlesBox.finalColumn.units }}</div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.customerContacts.subTitles.UsedCarsIndicatorsSalesLinesField55
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_55" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.customerContacts.subTitles.UsedCarsIndicatorsSalesLinesField56
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_56" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.customerContacts.subTitles.UsedCarsIndicatorsSalesLinesField57
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1" style="padding-bottom: 5px;">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_57" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
              <div class="row text-h7">
                <div>{{
                  dataMonthlyReportsPage.titles.titlesBox.customerContacts.subTitles.UsedCarsIndicatorsSalesLinesField64
                }}</div>
                <q-space :width='dataMonthlyReportsPage.widthSpace' />
                <div class="col-1">
                  <q-input v-model="dataMonthlyReportsPage.dataListSaveIndicators.p_64" outlined mask='######'
                    :disable="dataMonthlyReportsPage.stateInputs" input-style="text-align: center" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <br>
      <q-btn
        v-if="dataMonthlyReportsPage.stateViewlistTcap && dataMonthlyReportsPage.viewButtonOpenMonth && dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')"
        push :label="dataMonthlyReportsPage.titles.openMonth" icon="drive_file_move" style="width: 200px;" color="red-5"
        flat square @click="openMonthValidation('Reaberto')" />
      <q-btn v-if="dataMonthlyReportsPage.viewButtonOpenMonthDealer && !dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')"
        style="border: 1px; border-style: solid; border-color:var(--brand-secondary);font-size: 12px;padding-left: 22px;padding-right: 8px;padding-top: px;"
        :label="dataMonthlyReportsPage.titles.saveButton" @click="openMonthValidation('Reaberto')"><img :src="diskImg"
          style="transform: translateY(-55%);position: absolute;left: 2px;top: 52%;" /> </q-btn>

      <q-btn v-if="dataMonthlyReportsPage.viewButtonOpenMonthDealer && !dataMonthlyReportsPage.roles?.includes('TVC_MANAGER_PRF_TOYOTA_LEXUS_TCAP')"
        style="border: 1px; border-style: solid; border-color:var(--brand-secondary);font-size: 12px;padding-left: 22px;padding-right: 8px;padding-top: px;"
        :label="dataMonthlyReportsPage.titles.saveAndReport" @click="openMonthValidation('Fechado')"><img
          :src="saveReport" style="transform: translateY(-55%);position: absolute;left: 2px;top: 52%;" />
      </q-btn>
    </div>
    <messages :loading="dataMonthlyReportsPage.dataMessages.loading"
      :confirmationData="dataMonthlyReportsPage.dataMessages.confirmationData"
      :confirmationModal="dataMonthlyReportsPage.dataMessages.confirmationModal"
      @update-state-confirmation="updateStateConfirmationBudget"> </messages>
  </div>
</template>