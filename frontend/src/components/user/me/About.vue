<template>
  <div>
    <van-nav-bar
      title="About Us"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>We are making Vancouver greener</van-swipe-item>
      <van-swipe-item>Providing the best service</van-swipe-item>
      <van-swipe-item>Create more bikers</van-swipe-item>
      <van-swipe-item>Enjoy your favorite bike!</van-swipe-item>
    </van-swipe>
    <div class="center"><p>Meet Our Team</p></div>
    <div class="members">
      <transition name="van-fade">
        <div v-show="visible">Fade</div>
      </transition>
      <van-row>
        <van-col span="8"
          ><van-image
            round
            width="5rem"
            height="5rem"
            src="static/images/james.png"
        /></van-col>
        <van-col span="8">James</van-col>
        <van-col span="8">Backend Developer</van-col>
      </van-row>
      <van-row>
        <van-col span="8"
          ><van-image
            round
            width="5rem"
            height="5rem"
            src="static/images/joon.png"
        /></van-col>
        <van-col span="8">Joon</van-col>
        <van-col span="8">Backend Developer</van-col>
      </van-row>
      <van-row>
        <van-col span="8"
          ><van-image
            round
            width="5rem"
            height="5rem"
            src="static/images/victor.png"
        /></van-col>
        <van-col span="8">Victor</van-col>
        <van-col span="8">Frontend Developer</van-col>
      </van-row>
      <van-row>
        <van-col span="8"
          ><van-image
            round
            width="5rem"
            height="5rem"
            src="static/images/hyerim.png"
        /></van-col>
        <van-col span="8">Hyerim</van-col>
        <van-col span="8">Frontend Developer</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "User_Me_About",
  data() {
    return {};
  },
  methods:{
    onClickLeft() {
      history.back();
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.members {
  padding-bottom: 5rem;
  font-size: 0.8rem;
  text-align: center;
  justify-content: flex;
}
.center {
  text-align: center;
  padding-bottom: 1rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fcac61;
}
</style>
