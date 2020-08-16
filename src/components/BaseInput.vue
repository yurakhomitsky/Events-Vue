<template>
	<div>
		<label v-if="label">{{ label }}</label>
		<input  :value="value" v-bind="$attrs" @input="updateValue" v-on="listeners">
	</div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin';
export default {
  // inheritAttrs: false, // in order to prevent inherit attributes to parent div
  // props: {
  //   label: {
  //     type: String,
  //     default: '',
  //   },
  //   value: [String, Number],
  // },
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style scoped>
</style>
