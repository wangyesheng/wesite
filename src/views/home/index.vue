<style lang="scss" scoped>
.content {
  .first {
    .list-wrap {
      height: 260px;
      overflow: hidden;
    }
  }

  .second {
    background: #fff;
    height: 260px;
  }

  .banner0 {
    background: url("../../assets/banner/banner0.png") no-repeat 0 0/100% 100%;
    height: 120px;
  }

  .banner1 {
    background: url("../../assets/banner/banner1.png") no-repeat 0 0/100% 100%;
    height: 120px;
  }

  .third {
    .lastest-se-projects {
      width: 768px;
    }

    .list-content {
      height: calc(100% - 80px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .fourth {
    div {
      width: 546px;
      height: 80px;
      border-radius: 8px;

      &:first-child {
        background: url("../../assets/banner/help.png") no-repeat 0 0/100% 100%;
      }

      &:last-child {
        background: url("../../assets/banner/cooperation.png") no-repeat 0 0/100%
          100%;
      }
    }
  }

  .five,
  .six {
    .common-card {
      .img-content {
        div {
          img {
            width: 270px;
            height: 210px;
            border-radius: 8px;
          }
          div {
            display: -webkit-box;
            width: 180px;
            height: 36px;
            color: #183b56;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }

  .seven.shadow-wrap {
    .list-wrap {
      height: 260px;
      overflow: hidden;
    }
  }

  .eight {
    color: #183b56;
    background: #fff;
    padding: 40px 0px;
    box-shadow: 0px 10px 35px 1px rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    p.title {
      font-size: 38px;
      letter-spacing: 2px;
      text-align: center;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
    }

    .panel-wrap {
      display: flex;
      justify-content: space-evenly;

      .panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .count {
          font-size: 44px;
          color: #1565d8;
          font-style: italic;
        }

        p {
          font-size: 20px;
          color: #5a7184;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="flex-jc-sb mb20">
        <div class="first shadow-wrap w750">
          <el-tabs type="border-card">
            <el-tab-pane label="行业动态">
              <List :data="industryTrends.data" />
              <el-pagination
                background
                layout="prev, pager, next"
                :total="industryTrends.total"
                :page-size="5"
                :current-page="industryTrends.page"
                @current-change="getIndustryTrends"
              />
            </el-tab-pane>
            <el-tab-pane label="通知文件">
              <List :data="notices.data" />
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                :total="notices.total"
                :current-page="notices.page"
                @current-change="getNotices"
              />
            </el-tab-pane>
            <el-tab-pane label="政策解读">
              <List :data="interpretationPolicys.data" />
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="5"
                :total="interpretationPolicys.total"
                :current-page="interpretationPolicys.page"
                @current-change="getInterpretationPolicys"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
        <VIPForm class="w420" />
      </div>
      <div class="banner0 mb20"></div>
      <div class="eight mb20">
        <p class="title mb40">校企汇合作平台 · 职业教育产教融合的桥梁</p>
        <div class="panel-wrap">
          <div class="panel">
            <div class="count">
              <count-to
                :start-val="0"
                :end-val="7000"
                :duration="2600"
                class="card-panel-num"
              />
              <span>+</span>
            </div>
            <p>校企项目</p>
          </div>
          <div class="panel">
            <div class="count">
              <count-to
                :start-val="0"
                :end-val="5000"
                :duration="2600"
                class="card-panel-num"
              />
              <span>+</span>
            </div>
            <p>校企机构</p>
          </div>
          <div class="panel">
            <div class="count">
              <count-to
                :start-val="0"
                :end-val="5000"
                :duration="2600"
                class="card-panel-num"
              />
              <span>+</span>
            </div>

            <p>校企合作项目</p>
          </div>
          <div class="panel">
            <div class="count">
              <count-to
                :start-val="0"
                :end-val="300"
                :duration="2600"
                class="card-panel-num"
              />
              <span>万+</span>
            </div>

            <p>访问次数</p>
          </div>
        </div>
      </div>
      <div class="second mb20 flex-jc-sb">
        <div class="common-card">
          <div class="title">
            <span>校企发布文件</span>
          </div>
          <div class="img-content mt20 flex-jc-sb">
            <div>
              <img src="../../assets/icon/gs.png" alt="" />
              <span>文件1</span>
            </div>
            <div>
              <img src="../../assets/icon/bw.png" alt="" />
              <span>文件2</span>
            </div>
            <div>
              <img src="../../assets/icon/gwy.png" alt="" />
              <span>文件3</span>
            </div>
          </div>
        </div>
        <div class="common-card">
          <div class="title">
            <span>我是企业</span>
          </div>
          <div class="img-content mt20 flex-jc-sb">
            <div>
              <img src="../../assets/icon/yxk.png" alt="" />
              <span>院校库</span>
            </div>
            <div>
              <img src="../../assets/icon/rlzy.png" alt="" />
              <span>人力资源</span>
            </div>
            <div>
              <img src="../../assets/icon/yxdj.png" alt="" />
              <span>院校对接</span>
            </div>
          </div>
        </div>
        <div class="common-card">
          <div class="title">
            <span>我是高校</span>
          </div>
          <div class="img-content mt20 flex-jc-sb">
            <div>
              <img src="../../assets/icon/qyk.png" alt="" />
              <span>企业库</span>
            </div>
            <div>
              <img src="../../assets/icon/zsfw.png" alt="" />
              <span>招生服务</span>
            </div>
            <div>
              <img src="../../assets/icon/fws.png" alt="" />
              <span>服务商</span>
            </div>
          </div>
        </div>
      </div>
      <div class="banner1 mb20"></div>
      <div class="third mb20 flex-jc-sb">
        <div class="common-card lastest-se-projects ">
          <div class="title">
            <span>最新校企合作项目</span>
            <a href="javascript:;" @click="$router.push('/se-project')">
              更多>
            </a>
          </div>
          <div class="list-content">
            <List :data="projects.data" />
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="15"
              :total="projects.total"
              :current-page="projects.page"
              @current-change="getProjects"
            />
          </div>
        </div>
        <div class="third-right">
          <WantedPublish class="mb10" />
          <div class="swiper mb10">
            <el-carousel height="200px">
              <el-carousel-item
                v-for="item in banners"
                :key="item"
                :style="{ background: `url(${item}) no-repeat 0 0/100% 100%` }"
              >
              </el-carousel-item>
            </el-carousel>
          </div>
          <Question />
        </div>
      </div>
      <div class="fourth mb20 flex-jc-sb">
        <div></div>
        <div></div>
      </div>
      <!-- 
      <div class="five mb20">
        <div class="common-card">
          <div class="title">
            <span>校企合作会</span>
            <a href="#">更多></a>
          </div>
          <div class="img-content mt20 flex-jc-sb">
            <div>
              <img src="../../assets/se/cooperation/0.jpg" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/cooperation/1.jpg" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/cooperation/2.jpg" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/cooperation/3.jpg" alt="" />
              <div>
                第98界校企合作人才供需 访企拓岗交流会企拓岗交流企拓岗交流
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="six mb20">
        <div class="common-card">
          <div class="title">
            <span>校园招聘会</span>
            <a href="#">更多></a>
          </div>
          <div class="img-content mt20 flex-jc-sb">
            <div>
              <img src="../../assets/se/recruitment/0.png" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/recruitment/1.jpg" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/recruitment/2.jpg" alt="" />
              <div>第98界校企合作人才供需 访企拓岗交流会</div>
            </div>
            <div>
              <img src="../../assets/se/recruitment/3.jpg" alt="" />
              <div>
                第98界校企合作人才供需 访企拓岗交流会企拓岗交流企拓岗交流
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="seven shadow-wrap mb40 flex-jc-sb">
        <div class="w580">
          <div class="common-card">
            <div class="title mb10">
              <span>企业</span>
            </div>
            <div class="list-content">
              <el-tabs type="border-card">
                <el-tab-pane label="招聘">
                  <List :data="enterPriseRecruitments.data" />
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="enterPriseRecruitments.total"
                    :current-page="enterPriseRecruitments.page"
                    @current-change="getEnterPriseRecruitments"
                  />
                </el-tab-pane>
                <el-tab-pane label="管理">
                  <List :data="enterpriseManagements.data" />
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="enterpriseManagements.total"
                    :current-page="enterpriseManagements.page"
                    @current-change="getEnterPriseManagements"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div class="w580">
          <div class="common-card">
            <div class="title mb10">
              <span>院校</span>
            </div>
            <div class="list-content">
              <el-tabs type="border-card">
                <el-tab-pane label="招聘">
                  <List :data="schoolRecruitments.data" />
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="schoolRecruitments.total"
                    :current-page="schoolRecruitments.page"
                    @current-change="getSchoolRecruitments"
                  />
                </el-tab-pane>
                <el-tab-pane label="管理">
                  <List :data="schoolManagements.data" />
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="schoolManagements.total"
                    :current-page="schoolManagements.page"
                    @current-change="getSchoolManagements"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";
import Question from "@/components/Question";
import CountTo from "vue-count-to";
import { getArticlesRes, getCooperativeProjectRes } from "@/api";
import dayjs from "dayjs";

const rerender = data => {
  return data.map(x => ({
    ...x,
    _createTime: dayjs(x.created).format("YYYY-MM-DD")
  }));
};

export default {
  name: "HOME",

  components: {
    List,
    VIPForm,
    WantedPublish,
    CountTo,
    Question
  },

  data() {
    return {
      banners: [
        require("../../assets/banner/s_0.jpg"),
        require("../../assets/banner/s_1.jpg"),
        require("../../assets/banner/s_4.jpg"),
        require("../../assets/banner/s_3.jpg")
      ],
      industryTrends: {
        page: 1,
        total: 0,
        data: []
      }, // 行业动态
      notices: {
        page: 1,
        total: 0,
        data: []
      }, // 通知文件
      interpretationPolicys: {
        page: 1,
        total: 0,
        data: []
      }, // 政策解读
      enterPriseRecruitments: {
        page: 1,
        total: 0,
        data: []
      }, // 企业招聘
      enterpriseManagements: {
        page: 1,
        total: 0,
        data: []
      }, // 企业管理
      schoolRecruitments: {
        page: 1,
        total: 0,
        data: []
      }, // 院校招聘
      schoolManagements: {
        page: 1,
        total: 0,
        data: []
      }, // 院校管理
      projects: {
        page: 1,
        total: 0,
        data: []
      } // 院校管理
    };
  },

  methods: {
    async getIndustryTrends(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 90,
        page,
        pageSize: 5
      });
      this.industryTrends.total = totalElements;
      this.industryTrends.data = rerender(content);
    },
    async getNotices(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 91,
        page,
        pageSize: 5
      });
      this.notices.total = totalElements;
      this.notices.data = rerender(content);
    },
    async getInterpretationPolicys(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 139,
        page,
        pageSize: 5
      });
      this.interpretationPolicys.total = totalElements;
      this.interpretationPolicys.data = rerender(content);
    },
    async getEnterPriseRecruitments(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 144,
        page,
        pageSize: 5
      });
      this.enterPriseRecruitments.total = totalElements;
      this.enterPriseRecruitments.data = rerender(content);
    },
    async getEnterPriseManagements(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 146,
        page,
        pageSize: 5
      });
      this.enterpriseManagements.total = totalElements;
      this.enterpriseManagements.data = rerender(content);
    },
    async getSchoolRecruitments(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 145,
        page,
        pageSize: 5
      });
      this.schoolRecruitments.total = totalElements;
      this.schoolRecruitments.data = rerender(content);
    },
    async getSchoolManagements(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 147,
        page,
        pageSize: 5
      });
      this.schoolManagements.total = totalElements;
      this.schoolManagements.data = rerender(content);
    },
    async getProjects(page = 1) {
      const { totalElements, content } = await getCooperativeProjectRes({
        page,
        pageSize: 10
      });
      this.projects.total = totalElements;
      this.projects.data = content.map(x => ({
        ...x,
        title: x.projectTitle,
        _createTime: dayjs(x.createdDate).format("YYYY-MM-DD"),
        authorizationLetterUrl: `${process.env.VUE_APP_IMAGE_BASE_URL}${
          x.authorizationLetterUrl
        }`
      }));
    }
  },

  mounted() {
    Promise.all([
      this.getIndustryTrends(),
      this.getNotices(),
      this.getInterpretationPolicys(),
      this.getEnterPriseRecruitments(),
      this.getEnterPriseManagements(),
      this.getSchoolRecruitments(),
      this.getSchoolManagements(),
      this.getProjects()
    ]);
  }
};
</script>
