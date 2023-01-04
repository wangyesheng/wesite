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

          .el-select {
            width: 100%;
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
}
</style>

<template>
  <div class="content">
    <div class="w1200">
      <div class="first flex-jc-sb mb20">
        <div class="common-card w750">
          <div class="title mb10">
            <span>院校资源库</span>
          </div>
          <div class="list-content">
            <el-form label-position="right">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="院校名称">
                    <el-input
                      v-model="queryForm.q_Contains_name"
                      placeholder="请输入院校名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在地">
                    <el-input
                      v-model="queryForm.q_Contains_detailAddr"
                      placeholder="请输入所在地"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="性质">
                    <el-select
                      v-model="queryForm.q_EQ_type"
                      placeholder="请选择性质"
                    >
                      <el-option
                        v-for="item in s_types"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="层次">
                    <el-select
                      v-model="queryForm.q_EQ_level"
                      placeholder="请选择层次"
                    >
                      <el-option
                        v-for="item in s_levels"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="在校人数">
                    <el-select
                      v-model="queryForm.q_EQ_studentNumber"
                      placeholder="请选择在校人数"
                    >
                      <el-option
                        v-for="item in se_people"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="按专业">
                    <el-select
                      v-model="queryForm.specialty"
                      placeholder="请选择专业"
                    >
                      <el-option
                        v-for="item in se_workTypes"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <div class="btn-wrap">
                  <a
                    href="javascript:;"
                    class="btn-primary"
                    @click="querySchools(1)"
                  >
                    搜索
                  </a>
                  <a href="javascript:;" class="btn-plain" @click="handleReset">
                    重置
                  </a>
                </div>
              </el-form-item>
            </el-form>
            <ul class="list-wrap mb20">
              <li
                class="item"
                v-for="n in schoolWrap.data"
                :key="n.id"
                @click="onSchoolClick(n.id)"
              >
                <img :src="n._typePhotoUrl" alt="" />
                <div class="details">
                  <p class="__title mb10">{{ n.name }}</p>
                  <div class="__intro">
                    <div>
                      <p>
                        <span>性质：</span>
                        <span>{{ n._type }}</span>
                      </p>
                      <p>
                        <span>层次：</span>
                        <span>{{ n._level }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>在校生人数：</span>
                        <span>{{ n._studentNumber }}</span>
                      </p>
                      <p>
                        <span>更新时间：</span>
                        <span>{{ n.updatedDate }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>归属地：</span>
                        <span>{{ n.province }}{{ n.city }}{{ n.region }}</span>
                      </p>
                      <p>
                        <span>点击量：</span>
                        <span>{{ n.clickCount || 0 }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="schoolWrap.total"
              :page-size="queryForm.pageSize"
              :current-page="queryForm.page"
              @current-change="querySchools"
            />
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
import dayjs from "dayjs";

import VIPForm from "@/components/VIPForm";
import WantedPublish from "@/components/WantedPublish";

import { getSchoolsRes, clickCountInUniversityRes } from "@/api";
import dictionaryMixin from "@/mixins/dictionary.js";

export default {
  name: "SCHOOL",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  async mounted() {
    await this._querySchoolLevel();
    await this._querySchoolType();
    await this._querySEPeople();
    await this.querySchools();
    await this._queryWorkTypes();
  },

  data() {
    return {
      queryForm: {
        q_Contains_name: "",
        q_Contains_detailAddr: "",
        q_EQ_type: "",
        q_EQ_level: "",
        q_EQ_studentNumber: "",
        specialty: "",
        page: 1,
        pageSize: 5
      },
      schoolWrap: {
        total: 0,
        data: []
      }
    };
  },

  methods: {
    handleReset() {
      this.queryForm = {
        q_Contains_name: "",
        q_Contains_detailAddr: "",
        q_EQ_type: "",
        q_EQ_level: "",
        q_EQ_studentNumber: "",
        specialty: "",
        page: 1,
        pageSize: 5
      };
      this.querySchools();
    },
    async querySchools(page = 1) {
      const { totalElements, content } = await getSchoolsRes({
        ...this.queryForm,
        page
      });

      this.schoolWrap.data = content.map(x => {
        return {
          ...x,
          _typePhotoUrl: x.typePhotoUrl
            ? `${process.env.VUE_APP_IMAGE_BASE_URL}${x.typePhotoUrl}`
            : require("@/assets/default-icon.png"),
          updatedDate: x.updatedDate
            ? dayjs(x.updatedDate).format("YYYY-MM-DD HH:mm:ss")
            : "",
          _level: (this.s_levels.find(y => y.value == x.level) || {}).name,
          _type: (this.s_types.find(y => y.value == x.type) || {}).name,
          _studentNumber: (
            this.se_people.find(y => y.value == x.studentNumber) || {}
          ).name
        };
      });
      this.schoolWrap.total = totalElements;
    },
    async onSchoolClick(id) {
      await clickCountInUniversityRes(id);
      this.$router.push(`/school-details?id=${id}`);
    }
  }
};
</script>
