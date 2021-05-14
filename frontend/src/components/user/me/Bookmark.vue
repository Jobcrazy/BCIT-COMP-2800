<template>
  <div>
    <van-nav-bar
      title="Favorites"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-card
      v-for="bike in bikes"
      :key="bike.id"
      :price="bike.price"
      :desc="bike.description"
      :title="bike.title"
      class="bookmark"
      currency="$"
      :thumb="bike.photos[0].path"
      @click="onclick(bike.id)"
    />
  </div>
</template>

<script>
export default {
  name: "User_Main_Bookmark",
  data() {
    return {
      bikes: null,
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
    onclick(bid) {
      this.$router.push({
        name: "User_Bike_Detail",
        query: { bid: bid },
      });
    },
    getBookmark: function () {
      let self = this;

      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/bookmark/list",
        data: {},
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            this.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            console.log(res);
            return self.$toast.fail(res.data.message);
          }

          self.$toast.clear();
          self.bikes = res.data.data;
          console.log(self.bikes);
        })
        .catch((err) => {
          self.$toast.fail(err);
        });
    },
  },

  mounted() {
    this.getBookmark();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bookmark {
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 2px;
}
</style>