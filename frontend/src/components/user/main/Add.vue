<template>
  <div>
    <van-form @submit="onSubmit">
      <van-uploader
        v-model="dataToSubmit.photos"
        multiple
        :after-read="uploadImage"
        :max-count="6"
      />
      <van-field
        v-model="dataToSubmit.title"
        name="title"
        label="Post Title"
        placeholder="Enter Title"
        :rules="[{ required: true, message: 'Title is required' }]"
      />
      <van-field
        v-model="dataToSubmit.description"
        type="textarea"
        name="description"
        label="Bike Description"
        placeholder="Enter Description"
        rows="5"
        autosize
        maxlength="1000"
        show-word-limit
        :rules="[{ required: true, message: 'A description is required' }]"
      />
      <van-field
        v-model="dataToSubmit.deposit"
        type="number"
        name="deposit"
        label="Deposit Amount"
        placeholder="Enter the deposit amount"
        :rules="[{ required: true, message: 'A deposit amount is required' }]"
      />
      <van-field
        v-model="dataToSubmit.price"
        type="number"
        name="price"
        label="Renting Fee"
        placeholder="Enter the fee amount"
        :rules="[{ required: true, message: 'A fee amount is required' }]"
      />

      <van-cell is-link @click="showPopup">Pick Location</van-cell>
      <van-popup id="pop_map" v-model="show" closeable close-icon=close>
        <div id="bike_map"></div>
      </van-popup>

      <!--      <van-cell is-link @click="showPopup">Pick Location</van-cell>-->
      <!--      <van-dialog id="pop_map" v-model="show" title="map goes here" show-cancel-button>-->
      <!--        <div id="bike_map"></div>-->
      <!--      </van-dialog>-->


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
      dataToSubmit: {
        photos: [],
        title: "",
        description: "",
        deposit: "",
        price: "",
        location: {},
      },
      show: false,
      map: null
    };
  },
  methods: {
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
          headers: {"Content-Type": "multipart/form-data"},
          url: "/api/file/upload",
          data: form,
        })
        .then((res) => {
          if (1 == res.data.code) {
            // Not login
            self.$toast.clear();
            self.$router.push({name: "Login"});
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
          //console.log(res.data.data[0]);
          self.photos.push(file.id);
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    showPopup() {
      this.show = true;
      this.initMap();
    },

    initMap: function () {
      let self = this;
      self.map = new google.maps.Map(document.getElementById("bike_map"), {
        center: {lat: 49.13, lng: -123.06},
        zoom: 10,
        disableDefaultUI: true,
      });
      let marker;
      self.map.addListener("click", (e) => {
        console.log(e.latLng.lat() + "---" + e.latLng.lng());
        self.dataToSubmit.location = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
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


    onSubmit(values,) {
      let self = this;
      console.log('submit', values);
      this
        .$axios({
          method: "POST",
          url: "/api/bike/add",
          data: this.dataToSubmit,
        })
        .then((res) => {
          console.log(res.data);
          if (1 == res.data.code) {
            self.$toast.clear();
            self.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            //stuff
            return;
          }

        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pop_map {
  width: 80%;
  height: 80%;
}

#bike_map {
  width: 100%;
  height: 100%;
}
</style>
