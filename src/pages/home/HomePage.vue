<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue';
import LowerSide from 'src/pages/initial/LowerSide.vue';
const dataHomePage = reactive({
  dataOptionInitial: {
    dataOne: {
      previsao: {
        title: 'Previsão Vendas Mensal',
        name: 'previsao'
      },
      reporting: {
        title: 'Reporting Mensal',
        name: 'reporting'
      },
    },
    dataTwo: {
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
    }
  },
  initialMessage: 'Selecione uma opção de menu.',
  tabInitial: 'op1'
});
</script>

<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-card-section>
            <div>
              <q-btn class="bg-white shadow-2"
                style="background-color: var(--brand-primary); color: var(--brand-secondary); width: 272px;"
                v-for="option in dataHomePage.dataOptionInitial.dataOne" :key="option" :name="option.name"
                :label="option.title">
                <q-menu style="color:var(--brand-secondary); width: 272px;" auto-close>
                  <q-list style="min-width: 100px" v-if="option.name === 'previsao'">
                    <q-item clickable v-for="optionTwo in dataHomePage.dataOptionInitial.dataTwo.optionSideForecast"
                      :key="optionTwo" square color="accent" icon="room">
                      <q-item-section @click="dataHomePage.tabInitial = optionTwo.name">{{ optionTwo.title
                      }}</q-item-section>
                    </q-item>
                  </q-list>
                  <q-list style="min-width: 100px" v-if="option.name === 'reporting'">
                    <q-item clickable v-for="optionTwo in dataHomePage.dataOptionInitial.dataTwo.optionSideReporting"
                      :key="optionTwo" square color="accent" icon="room">
                      <q-item-section @click="dataHomePage.tabInitial = optionTwo.name">{{ optionTwo.title }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <br><br><br>
              <div v-if="dataHomePage.tabInitial !== 'op1'">
                <lower-side :initialOptionSelected="dataHomePage.tabInitial"></lower-side>
              </div>
              <div v-if="dataHomePage.tabInitial === 'op1'" style="color:var(--brand-secondary)">
                {{ dataHomePage.initialMessage }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
