<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 文章列表
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
        <el-select
          v-model="tselete"
          placeholder="全部"
          @change="ChoiceType($event)"
          class="handle-select mr10"
        >
          <el-option
            v-for="item in fselete"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd" :disabled="!CodeShow_hideA">发布文章</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium">
          <el-radio-button label="发布中">发布中</el-radio-button>
          <el-radio-button label="待审核">待审核</el-radio-button>
          <el-radio-button label="已删除">已删除</el-radio-button>
          <!-- <el-radio-button label="全部">全部</el-radio-button> -->
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
        <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="src" label="来源" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="typeName" label="类型" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleEdit(scope.$index, scope.row)"
              :disabled="!CodeShow_hideC"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handlExamine(scope.$index, scope.row)"
              v-if="tabPosition=='待审核'"
              :disabled="!CodeShow_hideE"
            >审核</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleDel(scope.$index, scope.row)"
              :disabled="!CodeShow_hideE"
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
  </div>
</template>

<script>
import {
  cmsType,
  allistCMS,
  listCMS,
  addArticle,
  editArticle,
  deleteArticle,
  batchCMS,
  checkArticleCMS,
  findArticleCms
} from "@/api/http/cms.js";
export default {
  name: "cmstype",
  data() {
    return {
      btnA: "back:article:save",
      btnB: "back:article:update",
      btnC: "back:article:delete",
      btnD: "back:article:bacthupdate",
      btnE: "back:article:updatestatus",
      QXcode: [],
      loUserlist: [],
      currPage: 1,
      total: 1,
      lists: [],
      sels: [],
      tabPosition: "发布中",
      tselete:999,
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
      editLoading: false
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
    //显示新增界面
    handleAdd() {
      this.$router.push({ path: "/cbook" });
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
    //显示详情界面
    handleDetail: function(index, row) {
      sessionStorage.setItem("CBookDetail", JSON.stringify(row));
      this.$router.push({ name: "cbookdetail_cms", params: { id: row.id } });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      sessionStorage.setItem("CBookEdit", JSON.stringify(row));
      this.$router.push({ name: "cbookedit_cms", params: { id: row.id } });
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
    //审核
    handlExamine(index, row) {
      this.$confirm("确认该记录通过审核吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: 99 };
          checkArticleCMS(params).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "更新成功",
              type: "success"
            });
            this.getList();
          });
        })
        .catch(res => {});
    },
    //删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let params = { id: row.id, status: -1 };
          deleteArticle(params).then(res => {
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
          let params = { id: ids, status: -1 };
          batchCMS(params).then(res => {
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
    //选择类型
    ChoiceType(event) {
      this.tselete = event;
      console.log(event)
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
      let params = {
        title: this.select_word,
        pageCount: 1,
        pageSize: 10
      };
      findArticleCms(params).then(res => {
        this.lists = res.data.data;
        this.total = res.data.total;
      });
    },
    //数据列表
    getList() {
      let ustats = 0;
      if (this.tabPosition == "待审核") {
        ustats = 0;
      }
      if (this.tabPosition == "已删除") {
        ustats = -1;
      }
      if (this.tabPosition == "发布中") {
        ustats = 99;
      }
      if (this.tabPosition == "使用中") {
        ustats = 100;
      }
      // if (this.tabPosition == "全部") {
      //   ustats = "";
      // }
      let params = {
        pageCount: this.currPage,
        pageSize: 10,
        status: ustats,
        typeId: this.tselete
      };
      allistCMS(params).then(res => {
        if (res.status == 200) {
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //数据类型
    getType() {
      let params = {
        status: 99
      };
      cmsType(params).then(res => {
        if (res.status == 200) {
          this.fselete = res.data.data;
          this.fselete.push({
            addTime: "2018-10-19T11:47:55.000+0000",
            remark: null,
            status: "99",
            typeId: 999,
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
    _self.getList();
    _self.getType();
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
