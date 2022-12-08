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
            min-width: 100px;
            text-align: right;
          }
          .el-form-item__content {
            flex: 1;
            .tips {
              line-height: 1.8em;
              font-size: 14px;
              color: #888;
            }
          }

          .el-select,
          .el-date-editor {
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

      .el-row {
        &:last-child {
          margin-bottom: 0;
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
            <span>校招会发布</span>
          </div>
          <div class="list-content">
            <el-form label-position="left">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="标题：">
                    <el-input v-model="formData.title" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="地域：">
                    <el-input v-model="formData.region" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="主办单位：">
                    <el-input v-model="formData.organizer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="协办单位：">
                    <el-input v-model="formData.coorganizer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="开始时间：">
                    <el-date-picker
                      v-model="formData.startTime"
                      type="date"
                      placeholder="请选择开始时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束时间：">
                    <el-date-picker
                      v-model="formData.endTime"
                      type="date"
                      placeholder="请选择结束时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="招聘会规模：">
                    <el-select
                      v-model="formData.recruitmentScale"
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
                <el-col :span="12">
                  <el-form-item label="招聘会层次：">
                    <el-select
                      v-model="formData.recruitmentLevel"
                      placeholder="请选择规模人数"
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
                <el-form-item label="上传图片：">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-upload
                        class="uploader-wrap"
                        action="/api/uploadController/image-upload"
                        list-type="picture-card"
                        :headers="{
                          isToken: false
                        }"
                        :limit="1"
                        :data="{ resizeMode: 'normal' }"
                        :on-success="e => onUploadSuccess(e, 'photoUrl')"
                        :on-remove="() => onUploadFileRemove('photoUrl')"
                      >
                        <i class="el-icon-plus uploader-icon"></i>
                      </el-upload>
                    </el-col>
                  </el-row>
                  <div class="tips mt10">
                    注意：
                    <p>1、图片仅限.jpg格式；</p>
                    <p>2、大小单张限制1M以内。</p>
                  </div>
                </el-form-item>
              </el-row>

              <el-row :gutter="20">
                <el-form-item label="邀请函：">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-upload
                        class="uploader-wrap"
                        action="/api/uploadController/image-upload"
                        list-type="picture-card"
                        :headers="{
                          isToken: false
                        }"
                        :limit="1"
                        :data="{ resizeMode: 'normal' }"
                        :on-success="
                          e => onUploadSuccess(e, 'invitationLetter')
                        "
                        :on-remove="
                          () => onUploadFileRemove('invitationLetter')
                        "
                      >
                        <i class="el-icon-plus uploader-icon"></i>
                      </el-upload>
                    </el-col>
                  </el-row>
                  <div class="tips mt10">
                    注意：
                    <p>1、图片仅限.jpg格式；</p>
                    <p>2、大小单张限制1M以内。</p>
                  </div>
                </el-form-item>
              </el-row>
              <el-form-item>
                <div class="btn-wrap">
                  <a
                    href="javascript:;"
                    class="btn-primary"
                    @click="handleSubmit"
                  >
                    提交
                  </a>
                  <!-- <a href="javascript:;" class="btn-plain">打印</a> -->
                </div>
              </el-form-item>
            </el-form>
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
import dictionaryMixin from "@/mixins/dictionary.js";
import dayjs from "dayjs";
import { applyJobFairRes } from "@/api";

export default {
  name: "JOB-FAIR_APPLY",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  data() {
    return {
      formData: {
        title: "",
        province: "",
        city: "",
        region: "",
        organizer: "",
        coorganizer: "",
        startTime: "",
        endTime: "",
        recruitmentScale: "",
        recruitmentLevel: "",
        recruitmentHighlights: "",
        photoUrl: "",
        invitationLetter: ""
      }
    };
  },

  methods: {
    onUploadSuccess(response, type) {
      this.formData[type] = response.url;
    },
    onUploadFileRemove(type) {
      this.formData[type] = "";
    },
    async handleSubmit() {
      await applyJobFairRes({
        ...this.formData,
        startTime: dayjs(this.formData.startTime).format("YYYY-MM-DD"),
        endTime: dayjs(this.formData.endTime).format("YYYY-MM-DD")
      });
      this.$message.success("新增成功！");
      this.$router.push("/job-fair");
    }
  },

  async mounted() {
    await this._querySchoolLevel();
    await this._querySEPeople();
  }
};
</script>
