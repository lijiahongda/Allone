<template>
  <div class="userquery">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          用户查询（共{{total}}个用户）--影院方({{yftotal}}个用户) --制片方({{pftotal}}个用户)
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 列表 -->
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="batchRemove">批量发送消息</el-button>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="primary" @click.native="handleAdd()">新增</el-button>
      </div>
      <div class="handle-box">
        <el-radio-group v-model="tabPosition" @change="Shsx($event)" size="medium">
          <el-radio-button label="管理员">管理员</el-radio-button>
          <el-radio-button label="院方">院方</el-radio-button>
          <el-radio-button label="片方">片方</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        v-loading="listLoading"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="usrSelf" label="身份" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="updateTime" label="时间" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="job" label="职位" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="companyName"
          label="企业名称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handlemenu(scope.$index, scope.row)">分配角色</el-button>
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
    <el-dialog title="新增用户" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="tselete" placeholder="管理员">
            <el-option
              v-for="item in tseletes"
              :key="item.usertype"
              :label="item.name"
              :value="item.usertype"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--编辑界面-->
    <el-dialog
      title="编辑"
      :rules="rules"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item prop="usrSelf" label="身份">
          <el-input v-model="editForm.usrSelf"></el-input>
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间">
          <el-input v-model="editForm.updateTime"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="真实姓名">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item>
        <el-form-item prop="job" label="职位">
          <el-input v-model="editForm.job"></el-input>
        </el-form-item>
        <el-form-item prop="companyName" label="企业名称">
          <el-input v-model="editForm.companyName"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--发送消息-->
    <el-dialog title="推送消息" :visible.sync="sendFormVisible" :close-on-click-modal="false">
      <el-form :model="sendForm" label-width="80px" ref="sendForm">
        <el-form-item prop="title" label="标题">
          <el-input v-model="sendForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <!-- <el-input type="textarea" v-model="addForm.content"></el-input> -->
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="img"
            :show-file-list="false"
            :on-success="uploadSuccess"
            v-show="false"
          ></el-upload>
          <quill-editor ref="myTextEditor" v-model="sendForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="sendSubmit" :loading="sendLoading">发送</el-button>
      </div>
    </el-dialog>
    <!--分配角色-->
    <el-dialog title="分配角色" :visible.sync="sqVisible" :close-on-click-modal="false">
      <el-form :model="sqForm" label-width="80px" ref="tjForm">
        <el-form-item label="角色">
          <div style="width:100%;height:200px;overflow-y:scroll;margin-top:10px;">
            <el-tree
              ref="tree"
              :data="jslist"
              node-key="key"
              show-checkbox
              :default-checked-keys="cklist"
            ></el-tree>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="sqVisible = false">取消</el-button>
        <el-button type="primary" @click.native="sqSubmit" :loading="sqLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import {
  userSearch,
  anonaddUser,
  usersRoles,
  usproRoles,
  usersEdit,
  getrefreshtoken,
  getInfo
} from "@/api/http/user.js";
import { rolesList, ufindByUsers } from "@/api/util/system.js";
// import store from "@/store/index.js";
import { setToken } from "@/api/utils/coike.js";
import { Messagegetlist, sendMessage } from "@/api/http/public.js";
import moment from "moment";
export default {
  name: "userquery",
  components: { quillEditor },
  data() {
    return {
      rules: {
        username: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      tabPosition: "管理员",
      loUserlist: [],
      pftotal: "",
      yftotal: "",
      aRefresh: "",
      currPage: 1,
      total: 1,
      lists: [],
      cklist: [],
      listLoading: false,
      sels: [], //列表选中列
      // 搜索
      select_word: "",
      sendForm: {},
      sendFormVisible: false,
      sendLoading: false,
      serverUrl: "/lpi/api-f/files-anon/editor/upload",
      editorOption: {
        placeholder: "写点什么吧！",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("file", false);
                }
              }
            }
          }
        }
      },
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      tselete: 0,
      tseletes: [
        { usertype: 1, name: "片方" },
        { usertype: 2, name: "院方" },
        { usertype: 0, name: "管理员" }
      ],
      //编辑
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      //授权
      sqlistd: [],
      jslist: [],
      sqForm: {},
      sqVisible: false,
      sqLoading: false
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
            params.userType = this.tselete;
            anonaddUser(params).then(res => {
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
            let params = Object.assign({}, this.editForm);
            if (params.sex == "女") {
              params.sex = 1;
            } else {
              params.sex = 0;
            }
            params.createTime = null;
            params.updateTime = null;
            usersEdit(params).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              let refresh_token = this.aRefresh;
              getrefreshtoken(refresh_token).then(res => {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("adminRefresh_token");
                localStorage.setItem("admin_token", res.data.access_token);
                localStorage.setItem(
                  "adminRefresh_token",
                  res.data.refresh_token
                );
                setToken(res.data.access_token);
                this.$store.commit("SET_TOKEN", res.data.access_token);
                let Utoken = res.data.access_token;
                getInfo(Utoken).then(res => {
                  localStorage.removeItem("UserList");
                  let userlist = res.data.data;
                  localStorage.setItem("UserList", JSON.stringify(userlist));
                });
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getList();
            });
          });
        }
      });
    },
    //显示分配列表
    handlemenu: function(index, row) {
      let _self = this;
      _self.cklist = [];
      let params = {
        id: row.id
      };
      usersRoles(params).then(res => {
        res.data.map(val => {
          _self.cklist.push(val.id);
        });
      });
      _self.getType();
      _self.sqVisible = true;
      _self.sqForm = Object.assign({}, row);
    },
    //分配角色提交
    sqSubmit() {
      // debugger
      // this.$refs.sqForm.validate(valid => {
      //   if (valid) {
      this.getCheckedKeys();
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.sqLoading = true;
        let aer = Object.assign({}, this.sqForm);
        //NProgress.start();
        let params = {
          id: aer.id,
          roleIds: this.sqlistd
        };
        usproRoles(params).then(res => {
          this.sqLoading = false;
          //NProgress.done();
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.sqVisible = false;
          this.getList();
        });
      });
      //   }
      // });
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
          rolesDelete(params).then(res => {
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
    //批量发送消息显示
    batchRemove() {
      var ids = this.sels.map(item => item.id).toString();
      let arrPo = ids.split(",");
      let arrPop = [];
      arrPo.forEach(function(data, index, arr) {
        arrPop.push(+data);
      });
      console.log(arrPop);
      this.sendFormVisible = true;
      this.sendForm = {
        userId: arrPop
      };
    },
    //批量发送消息
    sendSubmit: function() {
      this.$refs.sendForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.sendLoading = true;
            if (this.sendForm.title != "") {
              let params = Object.assign({}, this.sendForm);
              params.fromUser = this.loUserlist.id;
              // let params = JSON.stringify(par);
              console.log(params);
              sendMessage(params).then(res => {
                this.sendLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["sendForm"].resetFields();
                this.sendFormVisible = false;
                this.getList();
              });
            } else {
              this.$message({
                message: "提交失败内容为空！",
                type: "error"
              });
              this.sendLoading = false;
              this.$refs["sendForm"].resetFields();
              this.sendFormVisible = false;
              this.getList();
            }
          });
        }
      });
    },
    //tree辅助
    getCheckedKeys() {
      this.sqlistd = this.$refs.tree.getCheckedKeys();
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
    //发送
    uploadSuccess(res, file) {
      let quill = this.$refs.myTextEditor.quill;
      // 如果上传成功
      if (res.status == 200 && res.data !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    },
    //搜索
    search() {
      this.is_search = true;
      let params = {
        username: this.select_word,
        pageCount: 1,
        pageSize: 10
      };
      ufindByUsers(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            if (val.sex == 1) {
              val.sex = "女";
            } else {
              val.sex = "男";
            }
          });
          this.lists = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    //状态筛选
    Shsx(event) {
      console.log(event);
      this.tabPosition=event
      this.getList();
    },
    getList() {
      let useType = 0;
      switch (this.tabPosition) {
        case "管理员":
          useType = 0;
          break;
        case "院方":
          useType = 1;
          break;
        case "片方":
          useType = 2;
          break;
        default:
          useType = 0;
      }
      let params = {
        pageCount: this.currPage,
        pageSize: 10,
        userType: useType
      };
      userSearch(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            // if (val.sex == 1) {
            //   val.sex = "女";
            // } else {
            //   val.sex = "男";
            // }
            val.updateTime = moment(val.updateTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (val.userType == 1) {
              val.usrSelf = "制片方";
            } else if (val.userType == 2) {
              val.usrSelf = "影院方";
            } else {
              val.usrSelf = "系统管理员";
            }
          });
          this.lists = res.data.data;
          this.total = res.data.total;
          // let yfArr = res.data.data.filter(item=>item.userType==2)
          this.yftotal = res.data.total - 13;
          // let pfArr = res.data.data.filter(item=>item.userType==1)
          this.pftotal = 13;
        }
      });
    },
    getType() {
      let params = {
        start: 0,
        length: 100
      };
      rolesList(params).then(res => {
        this.jslist = [];
        if (res.status == 200) {
          // this.tseletes=res.data.data
          res.data.data.map(val => {
            this.jslist.push({
              key: val.id,
              label: val.name
            });
          });
        }
      });
    }
  },
  mounted() {
    let Adlist = localStorage.getItem("UserList");
    let adminRefresh = localStorage.getItem("adminRefresh_token");
    this.aRefresh = adminRefresh;
    let glist = JSON.parse(Adlist);
    this.loUserlist = glist;
    this.getList();
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
/* /deep/ .el-dialog__body {
  height: 50vh;
  overflow: auto;
} */
/* /deep/ .el-dialog__body::-webkit-scrollbar {
  display: none;
} */
</style>
