<style lang="scss" scoped>
.content {
  .common-card {
    .back-icon {
      height: 30px;
      text-align: right;
      & /deep/ .el-icon-back {
        font-size: 18px;
        cursor: pointer;
        color: #000;
        font-weight: 550;
        transition: 0.3s;
        &:hover {
          color: #1565d8;
        }
      }
    }

    h1 {
      color: #000;
    }
    .time-source {
      color: #5e5e5e;
      display: flex;
      justify-content: space-between;
      margin: 0 auto 20px;
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="common-card w750">
          <div class="back-icon">
            <i class="el-icon-back" @click="$router.go(-1)">返回</i>
          </div>
          <h1>{{ info.title }}</h1>
          <p class="time-source">
            <span>发布时间：{{ info._fullTime }}</span>
            <span>来源：{{ info.source }}</span>
          </p>
          <p class="richtext" v-html="info.text"></p>
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

    this.$nextTick(() => {
      const richtextEl = document.querySelector(".richtext");
      const imgEls = richtextEl.getElementsByTagName("img");
      const ps = richtextEl.getElementsByTagName("p");

      Array.prototype.forEach.call(imgEls, img => {
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "contain";
      });
      Array.prototype.forEach.call(ps, p => {
        p.style.marginBottom = "10px";
        p.style.letterSpacing = "0.1em";
        p.style.textIndent = "2em";
        p.style.color = "#000";
      });
    });
  }
};
</script>
