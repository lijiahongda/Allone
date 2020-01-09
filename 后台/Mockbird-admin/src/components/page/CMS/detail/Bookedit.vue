<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 文章编辑
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="/lpi/api-u/users-anon/authimg/upload"
            list-type="picture-card"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccessAdd"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="addForm.display"></el-switch>
        </el-form-item>
        <el-form-item label="文章来源">
          <el-input v-model="addForm.src"></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="addForm.typeName" placeholder="请选择">
            <el-option
              v-for="item in fselete"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章推荐">
          <el-radio-group v-model="addForm.recommend">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章摘要">
          <el-input type="textarea" placeholder="请输入内容" v-model="addForm.abstracts"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        :action="serverUrl"
        name="img"
        :show-file-list="false"
        :on-success="uploadSuccess"
        v-show="false"
      ></el-upload>
      <quill-editor ref="myTextEditor" v-model="addForm.content" :options="editorOption"></quill-editor>
      <el-button class="editor-btn" type="primary" @click.native="addSubmit">提交</el-button>
    </div>
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
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { cmsType, editArticle } from "@/api/http/cms.js";
export default {
  name: "editor",
  components: {
    quillEditor
  },
  data() {
    return {
      loUserlist: [],
      imageUrl: "",
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
      lists: [],
      content: "",
      fselete: [],
      //新增界面数据
      addForm: {
        title: "",
        showImg: "./static/img/img.jpg",
        display: 1,
        src: "",
        articleTypeId: "",
        recommend: 1,
        sort: null,
        content: ""
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      this.$message.success("提交成功！");
    },
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
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let imageUrlkey = URL.createObjectURL(file.raw);
      console.log(res.data);
      if (file.response.status == 200) {
        this.addForm.showImg = res.data;
      } else {
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      }
    },
    //新增上传图片拦截
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片类型必须是.gif,jpeg,jpg,png中的一种");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB");
      }
      return isJPG && isLt2M;
    },
    //类型分类
    getType() {
      let params = {
        status: 99
      };
      cmsType(params).then(res => {
        if (res.status == 200) {
          this.fselete = res.data.data;
        }
      });
    },
    //编辑提交
    addSubmit() {
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        //NProgress.start();
        let params = this.addForm;
        params.articleTypeId = this.addForm.typeId;
        editArticle(params).then(res => {
          //NProgress.done();
          if (res.data.status == 200) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.push({ path: "/CMSlist" });
          } else {
            this.$message({
              message: "更新失败",
              type: "error"
            });
          }
        });
      });
    }
    //上传图片
    // setImage(e) {
    //   const file = e.target.files[0];
    //   if (!file.type.includes("image/")) {
    //     return;
    //   }
    //   const reader = new FileReader();
    //   let uri = "";
    //   let form = new FormData();
    //   form.append("file", file, file.name);
    //   request
    //     .post("/lpi/api-u/users-anon/authimg/upload", form, {
    //       headers: { "Content-Type": "multipart/form-data" }
    //     })
    //     .then(response => {
    //       uri = response.data.data;
    //       this.addForm.showImg = uri;
    //       // reader.onload = event => {
    //       //   this.dialogVisible = true;
    //       //   this.editForm.showImg = event.target.result;
    //       //   this.$refs.cropper &&
    //       //     this.$refs.cropper.replace(event.target.result);
    //       // };
    //       // reader.readAsDataURL(file);
    //     })
    //     .catch(error => {
    //       alert("上传图片出错！");
    //     });
    // }
  },
  mounted() {
    let _self = this;
    let list = sessionStorage.getItem("CBookEdit");
    _self.addForm = JSON.parse(list);
    _self.imageUrl = _self.addForm.showImg;
    if (_self.addForm.recommend) {
      _self.addForm.recommend = 0;
    } else {
      _self.addForm.recommend = 1;
    }
    _self.getType();
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
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
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.sub-title {
  display: inline-block;
  color: #606266;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>