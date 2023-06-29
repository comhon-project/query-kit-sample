import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faXmark,
  faRotateLeft,
  faBackward,
  faForward,
  faArrowDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@query-kit/themes/default";

import { plugin } from "@query-kit/vue";
import { schemaLoader, schemaLocaleLoader } from "./core/SchemaLoader";

library.add([
  faPlus,
  faXmark,
  faRotateLeft,
  faBackward,
  faForward,
  faChevronDown,
]);

createApp(App)
  .component("Icon", FontAwesomeIcon)
  .use(plugin, {
    schemaLoader: schemaLoader,
    schemaLocaleLoader: schemaLocaleLoader,
    classes: {},
    inputs: {
      choice: { component: "number", unique: true },
    },
    icons: {
      close: { class: "qkit-icon qkit-icon-cross", component: "i" },
      delete: { class: "qkit-icon qkit-icon-cross", component: "i" },
      add_value: { icon: "fa-solid fa-plus", fade: "" },
      add_filter: { icon: "fa-solid fa-plus" },
      collapse: "fa-solid fa-chevron-down",
      reset: "fa-solid fa-rotate-left",
      previous: "fa-solid fa-backward",
      next: "fa-solid fa-forward",
    },
    iconComponent: "Icon",
    iconPropName: "icon",
    defaultLocale: "en",
    fallbackLocale: "fr",
    renderHtml: true,
    requester: {
      request: (query) => {
        console.log("main-requester");
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
              default:
                element[name] = Math.random().toString(36);
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
    },
  })
  .mount("#app");
