<template>
  <div>
    name: {{ name || "--" }}
    <br />
    <!-- @input是你在输入框中实时输入就是实时触发这个方法 -->
    <!-- @change事件是在input标签失去焦点的时候才会触发这个方法 -->
    <input :value="name" @change="handleChange" />  
    <br />
    <br />
    <div @click="handleDivClick">
      <button @click="handleClick">重置成功</button>&nbsp;&nbsp;&nbsp;
      <button @click.stop="handleClick">重置失败</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Child",
  props: {
    name: String
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handleDivClick() {
      this.$emit("change", "");
    },
    handleClick(e) {
      // 都会失败
      //e.stopPropagation();
      alert("阻止冒泡")
    }
  }
};
</script>