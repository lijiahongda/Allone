<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 餐饮云屏
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="广告名称"></el-table-column>
        <el-table-column prop="tradingArea" label="商圈"></el-table-column>
        <el-table-column prop="area" label="县/区"></el-table-column>
        <el-table-column prop="addTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="center">
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
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="tradingArea" label="商圈">
          <el-input v-model="addForm.tradingArea"></el-input>
        </el-form-item>
        <el-form-item prop="area" label="县/区">
          <el-input v-model="addForm.area"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
         <el-form-item prop="name" label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="tradingArea" label="商圈">
          <el-input v-model="editForm.tradingArea"></el-input>
        </el-form-item>
        <el-form-item prop="area" label="县/区">
          <el-input v-model="editForm.area"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCateringStarrySkys,addCateringStarrySkys,CateringStarrySkysdelete,CateringStarrySkysupdate } from "@/api/http/starry_sky.js";
import moment from "moment";
export default {
  name: "cmstype",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        address: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        tradingArea: [{ required: true, message: "不能为空", trigger: "blur" }],
        area: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      QXcode: [],
      loUserlist: [],
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
              addCateringStarrySkys(params).then(res => {
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
            delete params.addTime
            CateringStarrySkysupdate(params).then(res => {
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
          let params = { id: row.id };
          CateringStarrySkysdelete(params).then(res => {
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
      let params = {
        currPage: this.currPage,
        pageSize:10
      };
      getCateringStarrySkys(params).then(res => {
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
          this.total = res.data.totalCount
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
