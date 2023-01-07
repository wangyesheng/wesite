<style lang="scss" scoped>
::v-deep {
  .el-dialog__wrapper {
    .el-dialog__body {
      text-align: center !important;
    }
  }
}
</style>

<template>
  <div class="common-card">
    <div class="title">
      <span>我要发布</span>
    </div>
    <div class="list-content">
      <!-- <a href="javascript:;" class="btn-plain mt10">校企会报名</a> -->
      <a href="javascript:;" class="btn-plain mt10" @click="onJobFairApply">
        校招会发布
      </a>
      <a
        href="javascript:;"
        class="btn-plain mt10"
        @click="onIDDialogShow('/se-project_apply', false)"
      >
        校企合作项目
      </a>
      <a
        href="javascript:;"
        class="btn-plain mt10"
        @click="onIDDialogShow('/se-association', true)"
      >
        申请免费宣传
      </a>
    </div>

    <el-dialog title="请选择身份" :visible.sync="IDDialog.visible" width="30%">
      <el-radio-group v-model="IDDialog.activeID" @change="onIDRadioChange">
        <el-radio label="s" border>院校</el-radio>
        <el-radio label="e" border>企业</el-radio>
      </el-radio-group>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "WantedPublish",

  data() {
    return {
      IDDialog: {
        visible: false,
        activeID: "",
        path: "",
        isFull: false
      }
    };
  },

  computed: {
    appUser() {
      return store.getters.appUser;
    }
  },

  methods: {
    beforeApply() {
      if (Object.keys(this.appUser).length === 0) {
        this.$message.warning("请先登录再发布信息！");
        return false;
      }
      return true;
    },
    onJobFairApply() {
      if (!this.beforeApply()) return;
      this.$router.push("/job-fair_apply");
    },
    onIDDialogShow(path, isFull) {
      if (!this.beforeApply()) return;
      this.IDDialog.path = path;
      this.IDDialog.isFull = isFull;
      this.IDDialog.visible = true;
    },
    onIDRadioChange() {
      const { activeID, path, isFull } = this.IDDialog;
      if (isFull) {
        this.$router.push(`${path}-${activeID}_apply`);
      } else {
        this.$router.push(`${path}?type=${activeID == "s" ? 1 : 2}`);
      }
      this.IDDialog.visible = false;
    }
  }
};
</script>
