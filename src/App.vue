<script setup>
import { ref, provide, toRaw } from "vue";
import CellFirstName from "./components/CellFirstName.vue";
import { locale, Search } from "@query-kit/vue";

const theme = provide("theme", {
  color_primary: "#7457c4",
  color_secondary: "#c45757",
});
const model = ref("user");
const columns = ref([
  {
    id: "first_name",
    label: "override first name",
    component: CellFirstName,
  },
  "last_name",
  "age",
  "gender",
  "married",
  "favorite_fruits",
  "birth.birth_date",
  "birth.birth_day",
  "birth.birth_hour",
  "friend",
  {
    id: "company",
    order: "desc",
  },
  {
    id: "company.description",
    onCellClick: (object, property, event) => {
      event.stopPropagation();
      console.log("cell click", property);
      console.log(object);
    },
  },
  "company.address",
]);
const group = {
  type: "group",
  operator: "and",
  filters: [
    {
      type: "condition",
      property: "last_name",
      operator: "in",
    },
    {
      type: "condition",
      property: "last_name",
      operator: "=",
      value: "one",
      editable: false,
    },
    {
      type: "condition",
      property: "first_name",
      value: "%azeaze%",
      operator: "like",
      removable: false,
    },
    {
      type: "condition",
      property: "birth.birth_date",
      value: "2022-01-07T03:06:06.000Z",
      operator: "=",
    },
    {
      type: "condition",
      property: "age",
      value: "20",
      operator: "<",
    },
    {
      type: "condition",
      property: "gender",
      operator: "<>",
      value: "female",
    },
    {
      type: "scope",
      id: "enum_scope",
      value: "two",
    },
    {
      type: "scope",
      id: "quick_search",
      operator: "=",
      value: "twozzzz",
    },
    {
      type: "condition",
      property: "country",
      operator: "in",
    },
    {
      type: "group",
      operator: "or",
      editable: false,
      filters: [
        {
          type: "condition",
          property: "first_name",
          operator: "=",
          visible: false,
        },
        {
          type: "relationship_condition",
          operator: "has",
          property: "company",
          filter: {
            type: "condition",
            property: "address",
            operator: "=",
          },
        },
        {
          type: "condition",
          property: "first_name",
          value: "aaaaaaaaaaa",
          operator: "=",
          editable: false,
        },
        {
          type: "relationship_condition",
          operator: "has",
          property: "company",
          filter: {
            type: "relationship_condition",
            operator: "has_not",
            property: "contacts",
            filter: {
              type: "group",
              operator: "or",
              filters: [
                {
                  type: "condition",
                  property: "first_name",
                  operator: "=",
                },
                {
                  type: "condition",
                  property: "first_name",
                  operator: "=",
                },
                {
                  type: "condition",
                  property: "first_name",
                  operator: "=",
                },
                {
                  type: "condition",
                  property: "first_name",
                  operator: "=",
                },
                {
                  type: "condition",
                  property: "first_name",
                  operator: "=",
                },
              ],
            },
          },
        },
      ],
    },
  ],
};
const filter = ref(group);

function printRow(object) {
  console.log("row click");
  console.log(object);
}

async function completeCollection(collection) {
  for (const row of collection) {
    if (row["company.description"]) {
      // flattened
      row["company.description"] += ' <span style="color: blue">lalala</span>';
    } else if (row.company) {
      // not flattened
      row.company.description += ' <span style="color: blue">lalala</span>';
    }
    row["first_name"] += " hehe";
  }
}

async function exportResults(newFilter) {
  console.log("export");
  console.log(newFilter);
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
let requester = {
  request: (query) => {
    console.log("prop-requester");
    console.log(query);
    const lastCompleteBulk = 3;
    const limit =
      query.offset > lastCompleteBulk * query.limit
        ? query.limit - 1
        : query.limit;
    const collection = [];
    for (let index = 0; index < limit; index++) {
      const element = {};
      for (const name of query.properties) {
        switch (name) {
          case "birth.birth_date":
            element[name] = "2023-01-03T20:45:04Z";
            break;
          case "birth.birth_day":
            element[name] = "2023-01-03";
            break;
          case "birth.birth_hour":
            element[name] = "20:45:04";
            break;
          case "gender":
            element[name] = Math.random() > 0.5 ? "male" : "female";
            break;
          case "married":
            element[name] = Math.random() > 0.5 ? true : false;
            break;
          case "age":
            element[name] = Math.floor(Math.random() * 100);
            break;
          case "favorite_fruits":
            const count = Math.floor(Math.random() * 10);
            element[name] = [];
            for (let index = 0; index < count; index++) {
              element[name].push(Math.floor(Math.random() * 3 + 1));
            }
            break;
          default:
            element[name] = name + Math.random().toString(36);
            break;
        }
      }
      collection.push(element);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          count: lastCompleteBulk * query.limit + (query.limit - 1),
          collection: collection,
        });
      }, 1000);
    });
  },
  flattened: true,
};

// TODO export dist files and update main file in package.json
// add tests
// manage property name with dot in collection
// add possibility yo customize collection columns
// publish on npm and retrieve from npm not from locale.
</script>

<template>
  <div class="root-app">
    <div
      style="
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        justify-content: end;
      "
    >
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
    <div style="height: 90vh">
      <Search
        :model="model"
        :columns="columns"
        :filter="filter"
        :allowed-properties="{ user: null }"
        :allowed-scopes="{ user: null }"
        :allowed-operators="{
          scope: null,
          group: ['or'],
          relationship_condition: null,
          choice: null,
        }"
        :allowReset="true"
        user-timezone="Europe/Paris"
        :display-operator="true"
        :deferred="500"
        :manually="false"
        :direct-query="true"
        :limit="20"
        :quick-sort="true"
        @row-click="printRow"
        :post-request="completeCollection"
        :allowed-collection-types="['infinite', 'pagination']"
        :display-count="true"
        @export="exportResults"
        :computed-scopes="{
          user: [
            {
              id: 'quick_search',
              name: 'quick search user',
              translation: (localeValue) =>
                localeValue == 'fr' ? 'recherche rapide' : 'quick search user',
              type: 'string',
              useOperator: true,
              computed: computeQuickSearch,
            },
          ],
          organization: [{ id: 'quick_search', name: 'quick search company' }],
        }"
        :requester="requester"
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
    width: 80%;
  }
}
</style>
