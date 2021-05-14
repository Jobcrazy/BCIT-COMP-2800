<template>
  <div id="this_page">
    <van-nav-bar
      title="My Bikes"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
      ><template #right>
        <van-icon name="add-o" size="18" />
      </template>
    </van-nav-bar>
    <van-swipe-cell
      v-for="bike in bikes"
      :key="bike.id"
      :name="bike.id"
      :before-close="beforeClose"
    >
      <van-card
        :price="bike.price"
        :desc="bike.description"
        :title="bike.title"
        class="bookmark"
        currency="$"
        :thumb="bike.photos[0].path"
        @click="onclick(bike.id)"
      />
      <template #right>
        <van-button square text="Delete" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "User_Me_Bike",
  data() {
    return {
      bikes: null,
    };
  },
  methods: {
    onClickRight: function () {
      this.$router.push({ name: "User_Bike_Add" });
    },
    onClickLeft: function () {
      history.back();
    },
    onclick(bid) {
      this.$router.push({
        name: "User_Bike_Detail",
        query: { bid: bid },
      });
    },
    deleteBike(bid) {
      let self = this;

      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/bike/remove",
        data: { bid: bid },
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
          for (let index in self.bikes) {
              let numberIndex = parseInt(index);
            if (self.bikes[numberIndex].id == bid) {
              self.bikes.splice(numberIndex, 1);
              break;
            }
          }
        })
        .catch((err) => {
            console.log(err);
          self.$toast.fail(err);
        });
    },
    beforeClose({ position, instance }) {
      let self = this;
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.deleteBike(instance.name);
          break;
      }
    },
    getMyBikes: function () {
      let self = this;

      self.$toast.loading({
        message: "Loading....",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/bike/list",
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
    this.getMyBikes();
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

.delete-button {
  height: 100%;
}

#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
</style>
