<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
:root {
  --grey-2: #4f4f4f;
  --grey-3: #828282;
  --grey-4: #b3b3b3;
  --secondary: #f2f2f2;
  --old-price: #888888;
  --attention: #eb5757;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.container {
  max-width: 1528px;
  padding: 0 20px;
  margin: 0 auto;
}
</style>
