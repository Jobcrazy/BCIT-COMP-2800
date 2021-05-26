<template>
  <div>
    <van-nav-bar id="title" title="Bike2Go" />

    <van-row id="profile">
      <van-col span="1" />

      <van-col span="6">
        <van-image
          radius="5px"
          width="4em"
          height="4em"
          :src="this.avatar ? this.avatar : icon.default_avatar"
        />
      </van-col>

      <van-col span="15">
        <van-row>
          <van-col id="name" span="20">{{ fname }}</van-col>
          <van-col id="balance" span="4">${{ balance }}</van-col>
        </van-row>
        <van-row>
          <van-col>
            <van-rate
              v-model="value"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="#fed330"
              count="5"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" id="email">{{ email }}</van-col>
        </van-row>
      </van-col>

      <van-col span="1" />
    </van-row>

    <van-cell-group>
      <van-cell
        title="Advertisements"
        label="Manage my advertisements"
        is-link
        to="/user/me/bike"
      />
      <van-cell
        title="Favourites"
        label="Manage my favourite bikes"
        is-link
        to="/user/me/bookmark"
      />
      <van-cell
        title="Share"
        label="Share Bike2Go with your friends"
        is-link
        @click="clickShare"
      />
      <van-cell
        title="About Us"
        label="Information about the development team"
        is-link
        to="/user/me/about"
      />
    </van-cell-group>

    <van-action-sheet v-model="show" title="Share to">
      <van-grid :column-num="2">
        <van-grid-item @click="shareFacebook">
          <van-row>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="facebook"
              size="28"
            />
          </van-row>
          <van-row class="iconName"> Facebook </van-row>
        </van-grid-item>
        <van-grid-item>
          <van-row>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="twitter"
              size="28"
            />
          </van-row>
          <van-row class="iconName"> Twitter </van-row>
        </van-grid-item>
      </van-grid>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "User_Main_Me",
  data() {
    return {
      fname: "Full Name",
      email: "someone@bcit.ca",
      avatar: null,
      balance: 0,
      icon: {
        default_avatar: require("@/assets/default_avatar.png"),
      },
      value: 5,
      show: false,
    };
  },
  methods: {
    clickShare: function () {
      this.show = true;
    },
    shareFacebook: function () {
      FB.ui(
        {
          method: "share",
          href: "http://bike.kaka888.net/",
          redirect_uri: "http://bike.kaka888.net:8080/#/user/main/me",
        },
        function (response) {}
      );
    },
    getProfile: function () {
      let self = this;

      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/user/profile",
        data: {},
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
          self.fname = res.data.data[0].fname;
          self.avatar = res.data.data[0].head;
          self.email = res.data.data[0].email;
          self.balance = res.data.data[0].balance;
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "536870507483445",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v10.0",
      });
    };

    this.getProfile();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title >>> * {
  font-weight: 900 !important;
}

#profile {
  padding-top: 15px;
  padding-bottom: 10px;
}

#name {
  padding-top: 0.1em;
  font-size: 1em;
  font-weight: 700;
}

#email {
  font-size: 0.85em;
}

#balance {
  padding-top: 0.1em;
  font-size: 1em;
  font-weight: 700;
}

.iconName {
  font-size: 0.85em;
}
</style>
