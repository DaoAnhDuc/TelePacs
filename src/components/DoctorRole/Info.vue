
<template>
  <v-card style="position: relative">
    <v-card-title class="headline">{{doctor.name}}</v-card-title>
    <v-card-text>
      <p class="fontsize12">
        Giới tính:
        <span>{{doctor.gender}}</span>
      </p>
      <p class="fontsize12">
        Địa chỉ:
        <span>{{doctor.address}}</span>
      </p>
      <p class="fontsize12">
        Email:
        <span>{{doctor.email}}</span>
      </p>
      <p class="fontsize12">
        Ngày sinh:
        <span>{{doctor.doB}}</span>
      </p>
      <p class="fontsize12">
        Số điện thoại:
        <span>{{doctor.phoneNumber}}</span>
      </p>
      <p class="fontsize12">
        CT:
        <span>{{doctor.ct}}</span>
      </p>
      <p class="fontsize12">
        DX:
        <span>{{doctor.dx}}</span>
      </p>
      <p class="fontsize12">
        EO:
        <span>{{doctor.eo}}</span>
      </p>
      <p class="fontsize12">
        MAMO:
        <span>{{doctor.mamo}}</span>
      </p>
      <p class="fontsize12">
        MRI:
        <span>{{doctor.mri}}</span>
      </p>
      <p class="fontsize12">
        PET:
        <span>{{doctor.pet}}</span>
      </p>
      <p class="fontsize12">
        US:
        <span>{{doctor.us}}</span>
      </p>
    </v-card-text>
    <v-btn class="mx-2 btnClose" fab dark icon small color="error" @click="onCloseForm">
      <v-icon dark>fas fa-times</v-icon>
    </v-btn>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("doctorRole", ["openDialogInfo", "doctor"])
  },
  methods: {
    onCloseForm() {
      this.$store.state.doctorRole.openModal = false;
    }
  }
};
</script>
<style lang="scss">
.fontsize12 {
  font-size: 1rem;
}
.btnClose {
  position: absolute;
  top: 10px;
  right: 10px;
}
.theme--dark.v-card {
  background-color: #194673;
  color: #ffffff;
  .headline {
    color: yellow;
  }
}
</style>