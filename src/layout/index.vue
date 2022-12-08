<style lang="scss" scoped>
.app-wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .search {
    .search-panel {
      padding: 12px 0;
      display: flex;
      align-items: center;
    }

    .logo {
      display: inline-block;
      background: url("../assets/logo.png") no-repeat 0 0/100% 100%;
      height: 75.333px;
      width: 220.666px;
      margin-right: 60px;
    }

    .search-form {
      width: 600px;
      height: 40px;
      margin-right: auto;

      ::v-deep {
        .input-with-select {
          .el-input__inner {
            font-size: 16px;

            &::placeholder {
              color: #8d9ca7;
              font-size: 16px;
            }
          }
        }
        .el-select .el-input {
          width: 130px;
        }

        .el-input-group__append {
          background: #1565d8;
          color: #fff;
          font-size: 14px;
        }
      }
    }

    .btn-vip {
      font-size: 16px;
      font-weight: bold;
      color: #1565d8;
      letter-spacing: 5px;

      a {
        margin-left: 20px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 4px;
          background: #1565d8;
          transform: scaleX(0);
          transition: 0.3s;
        }

        &:hover::after {
          transform: scaleX(0.5);
        }
      }
    }

    .user-wrap {
      display: flex;
      align-content: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        color: #183b56;
        font-size: 20px;
        font-weight: 550;
        line-height: 40px;
      }
    }
  }

  .navbar {
    width: 100%;
    background: #1565d8;
    ul {
      height: 72px;

      display: flex;
      justify-content: space-evenly;
      align-items: center;

      li {
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 4px;
          background: #fff;
          transition: 0.3s;
          transform: scaleX(0);
        }

        &:hover::after,
        &.is-active::after {
          transform: scaleX(0.5);
        }
      }
    }
  }

  .footer {
    height: 186px;
    background: #1565d8;
    .copyright {
      color: #fff;
      line-height: 186px;
      text-align: center;
    }
  }

  .swiper {
    width: 100% !important;

    ::v-deep {
      .el-carousel {
        width: 100% !important;
      }
    }
  }
}
</style>

<template>
  <div class="app-wrap">
    <div :class="inMobile ? 'w1200' : ''">
      <div class="search">
        <div class="w1200 search-panel">
          <a href="#/home" class="logo"></a>
          <div class="search-form">
            <el-input
              placeholder="请输入关键字"
              v-model="queryForm.value"
              class="input-with-select"
            >
              <el-select
                v-model="queryForm.type"
                slot="prepend"
                placeholder="请选择"
              >
              </el-select>
              <el-button type="primary" slot="append" icon="el-icon-search">
                搜索
              </el-button>
            </el-input>
          </div>
          <div class="btn-vip" v-if="Object.keys(appUser).length == 0">
            <a href="javascript:;">会员登录</a>
            <a href="javascript:;" @click="$router.push('/register')">
              会员注册
            </a>
          </div>
          <div class="user-wrap" v-else>
            <img :src="appUser._portraitUrl" alt="" />
            <span>{{ appUser.name }}</span>
          </div>
        </div>
      </div>

      <div class="navbar">
        <ul class="w1200">
          <li
            v-for="link in navLinks"
            :key="link.key"
            :class="currentPath.includes(link.key) ? 'is-active' : ''"
          >
            <router-link :to="link.key">{{ link.label }}</router-link>
          </li>
        </ul>
      </div>

      <div class="swiper">
        <el-carousel height="320px">
          <el-carousel-item
            v-for="item in bannerUrls"
            :key="item"
            :style="{ background: `url(${item}) no-repeat 0 0/100% 100%` }"
          >
          </el-carousel-item>
        </el-carousel>
      </div>

      <router-view />

      <div class="footer">
        <div class="w1200">
          <div class="copyright">
            版权所有 © 陕西臻轩电子科技有限公司
            <a href="http://beian.miit.gov.cn/" target="_blank">
              陕ICP备2022010386号-1
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/utils";
import store from "@/store";
export default {
  name: "LAYOUT",

  computed: {
    currentPath() {
      return this.$route.path;
    },
    inMobile() {
      return isMobile();
    },
    appUser() {
      return store.getters.appUser;
    }
  },

  data() {
    return {
      navLinks: [
        {
          label: "首页",
          key: "/home"
        },
        {
          label: "综合资讯",
          key: "/news"
        },
        {
          label: "院校库",
          key: "/school"
        },
        {
          label: "企业库",
          key: "/enterprise"
        },
        // {
        //   label: "校企合作会",
        //   key: "/se-association"
        // },
        {
          label: "校园招聘会",
          key: "/job-fair"
        },
        {
          label: "校企合作项目",
          key: "/se-project"
        }
        // {
        //   label: "会员专区",
        //   key: "/vip"
        // }
      ],
      queryForm: {
        value: "",
        type: ""
      },
      bannerUrls: [
        require("../assets/banner/1.jpg"),
        require("../assets/banner/2.jpg"),
        require("../assets/banner/3.jpg")
      ]
    };
  }
};
</script>
