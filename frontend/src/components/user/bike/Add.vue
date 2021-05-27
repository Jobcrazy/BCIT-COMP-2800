<template>
  <div id="this_page">
    <van-nav-bar
      title="Add a bike"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <van-dialog
      v-model="show"
      title="Location of your bike"
      :beforeClose="onCloseMap"
    >
      <div id="map_container">
        <div id="bike_map" />
      </div>
    </van-dialog>

    <van-form @submit="onSubmit">
      <van-field
        v-model="dataToSubmit.title"
        name="title"
        label="Title"
        placeholder="Enter Title"
        :rules="[{ required: true, message: 'Title is required' }]"
      />
      <van-field
        v-model="dataToSubmit.description"
        type="textarea"
        name="description"
        label="Description"
        placeholder="Enter Description"
        rows="2"
        autosize
        maxlength="1000"
        show-word-limit
        :rules="[{ required: true, message: 'A description is required' }]"
      />
      <van-field
        v-model="dataToSubmit.deposit"
        type="number"
        name="deposit"
        label="Deposit"
        placeholder="Enter the deposit amount"
        :rules="[{ required: true, message: 'A deposit amount is required' }]"
      />
      <van-field
        v-model="dataToSubmit.price"
        type="number"
        name="price"
        label="Price"
        placeholder="Enter the fee amount"
        :rules="[{ required: true, message: 'A fee amount is required' }]"
      />

      <van-cell is-link @click="showPopup">
        <template #right-icon v-if="dataToSubmit.location">
          <van-icon name="location" color="red" class="location" /> </template
        >Pick Location</van-cell
      >

      <van-row>
        <van-col span="1" />
        <van-col span="22">
          <p></p>
          <van-uploader
            v-model="rawPhotos"
            multiple
            :deletable="false"
            :after-read="uploadImage"
            :max-count="6"
          />
        </van-col>
        <van-col span="1" />
      </van-row>

      <div style="margin: 16px">
        <van-button block type="info" native-type="onSubmit">
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
      rawPhotos: [],
      dataToSubmit: {
        photos: [],
        title: "",
        description: "",
        deposit: "",
        price: "",
        location: null,
      },
      show: false,
      map: null,
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
    onCloseMap(action, done) {
      done();
    },
    uploadImage(file) {
      let self = this;
      // Set status
      file.status = "uploading";
      file.message = "Uploading...";
      // Upload file
      let form = new FormData();
      form.append("file", file.file);
      self
        .$axios({
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          url: "/api/file/upload",
          data: form,
        })
        .then((res) => {
          if (1 == res.data.code) {
            // Not login
            self.$toast.clear();
            self.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            // Other errors
            file.status = "failed";
            file.message = "Failed";
            return;
          }
          // Done uploading
          file.status = "done";
          // Set the unique id for this file
          file.id = res.data.data[0].id;

          self.dataToSubmit.photos.push(file.id);
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    showPopup() {
      this.show = true;
    },

    initMap: function () {
      let self = this;
      self.map = new google.maps.Map(document.getElementById("bike_map"), {
        center: { lat: 49.13, lng: -123.06 },
        zoom: 10,
        disableDefaultUI: true,
        gestureHandling: "greedy",
      });
      let marker;
      self.map.addListener("click", (e) => {
        self.dataToSubmit.location = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        if (marker) {
          marker.setPosition(self.dataToSubmit.location);
          self.map.panTo(self.dataToSubmit.location);
        } else {
          marker = new google.maps.Marker({
            position: self.dataToSubmit.location,
            map: self.map,
          });
          self.map.panTo(self.dataToSubmit.location);
        }
      });
    },

    onSubmit(values) {
      let self = this;
      this.$axios({
        method: "POST",
        url: "/api/bike/add",
        data: this.dataToSubmit,
      })
        .then((res) => {
          if (1 == res.data.code) {
            self.$toast.clear();
            self.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            self.$toast.fail(res.data.message);
            return;
          }

          self.$router.push({ name: "User_Main" });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
  updated() {
    if (this.show && !this.map) {
      this.initMap();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map_container {
  width: 100%;
  height: 100vw;
}

#bike_map {
  width: 100%;
  height: 100%;
}

#this_page{
  padding-top: 46px;
  padding-bottom: 20px;
}

.location {
  font-size: 1.5em;
}
</style>