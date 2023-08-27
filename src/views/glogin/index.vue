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
      <button @click="handleLoginWithGoogleClick">Login with Google</button>
      <br />
      <ul>
        <li>hasFailed: {{ auth.hasFailed }}</li>
        <li>isLoading: {{ auth.isLoading }}</li>
        <li>error: {{ auth.error }}</li>
      </ul>

      <pre>
        {{ auth.user }}
    </pre
      >
    </div>
    <button @click="handleLogoutClick">Logout</button>
  </div>
</template>

<style module>
.wrapper {
  padding: 20px;
}
</style>
