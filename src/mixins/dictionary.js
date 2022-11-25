import { getDictsRes } from "@/api";

export default {
  data() {
    return {
      s_levels: [],
      s_types: [],
      se_cooperationModes: [],
      e_types: [],
      se_people: [],
      se_workTypes: [],
      question_types: [],
      vip_types: []
    };
  },
  methods: {
    async _querySchoolLevel(cb) {
      // 高校层次
      const data = await getDictsRes(112);
      this.s_levels = data;
      cb && cb(data);
    },
    async _querySchoolType(cb) {
      // 高校性质
      const data = await getDictsRes(113);
      this.s_types = data;
      cb && cb(data);
    },
    async _querySECooperationMode(cb) {
      // 校企合作模式
      const data = await getDictsRes(114);
      this.se_cooperationModes = data;
      cb && cb(data);
    },
    async _querySEPeople(cb) {
      // 高校、企业人数规模
      const data = await getDictsRes(115);
      this.se_people = data;
      cb && cb(data);
    },
    async _queryEnterpriseType(cb) {
      // 企业性质
      const data = await getDictsRes(116);
      this.e_types = data;
      cb && cb(data);
    },
    async _queryWorkTypes(cb) {
      // 企业工种、学校专业
      const data = await getDictsRes(162);
      this.se_workTypes = data;
      cb && cb(data);
    },
    async _queryQuestionTypes(cb) {
      // 问题类型
      const data = await getDictsRes(212);
      this.question_types = data;
      cb && cb(data);
    },
    async _queryVIPTypes(cb) {
      // 问题类型
      const data = await getDictsRes(263);
      this.vip_types = data;
      cb && cb(data);
    }
  }
};
