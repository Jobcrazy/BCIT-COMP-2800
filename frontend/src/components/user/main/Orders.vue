<template>
  <div id="this_page">
    <van-nav-bar id="title" title="Bike2Go" fixed> </van-nav-bar>
    <van-tabs v-model="activeName">
      <van-tab title="Rented in" name="renter">
        <van-card
          v-for="list in lenderOrderList"
          :key="list.id"
          :title="list.title"
          :desc="list.description"
          :price="list.price"
          currency="$"
          :thumb="list.photos[0].path"
          @click="showBikeDetail(list.bid)"
        >
          <template #tags>
            <van-tag plain :type="list.return_at ? 'success' : 'danger'">
              {{ list.return_at ? "Finished" : "Ongoing" }}
            </van-tag>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="Rented out" name="owner">
        <van-card
          v-for="orderItem in ownerOrderList"
          :key="orderItem.id"
          :title="orderItem.title"
          :desc="orderItem.description"
          :price="orderItem.price"
          currency="$"
          :thumb="orderItem.photos[0].path"
          @click="confirm(orderItem)"
        >
          <template #tags>
            <van-tag plain :type="orderItem.return_at ? 'success' : 'danger'">
              {{ orderItem.return_at ? "Finished" : "Ongoing" }}
            </van-tag>
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
      activeName: "renter",
      ownerOrderList: [],
      lenderOrderList: [],
    };
  },
  methods: {
    dateFtt: function (fmt, date) {
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    crtTimeDate: function (crtTime) {
      return this.dateFtt("yyyy-MM-dd", crtTime);
    },
    confirm(obj) {
      this.$router.push({
        name: "User_Me_Confirm",
        query: {
          orderid: obj.id,
          ordertitle: obj.title,
          description: obj.description,
          price: obj.price,
          deposit: obj.deposit,
          photo: obj.photos,
          lender_name: obj.fname,
          lender_email: obj.email,
        },
      });
    },
    showBikeDetail(bid) {
      this.$router.push({
        name: "User_Bike_Detail",
        query: { bid: bid },
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

#title >>> * {
  font-weight: 900 !important;
}
</style>
