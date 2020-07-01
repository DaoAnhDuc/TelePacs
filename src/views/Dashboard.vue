<template>
  <div class="wrapper-dashboard mt-5">
    <div class="my-2" v-if="getIsAdmin">
      <v-row>
        <v-col cols="12" md="1" style="display: flex">
          <v-btn small color="primary" class="mr-2" router to="/HospitalRole">Phân quyền bệnh viện</v-btn>
          <v-btn small color="primary" router to="/DoctorRole">Phân quyền bác sĩ</v-btn>
        </v-col>
      </v-row>
    </div>
    <h3>Danh sách bệnh viện</h3>
    <v-data-table
      :headers="headers"
      :items="getterHospitals"
      hide-default-footer
      class="elevation-3 table-doctor mt-2"
    >
      <template v-slot:item.uri="{ item }">
        <a :href="item.uri+params.router+ encodeURIComponent(params.ecn)" target="_blank">Truy cập</a>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "STT",
          align: "start",
          value: "stt"
        },
        {
          text: "Tên bệnh viện",
          align: "start",
          value: "name"
        },
        {
          text: "Địa chỉ",
          align: "start",
          value: "locate"
        },
        {
          text: "Đường dẫn truy cập",
          sortable:false,
          value: "uri"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("listHospital", ["getterHospitals"]),
    ...mapGetters("user", ["getIsAdmin"]),
    ...mapState("user", ["user"]),
    ...mapState("listHospital", ["params"])
  },

  methods: {
    ...mapActions("listHospital", ["getListHospital"])
  },
  mounted() {
    console.log("mounted -> mounted");
    this.getListHospital(this.user.id);
  }
};
</script>

<style lang="scss">
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
    td {
      font-size: 16px;
      font-weight: 400;
    }
    .v-data-table__mobile-row {
      height: auto;
      min-height: 34px;
    }
    .v-data-table__mobile-row {
      align-items: center;
      display: flex;
      .v-data-table__mobile-row__header {
        // width: 150px;
        font-size: 15px;
      }
      .v-data-table__mobile-row__cell {
        // width: calc(100% - 120px);
        font-size: 15px;
        padding-left: 10px;
        text-align: right;
      }
      .v-data-table td,
      .v-data-table th {
        padding: 0px;
      }
    }
    .v-data-table-header {
      th {
        color: #1d3e73;
        font-size: 16px !important;
      }
    }
  }
  .theme--dark.v-data-table {
    td {
      font-size: 16px;
    }
    .v-data-table__mobile-row__header {
      font-size: 14px;
    }
    .v-data-table__mobile-row__cell {
      font-size: 14px;
      margin-left: 10px;
    }
    .v-data-table-header {
      th {
        color: #fff700;
        font-size: 16px;
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