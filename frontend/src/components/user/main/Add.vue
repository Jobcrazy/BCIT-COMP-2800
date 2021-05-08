<template>
  <div>
    <van-uploader
      v-model="imageList"
      multiple
      :after-read="uploadImage"
      :max-count="6"
    />
  </div>
</template>

<script>
export default {
  name: "User_Main_Add",
  data() {
    return {
      imageList: [],
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

          console.log(res.data.data[0]);
        })
        .catch(function (error) {
          self.$toast.fail(error);
        });
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
