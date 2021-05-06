<template>
  <div>
    <h2 id="logo">BIKE2GO</h2>
    <van-row id="profile">
      <van-col span="8">
        <van-image round width="4rem" height="4rem" :src="head" id="head" />
      </van-col>
      <van-col span="16" id="infoContainer">
        <van-row>
          <van-col span="16" id="name">{{ fname }}</van-col>
        </van-row>
        <van-row>
          <van-col span="16" id="star">
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
    </van-row>
    <van-divider @divider-line-height="24" />
  </div>
</template>

<script>
export default {
  name: "User_Main_Me",
  data() {
    return {
      fname: "",
      email: "",
      head: "",
      value: 5,
    };
  },
  methods: {
    getProfile: function () {
      let self = this;
      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/user/profile",
        data: {},
      })
        .then((res) => {
          if (0 != res.data.code) {
            return self.$toast.fail(res.data.message);
          }
          console.log(res.data);
          self.fname = res.data.data[0].fname;
          self.head = res.data.data[0].head;
          self.email = res.data.data[0].email;
          //self.$toast.clear();
          //this.$router.push({ name: "User_Main" });
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
#logo {
  padding-left: 10px;
}
#profile {
  margin-top: 10px;
}

#head {
  padding: 10px;
}

#name {
  font-size: 16px;
}

#star {
  padding: 5px 0;
}

#email {
  font-size: 12px;
}

#infoContainer {
  padding-top: 20px;
}
</style>
