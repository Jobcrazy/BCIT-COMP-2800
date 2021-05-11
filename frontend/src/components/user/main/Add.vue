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
      <van-popup v-model="show">
        <div id="bike_map"></div>
        google map goes here
      </van-popup>

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
      map: null,
    };
  },
  methods: {
    afterRead(file) {
      console.log(file);
    },
    showPopup() {
      this.show = true;
      this.initMap();
    },

    initMap: function () {
      let self = this;
      this.map = new google.maps.Map(document.getElementById("bike_map"), {
        center: { lat: 49.13, lng: -123.06 },
        zoom: 10,
        disableDefaultUI: true,
      });
      // // Test: Add a marker
      // var myCenter = new google.maps.LatLng(49.13, -123.06);
      // var marker = new google.maps.Marker({
      //   position: myCenter,
      //   icon: "static/images/bike.png",
      // });
      // marker.setMap(this.map);
      // // Test: Add an event listening to the marker
      // google.maps.event.addListener(marker, "click", function () {
      //   self.$toast("Hello, Joon!");
      // });
      // // Tip: Add marker cluster please see:
      // // https://developers.google.com/maps/documentation/javascript/marker-clustering
    },

    onSubmit(values,) {
      console.log('submit', values);

    },
  },
  // mounted() {
  //   this.initMap();
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bike_map {
  width: 100%;
  height: 100%;
}
</style>
