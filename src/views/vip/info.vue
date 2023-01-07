<style lang="scss" scoped>
.content {
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  .full {
    width: 100%;
    height: 90px;
    background: #ffffff;
    box-shadow: 0px 10px 35px 1px rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    .w1200 {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        img {
          width: 45px;
          height: 45px;
          margin-right: 10px;
        }

        font-size: 28px;
        font-weight: 400;
        color: #183b56;
      }
    }
  }

  .info {
    margin-top: 180px;
    background: #fff;
    padding: 80px 40px;
    display: flex;
    position: relative;

    .user {
      position: absolute;
      top: -140px;
      left: 40px;
      display: flex;

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }

      &-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 20px;
        max-height: 136px;

        .name {
          font-size: 22px;
          font-weight: bold;
          color: #183b56;
        }

        .level {
          display: inline-block;
          background: linear-gradient(to right bottom, #ffb142, #ff793f);
          width: 100px;
          height: 26px;
          border-radius: 26px;
          text-align: center;
          line-height: 26px;
          color: #fff;
          font-size: 14px;
        }

        .phone {
          font-size: 16px;
          font-weight: 400;
          color: #8d9ca7;
        }

        .service-time {
          font-size: 14px;
          font-weight: 400;
          color: #8d9ca7;
        }
      }
    }

    .tabs {
      width: 20%;

      .tab-item {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-weight: 400;
        color: #666;
        margin-bottom: 26px;
        width: 100%;
        height: 66px;
        position: relative;
        padding: 0 30px;
        cursor: pointer;
        transition: 0.3s linear;
        border-radius: 5px;

        &:hover {
          background: #f0f7ff;
        }

        &.active {
          background: #f0f7ff;
          color: #1565d8;
          &::before {
            opacity: 1;
          }
        }

        &::before {
          content: "";
          width: 6px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #1565d8;
          opacity: 0;
        }

        img {
          width: 32px;
          height: 32px;
          margin-right: 10px;
        }

        &:nth-child(2) {
          img {
            transform: scale(0.88);
          }
        }
      }
    }

    .pannel {
      padding-left: 80px;
      padding-top: 20px;
      flex: 1;

      ::v-deep {
        .el-row {
          margin-bottom: 50px;
          border-bottom: 1px solid #e6e6e6;
          padding-bottom: 20px;

          .el-col {
            display: flex;
            justify-content: space-between;

            font-weight: 400;

            .label {
              font-size: 18px;
              color: #183b56;
            }

            .value {
              font-size: 16px;
              color: #8d9ca7;
            }
          }
        }
      }

      &.userInfo {
        ::v-deep {
          .el-row {
            margin-bottom: 10px;
            padding-bottom: 0px;
            border: none;

            .el-form-item {
              width: 100%;
              display: flex;
              flex-direction: column;
            }

            .el-form-item.portrait {
              width: 100%;
            }
          }

          .submit-action {
            margin-top: 20px;
          }
        }
      }

      &.resetPassword {
        .el-form {
          width: 50%;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="full">
      <div class="w1200">
        <div class="left">
          <img src="./assets/images/vip.png" alt="" />
          <span>会员信息</span>
        </div>
      </div>
    </div>

    <div class="w1200 ">
      <div class="info">
        <div class="user">
          <img :src="appUser._portraitUrl" alt="" />
          <div class="user-content">
            <span class="name">{{ appUser.name }}</span>
            <span class="level">{{ appUser._memberTypeName }}</span>
            <span class="phone">手机号：{{ appUser.mobile }}</span>
            <span class="service-time">VIP有效期：2099-12-20</span>
          </div>
        </div>
        <div class="tabs" @click="onTabClick">
          <div
            v-for="(item, i) in tabs"
            :key="item.value"
            :data-index="i"
            :class="['tab-item', activeTabIndex == i ? 'active' : '']"
          >
            <img :data-index="i" :src="item.icon" alt="" />
            <span :data-index="i">{{ item.label }}</span>
          </div>
        </div>
        <div class="pannel" v-if="activeTabIndex == 0">
          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">用户名</span>
              <span class="value">{{ appUser.name }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">真实姓名</span>
              <span class="value">{{ appUser.realName }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">年龄</span>
              <span class="value">
                {{ appUser.age }}
              </span>
            </el-col>
            <el-col :span="12">
              <span class="label">性别</span>
              <span class="value">{{ appUser.sex == 1 ? "男" : "女" }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">手机号</span>
              <span class="value">
                {{ appUser.mobile }}
              </span>
            </el-col>
            <el-col :span="12">
              <span class="label">组织类型</span>
              <span class="value">
                {{ appUser.orgType == 1 ? "企业" : "学校" }}
              </span>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">单位名称</span>
              <span class="value">{{ appUser.orgName }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">单位地址</span>
              <span class="value">{{ appUser.orgAddr }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">单位联系人</span>
              <span class="value">{{ appUser.orgContactor }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">单位联系人电话</span>
              <span class="value">{{ appUser.orgMobile }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="12">
              <span class="label">单位邮箱</span>
              <span class="value">{{ appUser.email }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="pannel userInfo" v-if="activeTabIndex == 1">
          <el-form
            ref="userFormRef"
            label-position="left"
            :model="userFormData"
            :rules="userFormRules"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item class="portrait" label="会员头像：">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/uploadController/image-upload"
                    list-type="picture-card"
                    :headers="{
                      isToken: false
                    }"
                    :limit="1"
                    :data="{ resizeMode: 'normal' }"
                    :on-success="onUploadSuccess"
                    :on-remove="onUploadFileRemove"
                    :file-list="fileList"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item class="name" prop="name" label="账号名称：">
                  <el-input disabled v-model="userFormData.name" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="realName" label="真实姓名：">
                  <el-input v-model="userFormData.realName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="age" label="年龄：">
                  <el-input v-model="userFormData.age" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="sex" label="性别：">
                  <el-radio-group v-model="userFormData.sex">
                    <el-radio label="1" border>
                      男
                    </el-radio>
                    <el-radio label="0" border>
                      女
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgType" label="组织类型：">
                  <el-radio-group v-model="userFormData.orgType">
                    <el-radio label="1" border>
                      企业
                    </el-radio>
                    <el-radio label="2" border>
                      学校
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="orgName" label="单位名称：">
                  <el-input v-model="userFormData.orgName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgAddr" label="单位地址：">
                  <el-input v-model="userFormData.orgAddr" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="orgContactor" label="单位联系人：">
                  <el-input v-model="userFormData.orgContactor" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgMobile" label="单位联系人电话：">
                  <el-input v-model="userFormData.orgMobile" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="单位网址：">
                  <el-input v-model="userFormData.orgWebsite" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位邮箱：">
                  <el-input v-model="userFormData.email" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item class="submit-action">
              <div class="btn-wrap">
                <a href="javascript:;" class="btn-primary" @click="onSubmit">
                  提交
                </a>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="pannel resetPassword" v-if="activeTabIndex == 2">
          <el-form
            ref="passwordFormRef"
            label-position="left"
            :model="passwordFormData"
            :rules="passwordFormRules"
          >
            <el-form-item prop="oldPassword" label="旧密码">
              <el-input v-model="passwordFormData.oldPassword" />
            </el-form-item>

            <el-form-item prop="password" label="新密码">
              <el-input v-model="passwordFormData.password" />
            </el-form-item>

            <el-form-item prop="newPassword" label="确认新密码">
              <el-input v-model="passwordFormData.newPassword" />
            </el-form-item>

            <el-form-item class="submit-action">
              <div class="btn-wrap">
                <a
                  href="javascript:;"
                  class="btn-primary"
                  @click="onPasswordSubmit"
                >
                  提交
                </a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserInfoRes, changePasswordRes } from "@/api";
import store from "@/store";

const tabs = [
  {
    label: "资料详情",
    value: "details",
    icon: require("./assets/images/details.png")
  },
  {
    label: "编辑资料",
    value: "edit",
    icon: require("./assets/images/edit.png")
  },
  {
    label: "修改密码",
    value: "reset",
    icon: require("./assets/images/reset-password.png")
  }
];
export default {
  name: "vip-info",

  computed: {
    appUser() {
      return store.getters.appUser;
    }
  },

  data() {
    const appUser = store.getters.appUser;
    return {
      tabs,
      activeTabIndex: this.$route.query.index || 0,
      fileList: [{ name: "portraitUrl", url: appUser._portraitUrl }],
      userFormData: {
        name: appUser.name,
        realName: appUser.realName,
        sex: appUser.sex,
        age: appUser.age,
        email: appUser.email,
        orgType: appUser.orgType,
        orgName: appUser.orgName,
        orgAddr: appUser.orgAddr,
        orgContactor: appUser.orgContactor,
        orgMobile: appUser.orgMobile,
        orgWebsite: appUser.orgWebsite,
        portraitUrl: appUser.portraitUrl
      },
      userFormRules: {
        name: [
          { required: true, message: "请填写账号名称！", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请填写真实姓名！", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别！", trigger: "change" }],
        age: [{ required: true, message: "请填写年龄！", trigger: "blur" }],
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
      passwordFormData: {
        oldPassword: "",
        password: "",
        newPassword: ""
      },
      passwordFormRules: {
        oldPassword: [
          { required: true, message: "请输入旧密码！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码！", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请再次输入新密码！", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    onTabClick(e) {
      const index = e.target.getAttribute("data-index");
      this.activeTabIndex = index;
    },
    onUploadSuccess(response) {
      this.userFormData.portraitUrl = response.url;
    },
    onUploadFileRemove() {
      this.userFormData.portraitUrl = "";
    },
    onSubmit() {
      this.$refs.userFormRef.validate(async valid => {
        if (valid) {
          let reqData = {
            id: this.appUser.id,
            ...this.userFormData
          };
          await updateUserInfoRes(reqData);
          this.$message.success("用户信息更新成功！");
          reqData = {
            ...this.appUser,
            ...reqData,
            _portraitUrl:
              process.env.VUE_APP_IMAGE_BASE_URL + reqData.portraitUrl
          };
          localStorage.setItem("app_user", JSON.stringify(reqData));
          store.commit("user/SET_APP_USER", reqData);
        } else {
          return false;
        }
      });
    },
    onPasswordSubmit() {
      this.$refs.passwordFormRef.validate(async valid => {
        if (valid) {
          await changePasswordRes(this.passwordFormData);
          this.$message.success("密码修改成功！");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
