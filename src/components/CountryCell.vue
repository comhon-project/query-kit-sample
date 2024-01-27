<script setup>
import { locale } from "@query-kit/vue";

const props = defineProps({
  columnId: {
    type: String,
    required: true,
  },
  property: {
    type: Object,
    required: true,
  },
  type: {
    type: Object,
    required: true,
  },
  value: {
    required: true,
  },
  rowValue: {
    type: Object,
    required: true,
  },
  requestTimezone: {
    type: String,
    required: true,
  },
  userTimezone: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p v-if="value == 1">
    {{ locale == "fr" ? "angleterre" : "england" }}
  </p>
  <p v-else-if="value == 2">
    {{ locale == "fr" ? "france" : "france" }}
  </p>
  <p v-else-if="value == 3">
    {{ locale == "fr" ? "allemagne" : "deutshland" }}
  </p>
  <p v-else>{{ value }}</p>
</template>
