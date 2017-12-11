<template>
  <div class="error">
    <div class="box">
      <div class="svg">
        <img src="./img/error.svg" alt="">
      </div>
      <h1>403</h1>
      <h2>抱歉，您无权限访问该页面</h2>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'error',
};
</script>

<style lang="less" scoped>
  .error {
    padding-top: 200px;
    .box {
      width: 600px;
      height: 600px;
      margin: 0px auto;
      .svg {
        width: 227px;
        height: 269px;
      }
      h1 {
        font-size: 60px;
        margin: -250px 0px 0px 350px;
      }
      h2 {
        margin: 0px 0px 0px 350px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
</style>




