<template>
  <div>
    <div class="container-fluid">
      <div class="top"></div>
      <header class="blog-header py-3">
        <div class="row flex-nowrap justify-content-between align-items-center" style="width:100%">
          <div class="col-4 pt-1 text-center">
            <router-link class="text-muted" to="/admin">
              <font-awesome-icon icon="door-open"/> &nbsp;後台
            </router-link>
          </div>
          <div class="col-4 text-center">
            <router-link class="blog-header-logo" to="/shop">SAMPLE</router-link>
          </div>
          <div class="col-4 text-center align-items-center">
            <router-link class="text-muted" to="/cart">
              <font-awesome-icon icon="shopping-bag" /> &nbsp; 前往結帳 
            </router-link>
          </div>
        </div>
        <div class="nav-scroller py-1 mb-2">
          <nav class="text-center" style="width:40vw;margin:0 auto;">
            <a class="p-2 text-muted" href="#">洗髮精</a>
            <a class="p-2 text-muted" href="#">臉部保養</a>
            <a class="p-2 text-muted" href="#">身體保養</a>
          </nav>
        </div>
      </header>
      <div class="msgbar text-center">購物滿 2,000 享免運 ! 單筆消費折扣後滿NT.2,200, 加贈小禮包</div>
      <div class="container">
        <router-view />
      </div>
    </div>
    <footer>
      <p class="float-right">
        <a href="#">sue</a>
      </p>
      <p>
        &copy; 2017-2019 Company, Inc. &middot;
        <a href="#">Privacy</a> &middot;
        <a href="#">Terms</a>
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Layout"
};
</script>
<style lang="scss" scoped>
$primaryColor: #38470b;
$fontColor: #343434;
$greenLight: #949c7c;
a {
  color: $fontColor;
}
.row {
    margin: 0;
}
.text-muted {
    font-size: 12.5px;
  color: $fontColor !important;
}
.container-fluid {
  margin: 0;
  padding: 0;
}
footer {
  background-color: $greenLight;
  p {
      margin: 0;
      line-height: 25px;
      font-size: 12px;
  }
}
a:hover {
  text-decoration: none;
}
.top {
  width: 100%;
  margin: 0;
  height: 0.5rem;
  background-color: $primaryColor;
}
.blog-header-logo {
  font-size: 40px;
  font-weight: bold;
  color: $fontColor;
}
.msgbar {
  background-color: $primaryColor;
  width: 100%;
  margin: 0;
  height: 30px;
  line-height: 28px;
  color: #fff;
}
.banner {
  background-position: center top;
  background-size: cover;
  background-image: url("https://img.loccitane.com/ocms/img/lib/_2013_StaticContent/OCC_b4ad5d3667d044369619e0de03582a94.jpg");
}

.marketing {
  margin-top: 50px;
  .col-lg-3 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
}
.btn-secondary {
  color: #fff;
  background-color: $primaryColor;
  border-color: $primaryColor;
  font-size: 14px;
  font-weight: 300;
  padding: 10px 20px;
  border-radius: inherit;
}
</style>