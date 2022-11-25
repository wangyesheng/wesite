<style lang="scss" scoped>
.content {
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
      width: 730px;
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
        <div class="shadow-wrap w750">
          <el-tabs type="border-card">
            <el-tab-pane label="行业动态">
              <List
                :data="{
                  title: '关于开展职业教育教师队伍能力提升行动的通知',
                  time: '2022-08-08'
                }"
                :repeat="5"
              />
            </el-tab-pane>
            <el-tab-pane label="平台通知文件">
              <List
                :data="{
                  title: '关于开展职业教育教师队伍能力提升行动的通知',
                  time: '2022-08-08'
                }"
                :repeat="5"
              />
            </el-tab-pane>
            <el-tab-pane label="政策解读">
              <List
                :data="{
                  title: '关于开展职业教育教师队伍能力提升行动的通知',
                  time: '2022-08-08'
                }"
                :repeat="5"
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
            <a href="#">更多></a>
          </div>
          <div class="list-content">
            <List
              :data="{
                title: '校企合作好案例——江南大学',
                time: '2022-08-08'
              }"
              :repeat="15"
            />
            <el-pagination
              layout="prev, pager, next"
              :total="1000"
              class="mt40"
              background
            >
            </el-pagination>
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
      </div>

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
import List from "@/components/List";
import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";
import Question from "@/components/Question";
import CountTo from "vue-count-to";

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
      queryForm: {
        value: "",
        type: ""
      },
      banners: [
        require("../../assets/banner/s_0.jpg"),
        require("../../assets/banner/s_1.jpg"),
        require("../../assets/banner/s_4.jpg"),
        require("../../assets/banner/s_3.jpg")
      ]
    };
  }
};
</script>
