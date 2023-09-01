const express = require("express");
const authRoute = require("./authRoute");
const paymentMenuRoute = require("./paymentMenuRoute");
const paymentRoute = require("./paymentRoute");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/payment-menu",
    route: paymentMenuRoute,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
