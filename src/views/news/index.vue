<style lang="scss" scoped>
.second {
  background: #fff;
  ::v-deep {
    .el-tabs {
      width: 390px;

      .el-tabs__content {
        padding-top: 0px;
      }
    }
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
              <List
                :data="{
                  title: '《中国职业教育发展白皮书》解读速递',
                  time: '2022-08-08'
                }"
                :repeat="10"
              />

              <el-pagination
                layout="prev, pager, next"
                :total="1000"
                class="mt40"
                background
              >
              </el-pagination>
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
      <div class="second flex-jc-sb mb20">
        <el-tabs type="border-card">
          <el-tab-pane label="通知文件">
            <List
              :data="{
                title: '教育部办公厅关于学习宣传和贯彻实施新修订的职业...',
                time: '2022-08-08'
              }"
              :repeat="5"
            />
          </el-tab-pane>
          <el-tab-pane label="政策解读">
            <List
              :data="{
                title: '关于开展职业教育教师队伍能力提升的通知',
                time: '2022-08-08'
              }"
              :repeat="5"
          /></el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card">
          <el-tab-pane label="讲话报告">
            <List
              :data="{
                title: '高级统计师朱虹解读工业企业利润',
                time: '2022-08-08'
              }"
              :repeat="5"
          /></el-tab-pane>
          <el-tab-pane label="数据统计">
            <List
              :data="{
                title: '关于开展职业教育教师队伍能力提升的通知',
                time: '2022-08-08'
              }"
              :repeat="5"
          /></el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card">
          <el-tab-pane label="企业法规">
            <List
              :data="{
                title: '关于开展职业教育教师队伍能力提升的通知',
                time: '2022-08-08'
              }"
              :repeat="5"
          /></el-tab-pane>
          <el-tab-pane label="教育法规">
            <List
              :data="{
                title: '高级统计师朱虹解读工业企业利润...',
                time: '2022-08-08'
              }"
              :repeat="5"
          /></el-tab-pane>
        </el-tabs>
      </div>
      <div class="banner1 mb20"></div>
      <div class="seven mb40 flex-jc-sb">
        <div class="w580">
          <div class="common-card">
            <div class="title mb10">
              <span>企业</span>
            </div>
            <div class="list-content">
              <el-tabs type="border-card">
                <el-tab-pane label="招聘">
                  <List
                    :data="{
                      title: '关于开展职业教育教师队伍能力提升的通知',
                      time: '2022-08-08'
                    }"
                    :repeat="5"
                  />
                </el-tab-pane>
                <el-tab-pane label="管理">
                  <List
                    :data="{
                      title: '关于开展职业教育教师队伍能力提升的通知',
                      time: '2022-08-08'
                    }"
                    :repeat="5"
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
                  <List
                    :data="{
                      title: '关于开展职业教育教师队伍能力提升的通知',
                      time: '2022-08-08'
                    }"
                    :repeat="5"
                  />
                </el-tab-pane>
                <el-tab-pane label="管理">
                  <List
                    :data="{
                      title: '关于开展职业教育教师队伍能力提升的通知',
                      time: '2022-08-08'
                    }"
                    :repeat="5"
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

export default {
  name: "NEWS",

  components: {
    VIPForm,
    List
  },

  async mounted() {
    const data = await getArticlesRes();
    console.log([...new Set(data.map(x => x.channel.id + x.channel.name))]);
  }
};
</script>
