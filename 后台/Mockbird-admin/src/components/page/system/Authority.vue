<template>
  <div class="authority">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 权限菜单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" class="handle-del mr10" @click="delAll" :disabled="!CodeShow_hideC">批量删除</el-button> -->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd()" :disabled="!CodeShow_hideA">新增权限标识</el-button>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        v-loading="listLoading"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="permission" label="权限标识"></el-table-column>
        <el-table-column prop="name" label="权限名"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              :disabled="!CodeShow_hideB"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              :disabled="!CodeShow_hideC"
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
    </div>
    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item prop="permission" label="权限标识">
          <el-input v-model="addForm.permission"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="权限名">
          <el-input v-model="addForm.name"></el-input>
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
        <el-form-item prop="permission" label="权限标识">
          <el-input v-model="editForm.permission"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="权限名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPermissions,
  editPermissions,
  addPermissions,
  deletePermissions
} from "@/api/http/system.js";
export default {
  name: "authority",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        permission: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      btnA: "back:permission:save",
      btnB: "back:permission:update",
      btnC: "back:permission:delete",
      btnD: "back:permission:query",
      QXcode: [],
      loUserlist: [],
      currPage: 0,
      total: 1,
      lists: [],
      listLoading: false,
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //搜索
      select_word: ""
    };
  },
  computed: {
    //添加权限按钮
    CodeShow_hideA: function() {
      return this.QXcode.includes(this.btnA);
    },
    //修改权限按钮
    CodeShow_hideB: function() {
      return this.QXcode.includes(this.btnB);
    },
    //删除权限按钮
    CodeShow_hideC: function() {
      return this.QXcode.includes(this.btnC);
    },
    //批量下架权限按钮
    CodeShow_hideD: function() {
      return this.QXcode.includes(this.btnD);
    }
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        permission: "",
        name: ""
      };
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.addForm);
            addPermissions(params).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //编辑
    handleEdit(index, row) {
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
            params.createTime = null;
            params.updateTime = null;
            editPermissions(params).then(res => {
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
    handleDelete(index, row) {
      this.$confirm("确认删除该条权限吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id };
          deletePermissions(params).then(res => {
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
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    // 列表选中列
    handleSelectionChange(val) {
      this.sels = val;
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currPage = val;
      this.getList();
    },
    //搜索
    search() {
      this.is_search = true;
    },
    //权限列表
    getList() {
      let params = {
        start: this.currPage,
        length: 10
      };
      listPermissions(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //权限按钮
    CodeShow_hide(e) {
      if (this.QXcode != "") {
        this.QXcode.forEach(v => {
          if (v == e) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
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
    this.getList();
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