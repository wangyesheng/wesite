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

          .btn-wrap {
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            a {
              width: 320px;
            }
          }
        }
      }

      .el-input-number {
        width: 100%;
      }

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }

      .avatar {
        width: 120px;
        height: 120px;
        display: block;
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
            <span>会员注册</span>
          </div>
          <div class="list-content">
            <el-form
              ref="registerFormRef"
              label-position="left"
              :model="registerFormData"
              :rules="registerFormRules"
            >
              <el-form-item prop="name" label="账号名称：">
                <el-input v-model="registerFormData.name" />
              </el-form-item>
              <el-form-item prop="mobile" label="手机号：">
                <el-input v-model="registerFormData.mobile" />
              </el-form-item>
              <el-form-item prop="verificationCode" label="短信验证码：">
                <el-row :gutter="20">
                  <el-col :span="18">
                    <el-input
                      autocomplete="new-password"
                      v-model="registerFormData.verificationCode"
                    />
                  </el-col>
                  <el-col :span="6">
                    <a
                      href="javascript:;"
                      class="btn-plain small"
                      @click="handleGetCode"
                    >
                      {{ hadSendCode ? `${waitSeconds}s后重新获取` : "发送" }}
                    </a>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="password" label="密码：">
                <el-input
                  type="password"
                  autocomplete="new-password"
                  v-model="registerFormData.password"
                />
              </el-form-item>
              <el-form-item prop="secondPassword" label="确认密码：">
                <el-input
                  type="password"
                  v-model="registerFormData.secondPassword"
                />
              </el-form-item>
              <el-form-item label="会员头像：">
                <el-upload
                  class="avatar-uploader"
                  action="/uploadController/image-upload"
                  list-type="picture-card"
                  :headers="{
                    isToken: false
                  }"
                  :limit="1"
                  :data="{ resizeMode: 'normal' }"
                  :on-success="onUploadSuccess"
                  :on-remove="onUploadFileRemove"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item prop="sex" label="性别：">
                <el-radio-group v-model="registerFormData.sex">
                  <el-radio label="1" border>
                    男
                  </el-radio>
                  <el-radio label="0" border>
                    女
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="age" label="年龄：">
                <el-input v-model="registerFormData.age" />
              </el-form-item>

              <el-form-item prop="orgType" label="组织类型：">
                <el-radio-group v-model="registerFormData.orgType">
                  <el-radio label="1" border>
                    企业
                  </el-radio>
                  <el-radio label="2" border>
                    学校
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="orgName" label="单位名称：">
                <el-input v-model="registerFormData.orgName" />
              </el-form-item>
              <el-form-item prop="orgAddr" label="单位地址：">
                <el-input v-model="registerFormData.orgAddr" />
              </el-form-item>
              <el-form-item prop="orgContactor" label="单位联系人：">
                <el-input v-model="registerFormData.orgContactor" />
              </el-form-item>
              <el-form-item prop="orgMobile" label="联系人电话：">
                <el-input v-model="registerFormData.orgMobile" />
              </el-form-item>
              <el-form-item label="单位网址：">
                <el-input v-model="registerFormData.orgWebsite" />
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="registerFormData.email" />
              </el-form-item>
              <el-form-item>
                <div class="btn-wrap">
                  <a href="javascript:;" class="btn-primary" @click="onSubmit"
                    >提交注册信息</a
                  >
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

import { registerRes, getVerificationCodeRes } from "@/api";

export default {
  name: "register",

  components: {
    VIPForm,
    WantedPublish
  },

  data() {
    return {
      registerFormData: {
        name: "",
        password: "",
        secondPassword: "",
        realName: "",
        mobile: "",
        sex: "",
        age: "",
        email: "",
        portraitUrl: "",
        orgType: "",
        orgName: "",
        orgAddr: "",
        orgContactor: "",
        orgMobile: "",
        orgWebsite: "",
        memberType: "",
        verificationCode: ""
      },
      registerFormRules: {
        name: [
          { required: true, message: "请填写账号名称！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写密码！", trigger: "blur" }
        ],
        secondPassword: [
          { required: true, message: "请再次填写密码！", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请填写手机号！", trigger: "blur" },
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: "手机号码不合法，请重新输入！",
            trigger: "blur"
          }
        ],
        verificationCode: [
          { required: true, message: "请填写验证码！", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别！", trigger: "change" }],
        age: [{ required: true, message: "请填写年龄！", trigger: "blur" }],
        // portraitUrl: [
        //   { required: true, message: "请上次头像！", trigger: "blur" }
        // ],
        orgType: [
          { required: true, message: "请选择组织类型！", trigger: "change" }
        ],
        orgName: [
          { required: true, message: "请填写单位名称！", trigger: "blur" }
        ],
        orgAddr: [
          { required: true, message: "请填写单位地址！", trigger: "blur" }
        ],
        orgContactor: [
          { required: true, message: "请填写联系人姓名！", trigger: "blur" }
        ],
        orgMobile: [
          { required: true, message: "请填写单位联系人号码！", trigger: "blur" }
        ]
      },
      hadSendCode: false,
      waitSeconds: 60
    };
  },

  methods: {
    onSubmit() {
      this.$refs.registerFormRef.validate(async valid => {
        if (valid) {
          if (
            this._verificationCode !== this.registerFormData.verificationCode
          ) {
            return this.$message.warning("验证码不正确，请检查！");
          }
          await registerRes(this.registerFormData);
          this.$message.success("注册成功！");
        } else {
          return false;
        }
      });
    },
    async handleGetCode() {
      if (this.hadSendCode) return;
      const { mobile } = this.registerFormData;
      if (!mobile.trim()) {
        return this.$message.warning("请填写手机号！");
      }
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile.trim())) {
        return this.$message.warning("手机号码不合法，请重新输入！");
      }
      const data = await getVerificationCodeRes(this.registerFormData.mobile);
      this.$message.success("发送成功！");
      this.hadSendCode = true;
      this.intervalId = setInterval(() => {
        if (this.waitSeconds == 0) {
          clearInterval(this.intervalId);
        } else {
          this.waitSeconds--;
        }
      }, 1000);
      this._verificationCode = data;
    },
    onUploadSuccess(response) {
      this.registerFormData.portraitUrl = response.url;
    },
    onUploadFileRemove() {
      this.registerFormData.portraitUrl = "";
    }
  }
};
</script>
