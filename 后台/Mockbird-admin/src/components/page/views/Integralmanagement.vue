<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 积分管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click.native="batchRemove">批量删除</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>-->
        <el-button type="primary" @click.native="handleAdd">历史记录</el-button>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="user.nickname" label="昵称"></el-table-column>
        <el-table-column prop="integral" label="积分"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleEdit(scope.$index, scope.row)"
            >减积分</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleEditt(scope.$index, scope.row)"
            >加积分</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增界面-->
      <el-dialog title="历史纪录" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-table
          :data="historyList"
          border
          class="table"
          ref="multipleTable"
          @selection-change="selsChange"
        >
          <el-table-column prop="integralNum" label="积分"></el-table-column>
          <el-table-column prop="addTime" label="时间"></el-table-column>
          <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click.native="handleEdit(scope.$index, scope.row)">减积分</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click.native="handleEditt(scope.$index, scope.row)">加积分</el-button>
                    </template>
          </el-table-column>-->
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChangeb"
            layout="prev, pager, next"
            :total="totalb"
            ></el-pagination>
        </div>
      </el-dialog>
      <!--编辑界面-->
      <el-dialog title="减积分" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <el-form-item prop="id" label="id">
            <el-input v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item prop="integralNum" label="积分">
            <el-input v-model="editForm.integralNum"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--编辑界面-->
      <el-dialog title="加积分" :visible.sync="editFormVisiblet" :close-on-click-modal="false">
        <el-form :model="editFormt" label-width="80px" ref="editFormt">
          <el-form-item prop="id" label="id">
            <el-input v-model="editFormt.id"></el-input>
          </el-form-item>
          <el-form-item prop="integralNum" label="积分">
            <el-input v-model="editFormt.integralNum"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisiblet = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmitt" :loading="editLoadingt">提交</el-button>
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
  integralDetailedList,
  ConsumptionIntegralj,
  ConsumptionIntegralja,
  integralDetailedqueryList
} from "@/api/http/public.js";
import moment from "moment";
export default {
  name: "cmstype",
  data() {
    return {
      QXcode: [],
      loUserlist: [],
      currPage: 1,
      total: 1,
      currPageb: 1,
      totalb: 1,
      lists: [],
      historyList: [],
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
      editLoading: false,
      //编辑2
      editFormt: {},
      editFormVisiblet: false,
      editLoadingt: false
    };
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.getHistory()
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            if (this.addForm.typeName != "") {
              let params = Object.assign({}, this.addForm);
              addCMSA(params).then(res => {
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
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let par = Object.assign({}, this.editForm);
            let params = {
              increaseNumber: par.integralNum,
              userId: this.loUserlist.id
            };
            ConsumptionIntegralj(params).then(res => {
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
    //显示编辑界面2
    handleEditt: function(index, row) {
      this.editFormVisiblet = true;
      this.editFormt = Object.assign({}, row);
    },
    //编辑提交2
    editSubmitt: function() {
      this.$refs.editFormt.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoadingt = true;
            //NProgress.start();
            let par = Object.assign({}, this.editFormt);
            let params = {
              increaseNumber: par.integralNum,
              userId: this.loUserlist.id
            };
            ConsumptionIntegralja(params).then(res => {
              this.editLoadingt = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editFormt"].resetFields();
              this.editFormVisiblet = false;
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
     //分页加载
    handleCurrentChangeb(val) {
      this.currPageb = val;
      this.getHistory();
    },
    //搜索
    search() {
      this.is_search = true;
    },
    //数据列表
    getList() {
      let params = {
        userId: this.loUserlist.id,
        pageCount: 1,
        pageSize: 10
      };
      integralDetailedList(params).then(res => {
        if (res.status == 200) {
          console.log(res.data.data)
          this.lists=res.data.data
        }
      });
    },
    getHistory(){
      let params = {
        userId: this.loUserlist.id,
        currPage: 1,
        pageSize: 10
      };
      integralDetailedqueryList(params).then(res => {
        if (res.data.status == 0) {
          res.data.data.map(val => {
            if(val.type==1||val.type==4){
              val.integralNum="增加"+val.integralNum+"点积分"
            }else{
              val.integralNum="减少"+val.integralNum+"点积分"
            }
            val.addTime = moment(val.addTime).format("YYYY-MM-DD HH:mm:ss");
          });
          this.historyList = res.data.data;
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
