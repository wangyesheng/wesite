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
            <span>校企合作项目 - {{ projectType == 1 ? "学校" : "企业" }}</span>
          </div>
          <div class="list-content">
            <el-form label-position="left">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="标题：">
                    <el-input v-model="formData.projectTitle" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="项目单位：">
                    <el-input v-model="formData.projectOrgan"></el-input>
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
                  <el-form-item label="项目内容：">
                    <el-input
                      autosize
                      type="textarea"
                      v-model="formData.content"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="联系方式：">
                    <el-input v-model="formData.contactInfo" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="上传委托书：">
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <el-upload
                          class="uploader-wrap"
                          action="/api/uploadController/image-upload"
                          :headers="{
                            isToken: false
                          }"
                          list-type="picture-card"
                          :limit="1"
                          :data="{ resizeMode: 'normal' }"
                          :on-success="
                            e => onUploadSuccess(e, 'authorizationLetterUrl')
                          "
                          :on-remove="
                            () => onUploadFileRemove('authorizationLetterUrl')
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
                </el-col>
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
import { applyCooperativeProjectRes } from "@/api";

export default {
  name: "SE-PROJECT_APPLY",

  components: {
    VIPForm,
    WantedPublish
  },

  computed: {
    projectType() {
      return this.$route.query.type;
    }
  },

  data() {
    return {
      formData: {
        projectTitle: "",
        projectOrgan: "",
        region: "",
        authorizationLetterUrl: "",
        content: "",
        coorganizer: "",
        contactInfo: ""
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
      await applyCooperativeProjectRes({
        ...this.formData,
        projectType: this.projectType
      });
      this.$message.success("新增成功！");
      this.$router.push("/se-project");
    }
  }
};
</script>
