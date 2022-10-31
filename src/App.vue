<template>
  <nav class="h-50px bg-light-m">
    <router-link to="/" class="text-light fs-4">選單</router-link> |
    <router-link to="/chatroom" class="text-light fs-4">聊天室</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
  @import "@/assets/stylesheets/all.scss";
</style>
<style lang="scss">
.bg-light-m {
  background-color: rgb(112, 1, 1);
}
.h-50px{
  height: 50px;
  line-height: 50px;
}
</style>
