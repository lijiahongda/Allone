<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>影院列表（共{{total}}家）
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button
          type="primary"
          icon="delete"
          class="handle-del mr10"
          @click.native="batchRemove"
        >批量删除</el-button> -->
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <!-- <el-table-column prop="ranking" label="排名">
        </el-table-column>-->
        <el-table-column prop="name" label="影院名称"></el-table-column>
        <el-table-column prop="screenNumber" label="银幕数"></el-table-column>
        <el-table-column prop="seatNumber" label="座位数"></el-table-column>
        <el-table-column prop="subjectionCourtyardLine" label="所属院线"></el-table-column>
        <el-table-column prop="specialFundsCode" label="专资编码"></el-table-column>
        <el-table-column prop="address" label="详细地址"></el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
    <el-dialog title="新增影院" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item prop="name" label="影院名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="screenNumber" label="银幕数">
          <el-input v-model="addForm.screenNumber"></el-input>
        </el-form-item>
        <el-form-item prop="seatNumber" label="座位数">
          <el-input v-model="addForm.seatNumber"></el-input>
        </el-form-item>
        <el-form-item prop="subjectionCourtyardLine" label="所属院线">
          <el-input v-model="addForm.subjectionCourtyardLine"></el-input>
        </el-form-item>
        <el-form-item prop="specialFundsCode" label="专资编码">
          <el-input v-model="addForm.specialFundsCode"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-cascader :options="options" v-model="selectedOptionsa" @change="handleChangeAdd"></el-cascader>
        </el-form-item>
        <el-form-item prop="address" label="详细地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="联系人">
          <el-input v-model="addForm.contacts"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑影院" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
        <el-form-item prop="name" label="影院名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="screenNumber" label="猫眼ID">
          <el-input v-model="editForm.maoYanCinemaId"></el-input>
        </el-form-item>
        <el-form-item prop="screenNumber" label="银幕数">
          <el-input v-model="editForm.screenNumber"></el-input>
        </el-form-item>
        <el-form-item prop="seatNumber" label="座位数">
          <el-input v-model="editForm.seatNumber"></el-input>
        </el-form-item>
        <el-form-item prop="subjectionCourtyardLine" label="所属院线">
          <el-input v-model="editForm.subjectionCourtyardLine"></el-input>
        </el-form-item>
        <el-form-item prop="specialFundsCode" label="专资编码">
          <el-input v-model="editForm.specialFundsCode"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="所在城市">
          <el-cascader :options="options" v-model="selectedOptionsb" @change="handleChangeEdit"></el-cascader>
        </el-form-item>
        <el-form-item prop="address" label="详细地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item prop="contacts" label="联系人">
          <el-input v-model="editForm.contacts"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  cinemaListByAdd,
  cinemaListByDelete,
  cinemaListByEdit,
  cinemaListByParams,
  cinemaListByDetail,
  addressSelectAll
} from "@/api/http/public.js";
export default {
  name: "cinemamanagement",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        screenNumber: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        seatNumber: [{ required: true, message: "不能为空", trigger: "blur" }],
        subjectionCourtyardLine: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        specialFundsCode: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "不能为空", trigger: "blur" }],
        contacts: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      selectedOptionsa: [],
      selectedOptionsb: [],
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
      editLoading: false,
      options: []
    };
  },
  methods: {
    //ssssssss
    handleChangeAdd(value) {
      this.selectedOptionsa = value;
    },
    handleChangeEdit(value) {
      this.selectedOptionsb = value;
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: ""
      };
    },
    //新增提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            if (this.addForm.name != "") {
              let params = Object.assign({}, this.addForm);
              params.province =this.selectedOptionsa[0];
              params.city = this.selectedOptionsa[1];
              params.county = this.selectedOptionsa[2];
              cinemaListByAdd(params).then(res => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.selectedOptionsa = [];
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
      this.selectedOptionsb = [row.province, row.city, row.county];
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let params = Object.assign({}, this.editForm);
            params.province = this.selectedOptionsb[0];
            params.city = this.selectedOptionsb[1];
            params.county = this.selectedOptionsb[2];
            cinemaListByEdit(params).then(res => {
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
          cinemaListByDelete(params).then(res => {
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
      let parms = {
        characteristic: null,
        boxOffice: null,
        startTime: null,
        endTime: null,
        province: null,
        city: null,
        country: null,
        currPage: this.currPage,
        pageSize: 5,
        name: this.select_word
      };
      cinemaListByParams(parms).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          // this.total = res.data.totalCount;
        }
      });
    },
    //数据列表
    getList() {
      let parms = {
        characteristic: null,
        boxOffice: null,
        startTime: null,
        endTime: null,
        province: null,
        city: null,
        country: null,
        currPage: this.currPage,
        pageSize: 5
      };
      cinemaListByParams(parms).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.totalCount;
        }
      });
    },
    // 获取地区
    getAddressAll() {
      addressSelectAll().then(res => {
        if (res.status == 200) {
          res.data.provinces.forEach(v => {
            v.value = v.label;
            v.children.forEach(s => {
              s.value = s.label;
              s.children.forEach(c => {
                c.value = c.label;
              });
            });
          });
          this.options = res.data.provinces;
        } else {
          this.$message({
            message: "地区获取失败",
            type: "error"
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
    _self.getList();
    _self.getAddressAll();
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
