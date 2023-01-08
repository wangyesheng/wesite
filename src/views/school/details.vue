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
        border: none;
        a.btn-plain {
          position: absolute;
          width: 130px;
          height: 30px;
          line-height: 26px;
          right: 10px;
          top: 10%;
          border-radius: 5px;
          font-size: 14px;
        }

        &:hover {
          background: #fff;
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
      padding: 20px;
      p {
        text-indent: 2em;
        font-size: 0.95555em;
        line-height: 1.6em;
      }
    }

    .table {
      padding: 20px 0;
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
            <span>{{ schoolDetails.name }}</span>
            <i class="el-icon-back" @click="$router.go(-1)">返回</i>
          </div>
          <div class="list-content mb20">
            <ul class="list-wrap">
              <li class="item">
                <img :src="schoolDetails._typePhotoUrl" alt="" />
                <div class="details">
                  <div class="__intro">
                    <div>
                      <p>
                        <span>学校性质：</span>
                        <span>
                          {{ schoolDetails._type }}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>办学层次：</span>
                        <span>{{ schoolDetails._level }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>在校人数：</span>
                        <span>{{ schoolDetails._studentNumber }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>学校地址：</span>
                        <span class="school-address">
                          {{ schoolDetails.province }}
                          {{ schoolDetails.city }}
                          {{ schoolDetails.region }}
                          {{ schoolDetails.detailAddr }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <a href="javascript:;" class="btn-plain" @click="onPhoneView">
                  <i class="el-icon-phone"></i>
                  {{ phone ? phone : "查看联系方式" }}
                </a>
              </li>
            </ul>
          </div>
          <div class="sub-intro">
            <div class="sub-intro_title">学校简介</div>
            <div class="sub-intro_content">
              <p>
                {{ schoolDetails.introduction }}
              </p>
            </div>
          </div>

          <div class="sub-intro">
            <div class="sub-intro_title">合作模式</div>
            <div class="sub-intro_content">
              <el-checkbox-group v-model="selectedModes">
                <el-row :gutter="20">
                  <el-col
                    class="mb10"
                    :span="8"
                    v-for="n in se_cooperationModes"
                    :key="n.value"
                  >
                    <el-checkbox :label="n.value">
                      {{ n.name }}
                    </el-checkbox>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </div>
          </div>

          <div class="sub-intro">
            <div class="sub-intro_title">开设专业</div>
            <div class="sub-intro_content">
              <el-checkbox-group v-model="selectSpecialtyList">
                <el-row :gutter="20">
                  <el-col
                    class="mb10"
                    :span="8"
                    v-for="n in se_workTypes"
                    :key="n.value"
                  >
                    <el-checkbox :label="n.value">
                      {{ n.name }}
                    </el-checkbox>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </div>
          </div>

          <div class="sub-intro">
            <div class="sub-intro_title">院校安置或实习情况</div>
            <div class="sub-intro_content table">
              <el-table :data="schoolDetails.internship">
                <el-table-column
                  align="center"
                  prop="specialty"
                  label="专业名称"
                  width="180"
                />
                <el-table-column
                  align="center"
                  prop="number"
                  label="安置或者实习人数"
                  width="180"
                />
                <el-table-column
                  align="center"
                  prop="time"
                  label="安置或者实习时间"
                />
                <el-table-column align="center" prop="male" label="男女比例" />
              </el-table>
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

import { getSchoolDetailsByIdRes } from "@/api";
import dictionaryMixin from "@/mixins/dictionary.js";

export default {
  name: "SCHOOL-DETAILS",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  async mounted() {
    this.id = this.$route.query.id;
    await this._querySchoolLevel();
    await this._querySchoolType();
    await this._querySEPeople();
    await this._querySECooperationMode();
    await this.querySchoolDetails();
    await this._queryWorkTypes();
  },

  data() {
    return {
      cooperationModes: [],
      schoolDetails: {},
      phone: "",
      selectedModes: [],
      selectSpecialtyList: []
    };
  },

  methods: {
    async querySchoolDetails() {
      const data = await getSchoolDetailsByIdRes(this.id);
      this.selectedModes = data.modelList;
      this.selectSpecialtyList = JSON.parse(data.specialty).map(x => String(x));
      this.schoolDetails = {
        ...data,
        _typePhotoUrl: data.typePhotoUrl
          ? `${process.env.VUE_APP_IMAGE_BASE_URL}${data.typePhotoUrl}`
          : require("@/assets/default-icon.png"),
        internship: JSON.parse(data.internship),
        _level: (this.s_levels.find(y => y.value == data.level) || {}).name,
        _type: (this.s_types.find(y => y.value == data.type) || {}).name,
        _studentNumber: (
          this.se_people.find(y => y.value == data.studentNumber) || {}
        ).name
      };
    },
    onPhoneView() {
      this.phone = this.phone ? "" : this.schoolDetails.telephone;
    }
  }
};
</script>
