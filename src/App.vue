<script setup>
import { ref, watch } from "vue";
import { locale } from "@query-kit/vue";

const model = ref("user");
const columns = ref([
  "first_name",
  "last_name",
  "weight",
  "gender",
  "birth.birth_date",
  "company",
]);

const customColumns = ref({});

const orderBy = ref(["first_name"]);

const group = {
  type: "group",
  operator: "and",
  filters: [
    {
      type: "condition",
      property: "first_name",
      value: "John",
      operator: "like",
      removable: false,
    },
    {
      type: "condition",
      property: "last_name",
      operator: "=",
      value: "Smith",
      editable: false,
    },
    {
      type: "condition",
      property: "birth.birth_date",
      value: "2002-01-07T03:06:06.000Z",
      operator: "=",
    },
    {
      type: "condition",
      property: "married",
      value: true,
      operator: "=",
    },
    {
      type: "condition",
      property: "gender",
      operator: "=",
      value: "female",
    },
  ],
};
const filter = ref(group);

function printRow(object) {
  console.log("row click");
  console.log(object);
}

async function exportResults(newFilter) {
  console.log("export");
  console.log(newFilter);
}

function handleComputedFilters(params) {
  console.log("computed");
  console.log(params);
}

function handleUpdatedFilters(params) {
  console.log("updated");
  console.log(params);
}

function computeQuickSearch(value, operator) {
  return {
    type: "group",
    operator: "or",
    filters: [
      {
        property: "first_name",
        operator: operator,
        value: value,
      },
      {
        property: "last_name",
        operator: operator,
        value: value,
      },
    ],
  };
}
</script>

<template>
  <div class="root-app">
    <div style="display: flex; gap: 0.5rem; justify-content: end">
      <button @click="() => (locale = 'fr')" class="qkit-btn qkit-btn-primary">
        fr
      </button>
      <button @click="() => (locale = 'en')" class="qkit-btn qkit-btn-primary">
        en
      </button>
      <button @click="() => (locale = 'es')" class="qkit-btn qkit-btn-primary">
        es
      </button>
      <button @click="() => (locale = 'de')" class="qkit-btn qkit-btn-primary">
        de
      </button>
    </div>
    <div style="display: flex; justify-content: end; text-align: right">
      <p style="font-size: small">
        Disclaimer! For this sample, the data is generated randomly and filters
        are <br />
        not really applied, so it's normal if the results don't match your
        filters.
      </p>
    </div>
    <div style="height: 85vh">
      <Search
        :model="model"
        :columns="columns"
        :filter="filter"
        :allowed-properties="{}"
        :allowed-scopes="{}"
        :allowed-operators="{}"
        :allowReset="true"
        user-timezone="Europe/Paris"
        :display-operator="{
          group: true,
          condition: true,
          relationship_condition: true,
        }"
        :deferred="500"
        :manually="false"
        :direct-query="true"
        :limit="20"
        :quick-sort="true"
        :allowed-collection-types="['infinite', 'pagination']"
        :display-count="true"
        :edit-columns="true"
        :custom-columns="customColumns"
        v-model:order-by="orderBy"
        @row-click="printRow"
        @export="exportResults"
        @updated="handleUpdatedFilters"
        @computed="handleComputedFilters"
        :computed-scopes="{
          user: [
            {
              id: 'quick_search',
              translation: (localeValue) =>
                localeValue == 'fr' ? 'recherche rapide' : 'quick search user',
              type: 'string',
              useOperator: true,
              computed: computeQuickSearch,
            },
          ],
          organization: [{ id: 'quick_search', name: 'quick search company' }],
        }"
      >
        <template #loadings="{ requesting }"
          ><div v-show="requesting">loading...</div></template
        >
      </Search>
    </div>
  </div>
</template>

<style>
@media (min-width: 1000px) {
  .root-app {
    margin-left: auto;
    margin-right: auto;
    width: 85%;
  }
}
</style>
