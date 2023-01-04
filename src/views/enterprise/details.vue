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
            <span>{{ mainDetails.name }}</span>
            <i class="el-icon-back" @click="$router.go(-1)">返回</i>
          </div>
          <div class="list-content mb20">
            <ul class="list-wrap">
              <li class="item">
                <img :src="mainDetails._typePhotoUrl" alt="" />
                <div class="details">
                  <div class="__intro">
                    <div>
                      <p>
                        <span>性质：</span>
                        <span>
                          {{ mainDetails._type }}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>规模人数：</span>
                        <span>{{ mainDetails._enterpriseScale }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>企业地址：</span>
                        <span>{{ mainDetails.detailAddr }}</span>
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
            <div class="sub-intro_title">企业简介</div>
            <div class="sub-intro_content">
              <p>
                {{ mainDetails.introduction }}
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
            <div class="sub-intro_title">企业用工情况</div>
            <div class="sub-intro_content table">
              <el-table :data="mainDetails._recruitInfo">
                <el-table-column
                  align="center"
                  prop="station"
                  label="岗位名称"
                  width="120"
                >
                </el-table-column>
                <el-table-column align="center" prop="major" label="专业要求">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="male"
                  label="性别限制"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="numberPeople"
                  label="招聘人数"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="recruitTime"
                  label="招聘时间"
                  width="120"
                >
                </el-table-column>
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

import { getEnterpriseDetailsByIdRes } from "@/api";
import dictionaryMixin from "@/mixins/dictionary.js";

export default {
  name: "ENTERPRISE-DETAILS",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  async mounted() {
    this.id = this.$route.query.id;
    await this._queryEnterpriseType();
    await this._querySEPeople();
    await this._querySECooperationMode();
    await this.query();
  },

  data() {
    return {
      selectedModes: [],
      mainDetails: {},
      phone: ""
    };
  },

  methods: {
    async query() {
      const data = await getEnterpriseDetailsByIdRes(this.id);
      this.selectedModes = data.modelList;
      this.mainDetails = {
        ...data,
        _typePhotoUrl: data.typePhotoUrl
          ? `${process.env.VUE_APP_IMAGE_BASE_URL}${data.typePhotoUrl}`
          : require("@/assets/default-icon.png"),
        _recruitInfo: JSON.parse(data.recruitInfo),
        _type: (this.e_types.find(y => y.value == data.type) || {}).name,
        _enterpriseScale: (
          this.se_people.find(y => y.value == data.enterpriseScale) || {}
        ).name
      };
    },
    onPhoneView() {
      this.phone = this.phone ? "" : this.mainDetails.telephone;
    }
  }
};
</script>
