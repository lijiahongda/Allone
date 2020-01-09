<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 影片列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click.native="batchRemove">批量删除</el-button> -->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd">发布影片</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="待审核">待审核</el-radio-button>
          <el-radio-button label="已审核">已审核</el-radio-button>
          <el-radio-button label="审核失败">审核失败</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column prop="name" label="影片名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="director" label="导演" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="duration" label="时长" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="produce" label="发行方" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="performer" label="演员" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="contacts" label="联系人" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="phone" label="联系电话" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="status" label="影片状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleyEdit(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleGit(scope.$index, scope.row)"
              v-if="scope.row.status=='待审核'"
            >审核</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleDown(scope.$index, scope.row)"
              v-if="scope.row.status=='已下架'"
            >上架</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleUp(scope.$index, scope.row)"
              v-if="scope.row.status=='审核失败'"
            >下架</el-button>
             <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleDel(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增界面-->
      <el-dialog title="发布影片" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="120px" :rules="rules" ref="addForm">
          <el-form-item label="影片名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="影片类型" prop="movieType">
            <el-input v-model="addForm.movieType" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <div class="crop-demo">
              <img
                v-if="addForm.picture==''"
                src="../../../assets/img/uploader.png"
                class="pre-img"
              >
              <img v-if="addForm.picture!=''" :src="addForm.picture" class="pre-img">
              <input
                class="crop-input"
                type="file"
                name="image"
                accept="image/*"
                @change="setImage"
              >
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-upload
              action="/lpi/api-u/users-anon/authimg/upload"
              list-type="picture-card"
              :file-list="addFormImges"
              :on-preview="handlePictureCardPreviewAdd"
              :on-success="handleAvatarSuccessAdd"
              :on-remove="AddhandleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="制片人" prop="filmProducer">
            <el-input v-model="addForm.filmProducer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-input v-model="addForm.director" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要演员" prop="performer">
            <el-input v-model="addForm.performer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-input v-model="addForm.duration" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出品公司" prop="produce">
            <el-input v-model="addForm.produce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="发行公司" prop="issue">
            <el-input v-model="addForm.issue" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="投资额(元)" prop="investment">
            <el-input type="number" v-model="addForm.investment" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预上映日期" prop="estimateReleaseTime">
            <el-input v-model="addForm.estimateReleaseTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="放映制式" prop="showType">
            <el-input v-model="addForm.showType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="影片简介" prop="synopsis">
            <el-input type="textarea" :rows="4" v-model="addForm.synopsis" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="contacts">
            <el-input v-model="addForm.contacts" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位名称" prop="position">
            <el-input v-model="addForm.position" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入你的需求" prop="demand">
            <el-input type="textarea" :rows="4" v-model="addForm.demand" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--编辑界面-->
      <el-dialog title="编辑影片信息" :visible.sync="edityFormVisible" :close-on-click-modal="false">
        <el-form :model="edityForm" label-width="120px" ref="edityForm">
          <el-form-item label="影片名称" prop="name">
            <el-input v-model="edityForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="影片类型" prop="movieType">
            <el-input v-model="edityForm.movieType" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <div class="crop-demo">
              <img :src="edityForm.picture" class="pre-img">
              <input
                class="crop-input"
                type="file"
                name="image"
                accept="image/*"
                @change="setImageb"
              >
            </div>
          </el-form-item> -->
           <el-form-item>
            <el-upload
              action="/lpi/api-u/users-anon/authimg/upload"
              list-type="picture-card"
              :file-list="editFormImges"
              :on-preview="handlePictureCardPreviewEdit"
              :on-success="handleAvatarSuccessEdit"
              :on-remove="EdithandleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="制片人" prop="filmProducer">
            <el-input v-model="edityForm.filmProducer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-input v-model="edityForm.director" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要演员" prop="performer">
            <el-input v-model="edityForm.performer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时长" prop="duration">
            <el-input v-model="edityForm.duration" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出品公司" prop="produce">
            <el-input v-model="edityForm.produce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="发行公司" prop="issue">
            <el-input v-model="edityForm.issue" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="投资额(元)" prop="investment">
            <el-input type="number" v-model="edityForm.investment" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预上映日期" prop="estimateReleaseTime">
            <el-input v-model="edityForm.estimateReleaseTime" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="放映制式" prop="showType">
            <el-input v-model="edityForm.showType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="影片简介" prop="synopsis">
            <el-input type="textarea" :rows="4" v-model="edityForm.synopsis" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="contacts">
            <el-input v-model="edityForm.contacts" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位名称" prop="position">
            <el-input v-model="edityForm.position" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入你的需求" prop="demand">
            <el-input type="textarea" :rows="4" v-model="edityForm.demand" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="edityFormVisible = false">返回</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="edityLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--详情界面-->
      <el-dialog title="影片详情" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <img
                  v-if="editForm.picture"
                  :src="editForm.picture"
                  :onerror="errorImg"
                  class="user-avator"
                >
                <div class="user-info-cont">
                  <div class="user-info-name">{{editForm.name}}</div>
                  <br>
                  <div>导演：{{editForm.director}}</div>
                </div>
              </div>
              <div class="user-info-list">
                演员：
                <span>{{editForm.performer}}</span>
              </div>
              <div class="user-info-list">
                时长：
                <span>{{editForm.duration}}</span>
              </div>
              <div class="user-info-list">
                发行方：
                <span>{{editForm.issue}}</span>
              </div>
              <div class="user-info-list">
                出品人：
                <span>{{editForm.produce}}</span>
              </div>
              <div class="user-info-list">
                制片人：
                <span>{{editForm.filmProducer}}</span>
              </div>
              <div class="user-info-list">
                电影类型：
                <span>{{editForm.movieType}}</span>
              </div>
              <div class="user-info-list">
                投资金额：
                <span>{{editForm.investment}}</span>
              </div>
              <div class="user-info-list">
                预计上映时间：
                <span>{{editForm.estimateReleaseTime}}</span>
              </div>
              <div class="user-info-list">
                发布时间：
                <span>{{editForm.addTime}}</span>
              </div>
              <div class="user-info-list">
                放映制式：
                <span>{{editForm.showType}}</span>
              </div>
              <div class="user-info-list">
                联系人：
                <span>{{editForm.contacts}}</span>
              </div>
              <div class="user-info-list">
                职位：
                <span>{{editForm.position}}</span>
              </div>
              <div class="user-info-list">
                联系电话：
                <span>{{editForm.phone}}</span>
              </div>
              <div class="user-info-list">
                需求描述：
                <span>{{editForm.demand}}</span>
              </div>
              <div class="user-info-list">
                影片简介：
                <span>{{editForm.synopsis}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="editFormVisible = false">返回</el-button>
          <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
        </div>
      </el-dialog>
      <el-dialog :visible.sync="AdddialogVisible">
      <img width="100%" :src="AdddialogImageUrl" alt>
      </el-dialog>
      <el-dialog :visible.sync="EditdialogVisible">
        <img width="100%" :src="EditdialogImageUrl" alt>
      </el-dialog>
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
import {
  queryAllList,
  sendMovie,
  sendMovieupdate,
  sendUpdateStatus,
  sendMoviedelete
} from "@/api/http/film.js";
import request from "@/api/http.js";
export default {
  name: "movielist",
  data() {
    return {
      errorImg: 'this.src="' + require("static/img/img.jpg") + '"',
      QXcode: [],
      loUserlist: [],
      currPage: 1,
      total: 1,
      lists: [],
      sels: [],
      tabPosition: "全部",
      select_word: "",
      is_search: false,
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        performer: [{ required: true, message: "不能为空", trigger: "blur" }],
        director: [{ required: true, message: "不能为空", trigger: "blur" }],
        picture: [{ required: true, message: "不能为空", trigger: "blur" }],
        synopsis: [{ required: true, message: "不能为空", trigger: "blur" }],
        issue: [{ required: true, message: "不能为空", trigger: "blur" }],
        produce: [{ required: true, message: "不能为空", trigger: "blur" }],
        movieTypeId: [{ required: true, message: "不能为空", trigger: "blur" }],
        filmProducer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        investment: [{ required: true, message: "不能为空", trigger: "blur" }],
        estimateReleaseTime: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        showTypeId: [{ required: true, message: "不能为空", trigger: "blur" }],
        contacts: [{ required: true, message: "不能为空", trigger: "blur" }],
        position: [{ required: true, message: "不能为空", trigger: "blur" }],
        demand: [{ required: true, message: "不能为空", trigger: "blur" }],
        duration: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      addFormImges: [],
      AdddialogImageUrl: "",
      AdddialogVisible: false,
      //编辑
      edityForm: {},
      edityFormVisible: false,
      edityLoading: false,
      editFormImges: [],
      EditdialogImageUrl: "",
      EditdialogVisible: false,
      //详情
      editForm: {},
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
        identityId: this.loUserlist.id,
        name: "",
        performer: "",
        director: "",
        picture: [],
        synopsis: "",
        issue: "",
        produce: "",
        movieTypeId: "",
        filmProducer: "",
        investment: "",
        estimateReleaseTime: "",
        showTypeId: "",
        contacts: "",
        position: "",
        demand: "",
        duration: "",
        days: 0
      };
    },
    //新增影片上传图片
    handlePictureCardPreviewAdd(file) {
      this.AdddialogImageUrl = file.url;
      this.AdddialogVisible = true;
    },
    //新增影片删除图片
    AddhandleRemove(file, fileList) {
      console.log(file, fileList);
      let arr_img = [];
      fileList.map(val => {
        arr_img.push(val.response.data);
      });
      this.addForm.picture = arr_img;
      this.addForm.picture = arr_img;
    },
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      if (file.response.status == 200) {
        this.addForm.picture.push(file.response.data);
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
            this.addForm.imgUrl=this.addForm.picture.join(',')
            let params = this.addForm;
            delete params.picture
            sendMovie(params).then(res => {
              this.addLoading = false;
              //NProgress.done();
              if (res.status == 200) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getList();
              } else {
                this.$message({
                  message: "提交失败",
                  type: "error"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getList();
                this.addFormImges = [];
              }
            });
          });
        }
      });
    },
    //显示详情界面
    handleyEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      // this.edityFormVisible = true;
      // this.edityForm = Object.assign({}, row);
      this.editFormImges = [];
      this.edityFormVisible = true;
      this.edityForm = Object.assign({}, row);
      if(this.edityForm.picture!=""&&this.edityForm.picture!=null){
        let arr = this.edityForm.picture.split(",");
        this.edityForm.picture = arr.filter(item => item);
        let edtimg = this.edityForm.picture;
        edtimg.map(val => {
          this.editFormImges.push({
            name: "img",
            url: val
          });
        });
      }else{
        this.edityForm.picture=[]
        this.editFormImges=[]
      }
    },
    //编辑影片上传图片
    handlePictureCardPreviewEdit(file) {
      this.AdddialogImageUrl = file.url;
      this.EditdialogVisible = true;
    },
    //编辑影片删除图片
    EdithandleRemove(file, fileList) {
      console.log(file, fileList);
      let arr_img = [];
      fileList.map(val => {
        arr_img.push(val.response.data);
      });
      this.edityForm.picture = arr_img;
    },
    //编辑上传图片回调
    handleAvatarSuccessEdit(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      if (file.response.status == 200) {
        this.edityForm.picture.push(file.response.data);
      } else {
        this.$message({
          message:"图片上传失败",
          type:"error"
        });
      }
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.edityForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.edityForm);
            console.log(params)
            let mockbirdNewMovie = {
              addTime: params.addTime,
              contacts: params.contacts,
              days: params.days,
              demand: params.demand,
              director: params.director,
              duration: params.duration,
              email: params.email,
              estimateReleaseTime: params.estimateReleaseTime,
              filmProducer: params.filmProducer,
              id: params.id,
              identityId: params.identityId,
              investment: params.investment,
              issue: params.issue,
              movieType: params.movieType,
              name: params.name,
              performer: params.performer,
              phone: params.phone,
              picture: params.picture.join(','),
              position: params.position,
              produce: params.produce,
              showType: params.showType,
              synopsis: params.synopsis
            };
            switch (params.status) {
              case "待审核":
                mockbirdNewMovie.status = 1;
                break;
              case "审核通过":
                mockbirdNewMovie.status = 2;
                break;
              case "审核失败":
                mockbirdNewMovie.status = 3;
                break;
              case "已下架":
                mockbirdNewMovie.status = 4;
                break;
              default:
                mockbirdNewMovie.status = 0;
            }
            sendMovieupdate(mockbirdNewMovie).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["edityForm"].resetFields();
              this.edityFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //审核通过操作
    handleGit(index, row) {
      this.$confirm("确认通过审核吗？", "提示", {}).then(() => {
        let params = {
          id: row.id,
          status: 2
        };
        sendUpdateStatus(params).then(res => {
          if (res.status == 200) {
              this.getList();
          }
        });
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    //下架
    handleDown(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: 4 };
          sendUpdateStatus(params).then(res => {
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
    //上架
    handleUp(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: 2 };
          sendUpdateStatus(params).then(res => {
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
     //删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id };
          sendMoviedelete(params).then(res => {
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
    //状态筛选
    Shsx(event) {
      this.getList();
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
      let _self = this;
      let ustats = 0;
      if (_self.tabPosition == "全部") {
        ustats = null;
      }
      if (_self.tabPosition == "待审核") {
        ustats = 1;
      }
      if (_self.tabPosition == "已审核") {
        ustats = 2;
      }
      if (_self.tabPosition == "审核失败") {
        ustats = 3;
      }
      let params = {
        currPage: _self.currPage,
        pageSize: 10,
        status: ustats
      };
      queryAllList(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            // res.data.data.picture=va
            switch (val.status) {
              // case 0:
              //   val.status = "审核中";
              //   break;
              // case -1:
              //   val.status = "删除";
              //   break;
              // case -99:
              //   val.status = "任务取消";
              //   break;
              // case 99:
              //   val.status = "审核通过";
              //   break;
              // case 100:
              //   val.status = "任务发布中";
              //   break;
              // case 101:
              //   val.status = "任务完成";
              //   break;
              case 1:
                val.status = "待审核";
                break;
              case 2:
                val.status = "审核通过";
                break;
              case 3:
                val.status = "审核失败";
                break;
              case 4:
                val.status = "已下架";
                break;
              default:
                val.status = "未定义";
            }
          });
          this.lists = res.data.data;
          this.total = res.data.totalCount;
        }
      });
    },
    //数据类型
    getType() {
      let params = {
        status: 0
      };
      cmsType(params).then(res => {
        if (res.status == 200) {
          this.fselete = res.data.data;
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
          this.addForm.picture = uri;
          console.log(this.addForm.showImg);
        })
        .catch(error => {
          alert("上传图片出错！");
        });
    },
    //上传图片b
    setImageb(e) {
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
          this.edityForm.picture = uri;
        })
        .catch(error => {
          alert("上传图片出错！");
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
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
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
.mgb20 {
  margin-bottom: 20px;
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
/deep/ .el-dialog__body {
  height: 50vh;
  overflow: auto;
}
/deep/ .el-dialog__body::-webkit-scrollbar {
  display: none;
}
</style>
