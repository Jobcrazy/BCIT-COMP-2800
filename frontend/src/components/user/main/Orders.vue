<template>
  <div id="this_page">
    <van-nav-bar title="Order" fixed />
    <van-tabs v-model="activeName">
      <van-tab title="Owner" name="owner">
        <van-card
          v-for="orderItem in ownerOrderList"
          :key="orderItem.id"
          :title="orderItem.title"
          :desc="orderItem.description"
          :price="orderItem.price"
          currency="$"
          :thumb="orderItem.photos[0].path"
        >
          <template #tags>
            <van-tag plain type="danger">Tag</van-tag>
            <van-tag plain type="danger">Tag</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">Button</van-button>
            <van-button size="mini" @click="confirm(orderItem)"
              >Details</van-button
            >
          </template>
        </van-card>
      </van-tab>

      <van-tab title="Lender" name="renter">
        <van-card
          v-for="list in lenderOrderList"
          :key="list.id"
          :title="list.title"
          :desc="list.description"
          :price="list.price"
          currency="$"
          :thumb="list.photos[0].path"
        >
          <template #tags>
            <van-tag plain type="danger">Tag</van-tag>
            <van-tag plain type="danger">Tag</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">Button</van-button>
            <van-button size="mini">Button</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "User_Main_Orders",
  data() {
    return {
      activeName: "owner",
      ownerOrderList: [],
      lenderOrderList: [],
    };
    n;
  },
  methods: {
    confirm(obj) {
      this.$router.push({
        name: "User_Me_Confirm",
        query: {
          orderid: obj.id,
          ordertitle: obj.title,
          description: obj.description,
          price: obj.price,
          deposit: obj.deposit,
          photo: obj.photos[0].path,
          lender_name: obj.fname,
          lender_email: obj.email,
        },
      });
    },
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
#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
</style>
