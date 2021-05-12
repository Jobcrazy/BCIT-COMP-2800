<template>
  <div id="bike_map"></div>
</template>

<script>
export default {
  name: "User_Main_Bikes",
  data() {
    return {
      map: null,
      bikes: null,
    };
  },
  methods: {
    loadBike: function () {
      let self = this;

      self.$toast.loading({
        message: "Loading...",
        forbidClick: true,
      });

      this.$axios({
        method: "POST",
        headers: { "content-type": "application/json" },
        url: "/api/bike/find",
        data: {
          location: {
            lat: 49.13,
            long: -123.06,
          },
          distance: 100000,
        },
      })
        .then((res) => {
          if (1 == res.data.code) {
            // Not login
            self.$toast.clear();
            this.$router.push({ name: "Login" });
            return;
          } else if (0 != res.data.code) {
            // Other errors
            return self.$toast.fail(res.data.message);
          }

          this.bikes = res.data.data;

          // Add markers
          const markers = this.bikes.map((bike, i) => {
            // Create makers
            let marker = new google.maps.Marker({
              position: { lng: bike.location.x, lat: bike.location.y },
              icon: "static/images/bike.png",
            });

            // Add an event listener for markers
            google.maps.event.addListener(marker, "click", function () {
              self.$toast("Hello, Joon!");
            });
            return marker;
          });

          new MarkerClusterer(self.map, markers, {
            imagePath:
              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          });
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
    initMap: function () {
      let self = this;
      self.map = new google.maps.Map(document.getElementById("bike_map"), {
        center: { lat: 49.13, lng: -123.06 },
        zoom: 10,
        disableDefaultUI: true,
      });
    },
  },
  mounted() {
    this.initMap();
    this.loadBike();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bike_map {
  width: 100%;
  height: 100%;
}
</style>
