module.exports = {
  user: {
    username: "BEKEL12211",
    password: "Bekelompok1@",
  },
  initialCarts: [
    {
      "product_id": 2,
      "qty": 1
    },
    {
      "product_id": 1,
      "qty": 5 
    }
  ],
  validCart: {
    "product_id": 3,
    "qty": 8
  },
  invalidProductId: {
    "product_id": 100,
    "qty": 2
  },
  notEnoughStock: {
    "product_id": 4,
    "qty": 100
  },
  alreadyAdded: {
    "product_id": 1,
    "qty": 2
  },
  invalidQty: {
    "product_id": 6,
    "qty": -2
  }
}