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
            <span>企业资源库</span>
          </div>
          <div class="list-content">
            <el-form label-position="right">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业名称">
                    <el-input
                      v-model="queryForm.q_Contains_name"
                      placeholder="请输入企业名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性质">
                    <el-select
                      v-model="queryForm.q_EQ_type"
                      placeholder="请选择企业性质"
                    >
                      <el-option
                        v-for="item in e_types"
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
                  <el-form-item label="按工种">
                    <el-select
                      v-model="queryForm.workingType"
                      placeholder="请选择工种"
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
                <el-col :span="12">
                  <el-form-item label="规模人数">
                    <el-select
                      v-model="queryForm.q_EQ_enterpriseScale"
                      placeholder="请选择规模人数"
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
              </el-row>
              <el-form-item>
                <div class="btn-wrap">
                  <a href="javascript:;" class="btn-primary" @click="query(1)">
                    搜索
                  </a>
                  <a href="javascript:;" class="btn-plain">重置</a>
                </div>
              </el-form-item>
            </el-form>
            <ul class="list-wrap mb20">
              <li
                class="item"
                v-for="n in enterpriseWrap.data"
                :key="n.id"
                @click="onEnterpriseClick(n.id)"
              >
                <img :src="n.typePhotoUrl" alt="" />
                <div class="details">
                  <p class="__title mb10">{{ n.name }}</p>
                  <div class="__intro">
                    <div>
                      <p>
                        <span>性质：</span>
                        <span>{{ n._type }}</span>
                      </p>
                      <p>
                        <span>规模（人数）：</span>
                        <span>{{ n._enterpriseScale }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>更新时间：</span>
                        <span>{{ n.updatedDate }}</span>
                      </p>
                      <p>
                        <span>点击量：</span>
                        <span>{{ n.clickCount }}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>归属地：</span>
                        <span>{{ n.province }}{{ n.city }}{{ n.region }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="enterpriseWrap.total"
              :page-size="queryForm.pageSize"
              :current-page="queryForm.page"
              @current-change="query"
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

import { getEnterprisesRes, clickCountInUniversityRes } from "@/api";
import dictionaryMixin from "@/mixins/dictionary.js";

export default {
  name: "ENTERPRISE",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  async mounted() {
    await this._queryEnterpriseType();
    await this._querySEPeople();
    await this._queryWorkTypes();
    await this.query();
  },

  data() {
    return {
      queryForm: {
        q_Contains_name: "",
        q_EQ_type: "",
        q_EQ_enterpriseScale: "",
        workingType: "",
        page: 1,
        pageSize: 5
      },
      enterpriseWrap: {
        total: 0,
        data: []
      }
    };
  },

  methods: {
    async query(page = 1) {
      const { totalElements, content } = await getEnterprisesRes({
        ...this.queryForm,
        page
      });
      this.enterpriseWrap.data = content.map(x => ({
        ...x,
        updatedDate: x.updatedDate
          ? dayjs(x.updatedDate).format("YYYY-MM-DD HH:mm:ss")
          : "",
        _type: (this.e_types.find(y => y.value == x.type) || {}).name,
        _enterpriseScale: (
          this.se_people.find(y => y.value == x.enterpriseScale) || {}
        ).name
      }));
      this.enterpriseWrap.total = totalElements;
    },
    async onEnterpriseClick(id) {
      await clickCountInUniversityRes(id);
      this.$router.push(`/enterprise-details?id=${id}`);
    }
  }
};
</script>
