<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 企业管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>-->
        <el-button type="primary" @click.native="handleAdd">新增</el-button>
      </div>
      <el-table :data="lists" border class="table" ref="multipleTable">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="typeDesc" label="公司类型"></el-table-column>
        <el-table-column prop="worksNum" label="作品数量"></el-table-column>
        <!-- <el-table-column prop="worksNum" label="作品数量"></el-table-column> -->
        <!-- <el-table-column prop="typeDesc" label="公司类型"></el-table-column> -->
        <el-table-column prop="leaderMember" label="主要成员"></el-table-column>
        <el-table-column prop="address" label="公司地址"></el-table-column>
        <el-table-column prop="companyTel" label="公司电话"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
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
    </div>

    <!--新增界面-->
    <el-dialog title="新增分类" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
        <el-form-item prop="companyName" label="企业名称">
          <el-input v-model="addForm.companyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/lpi/api-f/files-anon/qiniu/upload"
            list-type="picture-card"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccessAdd"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="worksNum" label="作品数量">
          <el-input v-model="addForm.worksNum"></el-input>
        </el-form-item>
        <el-form-item prop="typeDesc" label="公司类型">
          <el-input v-model="addForm.typeDesc"></el-input>
        </el-form-item>
        <el-form-item prop="issueNum" label="发行数量">
          <el-input v-model="addForm.issueNum"></el-input>
        </el-form-item>
        <el-form-item prop="productNum" label="出品数量">
          <el-input v-model="addForm.productNum"></el-input>
        </el-form-item>
        <el-form-item prop="productOfficebox" label="出品票房">
          <el-input v-model="addForm.productOfficebox"></el-input>
        </el-form-item>
        <el-form-item prop="issueOfficebox" label="发行票房">
          <el-input v-model="addForm.issueOfficebox"></el-input>
        </el-form-item>
        <el-form-item prop="leaderMember" label="主要成员">
          <el-input v-model="addForm.leaderMember"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="公司地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="compayEmail" label="公司邮箱">
          <el-input v-model="addForm.compayEmail"></el-input>
        </el-form-item>
        <el-form-item prop="companyTel" label="公司电话">
          <el-input v-model="addForm.companyTel"></el-input>
        </el-form-item>
        <el-form-item prop="childCompany" label="子公司">
          <el-input v-model="addForm.childCompany"></el-input>
        </el-form-item>
        <el-form-item label="代表作品">
          <el-input v-model="addForm.works"></el-input>
        </el-form-item>
        <!-- <el-form-item label="公司简介">
          <el-input type="textarea" v-model="addForm.typeDesc"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item prop="companyName" label="企业名称">
          <el-input v-model="editForm.companyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/lpi/api-u/users-anon/authimg/upload"
            list-type="picture-card"
            :show-file-list="false"
            :before-upload="editbeforeAvatarUpload"
            :on-success="editAvatarSuccessAdd"
          >
            <img v-if="editImageUrl" :src="editImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="worksNum" label="作品数量">
          <el-input v-model="editForm.worksNum"></el-input>
        </el-form-item>
        <el-form-item prop="typeDesc" label="公司类型">
          <el-input v-model="editForm.typeDesc"></el-input>
        </el-form-item>
        <el-form-item prop="issueNum" label="发行数量">
          <el-input v-model="editForm.issueNum"></el-input>
        </el-form-item>
        <el-form-item prop="productNum" label="出品数量">
          <el-input v-model="editForm.productNum"></el-input>
        </el-form-item>
        <el-form-item prop="productOfficebox" label="出品票房">
          <el-input v-model="editForm.productOfficebox"></el-input>
        </el-form-item>
        <el-form-item prop="issueOfficebox" label="发行票房">
          <el-input v-model="editForm.issueOfficebox"></el-input>
        </el-form-item>
        <el-form-item prop="leaderMember" label="主要成员">
          <el-input v-model="editForm.leaderMember"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="公司地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="compayEmail" label="公司邮箱">
          <el-input v-model="editForm.compayEmail"></el-input>
        </el-form-item>
        <el-form-item prop="companyTel" label="公司电话">
          <el-input v-model="editForm.companyTel"></el-input>
        </el-form-item>
        <el-form-item prop="childCompany" label="子公司">
          <el-input v-model="editForm.childCompany"></el-input>
        </el-form-item>
        <el-form-item label="代表作品">
          <el-input v-model="editForm.works"></el-input>
        </el-form-item>
        <!-- <el-form-item label="公司简介">
          <el-input type="textarea" v-model="editForm.typeDesc"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  Businesslist,
  Businessadd,
  Businessedit,
  Businessdelete
} from "@/api/http/business.js";
export default {
  name: "businessmanagement",
  data() {
    return {
      rules: {
        companyName: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      imageUrl: "",
      editImageUrl: "",
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
  // computed: {
  //   //添加权限按钮
  //   CodeShow_hideA: function() {
  //     return this.QXcode.includes(this.btnA);
  //   },
  //   //修改权限按钮
  //   CodeShow_hideB: function() {
  //     return this.QXcode.includes(this.btnB);
  //   },
  //   //删除权限按钮
  //   CodeShow_hideC: function() {
  //     return this.QXcode.includes(this.btnC);
  //   },
  //   //批量删除权限按钮
  //   CodeShow_hideD: function() {
  //     return this.QXcode.includes(this.btnD);
  //   }
  // },
  methods: {
    //显示新增界面
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {};
    },
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let imageUrlkey = URL.createObjectURL(file.raw);
      console.log(res.data);
      if (file.response.status == 200) {
        this.addForm.logo = res.data;
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //新增上传图片拦截
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片类型必须是.gif,jpeg,jpg,png中的一种");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB");
      }
      return isJPG && isLt2M;
    },
    //编辑上传图片回调
    editAvatarSuccessAdd(res, file) {
      this.editImageUrl = URL.createObjectURL(file.raw);
      let imageUrlkey = URL.createObjectURL(file.raw);
      console.log(res.data);
      if (file.response.status == 200) {
        this.editForm.logo = res.data;
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //编辑上传图片拦截
    editbeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片类型必须是.gif,jpeg,jpg,png中的一种");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB");
      }
      return isJPG && isLt2M;
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            if (this.addForm.typeName != "") {
              let params = Object.assign({}, this.addForm);
              Businessadd(params).then(res => {
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
      this.editImageUrl = this.editForm.logo;
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            Businessedit(params).then(res => {
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
          Businessdelete(params).then(res => {
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
    //搜索
    search() {
      this.is_search = true;
    },
    //数据列表
    getList() {
      let params = {
        userType: 99,
        pageCount: this.currPage,
        pageSize: 10
      };
      Businesslist(params).then(res => {
        if (res.status == 200) {
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
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
