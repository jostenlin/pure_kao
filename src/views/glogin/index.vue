<script setup lang="ts">
defineOptions({
  name: "glogin"
});
import { ref, onMounted } from "vue";
import firebaseConfig from "@/services/firebaseConfig";

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth, signOut } from "firebase/auth";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

const user = ref(null);
const isSignedIn = ref(false);

const uiConfig = {
  signInFlow: "redirect",
  signinSuccessUrl: "http://localhost:8080/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult(authResult: any) {
      user.value = authResult.user.displayName;
      console.log(authResult);
      isSignedIn.value = true;
      console.log("Signed in by user " + user.value);
      // so it doesn't refresh the page
      return false;
    },
    uiShown() {
      // The widget is rendered.
      // Hide the loader.
      const loader = document.getElementById("loader");
      if (loader) {
        loader.style.display = "none";
      }
    }
  }
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

onMounted(() => {
  ui.start("#firebaseui-auth-container", uiConfig);
});

const handleSignOut = async () => {
  try {
    await signOut(auth);
    user.value = null;
    isSignedIn.value = false;
    console.log("Signed out");
    ui.start("#firebaseui-auth-container", uiConfig);
  } catch (error) {
    // An error happened.
    console.log(error);
  }
};
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 v-if="user">Signed In User: {{ user }}</h2>
    <div id="firebaseui-auth-container" />
    <div id="loader">Loading...</div>
    <br />
    <div v-if="isSignedIn">
      <button @click="handleSignOut">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
