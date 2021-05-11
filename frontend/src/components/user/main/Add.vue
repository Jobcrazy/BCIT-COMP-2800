<template>
  <div>
    <van-form @submit="onSubmit">
      <van-uploader
        v-model="imageList"
        multiple
        :after-read="afterRead"
        :max-count="6"
      />
      <van-field
        v-model="title"
        name="Title"
        label="Post Title"
        placeholder="Enter Title"
        :rules="[{ required: true, message: 'Title is required' }]"
      />
      <van-field
        v-model="description"
        type="textarea"
        name="Description"
        label="Bike Description"
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
        label="Deposit Amount"
        placeholder="Enter the deposit amount"
        :rules="[{ required: true, message: 'A deposit amount is required' }]"
      />
      <van-field
        v-model="fee"
        type="number"
        name="fee"
        label="Renting Fee"
        placeholder="Enter the fee amount"
        :rules="[{ required: true, message: 'A fee amount is required' }]"
      />

      <van-cell is-link @click="showPopup">Pick Location</van-cell>
      <van-popup v-model="show">Google Map Goes Here</van-popup>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          Submit
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [],
      title: "",
      description: "",
      deposit: "",
      fee: "",
      show: false,
    };
  },
  methods: {
    afterRead(file) {
      console.log(file);
    },
    showPopup() {
      this.show = true;
    },
    onSubmit(values,) {
      console.log('submit', values);

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
