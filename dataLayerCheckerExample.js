{
  "aways": [{
    "name": "pageType",
    "type": "string",
    "validator": {
      "regex": "(home)|(category)|(search)|(product)|(checkout)|(purchase)"
    }
  }, {
    "name": "visitor",
    "type": "object",
    "properties": [{
      "name": "isLoggedIn",
      "type": "boolean"
    }, {
      "name": "id",
      "type": "string",
      "validator": {
        "min": 1
      }
    }]
  }],
  "pages": {
    "purchase": [{
      "name": "id",
      "type": "string",
      "validator": {
        "min": 5
      }
    }, {
      "name": "revenue",
      "type": "number",
      "validator": {
        "min": 0
      }
    }, {
      "name": "products",
      "type": "vector",
      "validator": {
        "min": 1
      },
      "expectedObject": "transactionProduct"
    }]
  },
  "recurring": {
    "transactionProduct": {
      "type": "object",
      "properties": [{
        "name": "name",
        "type": "string",
        "validator": {
          "min": 1
        }
      }, {
        "name": "id",
        "type": "string",
        "validator": {
          "min": 1
        }
      }, {
        "name": "price",
        "type": "number",
        "validator": {
          "min": 0
        }
      }, {
        "name": "category",
        "type": "vector",
        "validator": {
          "min": 1,
          "max": 3
        },
        "expectedObject": "categoryVector"
      }]
    },
    "categoryVector": {
      "type": "vector",
      "objectType": "string",
      "objectValidation": {
        "min": 1
      }
    }
  }
}
