<template>
  <div class="advlist">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 广告列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click="delAll"
          :disabled="!CodeShow_hideD"
        >批量下架</el-button>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-select
          v-model="tselete"
          placeholder="全部"
          @change="chSelete($event)"
          class="handle-select mr10"
        >
          <el-option
            v-for="item in fselete"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" icon="search" @click="handleAdd" :disabled="!CodeShow_hideA">发布广告位</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium" class="wwwe">
          <el-radio-button label="空闲">空闲</el-radio-button>
          <el-radio-button label="使用中">使用中</el-radio-button>
          <el-radio-button label="待审核" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">待审核</el-radio-button>
          <el-radio-button label="已下架" v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'">已下架</el-radio-button>
          <el-radio-button
            label="审核不通过"
            v-if="loUserlist.userType==2||loUserlist.type=='BACKEND'"
          >审核不通过</el-radio-button>
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
        <el-table-column prop="advertName" label="名称"></el-table-column>
        <el-table-column prop="typeName" label="类型"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handlelook(scope.$index, scope.row)"
              :disabled="!CodeShow_hideE"
            >{{backOut}}</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="loUserlist.userType==2||loUserlist.userType==0"
              :disabled="!CodeShow_hideB"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDown(scope.$index, scope.row)"
              :disabled="!CodeShow_hideC"
              v-if="tabPosition!='已下架'"
            >下架</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleUp(scope.$index, scope.row)"
              :disabled="!CodeShow_hideC"
              v-if="tabPosition=='已下架'"
            >上架</el-button>
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
    <el-dialog title="发布广告位" :visible.sync="addFormVisible" :close-on-click-modal="false" top="5vh">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addForm.advertName"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="addForm.adTypeId" placeholder="全部">
            <el-option
              v-for="item in fselete"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="addForm.location"></el-input>
        </el-form-item>
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
        <el-form-item label="尺寸">
          <el-input v-model="addForm.lenWH"></el-input>
        </el-form-item>
        <el-form-item label="介质">
          <!-- <el-input v-model="addForm.media"></el-input> -->
          <el-radio
            v-model="addForm.media"
            :label="item"
            v-for="item in admedia"
            :key="item"
          >{{item}}</el-radio>
        </el-form-item>
        <el-form-item label="起止时间 ">
          <!-- <el-input v-model="addForm.startTime"></el-input> -->
          <el-date-picker v-model="addForm.startTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <!-- <el-input v-model="addForm.endTime"></el-input> -->
          <el-date-picker v-model="addForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="数量">
          <el-input v-model="addForm.num" type="number" style="width:80px;"></el-input>
          <el-input-number v-model="addForm.num" :disabled="true"></el-input-number>
        </el-form-item>-->
        <el-form-item label="价格">
          <!-- <el-input v-model="addForm.price" type="number" style="width:80px;"></el-input> -->
          <el-input type="number" v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <!-- <el-input v-model="addForm.remark"></el-input> -->
          <el-input type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input type="textarea" v-model="addForm.descs"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--审核详情界面-->
    <el-dialog title="广告位审核" :visible.sync="detailFormVisible" :close-on-click-modal="false">
      <el-form ref="detailForm" :model="detailForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="detailForm.advertName"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="detailForm.adTypeId" placeholder="全部">
            <el-option
              v-for="item in fselete"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="detailForm.location"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="crop-demo">
            <div class="pre-img" v-for="(item,pindex) in detailForm.showImges" :key="pindex">
              <img style="width: 100%;height: 100%;" :src="item">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="尺寸">
          <el-input v-model="detailForm.lenWH"></el-input>
        </el-form-item>
        <el-form-item label="介质">
          <el-input v-model="detailForm.media"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="detailForm.price" type="number" style="width:80px;"></el-input>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker v-model="detailForm.startTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="detailForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="detailForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="detailFormVisible = false">返回</el-button>
        <el-button @click.native="detaolSubmit" v-show="tabPosition=='待审核'">不通过</el-button>
        <el-button
          type="primary"
          @click.native="detailSubmit"
          :loading="detailLoading"
          v-show="tabPosition=='待审核'"
        >通过</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editForm.advertName"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="editForm.adTypeId" placeholder="全部">
            <el-option
              v-for="item in fselete"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>
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
        <el-form-item label="尺寸">
          <el-input v-model="editForm.lenWH"></el-input>
        </el-form-item>
        <el-form-item label="介质">
          <el-input v-model="editForm.media"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editForm.price" type="number" style="width:80px;"></el-input>
        </el-form-item>
        <el-form-item label="起止时间">
          <!-- <el-input v-model="editForm.startTime"></el-input> -->
          <el-date-picker v-model="editForm.startTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <!-- <el-input v-model="editForm.endTime"></el-input> -->
          <!-- <el-input v-model="editForm.endTime"></el-input> -->
          <el-date-picker v-model="editForm.endTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input type="textarea" v-model="editForm.descs"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="openedit">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="AdddialogVisible">
      <img width="100%" :src="AdddialogImageUrl" alt>
    </el-dialog>
    <el-dialog :visible.sync="EditdialogVisible">
      <img width="100%" :src="EditdialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import {
  typeGG,
  addlistGG,
  typelistGG,
  editlistGG,
  deletelistGG,
  checkadvGG,
  deletelistarrGG,
  adfindAdv
} from "@/api/http/advertisement.js";
import moment from "moment";
import request from "@/api/http.js";
export default {
  name: "advlist",
  data() {
    return {
      AdddialogImageUrl: "",
      EditdialogImageUrl: "",
      AdddialogVisible: false,
      EditdialogVisible: false,
      currPage: 1,
      total: 1,
      btnA: "back:adv:save",
      btnB: "back:adv:update",
      btnC: "back:adtype:delete",
      btnD: "back:adtype:bacthdelete",
      btnE: "back:adv:checkadv",
      QXcode: [],
      loUserlist: [],
      lists: [],
      sels: [],
      cropImg: "../../../assets/logo.png",
      admedia: ["印刷品", "视频", "文件", "立牌"],
      //筛选
      tselete: "",
      fselete: [],
      tabPosition: "空闲",
      //搜索
      select_word: "",
      //新增
      addForm: {},
      addFormImges: [],
      addFormVisible: false,
      addLoading: false,
      //详情
      detailForm: {},
      detailFormVisible: false,
      detailLoading: false,
      //编辑
      editForm: {},
      editFormImges: [],
      editFormVisible: false,
      editLoading: false
    };
  },
  computed: {
    backOut() {
      if (this.tabPosition == "待审核") {
        return "审核";
      } else {
        return "查看";
      }
    },
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
    //批量下架权限按钮
    CodeShow_hideD: function() {
      return this.QXcode.includes(this.btnD);
    },
    //审核详情权限按钮
    CodeShow_hideE: function() {
      return this.QXcode.includes(this.btnE);
    }
  },
  methods: {
    openedit() {
      this.editFormVisible = false;
    },
    //编辑广告位上传图片查看
    handlePictureCardPreviewEdit(file) {
      this.EditdialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //编辑广告删除图片
    EdithandleRemove(file, fileList) {
      console.log(file, fileList);
      fileList.map(val => {
        arr_img.push(val.response.data);
      });
      this.editForm.showImges = arr_img;
    },
    //编辑上传图片回调
    handleAvatarSuccessEdit(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      if (file.response.status == 200) {
        this.editForm.showImges.push(file.response.data);
        // console.log(this.editForm.showImges)
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
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
      this.addForm.showImges = arr_img;
    },
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      let imageUrl = URL.createObjectURL(file.raw);
      if (file.response.status == 200) {
        this.addForm.showImges.push(file.response.data);
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //显示新增界面
    handleAdd: function() {
      this.editFormImges = [];
      this.addFormVisible = true;
      this.addForm = {
        showImges: [],
        num: 1
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
            params.startTime = moment(params.startTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            params.endTime = moment(params.endTime).format(
              "YYYY-MM-DD 24:00:00"
            );
            params.showImges = this.addForm.showImges.join(",");
            params.userId = this.loUserlist.id;
            params.userType = this.loUserlist.userType;
            params = JSON.stringify(params);
            addlistGG(params).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getList();
              this.addFormImges = [];
            });
          });
        }
      });
    },
    //详情与审核
    handlelook(index, row) {
      this.detailFormVisible = true;
      this.detailForm = Object.assign({}, row);
      this.detailForm.showImges = this.detailForm.showImges.split(",");
    },
    //审核提交
    detailSubmit: function() {
      this.$refs.detailForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.detailLoading = true;
            //NProgress.start();
            let adetail = Object.assign({}, this.detailForm);
            let params = {
              id: adetail.adId,
              status: 99,
              userId: adetail.userId
            };
            checkadvGG(params).then(res => {
              this.detailLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["detailForm"].resetFields();
              this.detailFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //审核提交2
    detaolSubmit: function() {
      this.$refs.detailForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.detailLoading = true;
            //NProgress.start();
            let adetail = Object.assign({}, this.detailForm);
            let params = {
              id: adetail.adId,
              status: 101,
              userId: adetail.userId
            };
            checkadvGG(params).then(res => {
              this.detailLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["detailForm"].resetFields();
              this.detailFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //编辑
    handleEdit(index, row) {
      this.editFormImges = [];
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      let arr = this.editForm.showImges.split(",");
      this.editForm.showImges = arr.filter(item => item);
      let edtimg = this.editForm.showImges;
      console.log(edtimg);
      edtimg.map(val => {
        this.editFormImges.push({
          name: "img",
          url: val
        });
      });
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            params.showImges = params.showImges.join(",");
            params.createTime = null;
            params.updateTime = null;
            params.userType = this.loUserlist.userType;
            editlistGG(params).then(res => {
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
    //下架
    handleDown(index, row) {
      this.$confirm("确认下架该广告位吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          console.log(row);
          let params = { id: row.adId, status: -1 };
          deletelistGG(params).then(res => {
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
      this.$confirm("确认上架该广告位吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          console.log(row);
          let params = { id: row.adId, status: 99 };
          deletelistGG(params).then(res => {
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
          deletelistarrGG(params).then(res => {
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
      let _self = this;
      _self.is_search = true;
      let params = {
        userType: _self.loUserlist.userType,
        type: _self.loUserlist.type,
        advName: _self.select_word,
        userId: _self.loUserlist.id,
        pageCount: 1,
        pageSize: 10
      };
      adfindAdv(params).then(res => {
        this.lists = res.data.data;
        this.total = res.data.total;
      });
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
    //状态查询
    Shsx(event) {
      this.getList();
    },
    //筛选
    chSelete(event) {
      this.getList();
    },
    //数据请求
    getList() {
      let _self = this;
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
      if (this.tabPosition == "审核不通过") {
        ustats = 101;
      }
      let params = {
        userId: _self.loUserlist.id,
        userType: _self.loUserlist.userType,
        type: _self.loUserlist.type,
        status: ustats,
        typeId: _self.tselete,
        pageCount: _self.currPage,
        pageSize: 10
      };
      typelistGG(params).then(res => {
        if (res.status == 200) {
          _self.lists = res.data.data;
          _self.total = res.data.total;
        }
      });
    },
    //类型分类
    getleixing() {
      let params = {
        status: 99
      };
      this.fselete = [];
      typeGG(params).then(res => {
        if (res.status == 200) {
          this.fselete = res.data.data;
          this.fselete.push({
            addTime: "2018-10-19T11:47:55.000+0000",
            remark: null,
            status: "99",
            typeId: "",
            typeName: "全部",
            updateTime: "2018-12-01T03:09:23.000+0000"
          });
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
    _self.getleixing();
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
</style>
