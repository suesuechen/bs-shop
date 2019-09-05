<template>
  <div class="row">
    <div class="col-lg-5" >
        <div class="my-5 row justify-content-center">
        
        <table class="table">
          <thead>
            
          </thead>
          <tbody v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <font-awesome-icon icon="times" />
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon" style="font-size:12px">已套用優惠券</div>
              </td>
              <td class="align-middle">數量 {{ item.qty }}</td>
              <td class="align-middle text-right">NT$ {{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">NT$ {{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">NT$ {{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
        <div class="text-right">
            <button class="btn btn-primary" @click="goShop">繼續選購</button>
          </div>
    </div>
    </div>
    <div class="col-lg-7" style="background-color:#949c7c;" >
        <CartPaymentForm/>
    </div>
    
  </div>
</template>
<script>
import CartPaymentForm from '@/views/CartPaymentForm.vue'
export default {
  name: "Cart",
  components: {
      CartPaymentForm
      },
  props: {
    // cart: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // }
  },
  created() {
    console.log("this.cart");
    this.getCart();
  },
  data() {
    return {
      coupon_code: "",
      cart: '',
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        console.log("getCart");
        console.log(vm.cart);
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: this.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then(() => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    goShop() {
      this.$router.push('/shop');
    }

  }
};
</script>
<style lang="scss" scoped>
$greenLight: #949c7c;
.row {
    margin: 0;
}
.table {
    width: 80%;
    th {
        border: none;
    }    
}
</style>