<template>
  <div>
    login
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      setTimeout(() => {
        localStorage.setItem("name", "xxx");
        this.$router.push("/center");
      }, 0);
    },
  },
};
</script>
