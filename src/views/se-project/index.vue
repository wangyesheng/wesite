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

        .details .__intro > div > p {
          max-height: 80px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          font-size: 0.9555em;
          letter-spacing: 0.1em;
        }

        .el-tag {
          position: absolute;
          top: 10px;
          right: 10px;
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
            <span>校企合作项目</span>
          </div>
          <div class="list-content mb20">
            <ul class="list-wrap">
              <li
                class="item"
                v-for="n in projects"
                :key="n.id"
                @click="onNavTo(n)"
              >
                <img :src="n.imageLogo" alt="" />
                <div class="details">
                  <div class="__intro">
                    <p class="__intro_title">{{ n.projectTitle }}</p>
                    <div>
                      <p>
                        {{ n.content }}
                      </p>
                    </div>
                  </div>
                </div>
                <el-tag :type="n.projectType == 1 ? 'primary' : 'success'">
                  {{ n.projectType == 1 ? "学校" : "企业" }}
                </el-tag>
              </li>
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                class="mt20"
                background
                :page-size="5"
                :current-page="queryForm.page"
                @current-change="getProjects"
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
import { getCooperativeProjectRes } from "@/api";

export default {
  name: "se-project",

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
      projects: []
    };
  },

  methods: {
    async getProjects(page = 1) {
      const { totalElements, content } = await getCooperativeProjectRes({
        ...this.queryForm,
        page
      });
      this.total = totalElements;
      this.projects = content.map(x => ({
        ...x,
        authorizationLetterUrl: `${process.env.VUE_APP_IMAGE_BASE_URL}${
          x.authorizationLetterUrl
        }`,
        imageLogo: `${process.env.VUE_APP_IMAGE_BASE_URL}${x.imageLogo}`
      }));
    },
    onNavTo(scoped) {
      localStorage.setItem("lastestSEProjectDetails", JSON.stringify(scoped));
      this.$router.push("/se-project_details");
    }
  },

  mounted() {
    this.getProjects();
  }
};
</script>
