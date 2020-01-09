<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          {{this.fidDetail.name}}订单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column prop="addTime" label="创建时间"></el-table-column>
        <el-table-column prop="cinemaNum" label="发布影院数"></el-table-column>
        <el-table-column prop="integral" label="消耗积分"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="totalField" label="抢单场次"></el-table-column>
        <el-table-column prop="timeInterval" label="时段"></el-table-column>
        <el-table-column prop="isTicketIssue" label="是否出票"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleEdit(scope.$index, scope.row)"
            >查看进度</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--任务详情界面-->
      <el-dialog title="任务详情" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium" class="wwwe">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="待领取">待领取</el-radio-button>
          <el-radio-button label="已领取">已领取</el-radio-button>
          <el-radio-button label="拒绝">拒绝</el-radio-button>
          <el-radio-button label="完成">完成</el-radio-button>
          <el-radio-button label="未完成">未完成</el-radio-button>
        </el-radio-group>
        <el-table :data="mockbirdJlist" border class="table">
          <el-table-column prop="cinemaName" label="影院名称"></el-table-column>
          <el-table-column prop="integral" label="消耗积分"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column prop="status" label="任务状态"></el-table-column>
          <el-table-column label="操作" align="center" v-if="tabPosition=='已领取'">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click.native="handFk(scope.$index, scope.row)"
              >查看反馈</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChangeedit"
            layout="prev, pager, next"
            :total="edittotal"
          ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">返回</el-button>
        </div>
      </el-dialog>
      <!--任务反馈界面-->
      <el-dialog title="任务反馈" :visible.sync="fkFormVisible" :close-on-click-modal="false">
        <div style="width:100%;height:100%;">
          <img style="width:100%;height:100%;" :src="PlatoonList.imgUrl" alt>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="fkFormVisible = false">返回</el-button>
          <el-button type="primary" @click.native="handleStatus">完成</el-button>
          <el-button type="primary" @click.native="handlenotStatus">未完成</el-button>
        </div>
      </el-dialog>
      <!--订单界面-->
      <el-dialog title="订单详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <img :src="detailForm.filmaUrl" class="user-avator">
              </div>
              <div class="user-info-list">
                创建时间:
                <span>{{detailForm.addTime}}</span>
              </div>
              <div class="user-info-list">
                总场次:
                <span>{{detailForm.totalField}}</span>
              </div>
              <div class="user-info-list">
                黄金场:
                <span>{{detailForm.gold}}</span>
              </div>
              <div class="user-info-list">
                普通场:
                <span>{{detailForm.ordinary}}</span>
              </div>
              <div class="user-info-list">
                单场积分:
                <span>{{detailForm.integral}}</span>
              </div>
              <div class="user-info-list">
                影院数量:
                <span>{{detailForm.cinemaNum}}</span>
              </div>
              <div class="user-info-list">
                总积分:
                <span>{{detailForm.totalIntegral}}</span>
              </div>
              <div class="user-info-list">
                排片率:
                <span>{{detailForm.filmPlayRate}}</span>
              </div>
              <div class="user-info-list">
                是否为排片场次:
                <span>{{detailForm.isField}}</span>
              </div>
              <div class="user-info-list">
                实际影城数量:
                <span>{{detailForm.actualCinemaNum}}</span>
              </div>
              <div class="user-info-list">
                时段:
                <span>{{detailForm.timeInterval}}</span>
              </div>
              <div class="user-info-list">
                是否出票:
                <span>{{detailForm.isTicketIssue}}</span>
              </div>
              <div class="user-info-list">
                出票信息:
                <span>{{detailForm.ticketIssueInfo}}</span>
              </div>
              <div class="user-info-list">
                状态:
                <span>{{detailForm.status}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="detailFormVisible = false">返回</el-button>
        </div>
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
  queryOrderByFilmId,
  PlatoonqueryByOrderId,
  IncrementPlatoonUpdateStatus,
  FkqueryByPlatoonId
} from "@/api/http/film.js";
import moment from "moment";
export default {
  name: "listftasksdetail",
  data() {
    return {
      fidDetail: [],
      rowDDid: "",
      tabPosition: "全部",
      QXcode: [],
      loUserlist: [],
      currPage: 1,
      total: 1,
      lists: [],
      MoLists: [],
      MoListsindex: "",
      listmockbird: [],
      arreee: [],
      sels: [],
      select_word: "",
      is_search: false,
      // 反馈
      PlatoonList: [],
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //详情
      detailForm: {},
      detailFormVisible: false,
      detailLoading: false,
      //发布任务
      sendForm: {},
      sendFormVisible: false,
      sendLoading: false,
      //云推荐
      mockForm: {},
      mockFormVisible: false,
      mockLoading: false,
      mockcurrPage: 1,
      mocktotal: 1,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      editcurrPage: 1,
      edittotal: 1,
      //编辑
      fkForm: {},
      fkurlImg: [],
      fkFormVisible: false,
      fkLoading: false,
      //拍片业务
      mockbirdJlist: [],
      mockbirdJTime: []
    };
  },
  methods: {
    //显示详情界面
    handleDetail: function(index, row) {
      this.detailFormVisible = true;
      this.detailForm = Object.assign({}, row);
    },
    //查看进度界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.rowDDid = row.id;
      this.getDlist();
    },
    handFk: function(index, row) {
      this.fkFormVisible = true;
      this.fkForm = Object.assign({}, row);
      let params = { platoonId: this.fkForm.id };
      FkqueryByPlatoonId(params).then(res => {
        this.PlatoonList = res.data.data;
      });
    },
    //修改任务完成状态
    handleStatus: function(index, row) {
      this.$confirm("确认该影片完成任务吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          console.log(this.fkForm);
          this.listLoading = true;
          //NProgress.start();
          let Tintegral = 0;
          if (this.fkForm.isField == 1) {
            Tintegral = this.fkForm.integral * this.fkForm.totalField;
          } else {
            Tintegral = this.fkForm.integral;
          }
          let params = { id: this.fkForm.id, status: 4, totalScore: Tintegral };
          IncrementPlatoonUpdateStatus(params).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "更新成功",
              type: "success"
            });
            this.fkFormVisible = false;
            this.getDlist();
          });
        })
        .catch(() => {});
    },
    //修改任务未完成状态
    handlenotStatus: function(index, row) {
      this.$confirm("确认该影片未完成任务吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: this.fkForm.id, status: 5, totalScore: 0 };
          IncrementPlatoonUpdateStatus(params).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "更新成功",
              type: "success"
            });
            this.fkFormVisible = false;
            this.getDlist();
          });
        })
        .catch(() => {});
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
          let params = { typeId: ids };
          removearrCMSA(params).then(res => {
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
    //切换状态
    Shsx(event) {
      this.getDlist();
    },
    //分页加载
    handleCurrentChange(val) {
      this.currPage = val;
      this.getList();
    },
    //分页加载a
    handleCurrentChangeedit(val) {
      this.editcurrPage = val;
      this.getDlist();
    },
    //搜索
    search() {
      this.is_search = true;
    },
    //数据列表
    getList() {
      let _self = this;
      let params = {
        filmId: _self.fidDetail.id,
        currPage: 1,
        pageSize: 10
      };
      queryOrderByFilmId(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            switch (val.status) {
              case 1:
                val.status = "进行中";
                break;
              case 2:
                val.status = "已完成";
                break;
              default:
                val.status = "异常";
            }
            if (val.isTicketIssue == 1) {
              val.isTicketIssue = "是";
            } else if (val.isTicketIssue == 1) {
              val.isTicketIssue = "否";
            } else {
              val.isTicketIssue = "未知";
            }
          });

          _self.lists = res.data.data;
          //   _self.total = res.data.totalCount;
          // console.log(res.data.data)
        }
      });
    },
    //asda
    getDlist() {
      let _self = this;
      let ustats = 0;
      if (this.tabPosition == "全部") {
        ustats = null;
      }
      if (this.tabPosition == "待领取") {
        ustats = 1;
      }
      if (this.tabPosition == "已领取") {
        ustats = 2;
      }
      if (this.tabPosition == "拒绝") {
        ustats = 3;
      }
      if (this.tabPosition == "完成") {
        ustats = 4;
      }
      if (this.tabPosition == "未完成") {
        ustats = 5;
      }
      let params = {
        orderId: _self.rowDDid,
        status: ustats,
        currPage: _self.editcurrPage,
        pageSize: 4
      };
      PlatoonqueryByOrderId(params).then(res => {
        if (res.status == 200) {
          if (res.data.courtyardLines) {
            res.data.courtyardLines.map(val => {
              switch (val.status) {
                case 1:
                  val.status = "待领取";
                  break;
                case 2:
                  val.status = "已领取";
                  break;
                case 3:
                  val.status = "拒绝";
                  break;
                case 4:
                  val.status = "完成";
                  break;
                case 5:
                  val.status = "未完成";
                  break;
                case 6:
                  val.status = "已过期";
                  break;
                default:
                  val.status = "异常";
              }
            });
            _self.mockbirdJlist = res.data.courtyardLines;
            _self.edittotal = res.data.totalCount;
          } else {
            _self.mockbirdJlist = [];
            _self.edittotal = 0;
          }
        }
      });
    }
  },
  mounted() {
    let _self = this;
    let Adlist = localStorage.getItem("UserList");
    let Pmcode = localStorage.getItem("pmCode");
    let list = sessionStorage.getItem("ListtasksDel");
    _self.fidDetail = JSON.parse(list);
    let glist = JSON.parse(Adlist);
    let overCode = JSON.parse(Pmcode);
    _self.loUserlist = glist;
    _self.QXcode = overCode;
    _self.getList();
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return moment(date).format("HH:mm:ss");
    }
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  /* margin-bottom: 20px; */
  position: absolute;
  right: 142px;
  top: 0;
}

.user-avator {
  width: 100%;
  height: 100%;
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
/deep/.el-radio--small.is-bordered {
  padding: 8px 15px 0 10px;
  border-radius: 3px;
  height: 32px;
  margin-left: 10px;
  width: 80px;
}
/deep/.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 10px;
  margin-top: 5px;
}
/deep/ .el-dialog__body {
  height: 50vh;
  overflow: auto;
}
/deep/ .el-dialog__body::-webkit-scrollbar {
  display: none;
}
/deep/.user-info {
  border-bottom: none;
}
/deep/ .el-dialog {
  width: 80%;
}
</style>
