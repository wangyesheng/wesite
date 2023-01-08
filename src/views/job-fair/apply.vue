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
            min-width: 120px;
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
          .el-date-editor,
          .el-input-number {
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
            <el-form
              ref="applyFormRef"
              label-position="left"
              :model="formData"
              :rules="formRules"
            >
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="标题：" prop="title">
                    <el-input
                      v-model="formData.title"
                      placeholder="请输入标题"
                      maxlength="40"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="地域：">
                    <el-input
                      v-model="formData.region"
                      placeholder="请输入地域"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="主办单位：" prop="organizer">
                    <el-input
                      v-model="formData.organizer"
                      placeholder="请输入主办单位"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="协办单位：">
                    <el-input
                      v-model="formData.coorganizer"
                      placeholder="请输入协办单位"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="开始时间：" prop="startTime">
                    <el-date-picker
                      v-model="formData.startTime"
                      type="datetime"
                      placeholder="请选择开始时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束时间：" prop="endTime">
                    <el-date-picker
                      v-model="formData.endTime"
                      type="datetime"
                      placeholder="请选择结束时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="招聘会规模：" prop="recruitmentScale">
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
                  <el-form-item label="招聘会层次：" prop="recruitmentLevel">
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
                <el-col :span="12">
                  <el-form-item label="招聘会特色：">
                    <el-input
                      v-model="formData.recruitmentHighlights"
                      placeholder="请输入招聘会特色"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="占位数：">
                    <el-input-number v-model="formData.applicantNumber" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="Logo：">
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
                    <p>1、图片限.png、.jpg、.jpeg格式；</p>
                    <p>2、大小单张限制1M以内。</p>
                  </div>
                </el-form-item>
              </el-row>

              <el-row :gutter="20">
                <el-form-item label="照片墙：">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-upload
                        class="uploader-wrap"
                        action="/api/uploadController/image-upload"
                        list-type="picture-card"
                        :headers="{
                          isToken: false
                        }"
                        :limit="9"
                        :data="{ resizeMode: 'normal' }"
                        :on-success="e => onUploadSuccess(e, 'images')"
                        :on-remove="e => onUploadFileRemove(e, 'images')"
                      >
                        <i class="el-icon-plus uploader-icon"></i>
                      </el-upload>
                    </el-col>
                  </el-row>
                  <div class="tips mt10">
                    注意：
                    <p>1、图片限.png、.jpg、.jpeg格式；</p>
                    <p>2、大小单张限制1M以内；</p>
                    <p>3、可上传至多9张照片，展示往届招聘会风采。</p>
                  </div>
                </el-form-item>
              </el-row>

              <el-row :gutter="20">
                <el-form-item label="邀请函：">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入邀请函内容"
                        v-model="formData.invitationLetter"
                      />
                    </el-col>
                  </el-row>
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

let _images = [];

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
        invitationLetter: "",
        applicantNumber: 0
      },
      formRules: {
        title: [{ required: true, message: "请输入标题！", trigger: "blur" }],
        organizer: [
          { required: true, message: "请输入主办方！", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择开始时间！", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择结束时间！", trigger: "blur" }
        ],
        recruitmentScale: [
          { required: true, message: "请选择招聘会规模！", trigger: "change" }
        ],
        recruitmentLevel: [
          { required: true, message: "请选择招聘会层次！", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    onUploadSuccess(response, type) {
      if (type === "images") {
        _images.push(response.url);
      } else {
        this.formData[type] = response.url;
      }
    },
    onUploadFileRemove(args, type) {
      if (type === "images") {
        const {
          response: { url }
        } = args;
        _images = _images.filter(x => x !== url);
      } else {
        this.formData[type] = "";
      }
    },
    handleSubmit() {
      this.$refs.applyFormRef.validate(async valid => {
        if (valid) {
          await applyJobFairRes({
            ...this.formData,
            startTime: dayjs(this.formData.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            endTime: dayjs(this.formData.endTime).format("YYYY-MM-DD HH:mm:ss"),
            images: _images.join()
          });
          this.$message.success("新增成功！");
          this.$router.push("/job-fair");
        } else {
          return false;
        }
      });
    }
  },

  async mounted() {
    await this._querySchoolLevel();
    await this._querySEPeople();
  }
};
</script>
