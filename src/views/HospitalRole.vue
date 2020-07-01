<template>
  <div class="wrapper-dashboard mt-5">
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="10" md="3" class="wrapper-search">
            <v-text-field v-model="search.Keyword" dense solo label="Tìm kiếm Họ tên và Email"></v-text-field>
            <v-btn class="mx-2" fab dark bottom color="#00838f" small @click="onSearch">
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" md="2" class="btnAdd" v-if="getIsAdmin">
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn v-on="on" class="mx-2" fab dark bottom small color="#00838f" @click="onAdd">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </template>
              <span>Phân quyền bác sĩ mới</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="getterDoctorAndRole"
      hide-default-footer
      :page.sync="search.PageIndex"
      :items-per-page="search.PageSize"
      class="elevation-1"
      @page-count="search.PageCount = $event"
    >
      <template v-slot:item.tool="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn text icon @click="onEdit(item)" v-on="on" class="mt-2 btnTool">
              <v-icon dark>edit</v-icon>
            </v-btn>
          </template>
          <span>Sửa</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        color="cyan darken-3"
        v-model="search.PageIndex"
        @input="changePageIndex"
        :total-visible="7"
        :length="search.PageCount"
      ></v-pagination>
    </div>
    <div>
      <Modal :typeModal="typeModal" :maxWidth="maxWidth" />
    </div>
  </div>
</template>
<script>
import Modal from "../components/HospitalRole/Modal";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    Modal
  },
  data() {
    return {
      typeModal: "",
      maxWidth: 400,
      headers: [
        {
          text: "Tên bác sĩ",
          align: "start",
          value: "name"
        },
        {
          text: "Bệnh viện",
          align: "start",
          value: "hospitals"
        },
        {
          text: "",
          align: "start",
          value: "tool"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("hospitalRole", ["getterDoctorAndRole"]),
    ...mapGetters("user", ["getIsAdmin"]),
    ...mapState("user", ["user"]),
    ...mapState("hospitalRole", ["openModal", "search"])
  },

  methods: {
    ...mapActions("hospitalRole", [
      "getListDr_HospitalRole",
      "getRoleDoctorById",
      "getDrNotHospitalRole"
    ]),
    changePageIndex(page) {
      this.search.PageIndex = page;
      this.$store.state.ui.loadingPage = true;
      this.getListDr_HospitalRole(this.search).then(() => {
        this.$store.state.ui.loadingPage = false;
      });
    },
    onAdd() {
      this.$store.state.ui.loadingPage = true;
      this.getDrNotHospitalRole().then(() => {
        this.$store.state.ui.loadingPage = false;
        this.typeModal = "Add";
        this.maxWidth = 600;
        this.$store.state.hospitalRole.openModal = true;
      });
    },
    onSearch(){
    this.getListDr_HospitalRole(this.search);  
    },
    onEdit(doctor) {
      console.log("onEdit -> id", doctor.id, doctor.name);
      this.getRoleDoctorById(doctor.id).then(() => {
        this.typeModal = "Edit";
        this.maxWidth = 600;
        this.$store.state.hospitalRole.openModal = true;
      });
    }
  },
  mounted() {
    this.getListDr_HospitalRole(this.search);
  },
  created() {
    this.getListDr_HospitalRole(this.search);
  }
};
</script>

<style lang="scss">
.btnAdd {
  display: flex;
  justify-content: center;
}
.wrapper-dashboard {
  margin: 0 15px;
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
        color: #1d3e73;
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