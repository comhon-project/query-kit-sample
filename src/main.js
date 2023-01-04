import { createApp } from "vue";
import App from "./App.vue";

import '@query-kit/themes/default'

import { plugin } from '@query-kit/vue'
import { schemaLoader, schemaLocaleLoader } from "./core/SchemaLoader";

createApp(App).use(plugin, {
    schemaLoader: schemaLoader,
    schemaLocaleLoader: schemaLocaleLoader,
    classes: {
        
    },
    inputs: {
        choice: {component: 'number', unique: true}
    },
    icons: {
        delete: 'qkit-icon qkit-icon-cross',
        add: 'qkit-icon qkit-icon-plus',
        add_value: 'qkit-icon qkit-icon-plus',
        close: 'qkit-icon qkit-icon-cross'
    },
    defaultLocale: 'en',
    fallbackLocale: 'fr',
    renderHtml: true,
    requester: {
        request: (query) => {
            const lastCompleteBulk = 3;
            const limit = query.offset > lastCompleteBulk * query.limit ? query.limit - 1 : query.limit;
            const collection = [];
            for (let index = 0; index < limit; index++) {
                const element = {};
                for (const name of query.properties) {
                    switch (name) {
                        case 'birth_date':
                            element[name] = '2023-01-03T20:45:04Z';
                            break;
                        case 'birth_day':
                            element[name] = '2023-01-03';
                            break;
                        case 'birth_hour':
                            element[name] = '20:45:04';
                            break;
                        case 'gender':
                            element[name] = Math.random() > 0.5 ? 'male' : 'female';
                            break;
                        case 'married':
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
                        collection: collection
                    });
                }, 1000);
            });
        }
    }
}).mount("#app");
