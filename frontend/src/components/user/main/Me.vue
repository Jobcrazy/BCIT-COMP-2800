<template>
  <div>
    <van-nav-bar id="title" title="Bike2Go" />

    <van-row id="profile">
      <van-col span="1" />

      <van-col span="6">
        <van-image
          radius="50%"
          width="4em"
          height="4em"
          :src="this.avatar ? this.avatar : icon.default_avatar"
        />
      </van-col>

      <van-col span="15">
        <van-row>
          <van-col id="name">{{ fname }}</van-col>
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
      />
      <van-cell title="Favourites" label="Manage my favourite bikes" is-link />
    </van-cell-group>
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
      icon: {
        default_avatar: require("@/assets/default_avatar.png"),
      },
      value: 5,
    };
  },
  methods: {
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
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
  mounted() {
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
</style>
