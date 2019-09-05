<template>
  <div>
    <!-- banner -->
    <div class="text-white banner">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://img.loccitane.com/ocms/img/lib/_2013_StaticContent/OCC_b4ad5d3667d044369619e0de03582a94.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://img.loccitane.com/ocms/img/lib/_2013_StaticContent/OCC_4cc96e6c07924fb2b33fb63ca897828f.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <!-- prd -->
    <div class="container marketing">
      <div class="row">
        <div class="col-lg-3" v-for="item in products" :key="item.id">
          <img :src="item.imageUrl" width="100%" />
          <p>
            {{ item.title }}
            <br />
            {{ item.unit }}
          </p>
          <p>NT$ {{ item.price}}</p>
          <p>
            <button class="btn btn-primary" role="button" @click="getProduct(item.id)">放入購物車</button>
          </p>
        </div>
        <!-- /.col-lg-4 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- footer -->
   
  </div>
</template>
<script>

export default {
  name: "ProductsCard",
  components: {},
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      cart: {},
      coupon_code: "",
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push({
        name: "ProductDetail",
        params: { prdId: id }
      });
      // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      // vm.status.loadingItem = id;
      // this.$http.get(url).then(response => {
      //   vm.product = response.data.product;
      //   $("#productModal").modal("show");
      //   vm.status.loadingItem = "";
      // });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
<style lang="scss" scope>
$primaryColor: #38470b;
$fontColor: #001022;
$greenLight: #949c7c;
a {
  color: $fontColor;
}
.marketing {
  margin-top: 50px;
  .col-lg-3 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
}
.btn-primary {
  font-size: 14px;
  font-weight: 300;
  padding: 10px 20px;
  border-radius: inherit;
}
</style>