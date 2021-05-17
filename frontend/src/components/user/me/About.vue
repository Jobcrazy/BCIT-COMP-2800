<template>
  <div id="this_page">
    <van-nav-bar
      title="About Us"
      left-text="Back"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <van-row id="topImage" v-if="EasterCounter < 5">
      <van-image
        width="100%"
        height="211px"
        src="static/images/about.jpg"
        v-on:click="EasterCounter += 1"
      />
    </van-row>
    <van-row id="topImage" v-else-if="EasterCounter < 10">
      <van-image
        width="50%"
        height="106px"
        src="static/images/about.jpg"
        v-on:click="EasterCounter += 1"
      />
    </van-row>
    <van-row id="topImage" v-else-if="EasterCounter < 15">
      <van-image
        width="25%"
        height="53px"
        src="static/images/about.jpg"
        v-on:click="EasterCounter += 1"
      />
    </van-row>
    <van-row id="topImage" v-else-if="EasterCounter < 20">
      <van-image
        width="12.5%"
        height="26px"
        src="static/images/about.jpg"
        v-on:click="EasterCounter += 1"
      />
    </van-row>
    <van-row id="topImage" v-else>
      <van-image
        width="100%"
        height="100%"
        src="static/images/EasterEgg1.png"
        v-on:click="EasterCounter += 1"
      />
    </van-row>

    <van-row>
      <van-col span="1" />
      <van-col span="22">
        <p>
          <b>Bike2Go</b> is developed by Bikes4U, the most famous web app
          development team at BCIT. It was originally created to address the
          bike shortages due to COVID-19. Anyone can rent or rent out bikes with
          Bike2Go to reduce their carbon footprint and get some exercise in.
          Make your next trip happen with your own two legs.

          <span id="slogan">Bike2Go, powered by you, for the planet.</span>
        </p>
        <van-divider />
        <van-row>
          <van-col span="7"
            ><van-image
              radius="5px"
              width="5rem"
              height="5rem"
              src="static/images/james.png"
          /></van-col>
          <van-col span="17">
            <van-row class="name">James</van-row>
            <van-row class="position">Backend Developer</van-row>
            <van-row class="description"
              >1. Was a Product Manager <br />2. Huge foodie</van-row
            >
            <van-divider />
          </van-col>
        </van-row>

        <van-row>
          <van-col span="7"
            ><van-image
              radius="5px"
              width="5rem"
              height="5rem"
              src="static/images/joon.png"
          /></van-col>
          <van-col span="17">
            <van-row class="name">Joon</van-row>
            <van-row class="position">Backend Developer</van-row>
            <van-row class="description"
              >1. A jonior developer<br />2. Loves watching movies</van-row
            >
            <van-divider />
          </van-col>
        </van-row>

        <van-row>
          <van-col span="7"
            ><van-image
              radius="5px"
              width="5rem"
              height="5rem"
              src="static/images/victor.png"
          /></van-col>
          <van-col span="17">
            <van-row class="name">Victor</van-row>
            <van-row class="position">Frontend Developer</van-row>
            <van-row class="description"
              >1. Fried chicken aficionado<br />2. Loves biking at Stanley
              Park</van-row
            >
            <van-divider />
          </van-col>
        </van-row>

        <van-row>
          <van-col span="7"
            ><van-image
              radius="5px"
              width="5rem"
              height="5rem"
              src="static/images/hyerim.png"
          /></van-col>
          <van-col span="17">
            <van-row class="name">Hyerim</van-row>
            <van-row class="position">Frontend Developer</van-row>
            <van-row class="description"
              >1. very new to Vancouver <br />2. Love walking with my
              dog</van-row
            >
            <van-divider />
          </van-col>
        </van-row>
        <van-row id="footer">Copyright@2021 Bikes4U</van-row>
      </van-col>
      <van-col span="1" />
    </van-row>
  </div>
</template>

<script>
export default {
  name: "User_Me_About",
  data() {
    return {
      EasterCounter: 0,
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#slogan {
  color: green;
  font-weight: bolder;
}

.name {
  font-weight: bold;
  margin-top: 5px;
}

.position {
  font-size: 0.8em;
  margin-top: 2px;
}

.description {
  font-size: 0.9em;
  margin-top: 5px;
}

#footer {
  font-size: 0.8em;
  text-align: center;
}

#this_page {
  padding-top: 46px;
  padding-bottom: 20px;
}
</style>
