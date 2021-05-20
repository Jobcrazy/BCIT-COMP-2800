<template>
  <div id="this_page">
    <van-nav-bar
      title="Payment"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <!--    <van-form @submit="onSubmit">-->
    <!--      <van-radio-group v-model="radio">-->
    <!--        <van-cell-group>-->
    <!--          <van-cell title="Paypal" clickable @click="radio = 'Paypal'">-->
    <!--            <template #right-icon>-->
    <!--              <van-radio name="Paypal" />-->
    <!--            </template>-->
    <!--          </van-cell>-->
    <!--          <van-cell-->
    <!--            title="Credit Card"-->
    <!--            clickable-->
    <!--            @click="radio = 'Credit Card'"-->
    <!--            @click="showForm()"-->
    <!--          >-->
    <!--            <template #right-icon>-->
    <!--              <van-radio name="Credit Card" />-->
    <!--            </template>-->
    <!--          </van-cell>-->
    <!--          <van-cell-->
    <!--            title="Bike2Go Credit"-->
    <!--            clickable-->
    <!--            @click="radio = 'Bike2Go Credit'"-->
    <!--          >-->
    <!--            <template #right-icon>-->
    <!--              <van-radio name="Bike2Go Credit" />-->
    <!--            </template>-->
    <!--          </van-cell>-->
    <!--        </van-cell-group>-->
    <!--      </van-radio-group>-->

    <!--      <div style="margin: 16px">-->
    <!--        <van-button round block type="info" native-type="submit">-->
    <!--          Submit-->
    <!--        </van-button>-->
    <!--      </div>-->
    <!--    </van-form>-->

    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="Credit Card" name="1">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="Enter expiry date"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
        />

      </van-collapse-item>
      <van-collapse-item title="Paypal" name="2">Paypal API to be implemented</van-collapse-item>
      <van-collapse-item title="Bik2Go Credit" name="3">Unavailable</van-collapse-item>
    </van-collapse>


    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">
        Submit
      </van-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeName: '1',
      dataToSubmit: {
        paymentMethod: "",
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
    showForm() {
      this.show = true;
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val} Year`;
      } else if (type === 'month') {
        return `${val} Month`;
      }
      return val;
    },
    onSubmit(values) {
      console.log("submit", values);
      this.$axios({
        method: "POST",
        url: "/api/order/payment",
        data: this.dataToSubmit,
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            self.$router.push({paymentMethod: "something here?"});
            return;
          } else if (0 != res.data.code) {
            self.$toast.fail(res.data.message);
            return;
          }

          self.$router.push({paymentMethod: "something here?"});
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },

  mount() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
</style>
