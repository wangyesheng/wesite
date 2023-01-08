<template>
  <div class="common-card vip-wrap">
    <div class="inner" v-if="Object.keys(appUser).length == 0">
      <div class="title">
        <span>会员登录</span>
      </div>
      <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入账号"
            autocomplete="new-password"
            v-model="loginFormData.name"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            autocomplete="new-password"
            placeholder="请输入密码"
            v-model="loginFormData.password"
          />
        </el-form-item>
        <!-- <el-form-item>
          <el-checkbox>记住密码</el-checkbox>
        </el-form-item> -->
        <el-form-item>
          <el-checkbox>
            我已阅读并同意《网站使用协议书》
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <a href="javascript:;" class="btn-primary" @click="checkLogin">
            登录
          </a>
          <a
            href="javascript:;"
            class="btn-plain"
            @click="$router.push('/register')"
          >
            注册
          </a>
        </el-form-item>
      </el-form>
    </div>

    <div class="has-logged" v-else>
      <div class="vip-content">
        <div
          class="avatar"
          :style="`background-image: url(${appUser._portraitUrl})`"
        >
          <img
            src="../../assets/icon/edit.png"
            @click="$router.push('/vip-info?index=1')"
            alt=""
          />
        </div>
        <div class="vip-name">
          {{ appUser.name }}
        </div>
        <div class="vip-level">{{ appUser._memberTypeName }}</div>
        <div class="vip-time">
          <span>VIP有效期：</span>
          <span>2099-12-28</span>
        </div>
      </div>

      <div class="btn-wrap">
        <a
          href="javascript:;"
          class="btn-primary"
          @click="$router.push('/vip-info')"
        >
          会员中心
        </a>
        <a href="javascript:;" class="btn-plain" @click="handleLogout">
          退出登录
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { checkLoginRes, getUserInfoRes } from "@/api";
import { setToken, removeToken } from "@/utils/auth";
import dictionaryMixin from "@/mixins/dictionary.js";
import store from "@/store";

export default {
  name: "VIPForm",

  mixins: [dictionaryMixin],

  data() {
    const appUser = JSON.parse(localStorage.getItem("app_user") || "{}");
    return {
      appUser,
      loginFormData: {
        name: "",
        password: ""
      }
    };
  },

  methods: {
    async checkLogin() {
      const { token } = await checkLoginRes(this.loginFormData);
      setToken(token);
      let data = await getUserInfoRes();
      await this._queryVIPTypes();
      data = {
        ...data,
        _memberTypeName: (
          this.vip_types.find(x => x.value == data.memberType) || {}
        ).name,
        _portraitUrl: process.env.VUE_APP_IMAGE_BASE_URL + data.portraitUrl
      };
      localStorage.setItem("app_user", JSON.stringify(data));
      store.commit("user/SET_APP_USER", data);
      this.appUser = data;
    },
    handleLogout() {
      localStorage.setItem("app_user", "");
      store.commit("user/SET_APP_USER", {});
      removeToken();
      this.appUser = {};
    }
  }
};
</script>
