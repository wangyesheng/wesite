<style lang="scss" scoped>
.list-wrap {
  ul {
    li {
      padding-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e3e7ed;
      color: #183b56;
      a {
        flex: 1;
        transition: 0.3s;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: #1565d8;
        }
      }

      span {
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>

<template>
  <div class="list-wrap" v-bind="$attrs">
    <ul v-if="repeat">
      <li class="flex-jc-sb" v-for="n in repeat" :key="n">
        <a href="#">{{ data.title }}</a>
        <span>{{ data._createTime }}</span>
      </li>
    </ul>
    <ul v-else>
      <li class="flex-jc-sb" v-for="n in data" :key="n.id">
        <a href="javascript:;" @click="onNavToInfoDetails(n)">
          {{ n.title }}
        </a>
        <span>{{ n._createTime }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LIST",

  props: ["data", "repeat"],

  methods: {
    onNavToInfoDetails(scope) {
      localStorage.setItem("lastestInfo", JSON.stringify(scope));
      this.$router.push("/info-details");
    }
  }
};
</script>
