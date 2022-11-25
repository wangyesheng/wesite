<style lang="scss" scoped>
.question-wrap {
  max-width: 450px;
}
</style>

<template>
  <div class="question-wrap">
    <div class="ask-question mb10">
      <span class="mb20">校企合作有什么问题？可进行提问！</span>
      <a href="javascript:;" class="btn-plain" @click="onQuestionDialogShow">
        我要提问
      </a>
    </div>
    <div class="se-question">
      <List class="mb10" :data="questions" />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="queryForm.pageSize"
        :current-page="queryForm.page"
        @current-change="queryQuestions"
      />
    </div>
    <el-dialog
      title="我要提问"
      width="30%"
      :visible.sync="questionDialog.visible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="questionFormRef"
        :model="questionDialog.formData"
        :rules="questionDialog.formRules"
        label-position="top"
      >
        <el-form-item prop="title" label="标题">
          <el-input
            v-model="questionDialog.formData.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item prop="context" label="内容">
          <el-input
            autosize
            type="textarea"
            placeholder="请输入内容"
            v-model="questionDialog.formData.context"
          />
        </el-form-item>
        <el-form-item prop="title" label="所属类型">
          <el-select
            v-model="questionDialog.formData.type"
            placeholder="请选择所属类型"
            style="width: 100%"
          >
            <el-option
              v-for="n in question_types"
              :key="n.id"
              :label="n.name"
              :value="n.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="telephone" label="联系方式">
          <el-input
            v-model="questionDialog.formData.telephone"
            placeholder="请输入联系方式"
          />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="questionDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="onQuestionSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";

import List from "@/components/List";
import { getQuestionsRes, askQuestionRes } from "@/api";
import dictionaryMixin from "@/mixins/dictionary.js";

export default {
  name: "question",

  components: {
    List
  },

  mixins: [dictionaryMixin],

  data() {
    return {
      queryForm: {
        q_Contains_title: "",
        page: 1,
        pageSize: 5
      },
      questions: [],
      total: 0,
      questionDialog: {
        visible: false,
        formData: {
          title: "",
          context: "",
          telephone: "",
          type: ""
        },
        formRules: {
          title: [{ required: true, message: "请输入标题", trigger: "blur" }],
          context: [{ required: true, message: "请输入内容", trigger: "blur" }],
          telephone: [
            { required: true, message: "请输入联系方式", trigger: "blur" }
          ]
        }
      }
    };
  },

  methods: {
    async queryQuestions(page = 1) {
      const { totalElements, content } = await getQuestionsRes({
        ...this.queryForm,
        page
      });
      this.total = totalElements;
      this.questions = content.map(x => ({
        ...x,
        _createTime: dayjs(x.createTime).format("YYYY-MM-DD")
      }));
    },
    onQuestionDialogShow() {
      this.questionDialog.formData = {
        title: "",
        context: "",
        telephone: "",
        type: ""
      };
      this.questionDialog.visible = true;
    },
    onQuestionSubmit() {
      this.$refs.questionFormRef.validate(async valid => {
        if (valid) {
          const data = await askQuestionRes(this.questionDialog.formData);
        } else {
          return false;
        }
      });
    }
  },

  mounted() {
    this.queryQuestions();
    this._queryQuestionTypes();
  }
};
</script>
