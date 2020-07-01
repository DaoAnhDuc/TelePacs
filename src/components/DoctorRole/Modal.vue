<template>
  <v-row justify="center">
    <v-dialog v-model="openModal" persistent :max-width="widthModal">
      <Info v-if="typeModal === 'Info'" />
      <Add v-if="typeModal === 'Add'" />
      <Edit v-if="typeModal === 'Edit'" />
      <Delete v-if="typeModal === 'Delete'" />
      <Role v-if="typeModal === 'Role'" /> 
    </v-dialog>
  </v-row>
</template>

<script>
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import Info from "./Info";
import Role from './Role'
import { mapState } from "vuex";
export default {
  props: {
    typeModal: String,
    widthModal: Number,
  },
  components: {
    Add,
    Edit,
    Delete,
    Info,
    Role
  },
  computed: {
    ...mapState("doctorRole", ["openModal"]),
  },
  methods: {}
};
</script>

<style>
.btnClose{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>