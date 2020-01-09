<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 物料列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click.native="batchRemove"
          :disabled="!CodeShow_hideD"
        >批量删除</el-button>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button
          type="primary"
          icon="search"
          @click.native="handleAdd()"
          :disabled="!CodeShow_hideA"
        >发布物料</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" size="medium" @change="Shsx($event)">
          <el-radio-button label="空闲">空闲</el-radio-button>
          <el-radio-button label="使用中">使用中</el-radio-button>
          <el-radio-button label="待审核" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">待审核</el-radio-button>
          <el-radio-button label="已下架" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">已下架</el-radio-button>
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
        <el-table-column prop="name" label="影片"></el-table-column>
        <el-table-column prop="descs" label="描述"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleDetail(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              :disabled="!CodeShow_hideB"
              v-if="loUserlist.userType==1||loUserlist.type=='BACKEND'"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleSh(scope.$index, scope.row)"
              :disabled="!CodeShow_hideE"
              v-if="loUserlist.type=='BACKEND'"
            >审核</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDel(scope.$index, scope.row)"
              :disabled="!CodeShow_hideC"
              v-if="loUserlist.type=='BACKEND'"
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
    <el-dialog title="新增物料" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="影片" prop="movieId">
          <el-select v-model="addForm.movieId" placeholder="选择影片">
            <el-option v-for="item in fselete" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="showImg">
          <div class="crop-demo">
            <img v-if="addForm.showImg==''" src="../../../assets/img/uploader.png" class="pre-img">
            <img v-else :src="addForm.showImg" class="pre-img">
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage">
          </div>
        </el-form-item>
        <el-form-item label="下载地址" prop="download">
          <el-input v-model="addForm.download"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descs">
          <el-input type="textarea" v-model="addForm.descs"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="80px" :rules="rules">
        <el-form-item label="影片" prop="movieId">
          <el-select disabled v-model="editForm.name">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="showImg">
          <div class="crop-demo">
            <img v-if="editForm.showImg==''" src="../../../assets/img/uploader.png" class="pre-img">
            <img v-else :src="editForm.showImg" class="pre-img">
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage">
            <!-- <div class="crop-demo-btn">选择图片
                          <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
            </div>-->
          </div>
        </el-form-item>
        <el-form-item label="下载地址" prop="download">
          <el-input v-model="editForm.download"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="descs">
          <el-input type="textarea" v-model="editForm.descs"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--查看详情界面-->
    <el-dialog title="物料详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }" style="width:390px;margin:0 auto;">
            <img :src="detailForm.showImg" class="image" :onerror="errorImg">
            <div style="padding: 14px;">
              <span>{{detailForm.descs}}</span>
              <br>
              <br>
              <span>下载链接:{{detailForm.download}}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ detailForm.download }}</time> -->
                <el-button type="text" class="button">
                  <a :href="detailForm.download">点击跳转到下载界面</a>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="detailFormVisible = false">返回</el-button>
        <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/api/http.js";
import {
  searchMaterial,
  addMaterial, 
  editMaterial,
  deleteMaterial,
  movieInfo,
  MaterialupdateStatus,
  seafindMat
} from "@/api/http/materiel.js";
export default {
  name: "materialmanagement",
  data() {
    return {
      btnA: "back:material:save",
      btnB: "back:material:update",
      btnC: "back:material:updatestatus",
      btnD: "back:article:bacthupdate",
      btnE: "back:material:updatestatus",
      errorImg: 'this.src="' + require("static/img/img.jpg") + '"',
      loUserlist: [],
      QXcode: [],
      currPage: 1,
      total: 1,
      lists: [],
      sels: [],
      rules: {
        movieId: [{ required: true, message: "不能为空", trigger: "blur" }],
        showImg: [{ required: true, message: "不能为空", trigger: "blur" }],
        download: [{ required: true, message: "不能为空", trigger: "blur" }],
        descs: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      tabPosition: "空闲",
      fselete: [],
      select_word: "",
      is_search: false,
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //查看详情
      detailForm: {},
      detailFormVisible: false,
      detailLoading: false
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
    //批量删除权限按钮
    CodeShow_hideD: function() {
      return this.QXcode.includes(this.btnD);
    },
    //审核权限按钮
    CodeShow_hideE: function() {
      return this.QXcode.includes(this.btnE);
    }
  },
  methods: {
    //显示查看详情界面
    handleDetail(index, row) {
      this.detailFormVisible = true;
      this.detailForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.getMoneYP();
      this.addFormVisible = true;
      this.addForm = {
        movieId: "",
        showImg: "",
        descs: "",
        download: ""
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
            params.userId = this.loUserlist.id;
            addMaterial(params).then(res => {
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
            let comForm = Object.assign({}, this.editForm);
            let params = {
              showImg: comForm.showImg,
              descs: comForm.descs,
              download: comForm.download,
              id: comForm.id
            };
            console.log(params);
            editMaterial(params).then(res => {
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
    //审核
    handleSh: function(index, row) {
      this.$confirm("确认该记录通过审核吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: 99 };
          console.log(params)
          MaterialupdateStatus(params).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "审核成功",
              type: "success"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id };
          deleteMaterial(params).then(res => {
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
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { ids: ids };
          deletearrMaterial(params).then(res => {
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
    selsChange: function(sels) {
      this.sels = sels;
    },
    // 分页导航
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
      // _self.is_search = true;
      let _self = this;
      let params = {
        name: _self.select_word
      };
      _self.lists = [];
      seafindMat(params).then(res => {
        if (res.data.status == 200) {
          _self.lists = res.data.data;
        }
      });
    },
    //上传图片
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      let uri = "";
      let form = new FormData();
      form.append("file", file, file.name);
      request
        .post("/lpi/api-u/users-anon/authimg/upload", form, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          uri = response.data.data;
          this.addForm.showImg = uri;
          reader.onload = event => {
            this.dialogVisible = true;
            this.imgSrc = event.target.result;
            this.$refs.cropper &&
              this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        })
        .catch(error => {
          alert("上传图片出错！");
        });
    },
    //物料列表
    getList() {
      let ustats = 0;
      if (this.tabPosition == "待审核") {
        ustats = 0;
      }
      if (this.tabPosition == "已下架") {
        ustats = -1;
      }
      if (this.tabPosition == "空闲") {
        ustats = 99;
      }
      if (this.tabPosition == "使用中") {
        ustats = 100;
      }
      let parms = {
        userId: this.loUserlist.id,
        userType: this.loUserlist.userType,
        type: this.loUserlist.type,
        pageCount: this.currPage,
        pageSize: 10,
        status: ustats
      };
      searchMaterial(parms).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //选择影片
    getMoneYP() {
      let _self = this;
      let params = {
        identityId: _self.loUserlist.id,
        currPage: 1,
        pageSize: 1000,
        status:2
      };
      movieInfo(params).then(res => {
        if (res.status == 200) {
          _self.fselete = res.data.data;
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
  width: 200px;
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
.pre-img {
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 5px;
}
.crop-demo {
  display: flex;
  align-items: flex-end;
}
.crop-demo-btn {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin-left: 30px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
