<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>排片管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click.native="search">搜索</el-button>
        <el-button type="primary" @click.native="handleSend">发布任务</el-button>
      </div>
      <el-table
        :data="lists"
        border
        class="table"
        ref="multipleTable"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="影片名称"></el-table-column>
        <el-table-column prop="director" label="导演"></el-table-column>
        <el-table-column prop="produce" label="发行方"></el-table-column>
        <el-table-column prop="demand" label="需求"></el-table-column>
        <el-table-column prop="status" label="任务状态"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click.native="handleSend(scope.$index, scope.row)"
            >发布任务</el-button>-->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click.native="handleEdit(scope.$index, scope.row)"
            >查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--详情界面-->
      <el-dialog title="影片详情" :visible.sync="detailFormVisible" :close-on-click-modal="false">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20">
              <div class="user-info">
                <img :src="detailForm.picture" class="user-avator" alt>
                <div class="user-info-cont">
                  <div class="user-info-name">{{detailForm.name}}</div>
                  <br>
                  <div>导演：{{detailForm.director}}</div>
                </div>
              </div>
              <div class="user-info-list">
                演员：
                <span>{{detailForm.performer}}</span>
              </div>
              <div class="user-info-list">
                时长：
                <span>{{detailForm.duration}}</span>
              </div>
              <div class="user-info-list">
                发行方：
                <span>{{detailForm.issue}}</span>
              </div>
              <div class="user-info-list">
                出品人：
                <span>{{detailForm.produce}}</span>
              </div>
              <div class="user-info-list">
                制片人：
                <span>{{detailForm.filmProducer}}</span>
              </div>
              <div class="user-info-list">
                电影类型：
                <span>{{detailForm.movieType}}</span>
              </div>
              <div class="user-info-list">
                投资金额：
                <span>{{detailForm.investment}}</span>
              </div>
              <div class="user-info-list">
                预计上映时间：
                <span>{{detailForm.estimateReleaseTime}}</span>
              </div>
              <div class="user-info-list">
                发布时间：
                <span>{{detailForm.addTime}}</span>
              </div>
              <div class="user-info-list">
                放映制式：
                <span>{{detailForm.showType}}</span>
              </div>
              <div class="user-info-list">
                联系人：
                <span>{{detailForm.contacts}}</span>
              </div>
              <div class="user-info-list">
                职位：
                <span>{{detailForm.position}}</span>
              </div>
              <div class="user-info-list">
                联系电话：
                <span>{{detailForm.phone}}</span>
              </div>
              <div class="user-info-list">
                需求描述：
                <span>{{detailForm.demand}}</span>
              </div>
              <div class="user-info-list">
                影片简介：
                <span>{{detailForm.synopsis}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="detailFormVisible = false">返回</el-button>
        </div>
      </el-dialog>
      <!--发布任务界面-->
      <el-dialog title="发布排片任务" :visible.sync="sendFormVisible" :close-on-click-modal="false">
        <el-form ref="sendForm" :model="sendForm" label-width="100px">
          <!-- <el-row :gutter="24">
          <el-col :span="24">-->
          <!-- <el-card shadow="hover" class="mgb20"> -->
          <div class="user-info">
            <img :src="moiveImg" class="user-avator" alt>
          </div>
          <!-- </el-card> -->
          <!-- </el-col>
          </el-row>-->
          <el-form-item label="影片">
            <el-select v-model="MoListsindex" @change="chSelete($event)" placeholder="请选择">
              <el-option v-for="item in MoLists" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择排片日期">
            <!-- <el-input v-model="addForm.estimateReleaseTime"></el-input> -->
            <!-- <el-date-picker v-model="addForm.estimateReleaseTime" type="date" placeholder="选择日期"></el-date-picker> -->
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
          <el-form-item label="选择影城数量">
            <el-radio-group v-model="citiesB" size="small">
              <el-radio label="50" border>50</el-radio>
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
            <el-input v-model="sendForm.integral"></el-input>
          </el-form-item>
          <el-form-item label="排片占比%" v-show="mockCarzb">
            <div class="block">
              <el-slider
                v-model="potZb"
                show-input>
              </el-slider>
              </div>
            <!-- <span></span> -->
          </el-form-item>
          <el-form-item label="单影院总积分" v-show="mockCarzb">
            <el-input v-model="sendForm.integralb"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click.native="mockBirdcloudzb">切换排片模式</el-button>
          <el-button type="warning" @click.native="mockBirdclouds">嘲鸟云智能影院预览</el-button>
          <el-button @click.native="sendFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="sendSubmit" :loading="addLoading">发布</el-button>
        </div>
      </el-dialog>
      <!--嘲鸟云预览界面-->
      <el-dialog title="嘲鸟云智能推荐" :visible.sync="mockFormVisible" :close-on-click-modal="false">
        <el-table :data="listmockbird" border class="table" ref="multipleTable" height="400">
          <el-table-column prop="name" label="影院"></el-table-column>
          <el-table-column prop="subjectionCourtyardLine" label="所属院线"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="contacts" label="联系人"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChangea"
            layout="prev, pager, next"
            :total="mocktotal"
          ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="mockFormVisible = false">返回</el-button>
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
  mockbirdnewmovieQueryAll,
  mockbirdnewmovieAdd,
  mockbirdCloud,
  mockbirdSend,
  mockbirdJob,
  mockbirdJoblist,
  mockbirdJobstatus,
  queryAllList
} from "@/api/http/film.js";
import moment from "moment";
import request from "@/api/http.js";
export default {
  name: "cmstype",
  data() {
    return {
      AdddialogImageUrl: "",
      moiveImg: "static/img/img.jpg",
      citiesAa: ["null"],
      potZb:20,
      mockCarzb:false,
      citiesAac: null,
      citiesAb: ["1"],
      citiesAbc: "1",
      citiesB: "1",
      citiesC: "1",
      citiesD: "1",
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
      //拍片业务
      mockbirdJlist: [],
      mockbirdJTime: []
    };
  },
  methods: {
    handleCheckedCitiesChangea(val) {
      if (val.includes("null")) {
        this.citiesAac = null;
      } else {
        this.citiesAac = val.join(",");
      }
      // this.getMockbird()
    },
    handleCheckedCitiesChangeb(val) {
      this.citiesAbc = val.join(",");
      // console.log(this.citiesAbc)
    },
    mockBirdclouds() {
      this.getMockbird();
      this.mockFormVisible = true;
    },
    mockBirdcloudzb() {
      this.mockCarzb=!this.mockCarzb
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        multipartFile: []
      };
    },
    //新增广告位上传图片
    handlePictureCardPreviewAdd(file) {
      this.AdddialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //新增广告位删除图片
    AddhandleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //新增上传图片回调
    handleAvatarSuccessAdd(res, file) {
      this.arreee.push(file);
    },
    //显示详情界面
    handleDetail: function(index, row) {
      this.detailFormVisible = true;
      this.detailForm = Object.assign({}, row);
    },
    //选择影片
    chSelete(event) {
      let tHeot = this.MoLists.filter(val => val.id == event);
      this.moiveImg = tHeot[0].picture;
    },
    //显示发布任务界面
    handleSend() {
      this.sendFormVisible = true;
      // this.sendForm = Object.assign({}, row);
      this.getMockbird();
    },
    //发布任务
    sendSubmit() {
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.sendLoading = true;
        let par = Object.assign({}, this.sendForm);
        let platoonVo = {
          bigAreaId: this.citiesAac,
          lineId: this.citiesAbc
        };
        // 时间
        let starta = moment(this.mockbirdJTime[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let enda = moment(this.mockbirdJTime[0]).format("YYYY-MM-DD HH:mm:ss");
        let gald = this.citiesD;
        let ordin = 0;
        if (gald == 3) {
          this.gald = 1;
          this.ordin = 0;
        } else {
          this.gald = 0;
          this.ordin = 1;
        }
        // starta.toString()
        // enda.toString()
        let jfc = 0;
        let pfs = 0;
        if(this.mockCarzb){
          jfc = this.citiesB * this.citiesC * par.integral
          pfs = 2
        }else{
          jfc = this.citiesB * par.integralb
          pfs = 1
        }
        // console.log(enda)
        let platoonAddVo = {
          userId: this.loUserlist.id,
          filmId: this.MoListsindex,
          filmUrl: this.moiveImg.picture,
          totalField: this.citiesC,
          gold: gald,
          ordinary: ordin,
          integral: par.integral,
          totalIntegral: jfc,
          startTime: starta,
          endTime: enda,
          cinemaNum: this.citiesB,
          isField:pfs
        };
        let params = {
          platoonVo: platoonVo,
          platoonAddVo: platoonAddVo
        };
        mockbirdSend(params).then(res => {
          this.sendLoading = false;
          //NProgress.done();
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.sendFormVisible = false;
          this.getList();
        });
      });
    },
    //查看订单界面
    handleEdit: function(index, row) {
      sessionStorage.setItem("ListtasksDel", JSON.stringify(row));
      this.$router.push({
        name: "ListOFtasksdetail_dd",
        params: { id: row.id }
      });
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
    //切换
    handleClick(tab, event) {
      let _self = this;
      if (tab.label == "全部") {
        _self.Cstatus = null;
      }
      if (tab.label == "待接收") {
        _self.Cstatus = 1;
      }
      if (tab.label == "进行中") {
        _self.Cstatus = 2;
      }
      if (tab.label == "拒绝") {
        _self.Cstatus = 3;
      }
      if (tab.label == "已完成") {
        _self.Cstatus = 4;
      }
      let params = {
        filmId: _self.editForm.id,
        tabletSquareId: _self.editForm.identityId,
        status: this.Cstatus
      };
      byFilmIdAndTabletSquareIdAndStatus(params).then(res => {
        this.xfCstatuslist = res.data.data;
      });
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
    //分页加载2
    handleCurrentChangea(val) {
      this.mockcurrPage = val;
      this.getMockbird();
    },
    //搜索
    search() {
      this.is_search = true;
    },
    //数据列表
    getList() {
      let _self = this;
      let params = {
        // userType: _self.loUserlist.userType,
        // type: _self.loUserlist.type,
        currPage: _self.currPage,
        pageSize: 10
        // userId: _self.loUserlist.id
      };
      mockbirdnewmovieQueryAll(params).then(res => {
        if (res.status == 200) {
          res.data.data.map(val => {
            switch (val.status) {
              case 1:
                val.status = "审核中";
                break;
              case 2:
                val.status = "发布中";
                break;
              case 3:
                val.status = "已完结";
                break;
              default:
                val.status = "异常";
            }
            if (val.picture != null) {
              let arr = val.picture.split(",");
              val.picture = arr[0];
            }
          });

          _self.lists = res.data.data;
          _self.total = res.data.totalCount;
        }
      });
    },
    //云推荐列表
    getMockbird() {
      let platoonVo = {
        bigAreaId: this.citiesAac,
        lineId: this.citiesAbc,
        currPage: this.mockcurrPage,
        pageSize: 5
      };
      mockbirdCloud(platoonVo).then(res => {
        if (res.status == 200) {
          this.listmockbird = res.data.courtyardLines;
          this.mocktotal = res.data.totalCount;
        }
      });
    },
    // 任务影片
    getMovie() {
      let params = {
        currPage: 1,
        pageSize: 999,
        status: 2,
        type: null
      };
      queryAllList(params).then(res => {
        if (res.status == 200) {
          this.MoLists = res.data.data;
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
    _self.getMovie();
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
  /* display: flex; */
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  width: 120px;
  height: 150px;
  /* margin-bottom: 20px; */
  position: absolute;
  right: 80px;
  top: 50px;
}

.user-avator {
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
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
