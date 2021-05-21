<template>
  <div id="this_page">
    <van-nav-bar
      title="My bikes to rent"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
    </van-nav-bar>

    <van-row>
      <van-col span="1" />
      <van-col span="22">
        <van-row id="avatar">
          <van-col span="18">
            <van-row id="title">
              {{ title }}
            </van-row>
            <van-row id="owner_name"> <b>Price:</b> ${{ price }}/h </van-row>
            <van-row id="owner_email"> <b>Deposit: </b>${{ deposit }} </van-row>
          </van-col>
          <van-col span="4">
            <van-image
              radius="5px"
              width="4em"
              height="4em"
              :src="this.photes ? this.phtoes : this.photos"
            />
          </van-col>
        </van-row>

        <van-divider id="divider" />

        <van-row>
          {{ description }}<br /><br />Lender:<br />{{ lender_name }}<br />{{
            lender_email
          }}
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
    onClickRight: function () {
      let self = this;
      let url = null;

      if (this.like) {
        url = "/api/bookmark/remove";
      } else {
        url = "/api/bookmark/add";
      }

      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: url,
        data: { bid: self.$route.query.bid },
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

          this.like = !this.like;
          self.$toast.clear();
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    onSubmit() {},
  },
  mounted() {
    this.title = this.$route.query.ordertitle;
    this.description = this.$route.query.description;
    this.price = this.$route.query.price;
    this.deposit = this.$route.query.deposit;
    this.photos = this.$route.query.photo;
    this.lender_name = this.$route.query.lender_name;
    this.lender_email = this.$route.query.lender_email;
    //this.description = res.data.data[0].description;
    //this.deposit = res.data.data[0].deposit;
    //this.price = res.data.data[0].price;
    //this.owner_avatar = res.data.data[0].head;
    //this.owner_name = res.data.data[0].fname;
    //this.owner_email = res.data.data[0].email;
    //this.like = res.data.data[0].bid ? true : false;
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
