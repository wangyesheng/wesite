<style lang="scss" scoped>
.content {
  ::v-deep {
    .el-form {
      margin-top: 20px;
      .el-form-item {
        display: flex;
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

    .el-dialog__wrapper {
      .el-dialog__body {
        text-align: center !important;
      }
    }
  }
  .list-content {
    .list-wrap {
      .item {
        position: relative;

        img {
          height: 100px;
        }
        a.btn-plain {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 120px;
          height: 30px;
          line-height: 26px;
          border-radius: 5px;
          font-size: 14px;
        }

        &:hover {
          background: #fff;
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
            <span>校企合作洽谈会</span>
          </div>
          <div class="list-content mb20">
            <ul class="list-wrap">
              <li class="item" v-for="n in 6" :key="n">
                <img src="" alt="" />
                <div class="details">
                  <div class="__intro">
                    <p class="__intro_title">第96界校企合作人才供需洽谈会</p>
                    <div>
                      <p>
                        <span>主办单位：</span>
                        <span>瑞意通用航空服务有限公司</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>协办单位：</span>
                        <span>北京师范大学</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>开始时间：</span>
                        <span>2022-10-10</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>结束时间：</span>
                        <span>2022-10-20</span>
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  href="javascript:;"
                  class="btn-plain"
                  @click="onIDDialogShow"
                >
                  我要报名
                </a>
              </li>
              <el-pagination
                layout="prev, pager, next"
                :total="1000"
                class="mt20"
                background
              >
              </el-pagination>
            </ul>
          </div>
        </div>
        <div class="w420">
          <VIPForm class="mb10" />
          <WantedPublish class="mb10" />
          <div class="ask-question mb10">
            <span class="mb20">校企合作有什么问题？可进行提问！</span>
            <a href="#" class="btn-plain">我要提问</a>
          </div>
          <div class="se-question">
            <List
              :data="{ title: '校企相关问题', time: '2022-08-08' }"
              :repeat="3"
            />
          </div>
        </div>
      </div>
      <el-dialog
        title="请选择身份"
        :visible.sync="IDDialog.visible"
        width="30%"
      >
        <el-radio-group v-model="IDDialog.activeID" @change="onIDRadioChange">
          <el-radio label="s" border>院校</el-radio>
          <el-radio label="e" border>企业</el-radio>
        </el-radio-group>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";
import List from "@/components/List";

export default {
  name: "SE-ASSOCIATION",

  components: {
    VIPForm,
    WantedPublish,
    List
  },

  data() {
    return {
      IDDialog: {
        visible: false,
        activeID: ""
      }
    };
  },

  methods: {
    onIDDialogShow() {
      this.IDDialog.visible = true;
    },
    onIDRadioChange() {
      console.log(this.IDDialog.activeID);
      this.$router.push(`se-association-${this.IDDialog.activeID}_apply?id=1`);
    }
  }
};
</script>
