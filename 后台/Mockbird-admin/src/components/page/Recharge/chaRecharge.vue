<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 充值记录
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- <div class="handle-box">
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click.native="batchRemove"
        >批量删除</el-button>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd">新增</el-button>
      </div>-->
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" size="medium" @change="Shsx($event)">
          <el-radio-button label="未支付">未支付</el-radio-button>
          <el-radio-button label="支付完成">支付完成</el-radio-button>
          <el-radio-button label="订单完成">订单完成</el-radio-button>
          <el-radio-button label="支付失败">支付失败</el-radio-button>
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
        <el-table-column prop="body" label="商品描述"></el-table-column>
        <el-table-column prop="subject" label="商品标题"></el-table-column>
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="integral" label="积分"></el-table-column>
        <el-table-column prop="payway" label="支付方式"></el-table-column>
        <el-table-column prop="addTime" label="创建时间"></el-table-column>
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
        </el-table-column>-->
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <!--审核界面-->
      <el-dialog title="审核" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">返回</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">审核通过</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPayOrderList } from "@/api/http/recharge.js";
import moment from "moment";
export default {
  name: "cmstype",
  data() {
    return {
      QXcode: [],
      loUserlist: [],
      tabPosition: "未支付",
      currPage: 1,
      total: 1,
      lists: [],
      sels: [],
      select_word: "",
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
    //状态筛选
    Shsx(event) {
      this.getList();
    },
    //搜索
    search() {
      let _self = this;
      _self.is_search = true;
      let _init = parseInt(_self.select_word);
      let params = {
        userType: _self.loUserlist.userType,
        type: _self.loUserlist.type,
        orderId: _init,
        userId: _self.loUserlist.id
      };
      _self.lists = [];
      searchfindOrderId(params).then(res => {
        if (res.data.status == 200) {
          _self.lists.push(res.data.data);
        }
      });
    },
    //数据列表
    getList() {
      let _self = this;
      let ustats = 0;
      if (this.tabPosition == "未支付") {
        ustats = 0;
      }
      if (this.tabPosition == "支付完成") {
        ustats = 1;
      }
      if (this.tabPosition == "订单完成") {
        ustats = 2;
      }
      if (this.tabPosition == "支付失败") {
        ustats = 3;
      }
      let params = {
        userId: _self.loUserlist.id,
        status: ustats,
        userType: _self.loUserlist.userType,
        pageCount: _self.currPage,
        pageSize: 10
      };
      getPayOrderList(params).then(res => {
        if (res.status == 200) {
          // console.log(res.data.data)
          // res.data.data.map(val=>{
          //   res.data.data.addTime= moment(val.addTime).format("YYYY-MM-DD HH:mm:ss");
          // })
          this.lists = res.data.data;
          this.total = res.data.total;
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
/* /deep/ .el-dialog__body {
  height: 50vh;
  overflow: auto;
}
/deep/ .el-dialog__body::-webkit-scrollbar {
  display: none;
} */
</style>
