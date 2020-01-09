<template>
  <div class="advtype">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 积分列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-button type="primary" icon="search" @click="handleAdd">新增</el-button>
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
        <el-table-column prop="cycle" label="周期"></el-table-column>
        <el-table-column prop="integralNum" label="积分数"></el-table-column>
        <el-table-column prop="isClose" label="是否关闭"></el-table-column>
        <el-table-column prop="timeLapse" label="时隔时间"></el-table-column>
        <el-table-column prop="rewardNum" label="奖励次数"></el-table-column>
        <el-table-column prop="experience" label="经验"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isClose"
              active-color="#13ce66"
              inactive-color="#ff4949" @change="Isclouse">
            </el-switch>
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
          <el-input v-model="addForm.name" placeholder="例：（注册）为积分功能规则命名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型">
          <el-radio v-model="addForm.type" label="1">注册</el-radio>
          <el-radio v-model="addForm.type" label="2">登陆</el-radio>
          <el-radio v-model="addForm.type" label="3">分享</el-radio>
          <el-radio v-model="addForm.type" label="4">邀请</el-radio>
          <el-radio v-model="addForm.type" label="5">发布排片</el-radio>
          <el-radio v-model="addForm.type" label="6">接受拍片任务</el-radio>
        </el-form-item> -->
        <el-form-item label="周期">
          <el-radio v-model="addForm.cycle" label="1">每天一次</el-radio>
          <el-radio v-model="addForm.cycle" label="99">不限</el-radio>
        </el-form-item>
        <el-form-item label="积分数">
          <el-input v-model="addForm.integralNum" type="number" placeholder="(当前规则积分数)"></el-input>
        </el-form-item>
        <el-form-item label="是否关闭">
          <el-radio v-model="addForm.isClose" label="1">是</el-radio>
          <el-radio v-model="addForm.isClose" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="时隔时间">
          <el-date-picker v-model="addForm.timeLapse" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="奖励次数">
          <el-input v-model="addForm.rewardNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="经验">
          <el-input v-model="addForm.experience" type="number"></el-input>
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
        <el-form-item label="类型">
          <!-- <el-radio v-model="editForm.type" label="1">注册</el-radio>
          <el-radio v-model="editForm.type" label="2">登陆</el-radio>
          <el-radio v-model="editForm.type" label="3">分享</el-radio>
          <el-radio v-model="editForm.type" label="4">邀请</el-radio>
          <el-radio v-model="editForm.type" label="5">发布排片</el-radio>
          <el-radio v-model="editForm.type" label="6">接受拍片任务</el-radio> -->
          <el-input v-model="editForm.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="周期">
          <el-radio v-model="editForm.cycle" label="1">每天一次</el-radio>
          <el-radio v-model="editForm.cycle" label="99">不限</el-radio>
        </el-form-item>
        <el-form-item label="积分数">
          <el-input v-model="editForm.integralNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="是否关闭">
          <el-radio v-model="editForm.isClose" label="1">是</el-radio>
          <el-radio v-model="editForm.isClose" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="时隔时间">
          <el-date-picker v-model="editForm.timeLapse" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="奖励次数">
          <el-input v-model="editForm.rewardNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="经验">
          <el-input v-model="editForm.experience" type="number"></el-input>
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
import { pointRulequeryAll, pointRuleinsert ,pointRuleupdate,pointRuledeleteById,pointRuleupdateClose} from "@/api/http/pointmark.js";
export default {
  name: "advtype",
  data() {
    return {
      currPage: 1,
      total: 1,
      QXcode: [],
      loUserlist: [],
      lists: [],
      sels: [],
      // 搜索
      select_word: "",
      //新增
      addForm: {
        type: "1",
        cycle: "99",
        isClose: "1"
      },
      addFormVisible: false,
      addLoading: false,
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false
    };
  },
  methods: {
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        type: "1",
        cycle: "99",
        isClose: "1"
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
            pointRuleinsert(params).then(res => {
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
      this.editForm.type=this.editForm.type.toString()
      this.editForm.cycle=this.editForm.cycle.toString()
      this.editForm.isClose=this.editForm.isClose.toString()
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            pointRuleupdate(params).then(res => {
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
          pointRuledeleteById(params).then(res => {
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
      let params = {
        // isClose:
        currPage: this.currPage,
        pageSize: 10
      };
      pointRulequeryAll(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
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
