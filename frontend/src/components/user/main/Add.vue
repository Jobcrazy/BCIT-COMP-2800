<template>
  <div>
    <van-nav-bar
      title="Add a bike"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="title"
        name="Title"
        label="Title"
        placeholder="Enter Title"
        :rules="[{ required: true, message: 'Title is required' }]"
      />
      <van-field
        v-model="description"
        type="textarea"
        name="Description"
        label="Description"
        placeholder="Enter Description"
        rows="5"
        autosize
        maxlength="1000"
        show-word-limit
        :rules="[{ required: true, message: 'A description is required' }]"
      />
      <van-field
        v-model="deposit"
        type="number"
        name="deposit"
        label="Deposit"
        placeholder="Enter the deposit amount"
        :rules="[{ required: true, message: 'A deposit amount is required' }]"
      />
      <van-field
        v-model="fee"
        type="number"
        name="fee"
        label="Fee"
        placeholder="Enter the fee amount"
        :rules="[{ required: true, message: 'A fee amount is required' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> Submit </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      deposit: "",
      fee: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onClickLeft() {
      history.back();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>