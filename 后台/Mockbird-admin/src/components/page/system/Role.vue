<template>
  <div class="role">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 角色菜单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd()" :disabled="!CodeShow_hideA">新增角色</el-button>
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
        <el-table-column prop="code" label="CODE" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handlexq(scope.$index, scope.row)">详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handlemenu(scope.$index, scope.row)"
              :disabled="!CodeShow_hideE"
            >分配菜单</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handlepos(scope.$index, scope.row)"
              :disabled="!CodeShow_hideD"
            >分配权限</el-button>
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
        <el-form-item prop="code" label="CODE">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色名">
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
        <el-form-item prop="code" label="CODE">
          <el-input v-model="editForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--详情界面-->
    <el-dialog title="详情" :visible.sync="xqVisible" :close-on-click-modal="false">
      <el-form :model="xqForm" label-width="80px">
        <el-form-item label="CODE">
          <el-input v-model="xqForm.code"></el-input>
        </el-form-item>
        <el-form-item label="角色名">
          <el-input v-model="xqForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" style="height: 200px;overflow-y: scroll;">
          <el-tree :data="xqlist"></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="xqVisible=false">返回</el-button>
      </div>
    </el-dialog>
    <!--分配菜单界面-->
    <el-dialog title="分配菜单" :visible.sync="sqVisible" :close-on-click-modal="false">
      <el-form :model="sqForm" label-width="80px" ref="sqForm">
        <el-form-item label="CODE" prop="code">
          <el-input v-model="sqForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="sqForm.name" :disabled="true"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 180px;overflow-y: scroll;">
          <el-tree
            ref="tree"
            :data="allmenu"
            node-key="key"
            show-checkbox
            :default-checked-keys="cklist"
          ></el-tree>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="sqVisible = false">取消</el-button>
        <el-button type="primary" @click.native="sqSubmit" :loading="sqLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--分配权限界面-->
    <el-dialog title="授权" :visible.sync="posVisible" :close-on-click-modal="false">
      <el-form :model="posForm" label-width="80px" ref="sqForm">
        <el-form-item label="CODE" prop="code">
          <el-input v-model="posForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="posForm.name" :disabled="true"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 180px;overflow-y: scroll;">
          <el-tree
            ref="treeb"
            :data="allqxlist"
            node-key="key"
            show-checkbox
            :default-checked-keys="ckqxlist"
          ></el-tree>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="posVisible = false">取消</el-button>
        <el-button type="primary" @click.native="posSubmit" :loading="posLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  menuRoleId,
  menusAll,
  menustoRole,
} from "@/api/http/menus.js";
import {
  rolesList,
  rolesAdd,
  rolesDelete,
  rolesEdit,
  rolesPermissions,
  listPermissions,
  idPermissions,
  rolesSearch
} from "@/api/http/system.js";
import { getTabList, getInfo } from "@/api/http/user.js";
export default {
  name: "role",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        code: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      btnA: "back:role:save",
      btnB: "back:role:update",
      btnC: "back:role:delete",
      btnD: "back:role:permission:set",
      btnE: "back:menu:set2role",
      MBtoken: "",
      QXcode: [],
      currPage: 0,
      total: 1,
      lists: [],
      xqlist: [],
      listLoading: false,
      sels: [], //列表选中列
      // 搜索
      select_word: "",
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //详情
      xqForm: {},
      xqVisible: false,
      //分配菜单
      sqForm: {},
      sqVisible: false,
      sqLoading: false,
      allmenu: [], //分配列表
      cklist: [], //回显列表
      sqlistd: [], //分配列表
      //授权
      posForm: {},
      posVisible: false,
      posLoading: false,
      allqxlist: [], //分配列表
      ckqxlist: [], //回显列表
      qxlistd: [] //分配列表
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
    //下架权限按钮
    CodeShow_hideC: function() {
      return this.QXcode.includes(this.btnC);
    },
    //分配权限按钮
    CodeShow_hideD: function() {
      return this.QXcode.includes(this.btnD);
    },
    //分配菜单权限按钮
    CodeShow_hideE: function() {
      return this.QXcode.includes(this.btnD);
    }
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {};
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.addForm);
            rolesAdd(params).then(res => {
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
            rolesEdit(params).then(res => {
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
    //显示详情界面
    handlexq: function(index, row) {
      this.gethglist(row);
      this.xqVisible = true;
      this.xqForm = Object.assign({}, row);
    },
    //显示分配列表
    handlemenu: function(index, row) {
      let params = {
        roleId: row.id
      };
      menuRoleId(params).then(res => {
        this.cklist = [];
        if (res.status == 200) {
          // console.log(res.data)
          this.cklist = res.data;
        }
      });
      this.getallmenu();
      this.sqVisible = true;
      this.sqForm = Object.assign({}, row);
    },
    //分配列表提交
    sqSubmit: function() {
      let _self = this;
      this.$refs.sqForm.validate(valid => {
        if (valid) {
          _self.$confirm("确认提交吗？", "提示", {}).then(() => {
            _self.sqLoading = true;
            _self.getaKeys();
            //NProgress.start();
            let aer = Object.assign({}, _self.sqForm);
            let params = {
              roleId: aer.id,
              menuIds: _self.sqlistd
            };
            //  _self.sqlistd.map(key=>{
            //   params.permissionIds.push('key')
            // })
            menustoRole(params).then(res => {
              _self.sqLoading = false;
              //NProgress.done();
              _self.$message({
                message: "授权成功",
                type: "success"
              });
              _self.$refs["sqForm"].resetFields();
              _self.sqVisible = false;
              _self.getList();
              _self.getTablists();
            });
          });
        }
      });
    },
    //显示授权列表
    handlepos: function(index, row) {
      // let params = {
      //   roleId: row.id
      // };
      // rolesPermissions(params).then(res => {
      //   this.ckqxlist = [];
      //   if (res.status == 200) {
      //     res.data.data.map(val => {
      //       this.ckqxlist.push(val.permissionId);
      //     });
      //   }
      // });
      this.gethglist(row);
      this.posVisible = true;
      this.posForm = Object.assign({}, row);
    },
    //分配授权提交
    posSubmit() {
      let _self = this;
      // this.$refs.posForm.validate(valid => {
      //   if (valid) {
      _self.$confirm("确认提交吗？", "提示", {}).then(() => {
        _self.posLoading = true;
        _self.getbKeys();
        //NProgress.start();
        let aer = Object.assign({}, _self.posForm);
        let params = {
          id: aer.id,
          permissionIds: _self.qxlistd
        };
        idPermissions(params).then(res => {
          _self.posLoading = false;
          //NProgress.done();
          _self.$message({
            message: "授权成功",
            type: "success"
          });
          _self.posVisible = false;
          _self.getPosiertnuser();
          _self.getList();
        });
      });
      //   }
      // });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确认删除该用户吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id };
          rolesDelete(params).then(res => {
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
    //tree辅助
    getaKeys() {
      this.sqlistd = this.$refs.tree.getCheckedKeys();
    },
    //tree辅助
    getbKeys() {
      this.qxlistd = this.$refs.treeb.getCheckedKeys();
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
      let params = {
        name: this.select_word
      };
      rolesSearch(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //列表
    getList() {
      let params = {
        start: this.currPage,
        length: 10
      };
      rolesList(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //权限回显列表
    gethglist(row) {
      let params = {
        roleId: row.id
      };
      rolesPermissions(params).then(res => {
        this.xqlist = [];
        this.ckqxlist = [];
        if (res.status == 200) {
          res.data.data.map(val => {
            this.xqlist.push({
              key: val.id,
              label: val.name
            });
            this.ckqxlist.push(val.permissionId);
          });
        }
      });
    },
    //权限所有列表
    getqxalllist() {
      let params = {
        currPage: 1,
        pageSize: 10
      };
      listPermissions(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            this.allqxlist.push({
              key: val.id,
              label: val.name
            });
          });
        }
      });
    },
    //获取列表所有
    getallmenu() {
      menusAll().then(res => {
        if (res.status == 200) {
          let arrRes = res.data;
          let arr = [];
          arrRes.map(val => {
            arr.push({
              label: val.name,
              id: val.id,
              key: val.id
            });
          });
          this.allmenu = arr;
        }
      });
    },
    //tab系统菜单
    getTablists() {
      let _self = this;
      let usertoken = _self.MBtoken;
      getTabList(usertoken).then(res => {
        if (res.status == 200) {
          _self.items = res.data;
        } else {
          alert("出错了");
        }
      });
    },
    //权限重新获取更改
    getPosiertnuser() {
      let _self = this;
      let usertoken = _self.MBtoken;
      getInfo(usertoken).then(res => {
        if (res.data.status == 200) {
          let permissionsCode = res.data.data.permissions;
          localStorage.setItem("pmCode", JSON.stringify(permissionsCode));
        } else {
          _self.$message({
            message: "更新成功",
            type: "success"
          });
        }
      });
    }
  },
  mounted() {
    let _self = this;
    let usertoken = localStorage.getItem("admin_token");
    let Pmcode = localStorage.getItem("pmCode");
    let overCode = JSON.parse(Pmcode);
    _self.QXcode = overCode;
    _self.MBtoken = usertoken;
    _self.getList();
    _self.getqxalllist();
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