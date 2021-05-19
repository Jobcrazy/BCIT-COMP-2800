import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import User_Main from "@/components/user/Main";
import User_Bike_Add from "@/components/user/bike/Add";
import User_Main_Bikes from "@/components/user/main/Bikes";
import User_Main_Orders from "@/components/user/main/Orders";
import User_Main_Me from "@/components/user/main/Me";
import User_Me_About from "@/components/user/me/About";
import User_Bike_Detail from "@/components/user/bike/Detail";
import User_Me_Bookmark from "@/components/user/me/Bookmark";
import User_Me_Bike from "@/components/user/me/Bike";
import User_Order_Payment from "@/components/user/order/payment";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/user/main",
      name: "User_Main",
      component: User_Main,
      redirect: { name: "User_Main_Bikes" },
      children: [
        {
          name: "User_Main_Bikes",
          path: "bikes",
          component: User_Main_Bikes
        },
        {
          name: "User_Main_Orders",
          path: "orders",
          component: User_Main_Orders
        },
        {
          name: "User_Main_Me",
          path: "me",
          component: User_Main_Me
        },
      ]
    },
    {
      name: "User_Me_About",
      path: "/user/me/about",
      component: User_Me_About
    },
    {
      name: "User_Bike_Detail",
      path: "/user/bike/detail",
      component: User_Bike_Detail
    },
    {
      name: "User_Me_Bookmark",
      path: "/user/me/bookmark",
      component: User_Me_Bookmark
    },
    {
      name: "User_Bike_Add",
      path: "/user/bike/add",
      component: User_Bike_Add
    },
    {
      name: "User_Me_Bike",
      path: "/user/me/bike",
      component: User_Me_Bike
    },
    {
      name: "User_Orders_Payment",
      path: "/user/order/payment",
      component: User_Order_Payment
    },
  ]
});
