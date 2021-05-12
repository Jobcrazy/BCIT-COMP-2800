<template>
  <div>
    <van-nav-bar
      title="About Us"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-row id="topImage">
      <van-image width="100%" height="211px" src="static/images/about.jpg" />
    </van-row>
    <van-row>
      <van-col span="1" />
      <van-col span="22">
        <p>
          <b>Bike2Go</b> is developed by Destroy Bikes, which is the most famous
          web app development team at BCIT. You could rent bikes and rent out
          bikes with Bike2Go to reduce the use of fossil fuels.
          <span id="slogan">Let's make Vancouver greener together!</span>
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
          <van-col span="14">
            <van-row class="name">James</van-row>
            <van-row class="position">Backend Developer</van-row>
            <van-row class="description"
              >1. Was a Product Manager <br />2. Like wathcing movies</van-row
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
          <van-col span="14">
            <van-row class="name">Joon</van-row>
            <van-row class="position">Backend Developer</van-row>
            <van-row class="description"
              >1. Was a Product Manager <br />2. Like wathcing movies</van-row
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
          <van-col span="14">
            <van-row class="name">Victor</van-row>
            <van-row class="position">Frontend Developer</van-row>
            <van-row class="description"
              >1. Was a Product Manager <br />2. Like wathcing movies</van-row
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
          <van-col span="14">
            <van-row class="name">Hyerim</van-row>
            <van-row class="position">Frontend Developer</van-row>
            <van-row class="description"
              >1. Was a Product Manager <br />2. Like wathcing movies</van-row
            >
            <van-divider />
          </van-col>
        </van-row>
        <van-row id="footer">Copyright@2021 Destroy Bikes</van-row>
      </van-col>
      <van-col span="1" />
    </van-row>
  </div>
</template>

<script>
export default {
  name: "User_Me_About",
  data() {
    return {};
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

#footer{
  font-size: 0.8em;
  text-align: center;
  margin-bottom: 30px;
}
</style>
