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
      width: 750px;
      height: 40px;
      margin-right: auto;

      ::v-deep {
        .input-with-select {
          .el-select {
            .el-input__inner:focus {
              border-color: #dcdfe6 !important;
            }
          }
          .el-input__inner {
            font-size: 16px;

            &::placeholder {
              color: #8d9ca7;
              font-size: 16px;
            }
          }
        }
        .el-select .el-input {
          width: 140px;
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
      cursor: pointer;

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
              placeholder="??????????????????"
              v-model="queryForm.value"
              class="input-with-select"
            >
              <el-select
                v-model="queryForm.type"
                slot="prepend"
                placeholder="?????????"
              >
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="onSearch"
              >
                ??????
              </el-button>
            </el-input>
          </div>
          <div class="btn-vip" v-if="Object.keys(appUser).length == 0">
            <!-- <a href="javascript:;">????????????</a> -->
            <!-- <a href="javascript:;" @click="$router.push('/register')">
              ????????????
            </a> -->
            ????????????
          </div>
          <div class="user-wrap" v-else @click="$router.push('vip-info')">
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
            ???????????? ?? ????????????????????????????????????
            <a href="http://beian.miit.gov.cn/" target="_blank">
              ???ICP???2022010386???-1
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
import { searchArticleRes } from "@/api";

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
          label: "??????",
          key: "/home"
        },
        {
          label: "????????????",
          key: "/news"
        },
        {
          label: "?????????",
          key: "/school"
        },
        {
          label: "?????????",
          key: "/enterprise"
        },
        // {
        //   label: "???????????????",
        //   key: "/se-association"
        // },
        {
          label: "???????????????",
          key: "/job-fair"
        },
        {
          label: "??????????????????",
          key: "/se-project"
        }
        // {
        //   label: "????????????",
        //   key: "/vip"
        // }
      ],
      queryForm: {
        value: "",
        type: ""
      },
      searchOptions: [
        {
          value: "news",
          label: "??????"
        },
        {
          value: "school",
          label: "??????"
        },
        {
          value: "enterprise",
          label: "??????"
        }
      ],
      bannerUrls: [
        require("../assets/banner/1.jpg"),
        require("../assets/banner/2.jpg"),
        require("../assets/banner/3.jpg")
      ]
    };
  },

  methods: {
    onSearch() {
      console.log(this.queryForm.type);
    }
  },

  async mounted() {
    // const data = await searchArticleRes({
    //   title: "?????????????????????"
    // });
  }
};
</script>
