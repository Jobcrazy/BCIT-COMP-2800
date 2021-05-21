<template>
  <div id="this_page">
    <van-nav-bar
      title="Order Detail"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <van-row>
      <van-swipe id="swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in photos" :key="index">
          <img v-lazy="image.path" />
        </van-swipe-item>
      </van-swipe>
      <van-col span="1" />
      <van-col span="22">
        <van-row> </van-row>
        <van-row id="avatar">
          <van-col span="18">
            <van-row id="title">
              {{ title }}
            </van-row>
            <van-row id="owner_name"> <b>Price:</b> ${{ price }}/h </van-row>
            <van-row id="owner_email"> <b>Deposit: </b>${{ deposit }} </van-row>
          </van-col>
        </van-row>

        <van-divider id="divider" />

        <van-row>
          {{ description }}
          <br />
          <br />
          <b>Lender contact</b><br />
          {{ lender_name }}
          <br />{{ lender_email }}
        </van-row>
      </van-col>
      <van-col span="1" />
    </van-row>

    <van-submit-bar
      id="complete_bar"
      button-text="Complete"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
export default {
  name: "User_Me_Confirm",
  data() {
    return {
      id: 0,
      title: "Bike Information",
      description: "This is a good bike",
      photos: [],
      deposit: 0.0,
      price: 0.0,
      owner_avatar: null,
      lender_name: "",
      lender_email: "",
      icon: {
        default_avatar: require("@/assets/default_avatar.png"),
      },
      label: "Deposit",
      like: false,
    };
  },
  methods: {
    onClickLeft: function () {
      history.back();
    },
    onSubmit() {
      let self = this;

      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/order/complete",
        data: { id: this.$route.query.orderid },
      })
        .then((res) => {
          if (1 == res.data.code) {
            // Not login
            self.$toast.clear();
            this.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            // Other errors
            return self.$toast.fail(res.data.message);
          }

          self.$toast.clear();
          self.$router.push({ name: "User_Main_Orders" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
  mounted() {
    this.title = this.$route.query.ordertitle;
    this.description = this.$route.query.description;
    this.price = this.$route.query.price;
    this.deposit = this.$route.query.deposit;
    this.photos = this.$route.query.photo;
    this.lender_name = this.$route.query.lender_name;
    this.lender_email = this.$route.query.lender_email;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#swipe {
  height: 211px;
}

#swipe .van-swipe-item {
  width: 100%;
  height: 211px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}

#swipe img {
  text-align: center;
  display: inline-block;
  height: 100%;
}

#avatar {
  padding-top: 15px;
}

#title {
  font-size: 1.5em;
}

#owner_name,
#owner_email {
  padding-top: 3px;
  font-size: 0.85em;
}

#complete_bar {
  background-color: #f7f8fa;
}

#divider {
  margin: 10px 0;
}

#this_page {
  padding-top: 46px;
  padding-bottom: 60px;
}
</style>
