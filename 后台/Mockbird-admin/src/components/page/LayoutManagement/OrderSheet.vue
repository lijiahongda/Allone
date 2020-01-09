<template>
  <div class="advtype">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>排片订单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-radio-group
          v-model="headPosition"
          @change="HeadShsx($event)"
          size="medium"
          class="wwwe"
        >
          <el-radio-button label="进行中">进行中</el-radio-button>
          <el-radio-button label="已完成">已完成</el-radio-button>
          <el-radio-button label="已取消">已取消</el-radio-button>
        </el-radio-group>
      </div>
      <el-table :data="lists" border class="table" ref="multipleTable">
        <el-table-column prop="addTime" label="开始时间"></el-table-column>
        <el-table-column prop="totalField" label="总场次"></el-table-column>
        <el-table-column prop="integral" label="单场积分"></el-table-column>
        <el-table-column prop="timeInterval" label="时段"></el-table-column>
        <el-table-column prop="integral" label="单场积分"></el-table-column>
        <el-table-column prop="cinemaNum" label="影院数量"></el-table-column>
        <el-table-column prop="receiveNum" label="接受任务数量"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >查看进度</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleareyouok(scope.$index, scope.row)"
            >一键处理</el-button>
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
        <el-form-item label="类型">
          <el-input v-model="addForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--反馈-->
    <el-dialog title="反馈" :visible.sync="fkFormVisible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="fkForm" label-width="80px">
        <div style="width:200px;height:200px">
          <img :src="PlatoonList.imgUrl" alt style="width:100%;height:100%;">
        </div>
        <el-form-item label="影院名称">
          <el-input v-model="PlatoonList.cinemaName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="fkFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="fkSubmit">完成任务</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
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
              @click="fkSubmit(scope.$index, scope.row)"
            >确认完成</el-button>
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
  </div>
</template>

<script>
import {
  ordershtlist,
  PlatoonqueryByOrderId,
  FkqueryByPlatoonId,
  FkupdPlatoonId
} from "@/api/http/sheet.js";
export default {
  name: "ordersheet",
  data() {
    return {
      currPage: 0,
      total: 1,
      QXcode: [],
      loUserlist: [],
      lists: [],
      headPosition: "进行中",
      tabPosition: "全部",
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      //编辑
      fkForm: {},
      fkFormVisible: false,
      fkLoading: false,
      PlatoonList: "",
      //反馈
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //拍片业务
      editcurrPage: 1,
      edittotal: 1,
      rowDDid: "",
      mockbirdJlist: [],
      mockbirdJTime: []
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
            addGG(params).then(res => {
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
     //一键处理
    handleareyouok(index, row) {
      this.$confirm("确认一键处理该订单吗？", "提示", {}).then(() => {

      });
    },
    //编辑
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.rowDDid = row.id;
      this.getDlist();
    },
    //查看反馈
    handFk: function(index, row) {
      this.fkFormVisible = true;
      this.fkForm = Object.assign({}, row);
      let params = { platoonId: this.fkForm.id };
      FkqueryByPlatoonId(params).then(res => {
        this.PlatoonList = res.data.data;
      });
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let oedit = Object.assign({}, this.editForm);
            let params = {
              typeName: oedit.typeName,
              remark: oedit.remark,
              typeId: oedit.typeId
            };
            editGG(params).then(res => {
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
    fkSubmit: function(index, row) {
      let params = {
        id:row.id
      };
      FkupdPlatoonId(params).then(res => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.fkFormVisible = false;
      });
    },
    //切换状态
    HeadShsx(event) {
      this.getList();
    },
    //切换状态
    Shsx(event) {
      this.getDlist();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currPage = val;
      this.getList();
    },
    //分页加载a
    handleCurrentChangeedit(val) {
      this.editcurrPage = val;
      this.getDlist();
    },
    // 类型列表
    getList() {
      let ustatus = 1;
      if (this.headPosition == "进行中") {
        ustatus = 1;
      }
      if (this.headPosition == "已完成") {
        ustatus = 2;
      }
      if (this.headPosition == "已取消") {
        ustatus = 3;
      }
      let params = {
        status: ustatus,
        currPage: this.currPage,
        pageSize: 10
      };
      ordershtlist(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
        }
      });
    },
    // 进度
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
