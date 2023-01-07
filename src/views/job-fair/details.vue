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
      img {
        width: 120px;
        height: 120px;
        object-fit: contain;
        margin-right: 20px;
      }
      .right {
        p {
          margin-bottom: 5px;
          span:first-child {
            color: #666;
          }
          span:last-child {
            color: #333;
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
              <div class="right">
                <p>
                  <span>主办单位：</span>
                  <span>{{ jobFariInfo.organizer }}</span>
                </p>
                <p>
                  <span>协办单位：</span>
                  <span>{{ jobFariInfo.coorganizer }}</span>
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
            </div>
            <div class="sub-intro">
              <div class="sub-intro_title">邀请函</div>
              <div class="sub-intro_content">
                <p>
                  {{ jobFariInfo.invitationLetter }}
                </p>
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
import dayjs from "dayjs";

export default {
  name: "JOB-FAIR_DETAILS",

  mixins: [dictionaryMixin],

  components: {
    VIPForm,
    WantedPublish
  },

  data() {
    const info = JSON.parse(localStorage.getItem("lastestJobFairDetails"));
    return {
      jobFariInfo: {
        ...info,
        _recruitmentScale: "",
        _recruitmentLevel: ""
      }
    };
  },

  watch: {
    se_people(n, o) {
      this.jobFariInfo._recruitmentScale = n.find(
        x => x.value == this.jobFariInfo.recruitmentScale
      ).name;
      console.log(this.jobFariInfo._recruitmentScale);
    },
    s_levels(n, o) {
      this.jobFariInfo._recruitmentLevel = n.find(
        x => x.value == this.jobFariInfo.recruitmentLevel
      ).name;
      console.log(this.jobFariInfo._recruitmentLevel);
    }
  },

  async mounted() {
    await this._querySchoolLevel();
    await this._querySEPeople();
  }
};
</script>
