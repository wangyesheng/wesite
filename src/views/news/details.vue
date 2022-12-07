<style lang="scss" scoped>
.content {
  .common-card {
    .time {
      color: #5e5e5e;
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="common-card w750">
          <h1>{{ info.title }}</h1>
          <p class="time">{{ info._fullTime }}</p>
          <p v-html="info.text"></p>
        </div>
        <div class="w420">
          <VIPForm class="mb10" />
          <WantedPublish />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";
import dayjs from "dayjs";

export default {
  name: "INFO-DETAILS",

  components: {
    VIPForm,
    WantedPublish
  },

  data() {
    return {
      info: JSON.parse(localStorage.getItem("lastestInfo") || "{}")
    };
  },

  mounted() {
    this.info = {
      ...this.info,
      _fullTime: dayjs(this.info.created).format("YYYY-MM-DD HH:mm:ss")
    };
  }
};
</script>
