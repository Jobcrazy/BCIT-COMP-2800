<template>
  <div id="this_page">
    <van-nav-bar title="Order" fixed />
    <van-tabs v-model="activeName">
      <van-tab title="Owner" name="owner">
        <van-card
          v-for="list in ownerOrderList"
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

      <van-tab title="Lender" name="renter">
        <van-card
          num="2"
          title="Title"
          desc="Description"
          price="2.00"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
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
      ownerOrderList: null,
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
          self.orderList = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          self.$toast.fail(err);
        });
    },
  },
  mounted() {
    this.loadOwnerOrderList();
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
