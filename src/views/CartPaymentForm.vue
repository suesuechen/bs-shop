<template>
  <div>
    <div class="my-5 justify-content-center bg">
      <ValidationObserver v-slot="{ passes }">
        <form class="form" @submit.prevent="passes(createOrder)" ref="inputRule">
            <div class="row">
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <ValidationProvider name="username" rules="required">
                    <div slot-scope="{ errors }">
                        <input v-model="form.user.name" id="username" placeholder="請輸入姓名" class="form-control"/>
                        <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                    </ValidationProvider>
                </div>
            </div>
            <div class="col-md-6 mb-3">
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <ValidationProvider name="usertel" rules="required">
              <div slot-scope="{ errors }">
                <input
                  type="tel"
                  id="usertel"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                  class="form-control"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
            </div>
           </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <ValidationProvider name="address" rules="required">
              <div slot-scope="{ errors }">
                <input
                  v-model="form.user.address"
                  id="useraddress"
                  placeholder="請輸入地址"
                  class="form-control"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="useremail">Email</label>
            <ValidationProvider name="email" rules="required" type="email">
              <div slot-scope="{ errors }">
                <input v-model="form.user.email" id="useremail" placeholder="請輸入 Email" class="form-control"/>
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <!-- <div class="form-group">
            <label for="useraddress"></label>
            <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div> -->
          <div class="text-right">
            <button class="btn btn-primary" >送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "CartPaymentForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(url, { data: order }).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.bg {
    padding: 0 30px;
}
.btn-primary {
  font-size: 14px;
  font-weight: 300;
  padding: 10px 20px;
  border-radius: inherit;
}
.text-danger {
    font-size: 12px;
}
</style>