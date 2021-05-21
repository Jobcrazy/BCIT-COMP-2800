<template>
  <div id="this_page">
    <van-nav-bar
      title="Make a Payment"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="$route.query.deposit"
        name="deposit"
        label="Deposit"
        readonly
      />
      <van-field
        v-model="dataToSubmit.cardNumber"
        name="number"
        label="Number"
        placeholder="Credit Card Number"
        :rules="[{ required: true, message: 'Credit card number is required' }]"
      />
      <van-field
        v-model="dataToSubmit.fName"
        name="name"
        label="Name"
        placeholder="Card holder's name"
        :rules="[{ required: true, message: 'Name is required' }]"
      />
      <van-field
        v-model="dataToSubmit.cvc"
        type="password"
        name="cvc"
        label="CVC"
        placeholder="Security Number"
        maxlength="3"
        :rules="[{ required: true, message: 'Password is required' }]"
      />
      <van-field
        v-model="dataToSubmit.expiryDate"
        name="date"
        label="Expire in"
        placeholder="Expire date"
        maxlength="20"
        @click="show=true"
        :rules="[{ required: true, message: 'Expire date is required' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">
          Pay for Deposit
        </van-button>
      </div>
      <van-action-sheet
        v-model="show"
        title="Enter expiry date"
        :closeable="false"
      >
        <van-datetime-picker
          id="datePicker"
          type="year-month"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="onConfirmDate"
        />
      </van-action-sheet>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showCalendar: false,
      minDate: new Date(2021, 1, 1),
      maxDate: new Date(2030, 12, 31),
      dataToSubmit: {
        cardNumber: "",
        fName: "",
        expiryDate: "2021-05",
        cvc: "",
      },
    };
  },
  methods: {
    dateFtt: function (fmt, date) {
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    crtTimeDate: function (crtTime) {
      return this.dateFtt("yyyy-MM", crtTime);
    },
    onConfirmDate(date) {
      this.dataToSubmit.expiryDate = this.crtTimeDate(date);
      this.show = false;
    },
    onClickLeft() {
      history.back();
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}`;
      } else if (type === "month") {
        return `${val}`;
      }
      return val;
    },
    onSubmit() {
      let self = this;
      this.$axios({
        method: "POST",
        url: "/api/order/make",
        data: { bid: this.$route.query.bid },
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
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#this_page {
  padding-top: 50px;
  padding-bottom: 20px;
}
#datePicker {
  margin-top: 7%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#cvcInput {
  margin-top: 7%;
  background-color: lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
