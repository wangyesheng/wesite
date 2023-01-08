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
  .project-details {
    color: #000;
    &_title {
      text-align: center;
      margin-bottom: 30px;
    }

    &_organAndTime {
      width: 600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &_content {
      text-indent: 2em;
      font-size: 0.95555em;
      line-height: 1.6em;
      margin-bottom: 20px;
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
        .photo-layer {
          width: 280px;
          height: 280px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          text-align: center;
          width: 100%;

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
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="common-card w750">
          <div class="title mb10">
            <span>
              校企合作项目 -
              {{ projectInfo.projectType == 1 ? "学校" : "企业" }}
            </span>
            <i class="el-icon-back" @click="$router.go(-1)">返回</i>
          </div>
          <div class="project-details">
            <h2 class="project-details_title">
              {{ projectInfo.projectTitle }}
            </h2>
            <div class="project-details_organAndTime">
              <span>项目单位名称：{{ projectInfo.projectOrgan }}</span>
              <span>发布时间：{{ projectInfo._publishTime }}</span>
            </div>
            <p class="project-details_content">{{ projectInfo.content }}</p>
            <div class="sub-intro">
              <div class="sub-intro_title">委托书</div>
              <div class="sub-intro_content">
                <div class="photo-layer">
                  <img :src="projectInfo.authorizationLetterUrl" alt="" />
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
import dayjs from "dayjs";

export default {
  name: "SE-PROJECT_DETAILS",

  components: {
    VIPForm,
    WantedPublish
  },

  data() {
    const info = JSON.parse(localStorage.getItem("lastestSEProjectDetails"));
    return {
      projectInfo: {
        ...info,
        _publishTime: dayjs(info.createdDate).format("YYYY-MM-DD HH:mm:ss")
      }
    };
  }
};
</script>
