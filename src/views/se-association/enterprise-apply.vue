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
            <span>企业报名</span>
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

              <!-- <h3>二、上传回执表</h3>
              <el-form-item label="上传回执表：">
                <el-row :gutter="20">
                  <el-upload
                    class="uploader-wrap"
                    action="/api/uploadController/image-upload"
                    list-type="picture-card"
                    :headers="{
                      isToken: false
                    }"
                    :limit="1"
                    :data="{ resizeMode: 'normal' }"
                    :on-success="e => onUploadSuccess(e, 'receipt')"
                    :on-remove="() => onUploadFileRemove('receipt')"
                  >
                    <i class="el-icon-plus uploader-icon"></i>
                  </el-upload>
                </el-row>
                <div class="tips mt10">
                  注意：
                  <p>1、下载并填写回执；</p>
                  <p>2、上传盖章回执扫描件，或盖章后拍照上传；</p>
                  <p>3、上传图片仅.jpg格式，规格大小限制为1M以内；</p>
                  <p>
                    4、请保存好您的盖章件原件，实体校企会报到时需出示原件，用以确认身份。
                  </p>
                </div>
              </el-form-item> -->

              <h3>二、 添加企业信息</h3>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业名称：" prop="name">
                    <el-input
                      v-model="formData.name"
                      placeholder="请输入企业名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="企业性质：" prop="type">
                    <el-select
                      v-model="formData.type"
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
                  <el-form-item label="规模人数：" prop="enterpriseScale">
                    <el-select
                      v-model="formData.enterpriseScale"
                      placeholder="请选择企业规模人数"
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
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="企业简介：" prop="introduction">
                    <el-input
                      type="textarea"
                      autosize
                      v-model="formData.introduction"
                      placeholder="请输入企业简介"
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
              <el-form-item label="招聘专业：">
                <el-checkbox-group v-model="formData.workingType">
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

              <h3>三、企业安置或实习情况</h3>
              <el-row :gutter="20">
                <el-col :span="6">
                  <a
                    href="javascript:;"
                    class="btn-primary small mb10"
                    @click="handleCreateJob"
                  >
                    新增岗位
                  </a>
                </el-col>
              </el-row>
              <el-table :data="jobs" class="mb40">
                <el-table-column label="岗位名称">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.station"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="专业要求">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.major"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="需要人数">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.numberPeople"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="男女比例">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.male"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="招聘时间">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.recruitTime"></el-input>
                  </template>
                </el-table-column>
              </el-table>

              <h3>四、企业联系方式</h3>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="详细地址：" prop="detailAddr">
                    <el-input
                      type="textarea"
                      autosize
                      v-model="formData.detailAddr"
                      placeholder="请输入企业详细地址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话：" prop="telephone">
                    <el-input
                      v-model="formData.telephone"
                      placeholder="请输入企业电话"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="网址：">
                    <el-input
                      v-model="formData.website"
                      placeholder="请输入企业网址"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" prop="email">
                    <el-input
                      v-model="formData.email"
                      placeholder="请输入企业邮箱"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <h3>五、企业联系人联系方式</h3>
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
              <el-form-item label="企业LOGO：">
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
              <el-form-item label="企业相册：">
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
                  <a href="javascript:;" class="btn-primary" @click="onSumbit">
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
import chinaAreas from "@/assets/data/china.json";
import dictionaryMixin from "@/mixins/dictionary.js";
import { createEnterpriseRes } from "@/api";

let jobIndex = 0;
let contactIndex = 0;

export default {
  name: "SE-ASSOCIATION-E_APPLY",

  components: {
    VIPForm,
    WantedPublish
  },

  mixins: [dictionaryMixin],

  data() {
    return {
      jobs: [],
      contacts: [],
      chinaAreas,
      formData: {
        receipt: "", // 回执
        name: "", // 院校名称
        type: "",
        level: "",
        enterpriseScale: "",
        province: "",
        city: "",
        region: "",
        detailAddr: "",
        telephone: "",
        email: "",
        website: "",
        photoAlbum: "",
        recruitInfo: "", // 企业用工情况
        model: [],
        workingType: [],
        introduction: "",
        typePhotoUrl: "",
        selectedChinaArea: []
      },
      formRules: {
        name: [{ required: true, message: "请输入名称！", trigger: "blur" }],
        type: [{ required: true, message: "请选择性质！", trigger: "change" }],
        enterpriseScale: [
          { required: true, message: "请选择规模人数！", trigger: "change" }
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
          { required: true, message: "请输入简介！", trigger: "blur" }
        ],
        detailAddr: [
          { required: true, message: "请输入详细地址！", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入电话！", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱！", trigger: "blur" }]
      }
    };
  },

  async mounted() {
    await this._queryEnterpriseType();
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
      this.jobs.push({
        id: jobIndex++,
        station: "",
        major: "",
        numberPeople: "",
        male: "",
        recruitTime: ""
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
          const { contacts, jobs, formData } = this.$data;
          const [province, city, region] = this.formData.selectedChinaArea;
          const reqData = {
            ...formData,
            level: this.type,
            province,
            city,
            region,
            contactorDetail: JSON.stringify(contacts),
            recruitInfo: JSON.stringify(jobs),
            workingType: JSON.stringify(
              formData.workingType.map(x => Number(x)).sort((a, b) => a - b)
            ),
            model: formData.model.join(";")
          };
          await createEnterpriseRes(reqData);
          this.$message.success("操作成功！");
          this.$router.push("/enterprise");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
