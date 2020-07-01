<template>
  <div class="wrapper-doctor">
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="10" md="3" class="wrapper-search">
              <v-text-field v-model="key" dense solo label="Tìm kiếm Họ tên và Email"></v-text-field>
              <v-btn class="mx-2" fab dark bottom color="#00838f" small @click="onSearch">
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2" md="2" class="btnAdd">
              <!-- <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-btn
                    v-on="on"
                    class="mx-2"
                    fab
                    dark
                    bottom
                    small
                    color="#00838f"
                    @click="addDoctor"
                  >
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </template>
                <span>Thêm mới bác sĩ</span>
              </v-tooltip> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="doctors"
      :page.sync="pageIndex"
      :items-per-page="pageSize"
      hide-default-footer
      class="elevation-3 table-doctor"
      @page-count="getPageCount = $event"
    >
      <template v-slot:item.doB="{ item }">{{formatDate(item.doB.substr(0,10))}}</template>
      <template v-slot:item.tool="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn text icon @click="showInfoDoctor(item.id)" v-on="on" class="mt-2 btnTool">
              <v-icon dark>fas fa-info-circle</v-icon>
            </v-btn>
          </template>
          <span>Chi tiết</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn text icon @click="editDoctor(item.id)" v-on="on" class="mt-2 btnTool">
              <v-icon dark>edit</v-icon>
            </v-btn>
          </template>
          <span>Sửa</span>
        </v-tooltip>
        <!-- <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn text icon @click="deleteDoctor(item.id)" v-on="on" class="mt-2 btnTool">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </template>
          <span>Xóa</span>
        </v-tooltip> -->
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn text icon @click="roleDoctor(item.id)" v-on="on" class="mt-2 btnTool">
              <v-icon small dark>fas fa-user-tag</v-icon>
            </v-btn>
          </template>
          <span>Cấp quyền</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination color="cyan darken-3"
        v-model="getPageIndex"
        @input="changePageIndex"
        :total-visible="7"
        :length="getPageCount"
      ></v-pagination>
    </div>
    <div class="text-center display-none">
      <Modal :typeModal="typeModal" :widthModal="widthModal" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Modal from "../components/DoctorRole/Modal";
export default {
  created() {
    console.log("CREATED");
  },
  components: { Modal },
  data() {
    return {
      headers: [
        {
          text: "Họ và tên",
          align: "start",
          value: "name"
        },
        { text: "Giới tính", value: "gender" },
        { text: "Địa chỉ", value: "address" },
        { text: "Email", value: "email" },
        { text: "Ngày sinh", value: "doB" },
        { text: "Số điện thoại", value: "phoneNumber" },
        { text: "", value: "tool", sortable: false }
      ],
      valid: false,
      key: "",
      typeModal: "",
      widthModal: 400
    };
  },
  computed: {
    ...mapState("doctorRole", ["doctors"]),
    ...mapGetters("doctorRole", ["pageIndex", "pageSize", "pageCount", "listRole"]),
    getPageIndex: {
      set(pageIndex) {
        return pageIndex;
      },
      get() {
        return this.pageIndex;
      }
    },
    getPageCount: {
      set(pageCount) {
        return pageCount;
      },
      get() {
        return this.pageCount;
      }
    }
  },
  mounted() {
    let search = {
      Keyword: this.key,
      PageIndex: this.pageIndex,
      PageSize: this.pageSize
    };
    this.getDoctorsAction(search);
  },
  methods: {
    ...mapActions("doctorRole", [
      "getDoctorsAction",
      "destroyComponentAction",
      "getListRoleAction",
      "getDoctorByIdAction"
    ]),
    changePageIndex(page) {
      this.$store.state.ui.loadingPage = true;
      this.getDoctorsAction({
        Keyword: this.key,
        PageIndex: page,
        PageSize: this.pageSize
      }).then(() => {
        this.$store.state.ui.loadingPage = false;
      });
    },
    onSearch() {
      this.$store.state.ui.loadingPage = true;
      this.getDoctorsAction({
        Keyword: this.key,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize
      }).then(() => {
        this.$store.state.ui.loadingPage = false;
      });
    },
    formatDate(date) {
      return (
        date.substr(8, 2) + "/" + date.substr(5, 2) + "/" + date.substr(0, 4)
      );
    },
    showInfoDoctor(id) {
      this.typeModal = "Info";
      this.widthModal = 400;
      this.$store.state.ui.loadingPage = true;
      this.getDoctorByIdAction(id).then(() => {
        this.$store.state.ui.loadingPage = false;
        this.$store.state.doctorRole.openModal = true;
      });
    },
    editDoctor(id) {
      this.typeModal = "Edit";
      this.widthModal = 650;
      this.$store.state.ui.loadingPage = true;
      this.getDoctorByIdAction(id).then(() => {
        this.$store.state.ui.loadingPage = false;
        this.$store.state.doctorRole.openModal = true;
      });
    },
    roleDoctor(id) {
      this.$store.state.ui.loadingPage = true;
      this.getListRoleAction(id).then(() => {
        this.typeModal = "Role";
        this.widthModal = 500;
        this.getDoctorByIdAction(id).then(() => {
          this.$store.state.ui.loadingPage = false;
          this.$store.state.doctorRole.openModal = true;
        });
      });
    },
    addDoctor() {
      this.typeModal = "Add";
      this.widthModal = 650;
      this.$store.state.doctorRole.openModal = true;
    },
    deleteDoctor(id) {
      this.typeModal = "Delete";
      this.widthModal = 450;
      this.$store.state.ui.loadingPage = true;
      this.getDoctorByIdAction(id).then(() => {
        this.$store.state.ui.loadingPage = false;
        this.$store.state.doctorRole.openModal = true;
      });
    }
  },
  destroyed() {
    // this.destroyComponentAction();
  }
};
</script>
<style  lang="scss">
.wrapper-doctor {
  margin: 0 15px;
  .btnAdd {
    display: flex;
    justify-content: center;
  }
  .wrapper-search {
    display: flex;
    justify-content: center;
    .v-text-field__details {
      display: none;
    }
  }
  .theme--light.v-data-table {
    .v-data-table-header {
      th {
        color: orangered;
        font-size: 0.9rem;
      }
    }
  }
  .theme--dark.v-data-table {
    .v-data-table-header {
      th {
        color: #fff700;
        font-size: 0.9rem;
      }
    }
    tbody tr:hover {
      background: #000;
    }
  }
  .theme--light.v-btn.btnTool {
    color: #00838f;
  }
  .theme--dark.v-btn.btnTool {
    color: #fffb7e;
  }
}
</style>
