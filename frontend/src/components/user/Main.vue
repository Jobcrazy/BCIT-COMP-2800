<template>
  <div id="main_tab_view">
    <keep-alive> <router-view /> </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="apps-o" replace to="/user/main/bikes">
        Bikes
      </van-tabbar-item>
      <van-tabbar-item icon="add-o" replace to="/user/main/add">
        Add
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" replace to="/user/main/orders">
        Orders
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/user/main/me">
        <span>Me</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "User_Main",
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    switch (this.$route.path) {
       case "/user/main/add":
        this.active = 1;
        break;
      case "/user/main/orders":
        this.active = 2;
        break;
      case "/user/main/me":
        this.active = 3;
        break;
      case "/user/main/AboutUs":
        this.active = 4;
        break;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main_tab_view {
  width: 100%;
  height: 100%;
}
</style>
