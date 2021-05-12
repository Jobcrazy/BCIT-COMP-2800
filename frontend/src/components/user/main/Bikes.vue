<template>
  <div id="container">
    <van-nav-bar id="title" title="Bike2Go" />
    <div id="bike_map"></div>
  </div>
</template>

<script>
export default {
  name: "User_Main_Bikes",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap: function () {
      let self = this;
      this.map = new google.maps.Map(document.getElementById("bike_map"), {
        center: { lat: 49.13, lng: -123.06 },
        zoom: 10,
        disableDefaultUI: true,
      });

      // Test: Add a marker
      var myCenter = new google.maps.LatLng(49.13, -123.06);
      var marker = new google.maps.Marker({
        position: myCenter,
        icon: "static/images/bike.png",
      });
      marker.setMap(this.map);

      // Test: Add an event listening to the marker
      google.maps.event.addListener(marker, "click", function () {
        self.$toast("Hello, Joon!");
      });

      // Tip: Add marker cluster please see:
      // https://developers.google.com/maps/documentation/javascript/marker-clustering
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title >>> * {
  font-weight: 900 !important;
}

#container {
  width: 100%;
  height: 100%;
}

#bike_map {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
