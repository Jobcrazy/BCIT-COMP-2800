<template>
  <div>
    <van-row>
      <van-col span="7"
        ><van-image
          radius="5px"
          width="5rem"
          height="5rem"
          src="list.photos[0].path"
      /></van-col>
      <van-col span="14">
        <van-row class="name">{{ list.title }}</van-row>
        <van-row class="price">Price: ${{ list.price }}</van-row>
        <van-row class="description">{{ list.description }}</van-row>

        <van-divider />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "User_Main_Confirm",
  data() {
    return {
      activeName: "owner",
      ownerOrderList: [],
      lenderOrderList: [],
    };
  },
  methods: {
    loadOwnerOrderList: function () {
      let self = this;
      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });
      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/order/list/out",
        data: {},
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            this.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          self.$toast.clear();
          for (let index = 0; index < res.data.data.length; index++) {
            for (
              let itemIndex = 0;
              itemIndex < res.data.data[index].photos.length;
              ++itemIndex
            ) {
              let url =
                "http://bike.kaka888.net/" +
                res.data.data[index].photos[itemIndex].path;
              res.data.data[index].photos[itemIndex].path = url;
            }
          }
          self.ownerOrderList = res.data.data;
        })
        .catch((err) => {
          self.$toast.fail(err);
        });
    },
    loadLenderOrderList: function () {
      let self = this;
      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });
      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/order/list/in",
        data: {},
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            this.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          self.$toast.clear();
          for (let index = 0; index < res.data.data.length; index++) {
            for (
              let itemIndex = 0;
              itemIndex < res.data.data[index].photos.length;
              ++itemIndex
            ) {
              let url =
                "http://bike.kaka888.net/" +
                res.data.data[index].photos[itemIndex].path;
              res.data.data[index].photos[itemIndex].path = url;
            }
          }
          self.lenderOrderList = res.data.data;
        })
        .catch((err) => {
          self.$toast.fail(err);
        });
    },
  },
  mounted() {
    this.loadOwnerOrderList();
    this.loadLenderOrderList();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>