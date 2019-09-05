<template>
  <div>
    <div>
      <img
        src="https://img.loccitane.com/ocms/img/OCC/backgrounds/ingredientsV2/CO_Co_Aromachologie.jpg"
        width="100%"
      />
    </div>
    <div class="row bg">
      <div class="col">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="col-6">
        <div style="margin-top:-200px;">
          <img :src="product.imageUrl" width="100%" />
        </div>
      </div>
      <div class="col">
        <div class="orderForm">
          <div>
            <ul>
              <li>{{ product.unit }}</li>
              <li>
                <select class="selectpicker">
                  <option :value="num" v-for="num in 10" :key="num">{{ num }} 件</option>
                </select>
              </li>
            </ul>
            <div class="text-center price">NT$ {{ product.price }}</div>
            <button class="btn btn-secondary" role="button" @click="addtoCart(product.id)">
                <font-awesome-icon icon="spinner" v-if="product.id === status.loadingItem" />
                放入購物車
            </button>
            <p>單筆消費滿2000元免運費！</p>
            <p>店鋪庫存查詢</p>
            <p>加入我的最愛清單</p>
            <p>分享至個人社群</p>
            <p>{{ product.content }}</p>
          </div>
        </div>
      </div>
    </div>
     <!-- Modal -->
    <div
      class="modal fade"
      id="openModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">已加入購物車</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" role="button"  data-dismiss="modal">ＯＫ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "ProductDetail",
  data() {
    return {
      isLoading: false,
      prdId: "",
      product: {},
      cart: {},
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.prdId}`;
      vm.status.loadingItem = vm.prdId;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        $("#openModal").modal("show");
      });
    }
  },
  created() {
    const vm = this;
    vm.prdId = vm.$route.params.prdId;
    this.getProduct();
  }
};
</script>
<style lang="scss" scoped>
$primaryColor: #38470b;
$greenLight: #949c7c;
.bg {
  padding: 0 25px;
  letter-spacing: 0.5px;
}
.orderForm {
  background-color: #fff;
  padding: 6px;
  margin-top: -200px;
  & > div {
    border: solid 3px $greenLight;
    padding: 20px;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    padding: 10px;
    border-bottom: #999 1px solid;
    list-style: none;
  }
  .price {
    padding: 30px 0;
    font-size: 26px;
    font-weight: 800;
  }
  p {
    margin: 5px 0;
    font-size: 12px;
  }
  .btn-secondary {
    color: #fff;
    background-color: $primaryColor;
    border-color: $primaryColor;
    font-size: 14px;
    font-weight: 300;
    padding: 10px 20px;
    width: 100%;
    border-radius: inherit;
    margin-bottom: 20px;
  }
  .selectpicker {
      border: none;
      width: 100%;
      background-color: #fff;
      outline: none;
  }
}
</style>