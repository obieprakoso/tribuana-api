const express = require("express");
const authRoute = require("./authRoute");
const paymentMenuRoute = require("./paymentMenuRoute");
const paymentRoute = require("./paymentRoute");
const roleRoute = require("./roleRoute");
const userRoute = require("./userRoute");

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
  {
    path: "/role",
    route: roleRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
