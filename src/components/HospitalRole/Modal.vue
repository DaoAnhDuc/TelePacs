<template>
  <v-dialog v-model="openModal" persistent :max-width="maxWidth">
    <Add v-if="typeModal === 'Add'"/>
    <Edit v-if="typeModal === 'Edit'"/>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import Add from './Add';
import Edit from './Edit'
export default {
  props: {
    typeModal: String,
    maxWidth: Number,
  },
  components: {
    Add,
    Edit,
  },
  computed: {
    ...mapState("hospitalRole", ["openModal"])
  },
  methods: {}
};
</script>

<style>
.btnClose {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>