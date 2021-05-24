<template>
  <div class="login">
    <van-row class="head"></van-row>
    <van-row class="foot">
      <van-col span="1" />
      <van-col span="22">
        <div class="login_btn">
          <van-button
            id="email_login"
            type="info"
            block
            plain
            hairline
            :icon="icon_email"
            @click="show = true"
          >
            Login with Your Email
          </van-button>
        </div>

        <div class="login_btn">
          <van-button
            id="login"
            type="info"
            block
            plain
            hairline
            :icon="icon_google"
          >
            Login with Google Account
          </van-button>
        </div>
      </van-col>
      <van-col span="1" />
    </van-row>

    <van-dialog
      v-model="show"
      :show-cancel-button="false"
      :showConfirmButton="false"
      :close-on-click-overlay="true"
    >
      <van-tabs>
        <van-tab title="Login">
          <van-form @submit="onLogin">
            <van-field
              v-model="email"
              name="email"
              label="Email"
              placeholder="Input your email"
              :rules="[{ required: true, message: 'Please input your email' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="Password"
              placeholder="Input your password"
              :rules="[
                { required: true, message: 'Please input your password' },
              ]"
            />
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >Login</van-button
              >
            </div>
          </van-form>
        </van-tab>
        <van-tab title="Register">
          <van-form @submit="onRegister">
            <van-field
              v-model="email"
              name="email"
              label="Email"
              placeholder="Input your email"
              :rules="[
                {
                  pattern,
                  required: true,
                  message: 'Please input a corret address',
                },
              ]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="Password"
              placeholder="Input your password"
              :rules="[
                { required: true, message: 'Please input your password' },
              ]"
            />
            <van-field
              v-model="gname"
              type="text"
              name="gname"
              label="First Name"
              placeholder="Input your first name"
              :rules="[
                { required: true, message: 'Please input your first name' },
              ]"
            />
            <van-field
              v-model="xname"
              type="text"
              name="xname"
              label="Last Name"
              placeholder="Input your last name"
              :rules="[
                { required: true, message: 'Please input your last name' },
              ]"
            />
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >Register</van-button
              >
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Login",
  data() {
    return {
      icon_google: require("@/assets/sign-in-with-google.png"),
      icon_email: require("@/assets/sign-in-with-email.png"),
      auth2: null,
      show: false,
      email: "",
      password: "",
      gname: "",
      xname: "",
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    };
  },
  methods: {
    onRegister() {
      //Perfrom register
      let self = this;
      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/user/email/register",
        data: {
          email: this.email,
          password: this.password,
          gname: this.gname,
          xname: this.xname,
        },
      })
        .then((res) => {
          if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          self.$toast.clear();
          this.$router.push({ name: "User_Main" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    onLogin() {
      // Perform login
      let self = this;
      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/user/email/login",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          self.$toast.clear();
          this.$router.push({ name: "User_Main" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    login(profile) {
      // Perform login
      let self = this;
      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/user/login",
        data: {
          gid: profile.getId(),
          fname: profile.getName(),
          gname: profile.getGivenName(),
          xname: profile.getFamilyName(),
          head: profile.getImageUrl(),
          email: profile.getEmail(),
        },
      })
        .then((res) => {
          if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          self.$toast.clear();
          this.$router.push({ name: "User_Main" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    attachSignin(element) {
      // Init Google Login Callback functions
      let self = this;
      self.auth2.attachClickHandler(
        element,
        {},
        function (googleUser) {
          // Login Success, then login to HomeWork
          let profile = self.auth2.currentUser.get().getBasicProfile();
          self.login(profile);
        },
        function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        }
      );
    },
    isLoggedin() {
      // Navigate to User_Main if the current user has already logged in
      let self = this;
      self
        .$axios({
          method: "POST",
          headers: { "content-type": "application/json" },
          url: "/api/user/profile",
          data: {},
        })
        .then((res) => {
          if (0 === res.data.code) {
            self.$toast.clear();
            self.$router.push({ name: "User_Main" });
          }
        })
        .catch(function (error) {});
    },
  },
  mounted() {
    let self = this;
    self.isLoggedin();

    // Init Google Login Button
    gapi.load("auth2", function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      self.auth2 = gapi.auth2.init({
        client_id:
          "123727176263-q22g4po6p3q2165ht5fsco8957179j8v.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
      });
      self.attachSignin(document.getElementById("login"));
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("/static/images/login-bg.jpg");
  background-size: 100% 100%;
}
.foot {
  position: fixed;
  bottom: 35px;
  width: 100%;
  text-align: center;
}
#email_login {
  margin-bottom: 10px;
}
</style>