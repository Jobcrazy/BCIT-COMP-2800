<template>
  <div id="this_page">
    <van-nav-bar
      title="Payment"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item title="Credit Card" name="1">
        <van-form @submit="onSubmit">
          <van-field
            v-model="dataToSubmit.cardNumber"
            name="cardNumber"
            label="Credit Card Number"
            placeholder="Credit Card Number"
            :rules="[{ required: true, message: 'Credit card number is required' }]"
          />
          <van-field
            v-model="dataToSubmit.fName"
            name="Cardholder Name"
            label="Cardholder Name"
            placeholder="Cardholder name"
            :rules="[{ required: true, message: 'Name is required' }]"
          />
          <van-datetime-picker id="datePicker"
                               v-model="dataToSubmit.currentDate"
                               type="year-month"
                               title="Enter expiry date"
                               :min-date="minDate"
                               :max-date="maxDate"
                               :formatter="formatter"
          />
          <van-password-input id="cvcInput"
                              info="Enter CVC (Back of card)"
                              :value="dataToSubmit.cvc"
                              :gutter="2"
                              :length="3"
                              :mask="false"
                              :focused="showKeyboard"
                              @focus="showKeyboard = true"
          />
          <van-number-keyboard
            v-model="dataToSubmit.cvc"
            :show="showKeyboard"
            @blur="showKeyboard = false"
          />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              Submit
            </van-button>
          </div>
        </van-form>
      </van-collapse-item>
      <van-collapse-item title="Paypal" name="2">Paypal API to be implemented</van-collapse-item>
      <van-collapse-item title="Bik2Go Credit" name="3">Unavailable</van-collapse-item>
    </van-collapse>

<!--    <div style="margin: 16px">-->
<!--      <van-button round block type="info" native-type="submit" @submit="onSubmit">-->
<!--        Submit-->
<!--      </van-button>-->
<!--    </div>-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      value: '',
      showKeyboard: false,
      activeName: '1',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      dataToSubmit: {
        cardNumber: '1345',
        fName: 'Victor',
        currentDate: new Date(),
        cvc: '',
      },
    };
  },
  methods: {
    onClickLeft() {
      history.back();
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
      let self = this;
      console.log("submit", values);
      this.$axios({
        method: "POST",
        url: "/api/order/make",
        data: {bid: this.$route.query.bid},
      })
        .then((res) => {
          if (1 == res.data.code) {
            console.log(res.data);
            self.$toast.clear();
            self.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            console.log(res.data);
            self.$toast.fail(res.data.message);
            return;
          }

          self.$router.push({ name: "User_Main_Orders" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },

  mounted() {
    console.log(this.$route.query.bid);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
#datePicker {
  margin-top: 7%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#cvcInput {
  margin-top: 7%;
  background-color:lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
