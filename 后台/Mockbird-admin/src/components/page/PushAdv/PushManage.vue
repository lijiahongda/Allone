<template>
  <div class="advtype">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 嘲鸟广告
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>-->
        <el-button type="primary" icon="search" @click="handleAdd">新增</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium">
          <el-radio-button label="待审核">待审核</el-radio-button>
          <el-radio-button label="已发布">已发布</el-radio-button>
          <el-radio-button label="已过期">已过期</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="style" label="风格"></el-table-column>
        <el-table-column prop="descs" label="描述"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleCheck(scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
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
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/lpi/api-f/files-anon/qiniu/upload"
            list-type="picture-card"
            :file-list="addFormImges"
            :on-preview="handlePictureCardPreviewAdd"
            :on-success="handleAvatarSuccessAdd"
            :on-remove="AddhandleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="风格">
          <el-input v-model="addForm.style"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addForm.descs"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/ppi/api-f/files-anon/qiniu/upload"
            list-type="picture-card"
            :file-list="editFormImges"
            :on-preview="handlePictureCardPreviewEdit"
            :on-success="handleAvatarSuccessEdit"
            :on-remove="EdithandleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="风格">
          <el-input v-model="editForm.style"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.descs"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   typeGG,
//   addGG,
//   editGG,
//   deleteGG,
//   deletearrGG
// } from "@/api/http/advertisement.js";
import {
  Pushadadd,
  Pushaddelete,
  Pushadupdata,
  Pushadgetlist,
  PushcheckPushAd
} from "@/api/http/pushadv.js";
export default {
  name: "advtype",
  data() {
    return {
      currPage: 0,
      total: 1,
      QXcode: [],
      loUserlist: [],
      lists: [],
      sels: [],
      // 搜索
      select_word: "",
      tabPosition:"待审核",
      //新增
      addForm: {},
      addFormImges: [],
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormImges: [],
      editFormVisible: false,
      editLoading: false
    };
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormImges = [];
      this.addFormVisible = true;
      this.addForm = {
        showimg: []
      };
    },
    //新增广告位上传图片
    handlePictureCardPreviewAdd(file) {
      this.AdddialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //新增广告位删除图片
    AddhandleRemove(file, fileList) {
      console.log(file, fileList);
      let arr_img = [];
      fileList.map(val => {
        arr_img.push(val.response.data);
      });
      this.addForm.showimg = arr_img;
    },
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      console.log(file.response);
      if (file.response.status == 200) {
        this.addForm.showimg.push(file.response.data);
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.addForm);
            params.showimg = this.addForm.showimg.join(",");
            // let params = JSON.stringify(par)
            Pushadadd(params).then(res => {
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
      this.editFormImges=[]
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      let arr = this.editForm.showimg.split(",");
      this.editForm.showimg = arr.filter(item => item);
      let edtimg = this.editForm.showimg;
      console.log(this.editForm.showimg);
      edtimg.map(val => {
        this.editFormImges.push({
          name: "img",
          url: val
        });
      });
    },
    //编辑广告位上传图片查看
    handlePictureCardPreviewEdit(file) {
      this.EditdialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //编辑广告删除图片
    EdithandleRemove(file, fileList) {
      // console.log(file, fileList);
      console.log(fileList)
      let arr_img = [];
      fileList.map(val => {
        arr_img.push(val.url);
      });
      this.editForm.showimg = arr_img;
    },
    //编辑上传图片回调
    handleAvatarSuccessEdit(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      if (file.response.status == 200) {
        this.editForm.showimg.push(file.response.data);
        // console.log(this.editForm.showImges)
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            params.showimg = this.editForm.showimg.join(",");
            delete params.addTime;
            delete params.updateTime;
            Pushadupdata(params).then(res => {
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
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id };
          Pushaddelete(params).then(res => {
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
    //审核
    handleCheck(index, row) {
      this.$confirm("确认审核记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: 99 };
          PushcheckPushAd(params).then(res => {
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
      var ids = this.sels.map(item => item.typeId).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { typeId: ids };
          deletearrGG(params).then(res => {
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
    //搜索
    search() {
      this.is_search = true;
    },
    Shsx(event) {
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
    // 类型列表
    getList() {
      let ustats = 0;
      if (this.tabPosition == "待审核") {
        ustats = 0;
      }
      if (this.tabPosition == "已过期") {
        ustats = -1;
      }
      if (this.tabPosition == "发布中") {
        ustats = 99;
      }
      let params = {
        pageCount: 1,
        pageSize: 10,
        status:ustats
      };
      Pushadgetlist(params).then(res => {
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
</style>
