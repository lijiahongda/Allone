<template>
  <div class="menu">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 系统菜单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" @click.native="handleAdd()">新增一级菜单</el-button>
        <el-button type="primary" @click.native="handleAddb()">新增二级菜单</el-button>
      </div>
      <tree-table
        ref="recTree"
        :list.sync="sdata"
        @actionFunc="actionFunc"
        @deleteFunc="deleteFunc"
        @handlerExpand="handlerExpand"
      ></tree-table>
    </div>
    <!-- 新增一级 -->
    <el-dialog title="新增一级" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="链接">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="css" label="样式">
          <el-input v-model="addForm.css"></el-input>
        </el-form-item>
        <el-form-item prop="index" label="下标">
          <el-input v-model="addForm.index"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addForm.sort" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 新增二级 -->
    <el-dialog title="新增二级" :visible.sync="addbFormVisible" :close-on-click-modal="false">
      <el-form :model="addbForm" :rules="rules" label-width="80px" ref="addbForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="addbForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="parentId" label="分类">
          <el-select v-model="addbForm.parentId" placeholder="请选择分类">
            <el-option v-for="item in sdata" :key="item.index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="url" label="链接">
          <el-input v-model="addbForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="css" label="样式">
          <el-input v-model="addbForm.css"></el-input>
        </el-form-item>
        <el-form-item prop="index" label="下标">
          <el-input v-model="addbForm.index"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addbForm.sort" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addbFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addbSubmit" :loading="addbLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="链接">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="css" label="样式">
          <el-input v-model="editForm.css"></el-input>
        </el-form-item>
        <el-form-item prop="index" label="下标">
          <el-input v-model="editForm.index"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.sort" :min="1"></el-input-number>
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
  menusAll,
  menusSave,
  menusUpdate,
  menusDelete
} from "@/api/http/menus.js";
import treeTable from "@/components/table-tree/tab.vue";
export default {
  name: "menus",
  components: { treeTable },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        url: [{ required: true, message: "不能为空", trigger: "blur" }],
        parentId: [{ required: true, message: "不能为空", trigger: "blur" }],
        css: [{ required: true, message: "不能为空", trigger: "blur" }],
        index: [{ required: true, message: "不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      sdata: [],
      // 新增一级
      addForm: {
        name: "",
        url: "",
        parentId: "",
        css: "",
        index: "",
        sort: ""
      },
      addLoading: false,
      addFormVisible: false,
      // 新增二级
      addbForm: {},
      addbLoading: false,
      addbFormVisible: false,
      // 编辑
      editForm: {},
      editLoading: false,
      editFormVisible: false
    };
  },
  methods: {
    //显示新增一级界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        css: "",
        url: "",
        sort: "",
        index: ""
      };
    },
    //新增一级提交
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let params = this.addForm;
            menusSave(params).then(res => {
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
    //显示新增二级界面
    handleAddb: function() {
      this.addbFormVisible = true;
      this.addbForm = {
        name: "",
        css: "",
        url: "",
        sort: "",
        index: ""
      };
    },
    //新增二级提交
    addbSubmit: function() {
      this.$refs.addbForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addbLoading = true;
            //NProgress.start();
            let params = this.addbForm;
            menusSave(params).then(res => {
              this.addbLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addbForm"].resetFields();
              this.addbFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //显示编辑
    actionFunc(m) {
      console.log(m);
      this.editFormVisible = true;
      this.editForm = Object.assign({}, m);
    },
    //编辑提交
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            // delete this.editForm
            let abj = this.Deler(this.editForm, [
              "parentId",
              "createTime",
              "updateTime",
              "children",
              "isExpand",
              "level",
              "bLeft",
              "Experience"
            ]);
            let params = abj;
            console.log(params)
            menusUpdate(params).then(res => {
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
    deleteFunc(m) {
      this.$confirm("确认删除该菜单吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          //NProgress.start();
          let params = { id: m.id };
          menusDelete(params).then(res => {
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
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    getList() {
      menusAll().then(res => {
        if (res.status == 200) {
          let arr = res.data;
          let arrParent = arr.filter(v => v.parentId == 0);
          let arrChildren = arr.filter(v => v.parentId !== 0);
          let arrRes = arrParent.map(v => {
            v.children = [];
            arrChildren.forEach(k => {
              if (k.parentId === v.id) {
                v.children.push(k);
              }
            });
            return v;
          });
          // console.log(arrRes)
          this.sdata = arrRes;
        } else {
          alert(11);
        }
      });
    },
    //删除多余字段
    Deler(obj, keys) {
      keys.map(function(key) {
        delete obj[key];
      });
      return obj;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.menu {
  width: 100%;
  font-size: 14px;
}
</style>