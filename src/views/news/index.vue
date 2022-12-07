<style lang="scss" scoped>
.second {
  background: #fff;
  ::v-deep {
    .el-tabs {
      width: 390px;

      .el-tabs__content {
        padding-top: 0px;

        .list-wrap {
          height: 260px;
          overflow: hidden;
        }
      }
    }
  }
}

.first .shadow-wrap {
  .list-wrap {
    height: 500px;
    overflow: hidden;
  }
}

.seven.shadow-wrap {
  .list-wrap {
    height: 260px;
    overflow: hidden;
  }
}

.banner1 {
  background: url("../../assets/banner/banner1.png") no-repeat 0 0/100% 100%;
  height: 120px;
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="shadow-wrap w750">
          <el-tabs type="border-card">
            <el-tab-pane label="行业动态">
              <List :data="industryTrends.data" />
              <el-pagination
                background
                layout="prev, pager, next"
                :total="industryTrends.total"
                :page-size="10"
                :current-page="industryTrends.page"
                @current-change="getIndustryTrends"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="w420">
          <VIPForm />
          <div class="common-card mt10">
            <div class="title mb20">
              <span>校企发布文件</span>
            </div>
            <div class="img-content flex-jc-sb">
              <div>
                <img src="../../assets/icon/gs.png" alt="" />
                <span>各省文件</span>
              </div>
              <div>
                <img src="../../assets/icon/bw.png" alt="" />
                <span>部委文件</span>
              </div>
              <div>
                <img src="../../assets/icon/gwy.png" alt="" />
                <span>国务院文件</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="second shadow-wrap flex-jc-sb mb20">
        <el-tabs type="border-card">
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
        <el-tabs type="border-card">
          <el-tab-pane label="讲话报告">
            <List :data="speechReports.data" />
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="5"
              :total="speechReports.total"
              :current-page="speechReports.page"
              @current-change="getSpeechReports"
            />
          </el-tab-pane>
          <el-tab-pane label="数据统计">
            <List :data="dataStatistics.data" />
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="5"
              :total="dataStatistics.total"
              :current-page="dataStatistics.page"
              @current-change="getDataStatistics"
            />
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card">
          <el-tab-pane label="企业法规">
            <List :data="enterpriseLawsAndRegulations.data" />
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="5"
              :total="enterpriseLawsAndRegulations.total"
              :current-page="enterpriseLawsAndRegulations.page"
              @current-change="getEnterpriseLawsAndRegulations"
            />
          </el-tab-pane>
          <el-tab-pane label="教育法规">
            <List :data="educationLawsAndRegulations.data" />
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="5"
              :total="educationLawsAndRegulations.total"
              :current-page="educationLawsAndRegulations.page"
              @current-change="getEducationLawsAndRegulations"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="banner1 mb20"></div>
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
import VIPForm from "@/components/VIPForm";
import List from "@/components/List";

import { getArticlesRes } from "@/api";
import dayjs from "dayjs";

const rerender = data => {
  return data.map(x => ({
    ...x,
    _createTime: dayjs(x.created).format("YYYY-MM-DD")
  }));
};

export default {
  name: "NEWS",

  components: {
    VIPForm,
    List
  },

  data() {
    return {
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
      speechReports: {
        page: 1,
        total: 0,
        data: []
      }, // 讲话报告
      dataStatistics: {
        page: 1,
        total: 0,
        data: []
      }, // 数据统计
      enterpriseLawsAndRegulations: {
        page: 1,
        total: 0,
        data: []
      }, // 企业法规
      educationLawsAndRegulations: {
        page: 1,
        total: 0,
        data: []
      }, // 教育法规
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
      } // 院校管理
    };
  },

  methods: {
    async getIndustryTrends(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 90,
        page,
        pageSize: 10
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
    async getSpeechReports(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 140,
        page,
        pageSize: 5
      });
      this.speechReports.total = totalElements;
      this.speechReports.data = rerender(content);
    },
    async getDataStatistics(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 141,
        page,
        pageSize: 5
      });
      this.dataStatistics.total = totalElements;
      this.dataStatistics.data = rerender(content);
    },
    async getEnterpriseLawsAndRegulations(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 142,
        page,
        pageSize: 5
      });
      this.enterpriseLawsAndRegulations.total = totalElements;
      this.enterpriseLawsAndRegulations.data = rerender(content);
    },
    async getEducationLawsAndRegulations(page = 1) {
      const { totalElements, content } = await getArticlesRes({
        subChannelId: 143,
        page,
        pageSize: 5
      });
      this.educationLawsAndRegulations.total = totalElements;
      this.educationLawsAndRegulations.data = rerender(content);
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
    }
  },

  async mounted() {
    await Promise.all([
      this.getIndustryTrends(),
      this.getNotices(),
      this.getInterpretationPolicys(),
      this.getSpeechReports(),
      this.getDataStatistics(),
      this.getEnterpriseLawsAndRegulations(),
      this.getEducationLawsAndRegulations(),
      this.getEnterPriseRecruitments(),
      this.getEnterPriseManagements(),
      this.getSchoolRecruitments(),
      this.getSchoolManagements()
    ]);

    // const data = await getArticlesRes({
    //   page: 1,
    //   pageSize: 1000
    // });
    // console.log([
    //   ...new Set(data.content.map(x => x.channel.id + x.channel.name))
    // ]);
  }
};
</script>
