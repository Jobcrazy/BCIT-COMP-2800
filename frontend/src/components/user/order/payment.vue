<template>
  <div id="this_page">
    <van-nav-bar
      title="Payment"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
  </div>

  <van-form @submit="onSubmit">
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="Paypal" clickable @click="radio = 'Paypal'">
          <template #right-icon>
            <van-radio name="Paypal" />
          </template>
        </van-cell>
        <van-cell title="Credit Card" clickable @click="radio = 'Credit Card'">
          <template #right-icon>
            <van-radio name="Credit Card" />
          </template>
        </van-cell>
        <van-cell title="Bike2Go Credit" clickable @click="radio = 'Bike2Go Credit'">
          <template #right-icon>
            <van-radio name="Bike2Go Credit" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        Submit
      </van-button>
    </div>
  </van-form>


</template>


<script>
export default {
  data() {
    return {
      dataToSubmit: {
        paymentMethod: "",
      },
    };
  },
  methods: {
    onClickLeft(){
      history.back();
    },
    onSubmit(values) {
      console.log('submit', values);
      this.$axios({
        method: "POST",
        url: "/api/order/payment",
        data: this.dataToSubmit,
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            self.$router.push({ paymentMethod: "something here?"});
            return;
          } else if (0 != res.data.code) {
            self.$toast.fail(res.data.message);
            return;
          }

          self.$router.push({ paymentMethod: "something here?"});
        })
        .catch(function (error){
          self.$toast.fail(error);
        });
    },
  },

  mount() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
</style>
