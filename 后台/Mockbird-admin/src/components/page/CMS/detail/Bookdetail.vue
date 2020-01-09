<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-warn"></i> 文章
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h1>{{lists.title}}</h1>
      <span class="src">{{lists.src}}</span>
      <div class="quill-editor">
        <div v-html="lists.content" class="ql-editor ql-container ql-snow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      lists: []
    };
  },
  methods: {},
  mounted() {
    let _self = this;
    let list = sessionStorage.getItem("CBookDetail");
    _self.lists = JSON.parse(list);
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 30px 0;
}
p {
  line-height: 30px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.logout {
  color: #409eff;
}
.src {
  color: #777;
  width: 100%;
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.ql-container.ql-snow {
    border: none !important;
}
</style>