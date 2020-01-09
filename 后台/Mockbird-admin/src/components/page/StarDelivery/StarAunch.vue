<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 星空资源列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click.native="batchRemove"
        >批量删除</el-button>-->
        <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button> -->
        <el-select
          v-model="tselete"
          placeholder="云屏类型"
          @change="chSelete($event)"
          class="handle-select mr10"
        >
          <el-option key="null" label="全部" value="null"></el-option>
          <el-option key="A" label="AB类" value="AB"></el-option>
          <!-- <el-option key="B" label="B类" value="B"></el-option> -->
          <el-option key="C" label="C类" value="C"></el-option>
        </el-select>
        <!-- <el-button type="primary" @click.native="handleAdd">新增</el-button> -->
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium" class="wwwe">
          <el-radio-button label="待审核">待审核</el-radio-button>
          <el-radio-button label="已审核">已审核</el-radio-button>
          <el-radio-button label="已删除" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">已删除</el-radio-button>
          <el-radio-button label="已完成" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">已完成</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- <el-table-column prop="adcode" label="广告ID"></el-table-column> -->
        <el-table-column prop="adname" label="广告名称"></el-table-column>
        <el-table-column prop="adtype" label="云屏类型"></el-table-column>
        <el-table-column prop="adstartTime" label="开始时间"></el-table-column>
        <el-table-column prop="adendTime" label="结束时间"></el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleDel(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { starnetQueryList } from "@/api/http/starry_sky.js";
import moment from "moment";
export default {
  name: "cmstype",
  data() {
    return {
      QXcode: [],
      loUserlist: [],
      currPage: 1,
      total: 1,
      lists: [],
      sels: [],
      select_word: "",
      //筛选
      tselete: null,
      tabPosition: "待审核",
      is_search: false,
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false
    };
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        typeName: ""
      };
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            if (this.addForm.typeName != "") {
              let params = Object.assign({}, this.addForm);
              addCMSA(params).then(res => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getList();
              });
            } else {
              this.$message({
                message: "提交失败内容为空！",
                type: "error"
              });
              this.addLoading = false;
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getList();
            }
          });
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            editCMSA(params).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { typeId: row.typeId };
          removeCMSA(params).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
    //批量删除
    batchRemove() {
      var ids = this.sels.map(item => item.typeId).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { typeId: ids };
          removearrCMSA(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
    //全选单选多选
    selsChange(sels) {
      this.sels = sels;
    },
    //分页加载
    handleCurrentChange(val) {
      this.currPage = val;
      this.getList();
    },
    //状态查询
    Shsx() {
      this.getList();
    },
    //广告类型
    chSelete() {
      this.getList();
    },
    //搜索
    search() {
      this.is_search = true;
    },
    //数据列表
    getList() {
      let ustats = 1;
      if (this.tabPosition == "待审核") {
        ustats = 1;
      }
      if (this.tabPosition == "已审核") {
        ustats = 2;
      }
      if (this.tabPosition == "已删除") {
        ustats = 3;
      }
      if (this.tabPosition == "已完成") {
        ustats = 4;
      }
      if(this.tselete=="null"){
        this.tselete=null
      }
      let params = {
        status: ustats,
        adtype: this.tselete
      };
      starnetQueryList(params).then(res => {
        if (res.data.status==0) {
          let _data = res.data.data;
          for (let i = 0; i < _data.length; i++) {
            _data[i].adstartTime = moment(_data[i].adstartTime).format(
              "YYYY-MM-DD"
            );
            _data[i].adendTime = moment(_data[i].adendTime).format(
              "YYYY-MM-DD"
            );
          }
          this.lists = _data;
        }else{
          this.lists = [];
        }
      });
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
    _self.getList();
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
