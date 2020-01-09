<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 餐饮云屏数据录入
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :show-file-list="true"
      ></upload-excel-component>
      <el-form
        ref="form"
        label-width="120px"
        style="margin: 50px auto;width: 600px;position:relative;"
      >
        <el-button
          type="primary"
          @click="upLoaderEn"
          style="position:absolute;right:0;bottom:-15px;"
        >上传到后台</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import request from "@/api/http.js";
import { excelAnalysis } from "@/api/http/dataentry.js";
import moment from "moment";
export default {
  name: "eunen",
  components: { UploadExcelComponent },
  data() {
    return {
      value1: "",
      upath: "",
      upath2: "",
      result: "",
      result2: "",
      uping: 0,
      resultobj: ""
    };
  },
  methods: {
    beforeUpload(file) {
      let _self = this;
      var zipFormData = new FormData();
      zipFormData.append("platoonExcel", file); //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      request
        .post(
          "/lpi/api-f/files-anon/qiniu/uploadExcelFile",
          zipFormData,
          config
        )
        .then(function(response) {
          if (response.data.status == 200) {
            _self.resultobj = response.data.data;
          } else {
            _self.$message({
              message: response.data.msg,
              type: "error"
            });
          }
        });
    },
    upLoaderEn() {
      let asse = moment(this.value1).format("YYYY-MM-DD");
      let params = {
        url: this.resultobj
      };
      excelAnalysis(params).then(res => {
        if (res.data.status == 0) {
          this.$message({
            message: "录入成功",
            type: "success"
          });
          this.resultobj = "";
          this.value1 = "";
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
          this.resultobj = "";
          this.value1 = "";
        }
      });
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    }
  },
  mounted() {
    let _self = this;
    let Adlist = localStorage.getItem("UserList");
    let Pmcode = localStorage.getItem("pmCode");
    let glist = JSON.parse(Adlist);
    let overCode = JSON.parse(Pmcode);
    _self.loUserlist = glist;
    _self.QXcode = overCode;
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
