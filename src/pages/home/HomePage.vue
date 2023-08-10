<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue';
import TopSide from 'src/pages/initial/TopSide.vue'
const dataHomePage = reactive({
  dataOptionInitial: {
    previsao: {
      title: 'Previsão Vendas Mensal',
      name: 'previsao',
    },
    reporting: {
      title: 'Reporting Mensal',
      name: 'reporting',
    },
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
              <q-tabs v-model="dataHomePage.tabInitial" dense class="bg-white shadow-2" align="justify"
                style="max-width: 600px">
                <q-tab v-for="option in dataHomePage.dataOptionInitial" :key="option" :name="option.name"
                  :label="option.title"></q-tab>
              </q-tabs>
              <q-tab-panels v-model="dataHomePage.tabInitial" class="q-ma-xs">
                <q-tab-panel :name="dataHomePage.dataOptionInitial.previsao.name">
                  <top-side :initialOptionSelected="dataHomePage.tabInitial"></top-side>
                </q-tab-panel>
                <q-tab-panel :name="dataHomePage.dataOptionInitial.reporting.name">
                  <top-side :initialOptionSelected="dataHomePage.tabInitial"></top-side>
                </q-tab-panel>
              </q-tab-panels>

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
