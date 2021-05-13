<template>
  <div>
    <!--<van-swipe-cell>-->
    <van-card
      v-for="bike in bikes"
      :key="bike.id"
      :price="bike.price"
      :description="bike.description"
      :title="bike.title"
      class="bookmark"
      currency="$"
      :thumb="bike.photos[0].path"
    />
    <!--<template #right>
        <van-button square text="Delete" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>-->
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
    getBookmark: function () {
      let self = this;

      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "api/bookmark/find",
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

          for (let index = 0; index < self.bikes.length; index++) {
            //self.bikes.photos[index].path =
            //  "http://bike.kaka888.net/" + self.bikes.photos[index].path;
          }
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
</style>