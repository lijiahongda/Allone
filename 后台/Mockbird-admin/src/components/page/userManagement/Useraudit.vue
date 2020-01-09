<template>
  <div class="userquery">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>用户审核
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium">
          <el-radio-button label="认证中">认证中</el-radio-button>
          <el-radio-button label="认证通过">认证通过</el-radio-button>
          <el-radio-button label="认证失败">认证失败</el-radio-button>
        </el-radio-group>
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
        <el-table-column prop="realName" label="真实姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="companyCode" label="专资码" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="userTypeout" label="身份" align="center"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" v-if="tabPosition!='认证通过'">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="tabPosition=='认证中'"
            >审核</el-button>
            <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
    <!--审核界面-->
    <el-dialog title="审核" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="真实姓名">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="editForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="editForm.job"></el-input>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20" v-if="editForm.businessLicense!=null">
              <span>营业执照</span>
              <div class="user-info">
                <img :src="editForm.businessLicense" class="user-avator" alt>
              </div>
            </el-card>
            <el-card shadow="hover" class="mgb20" v-if="editForm.filmLicense!=null">
              <span>放映许可证</span>
              <div class="user-info">
                <img :src="editForm.filmLicense" class="user-avator" alt>
              </div>
            </el-card>
            <el-card shadow="hover" class="mgb20" v-if="editForm.idUrl!=null">
              <span>工作证明</span>
              <div class="user-info">
                <img :src="editForm.idUrl" class="user-avator" alt>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">返回</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">是</el-button>
        <el-button type="primary" @click.native="edituddSubmit" :loading="editLoading">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  anongetUserAuth,
  anonAuthAudit,
  Companyverify
} from "@/api/http/user.js";
import { rolesList } from "@/api/http/system.js";
export default {
  name: "userquery",
  data() {
    return {
      currPage: 1,
      total: 1,
      lists: [],
      cklist: [],
      listLoading: false,
      tabPosition: "认证中",
      sels: [], //列表选中列
      // 搜索
      select_word: "",
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      tselete: 0,
      tseletes: [
        { usertype: 1, name: "片方" },
        { usertype: 2, name: "院方" },
        { usertype: 0, name: "管理员" }
      ],
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //授权
      sqlistd: [],
      jslist: [],
      sqForm: {},
      sqVisible: false,
      sqLoading: false
    };
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
            params.userType = this.tselete;
            anonaddUser(params).then(res => {
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
    //提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认审核通过吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let selfs = Object.assign({}, this.editForm);
            // if(selfs.userType=="制片方"){
            //   selfs.userType=1
            // }else if(selfs.userType=="影院方"){
            //   selfs.userType=2
            // }else{
            //   self.userType=0
            // }
            let CompanyVo = Object.assign({}, this.editForm);
            // if(CompanyVo.userType=="制片方"){
            //   CompanyVo.userType=1
            // }else if(CompanyVo.userType=="影院方"){
            //   CompanyVo.userType=2
            // }else{
            //   CompanyVo.userType=0
            // }
            let params = {
              userId: selfs.userId,
              authStatus: 2,
              userType: selfs.userType,
              companyId: selfs.id,
              companyName: selfs.companyName
            };
            params.createTime = null;
            params.updateTime = null;
            anonAuthAudit(params).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              Companyverify(CompanyVo).then(res => {
                console.log(res);
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //编辑提交2
    edituddSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认审核失败吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let selfs = Object.assign({}, this.editForm);
            let params = {
              userId: selfs.userId,
              authStatus: 3,
              userType: selfs.userType,
              companyId: selfs.id,
              companyName: selfs.companyName
            };
            params.createTime = null;
            params.updateTime = null;
            anonAuthAudit(params).then(res => {
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
    //显示分配列表
    handlemenu: function(index, row) {
      let _self = this;
      _self.cklist = [];
      let params = {
        id: row.id
      };
      usersRoles(params).then(res => {
        res.data.map(val => {
          _self.cklist.push(val.id);
        });
      });
      _self.getType();
      _self.sqVisible = true;
      _self.sqForm = Object.assign({}, row);
    },
    //授权提交
    sqSubmit: function() {
      let _self = this;
      _self.$refs.sqForm.validate(valid => {
        if (valid) {
          _self.getCheckedKeys();
          _self.$confirm("确认提交吗？", "提示", {}).then(() => {
            _self.sqLoading = true;
            let aer = Object.assign({}, _self.sqForm);
            //NProgress.start();
            let params = {
              id: aer.id,
              roleIds: _self.sqlistd
            };
            tjTusers(params).then(res => {
              _self.sqLoading = false;
              //NProgress.done();
              _self.$message({
                message: "提交成功",
                type: "success"
              });
              _self.sqVisible = false;
              _self.getList();
            });
          });
        }
      });
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
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
    getCheckedKeys() {
      this.sqlistd = this.$refs.tree.getCheckedKeys();
    },
    Shsx() {
      this.getList();
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
    getList() {
      let ustats = 0;
      if (this.tabPosition == "认证中") {
        ustats = 1;
      }
      if (this.tabPosition == "认证通过") {
        ustats = 2;
      }
      if (this.tabPosition == "认证失败") {
        ustats = 3;
      }
      let params = {
        pageCount: this.currPage,
        pageSize: 10,
        authStatus: ustats
      };
      anongetUserAuth(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            if (val.userType == 2) {
              val.userTypeout = "影院方";
            } else if (val.userType == 1) {
              val.userTypeout = "制片方";
            } else {
              val.user.userTypeout = "其他";
            }
          });
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    getType() {
      let params = {
        start: 0,
        length: 100
      };
      rolesList(params).then(res => {
        this.jslist = [];
        if (res.status == 200) {
          // this.tseletes=res.data.data
          res.data.data.map(val => {
            this.jslist.push({
              key: val.id,
              label: val.name
            });
          });
        }
      });
    }
  },
  mounted() {
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
.user-info {
  display: flex;
  width: 100%;
  height: 280px;
  align-items: center;
  padding-bottom: 20px;
  /* border-bottom: 2px solid #ccc; */
  margin-top: 20px;
}

.user-avator {
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  /* margin-left: 70px; */
}

.mgb20 {
  margin-bottom: 20px;
}
.mgb20 span {
  font-size: 15px;
  color: #606266;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
