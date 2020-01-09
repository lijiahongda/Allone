<template>
  <div class="advtype">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>发布排片任务
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-carousel :autoplay="false" type="card" indicator-position="none" height="200px">
        <el-carousel-item v-for="item in lists" :key="item.id">
          <div class="zou_box">
            <div class="zou_img">
              <img :src="item.picture">
            </div>
            <h3 class="zou_txt">{{ item.name }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="100px"
        style="padding: 5px;margin-top: 20px;"
      >
        <el-form-item label="选择排片日期">
          <el-date-picker
            v-model="mockbirdJTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="选择区域">
          <el-checkbox-group v-model="citiesAa" @change="handleCheckedCitiesChangea">
            <el-checkbox label="null" key="0">不限</el-checkbox>
            <el-checkbox label="1" key="1">东北</el-checkbox>
            <el-checkbox label="2" key="2">华东</el-checkbox>
            <el-checkbox label="3" key="3">华北</el-checkbox>
            <el-checkbox label="4" key="4">华中</el-checkbox>
            <el-checkbox label="5" key="5">华南</el-checkbox>
            <el-checkbox label="6" key="6">西南</el-checkbox>
            <el-checkbox label="7" key="7">西北</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-checkbox-group v-model="citiesAb" @change="handleCheckedCitiesChangeb">
            <el-checkbox label="1" :key="1">一线城市</el-checkbox>
            <el-checkbox label="2" :key="2">一线城市</el-checkbox>
            <el-checkbox label="3" :key="3">三线城市</el-checkbox>
            <el-checkbox label="4" :key="4">四线城市</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择影城数量" style="width:700px;">
          <el-radio-group v-model="citiesB" size="small">
            <el-radio label="50" border style="margin:8px 40px 8px 8px;">50</el-radio>
            <el-radio label="100" border>100</el-radio>
            <el-radio label="150" border>150</el-radio>
            <el-radio label="200" border>200</el-radio>
            <el-radio label="250" border>250</el-radio>
            <el-radio label="300" border>300</el-radio>
            <el-radio label="350" border>350</el-radio>
            <el-radio label="400" border>400</el-radio>
            <el-radio label="450" border>450</el-radio>
            <el-radio label="500" border>500</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择场次时段">
          <el-radio-group v-model="citiesD" size="small">
            <el-radio label="1" border>不限场</el-radio>
            <el-radio label="2" border>普通场</el-radio>
            <el-radio label="3" border>黄金场</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择排片场次" v-show="!mockCarzb">
          <el-radio-group v-model="citiesC" size="medium">
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
            <el-radio-button label="5"></el-radio-button>
            <el-radio-button label="6"></el-radio-button>
            <el-radio-button label="7"></el-radio-button>
          </el-radio-group>
          <span>场/天</span>
        </el-form-item>
        <el-form-item label="单场次积分" v-show="!mockCarzb">
          <el-input v-model="addForm.integral" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="排片占比%" v-show="mockCarzb" style="width: 650px;">
          <div class="block">
            <el-slider v-model="potZb" show-input></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="单影院总积分" v-show="mockCarzb">
          <el-input v-model="addForm.integralb" style="width: 150px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="add_btn">
        <el-button type="danger" @click.native="mockBirdcloudzb">切换排片模式</el-button>
        <el-button type="warning" @click.native="mockBirdclouds">嘲鸟云智能影院预览</el-button>
        <el-button @click.native="sendFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="sendSubmit" :loading="addLoading">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mockbirdnewmovieQueryAll } from "@/api/http/film.js";
export default {
  name: "advtype",
  data() {
    return {
      QXcode: [],
      loUserlist: [],
      lists: [],
      mockCarzb: false,
      potZb: 20,
      mockbirdJTime: "",
      citiesAa: ["null"],
      citiesAb: ["1"],
      citiesB: "1",
      citiesC: "1",
      citiesD: "1",
      //新增
      addForm: {},
      addFormVisible: false,
      addLoading: false
    };
  },
  methods: {
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
    // 地区
    handleCheckedCitiesChangea(val) {
      if (val.includes("null")) {
        this.citiesAac = null;
      } else {
        this.citiesAac = val.join(",");
      }
    },
    //城市
    handleCheckedCitiesChangeb(val) {
      this.citiesAbc = val.join(",");
    },
    mockBirdcloudzb() {
      this.mockCarzb = !this.mockCarzb;
    },
    // 类型列表
    getList() {
      let params = {
        currPage: 1,
        pageSize: 100
      };
      mockbirdnewmovieQueryAll(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            if (val.picture) {
              let _selfarr = val.picture.split(",");
              val.picture = _selfarr[0];
            } else {
              val.picture = "http://img.mockbird.top/1544155410791457.png";
            }
          });
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.zou_box {
  width: 150px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 5px;
}
.zou_box .zou_img {
  width: 150px;
  height: 170px;
}
.zou_box .zou_img img {
  width: 100%;
  height: 100%;
}
.zou_box .zou_txt {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 30px;
  margin: 0;
  text-align: center;
}
.add_btn {
  margin: 0 auto;
  text-align: right;
  margin-top: 30px;
}
</style>
