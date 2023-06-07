export default {
  name: "user",
  properties: [
    {
      id: "first_name",
      name: "first name",
      type: "string",
    },
    {
      id: "last_name",
      name: "last name",
      type: "string",
    },
    {
      id: "age",
      name: "the age",
      type: "integer",
    },
    {
      id: "weight",
      name: "the weight",
      type: "float",
    },
    {
      id: "married",
      name: "is married",
      type: "boolean",
    },
    {
      id: "gender",
      name: "the gender",
      type: "string",
      enum: {
        male: "Mr.",
        female: "Ms.",
      },
    },
    {
      id: "birth.birth_date",
      name: "birth date",
      type: "datetime",
    },
    {
      id: "birth.birth_day",
      name: "birth day",
      type: "date",
    },
    {
      id: "birth.birth_hour",
      name: "birth hour",
      type: "time",
    },
    {
      id: "country",
      name: "the country",
      type: "choice",
    },
    {
      id: "company",
      name: "the company",
      type: "relationship",
      model: "organization",
    },
    {
      id: "friend",
      name: "the friend",
      type: "relationship",
      model: "user",
    },
  ],
  search: {
    filters: [
      "first_name",
      "age",
      "weight",
      "gender",
      "married",
      "birth.birth_date",
      "birth.birth_day",
      "birth.birth_hour",
      "company",
      "friend",
      "country",
    ],
    sort: ["first_name", "company"],
    scopes: [
      "scope_string_definition",
      {
        id: "scope",
        name: "scope without value",
      },
      {
        id: "string_scope",
        name: "string scope",
        type: "string",
        useOperator: true,
      },
      {
        id: "datetime_scope",
        name: "datetime scope",
        type: "datetime",
      },
      {
        id: "enum_scope",
        name: "enum scope",
        type: "string",
        enum: {
          one: "value one",
          two: "value two",
        },
      },
    ],
  },
};
