<style lang="scss" scoped>
.content {
  .list-content {
    ::v-deep {
      .el-form {
        margin-top: 20px;
        .el-form-item {
          display: flex;
          margin-bottom: 36px;

          .el-select,
          .el-cascader {
            width: 100%;
          }

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

          .btn-wrap {
            width: 360px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            a {
              width: 120px;
            }
          }

          .uploader-wrap .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .uploader-wrap .el-upload:hover {
            border-color: #409eff;
          }

          .uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
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
            <span>院校报名</span>
          </div>
          <div class="list-content">
            <el-form
              label-position="left"
              ref="applyFormRef"
              :model="formData"
              :rules="formRules"
            >
              <h3>一、选择报名类别</h3>
              <el-form-item label="报名类型：">
                <el-input value="免费宣传" disabled></el-input>
              </el-form-item>

              <h3>二、添加院校信息</h3>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="院校名称：" prop="name">
                    <el-input
                      v-model="formData.name"
                      placeholder="请输入院校名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="院校性质：" prop="type">
                    <el-radio-group
                      placeholder="请选择院校性质"
                      v-model="formData.type"
                    >
                      <el-radio label="2">公办</el-radio>
                      <el-radio label="1">民办</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="院校层次：" prop="level">
                    <el-select
                      v-model="formData.level"
                      placeholder="请选择院校层次"
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
                <el-col :span="12">
                  <el-form-item label="在校人数：" prop="studentNumber">
                    <el-select
                      v-model="formData.studentNumber"
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
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="地域归属：" prop="selectedChinaArea">
                    <!-- 级联 -->
                    <el-cascader
                      v-model="formData.selectedChinaArea"
                      :options="chinaAreas"
                      :props="{ label: 'name', value: 'name' }"
                      placeholder="请选择地域归属"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="院校简介：" prop="introduction">
                    <el-input
                      type="textarea"
                      autosize
                      v-model="formData.introduction"
                      placeholder="请输入院校简介"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="合作模式：">
                <el-checkbox-group v-model="formData.model">
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
              </el-form-item>
              <el-form-item label="开设专业：">
                <el-checkbox-group v-model="formData.specialty">
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
              </el-form-item>

              <h3>三、院校安置或实习情况</h3>
              <el-row :gutter="20">
                <el-col :span="6">
                  <a
                    href="javascript:;"
                    class="btn-primary small mb10"
                    @click="handleCreateJob"
                  >
                    新增专业
                  </a>
                </el-col>
              </el-row>
              <el-table :data="internshipData" class="mb40">
                <el-table-column label="专业名称">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.specialty"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="安置或实习人数">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.number"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="男女比例">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.male"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="安置或实习时间">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.time"></el-input>
                  </template>
                </el-table-column>
              </el-table>

              <h3>四、院校联系方式</h3>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="地址：" prop="detailAddr">
                    <el-input
                      type="textarea"
                      autosize
                      v-model="formData.detailAddr"
                      placeholder="请输入院校详细地址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话：" prop="telephone">
                    <el-input
                      v-model="formData.telephone"
                      placeholder="请输入院校电话"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="网址：">
                    <el-input v-model="formData.website"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" prop="email">
                    <el-input
                      v-model="formData.email"
                      placeholder="请输入院校邮箱"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <h3>五、院校联系人联系方式</h3>
              <el-row :gutter="20">
                <el-col :span="6">
                  <a
                    href="javascript:;"
                    class="btn-primary small mb10"
                    @click="handleCreateContact"
                    >新增联系人
                  </a>
                </el-col>
              </el-row>
              <el-table :data="contacts" class="mb40">
                <el-table-column label="联系人">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.contact"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="职务">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.offic"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="手机号">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.mobile"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="微信号">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.wechat"></el-input>
                  </template>
                </el-table-column>
              </el-table>

              <h3>六、上传图片</h3>
              <el-form-item label="学校LOGO：">
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
                      :on-success="e => onUploadSuccess(e, 'typePhotoUrl')"
                      :on-remove="() => onUploadFileRemove('typePhotoUrl')"
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
              <el-form-item label="院校相册：">
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
                      :on-success="e => onUploadSuccess(e, 'photoAlbum')"
                      :on-remove="() => onUploadFileRemove('photoAlbum')"
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

              <el-form-item>
                <div class="btn-wrap">
                  <a href="javascript:;" class="btn-primary" @click="onSumbit"
                    >提交</a
                  >
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
import { createSchoolRes } from "@/api";
import chinaAreas from "@/assets/data/china.json";

let jobIndex = 0;
let contactIndex = 0;

export default {
  name: "SE-ASSOCIATION-S_APPLY",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  data() {
    return {
      internshipData: [],
      contacts: [],
      chinaAreas,
      formData: {
        receipt: "", // 回执
        name: "", // 院校名称
        type: "2",
        level: "",
        studentNumber: "",
        province: "",
        city: "",
        region: "",
        detailAddr: "",
        contactor: "",
        telephone: "",
        email: "",
        website: "",
        photoAlbum: "",
        internship: "", // 实习情况
        model: [],
        specialty: [],
        introduction: "",
        typePhotoUrl: "",
        selectedChinaArea: []
      },
      formRules: {
        name: [
          { required: true, message: "请输入院校名称！", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择院校性质！", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择院校层次！", trigger: "change" }
        ],
        studentNumber: [
          { required: true, message: "请选择在校人数！", trigger: "change" }
        ],
        selectedChinaArea: [
          {
            required: true,
            type: "array",
            message: "请选择地域归属！",
            trigger: "change"
          }
        ],
        introduction: [
          { required: true, message: "请输入院校简介！", trigger: "blur" }
        ],
        detailAddr: [
          { required: true, message: "请输入院校详细地址！", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入院校电话！", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入院校邮箱！", trigger: "blur" }
        ]
      }
    };
  },

  async mounted() {
    await this._querySchoolLevel();
    await this._querySEPeople();
    await this._querySECooperationMode();
    await this._queryWorkTypes();
  },

  methods: {
    onUploadSuccess(response, type) {
      this.formData[type] = response.url;
    },
    onUploadFileRemove(type) {
      this.formData[type] = "";
    },
    handleCreateJob() {
      this.internshipData.push({
        id: jobIndex++,
        specialty: "",
        number: "",
        male: "",
        time: ""
      });
    },
    handleCreateContact() {
      this.contacts.push({
        id: contactIndex++,
        contact: "",
        offic: "",
        mobile: "",
        wechat: ""
      });
    },
    onSumbit() {
      this.$refs.applyFormRef.validate(async valid => {
        if (valid) {
          const { contacts, internshipData, formData } = this.$data;
          const selectedChinaArea = this.formData.selectedChinaArea;
          const [province, city, region] = selectedChinaArea;
          const reqData = {
            ...formData,
            province,
            city,
            region,
            contactorDetail: JSON.stringify(contacts),
            internship: JSON.stringify(internshipData),
            specialty: JSON.stringify(
              formData.specialty.map(x => Number(x)).sort((a, b) => a - b)
            ),
            model: formData.model.join(";")
          };
          await createSchoolRes(reqData);
          this.$message.success("操作成功！");
          this.$router.push("/school");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
