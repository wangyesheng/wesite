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

    .list-wrap {
      .item {
        position: relative;

        .details {
          position: relative;

          .el-tag {
            position: absolute;
            top: -6px;
            right: -10px;
          }
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
            <span>校园招聘会</span>
          </div>
          <div class="list-content mb20">
            <ul class="list-wrap">
              <li
                class="item"
                v-for="n in jobFairs"
                :key="n.id"
                @click="onNavTo(n)"
              >
                <img :src="n.photoUrl" alt="" />
                <div class="details">
                  <div class="__intro">
                    <p class="__intro_title">{{ n.title }}</p>
                    <div>
                      <p>
                        <span>主办单位：</span>
                        <span>{{ n.organizer }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>协办单位：</span>
                        <span>{{ n.coorganizer || "-" }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>开始时间：</span>
                        <span>{{ n.startTime }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>结束时间：</span>
                        <span>{{ n.endTime }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>占位余量：</span>
                        <span>{{ n.applicantNumber }}</span>
                      </p>
                    </div>
                  </div>
                  <el-tag :type="n._statusMap.type">
                    {{ n._statusMap.label }}
                  </el-tag>
                </div>
              </li>
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                class="mt20"
                background
                :page-size="5"
                :current-page="queryForm.page"
                @current-change="getJobFairs"
              />
            </ul>
          </div>
        </div>
        <div class="w420">
          <VIPForm class="mb10" />
          <WantedPublish class="mb10" />
          <!-- <div class="ask-question mb10">
            <span class="mb20">校企合作有什么问题？可进行提问！</span>
            <a href="#" class="btn-plain">我要提问</a>
          </div>
          <div class="se-question">
            <List
              :data="{ title: '校企相关问题', time: '2022-08-08' }"
              :repeat="3"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";
import List from "@/components/List";
import { getJobFairsRes } from "@/api";
import dayjs from "dayjs";
import store from "@/store";

export default {
  name: "job-fair",

  components: {
    VIPForm,
    WantedPublish,
    List
  },

  data() {
    return {
      queryForm: {
        page: 1,
        pageSize: 5
      },
      total: 0,
      jobFairs: []
    };
  },

  methods: {
    async getJobFairs(page = 1) {
      const { totalElements, content } = await getJobFairsRes({
        ...this.queryForm,
        page
      });
      this.total = totalElements;
      this.jobFairs = content.map(x => {
        const startSecs = dayjs(new Date()).diff(dayjs(x.startTime), "seconds");
        const endSecs = dayjs(new Date()).diff(dayjs(x.endTime), "seconds");
        let _statusMap;
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
        return {
          ...x,
          photoUrl: `${process.env.VUE_APP_IMAGE_BASE_URL}${x.photoUrl}`,
          _statusMap
        };
      });
    },
    onNavTo(scoped) {
      if (store.getters.appUser.id)
        this.$router.push("/job-fair_details?id=" + scoped.id);
      else this.$message.warning("请先登录！");
    }
  },

  mounted() {
    this.getJobFairs();
  }
};
</script>
