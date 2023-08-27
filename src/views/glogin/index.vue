<script setup lang="ts">
defineOptions({
  name: "glogin"
});
import { useAuth } from "@/composables/auth/auth.composable";
import { onBeforeMount, onUnmounted } from "vue";

const auth = useAuth();

onBeforeMount(() => {
  auth.watchAuthState();
});

onUnmounted(() => {
  auth.unwatchAuthState();
});

const handleLoginWithGoogleClick = () => {
  auth.loginInWithGoogle();
};

const handleLogoutClick = () => auth.logout();
</script>

<template>
  <div :class="$style.wrapper">
    <div>
      <el-button type="danger" @click="handleLogoutClick">Logout</el-button>
      <el-button type="primary" @click="handleLoginWithGoogleClick">
        Login with Google
      </el-button>
      <br />
      <ul>
        <li>hasFailed: {{ auth.hasFailed }}</li>
        <li>isLoading: {{ auth.isLoading }}</li>
        <li>error: {{ auth.error }}</li>
      </ul>

      <pre>
        {{ auth.user }}
      </pre>
    </div>
  </div>
</template>

<style module>
.wrapper {
  padding: 20px;
}
</style>
