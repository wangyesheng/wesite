<style lang="scss" scoped>
.content {
  .list-content {
    ::v-deep {
      .el-form {
        margin-top: 20px;
        .el-form-item {
          display: flex;
          margin-bottom: 36px;
          .el-form-item__label {
            color: #606266;
            font-size: 14px;
            width: 80px;
          }
          .el-form-item__content {
            flex: 1;
          }

          .btn-wrap {
            width: 360px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            a {
              width: 120px;
            }
          }
        }
      }
    }
  }
  .fair-details {
    .top-pannel {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 120px;
        height: 120px;
        object-fit: contain;
      }
      .center {
        p {
          margin-bottom: 10px;
          font-weight: 550;
          font-size: 15px;
          span:first-child {
            color: #666;
          }
          span:last-child {
            color: #333;
          }
        }
      }
      .right {
        text-align: right;
        .el-tag {
          margin-bottom: 36px;
        }

        a.btn-plain.disabled {
          cursor: not-allowed;
          color: #606266;
          border-color: #606266 !important;
          &:hover {
            background: #e3e7ed;
          }
        }
      }
    }

    .sub-intro {
      margin-bottom: 10px;
      &_title {
        position: relative;
        margin-left: 10px;
        font-weight: 600;
        border-bottom: 1px solid #e3e7ed;
        padding-bottom: 10px;
        &::before {
          content: "";
          width: 4px;
          height: 100%;
          background: #1565d8;
          position: absolute;
          top: -6px;
          left: -10px;
          transform: scaleY(0.5);
        }
      }

      &_content {
        padding: 10px;
        p {
          text-indent: 2em;
          font-size: 0.95555em;
          line-height: 1.6em;
        }

        .photos-wrap {
          padding: 32px;
          .photos-inner {
            display: flex;
            flex-wrap: wrap;

            .photo-layer {
              width: 180px;
              height: 180px;
              padding: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px dashed #f6e2b6;
              border-radius: 5px;
              margin-bottom: 20px;
              margin-right: 20px;

              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="common-card w750">
          <div class="title mb10">
            <span>
              {{ jobFariInfo.title }}
            </span>
            <i class="el-icon-back" @click="$router.go(-1)">返回</i>
          </div>
          <div class="fair-details">
            <div class="top-pannel">
              <img :src="jobFariInfo.photoUrl" alt="" />
              <div class="center">
                <p>
                  <span>主办单位：</span>
                  <span>{{ jobFariInfo.organizer }}</span>
                </p>
                <p>
                  <span>协办单位：</span>
                  <span>{{ jobFariInfo.coorganizer || "-" }}</span>
                </p>
                <p>
                  <span>举办时间：</span>
                  <span>
                    {{ jobFariInfo.startTime }}
                    至
                    {{ jobFariInfo.endTime }}
                  </span>
                </p>
                <p>
                  <span>招聘会层次：</span>
                  <span>
                    {{ jobFariInfo._recruitmentLevel }}
                  </span>
                </p>
              </div>
              <div class="right">
                <el-tag
                  :type="jobFariInfo._statusMap && jobFariInfo._statusMap.type"
                >
                  {{ jobFariInfo._statusMap && jobFariInfo._statusMap.label }}
                </el-tag>
                <a
                  v-if="
                    jobFariInfo._statusMap && jobFariInfo._statusMap.value == 0
                  "
                  href="javascript:;"
                  :class="`btn-plain small ${canOrder ? '' : 'disabled'}`"
                  @click="onOrderClick"
                >
                  {{ canOrder ? "订占位" : "已订" }}
                </a>
              </div>
            </div>
            <div class="sub-intro">
              <div class="sub-intro_title">邀请函</div>
              <div class="sub-intro_content">
                <p>
                  {{ jobFariInfo.invitationLetter }}
                </p>
              </div>
            </div>
            <div
              class="sub-intro"
              v-if="jobFariInfo._images && jobFariInfo._images.length > 0"
            >
              <div class="sub-intro_title">照片墙</div>
              <div class="sub-intro_content">
                <div class="photos-wrap">
                  <div class="photos-inner">
                    <div
                      class="photo-layer"
                      v-for="(url, i) in jobFariInfo._images"
                      :key="i"
                    >
                      <img :src="url" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import dictionaryMixin from "@/mixins/dictionary.js";
import { orderPositionRes, getJobFairDetailsRes } from "@/api";
import store from "@/store";
import dayjs from "dayjs";

export default {
  name: "JOB-FAIR_DETAILS",

  mixins: [dictionaryMixin],

  components: {
    VIPForm,
    WantedPublish
  },

  data() {
    return {
      jobFariInfo: {}
    };
  },

  computed: {
    id() {
      return this.$route.query.id;
    },
    canOrder() {
      if (!this.jobFariInfo.applicant) {
        return true;
      }
      const scope = this.jobFariInfo.applicant
        .split(",")
        .find(x => store.getters.appUser.id == x);
      return scope ? false : true;
    }
  },

  methods: {
    async getJobFairDetails() {
      const data = await getJobFairDetailsRes(this.id);
      const startSecs = dayjs(new Date()).diff(
        dayjs(data.startTime),
        "seconds"
      );
      const endSecs = dayjs(new Date()).diff(dayjs(data.endTime), "seconds");
      let _statusMap = {};
      if (startSecs < 0) {
        // 未开始
        _statusMap = {
          value: 0,
          label: "未开始",
          type: "info"
        };
      } else if (startSecs > 0 && endSecs < 0) {
        // 正在进行
        _statusMap = {
          value: 1,
          label: "正在进行",
          type: "primary"
        };
      } else if (endSecs > 0) {
        // 已结束
        _statusMap = {
          value: 2,
          label: "已结束",
          type: "danger"
        };
      }
      this.jobFariInfo = {
        ...data,
        _statusMap,
        _recruitmentScale: "",
        _recruitmentLevel: "",
        photoUrl: `${process.env.VUE_APP_IMAGE_BASE_URL}${data.photoUrl}`,
        _images:
          data.images &&
          data.images
            .split(",")
            .map(x => `${process.env.VUE_APP_IMAGE_BASE_URL}${x}`)
      };
    },
    async onOrderClick() {
      if (this.canOrder) {
        await orderPositionRes(this.jobFariInfo.id);
        this.$message.success("占位成功！");
        this.getJobFairDetails();
      }
    }
  },

  watch: {
    se_people(n, o) {
      this.jobFariInfo._recruitmentScale = (
        n.find(x => x.value == this.jobFariInfo.recruitmentScale) || {}
      ).name;
    },
    s_levels(n, o) {
      this.jobFariInfo._recruitmentLevel = (
        n.find(x => x.value == this.jobFariInfo.recruitmentLevel) || {}
      ).name;
    }
  },

  async mounted() {
    await this.getJobFairDetails();
    await this._querySchoolLevel();
    await this._querySEPeople();
  }
};
</script>
