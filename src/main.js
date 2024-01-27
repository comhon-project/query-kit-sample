import { createApp } from "vue";
import App from "./App.vue";
import { faker } from "@faker-js/faker";

import "@query-kit/themes/default";

import { plugin } from "@query-kit/vue";
import { schemaLoader, schemaLocaleLoader } from "./core/SchemaLoader";
import CountryInput from "./components/CountryInput.vue";
import CountryCell from "./components/CountryCell.vue";

createApp(App)
  .component("CountryInput", CountryInput)
  .component("CountryCell", CountryCell)
  .use(plugin, {
    schemaLoader: schemaLoader,
    schemaLocaleLoader: schemaLocaleLoader,
    classes: {},
    inputs: {
      country: { component: "CountryInput", unique: true },
    },
    cellPropertyRenderers: {
      user: {
        weight: (value) => value + " kg",
        age: (value, row, col, locale) =>
          value + (locale == "fr" ? " ans" : " years"),
      },
    },
    cellTypeRenderers: {
      country: "CountryCell",
    },
    icons: {},
    defaultLocale: "en",
    fallbackLocale: "fr",
    renderHtml: true,
    allowedOperators: {},
    requester: {
      request: (query) => {
        console.log(query);
        const lastCompleteBulk = 3;
        const limit =
          query.offset > lastCompleteBulk * query.limit
            ? query.limit - 1
            : query.limit;
        const collection = [];
        for (let index = 0; index < limit; index++) {
          const rowObject = {};
          for (const name of query.properties) {
            let container = rowObject;
            let property = name;
            if (name.includes(".")) {
              const list = name.split(".");
              property = list.pop();
              for (const key of list) {
                if (!container[key]) {
                  container[key] = {};
                }
                container = container[key];
              }
            }
            switch (name) {
              case "first_name":
                container[property] = faker.person.firstName();
                break;
              case "last_name":
                container[property] = faker.person.lastName();
                break;
              case "birth.birth_date":
                container[property] = "2023-01-03T20:45:04Z";
                break;
              case "birth.birth_day":
                container[property] = "2023-01-03";
                break;
              case "birth.birth_hour":
                container[property] = "20:45:04";
                break;
              case "gender":
                container[property] = Math.random() > 0.5 ? "male" : "female";
                break;
              case "married":
                container[property] = Math.random() > 0.5 ? true : false;
                break;
              case "age":
              case "weight":
                container[property] = Math.floor(Math.random() * 100);
                break;
              case "country":
                container[property] = Math.floor(Math.random() * 3 + 1);
                break;
              case "favorite_fruits":
                const count = Math.floor(Math.random() * 10);
                container[property] = [];
                for (let index = 0; index < count; index++) {
                  container[property].push(Math.floor(Math.random() * 3 + 1));
                }
                break;
              case "company.brand_name":
                container[property] = faker.company.name();
                break;
              case "company.address":
                container[property] = faker.location.streetAddress();
                break;
              case "company.description":
                container[property] = faker.company.catchPhrase();
                break;
              case "company.id":
                container[property] = Math.floor(Math.random() * 999999999);
                break;
              default:
                container[property] = name + Math.random().toString(36);
                break;
            }
          }
          collection.push(rowObject);
        }
        console.log(structuredClone(collection));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              count: lastCompleteBulk * query.limit + (query.limit - 1),
              collection: collection,
            });
          }, 1000);
        });
      },
      flattened: false,
    },
  })
  .mount("#app");
