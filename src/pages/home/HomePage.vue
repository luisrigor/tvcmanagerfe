<script setup lang="ts">
import { reactive } from 'vue';
import LeftSide from 'src/pages/initial/LeftSide.vue'
// import AuthenticationInitial from 'src/AuthenticationInitial.vue'
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
  tabInitial: 'op1',
});
</script>

<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="dataHomePage.tabInitial"
            dense
            class="bg-grey-2 text-grey-7"
            active-color="red-9"
            indicator-color="red-9"
            align="justify"
            style="max-width: 600px"
          >
            <q-tab
              v-for="option in dataHomePage.dataOptionInitial" :key="option"
              :name="option.name"
              :label="option.title"
            ></q-tab>
          </q-tabs>
          <q-tab-panels
            v-model="dataHomePage.tabInitial"
            animated
            class="text-red"
          >
            <q-tab-panel :name="dataHomePage.dataOptionInitial.previsao.name">
              <left-side
                :initialOptionSelected="dataHomePage.tabInitial"
              ></left-side>
            </q-tab-panel>
            <q-tab-panel :name="dataHomePage.dataOptionInitial.reporting.name">
              <left-side
                :initialOptionSelected="dataHomePage.tabInitial"
              ></left-side>
            </q-tab-panel>
          </q-tab-panels>

          <div v-if="dataHomePage.tabInitial === 'op1'">
            {{ dataHomePage.initialMessage }}
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
