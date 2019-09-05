<template>
  <div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver v-slot="{ passes }">
        <form class="form" @submit.prevent="passes(createOrder)" ref="inputRule">
          <div class="form-group">
            <label for="useremail">Email</label>
            <ValidationProvider name="email" rules="required" type="email">
              <div slot-scope="{ errors }">
                <input v-model="form.user.email" id="useremail" placeholder="請輸入 Email" />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <ValidationProvider name="username" rules="required">
              <div slot-scope="{ errors }">
                <input v-model="form.user.name" id="username" placeholder="請輸入地址" />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control"
              id="usertel"
              v-model="form.user.tel"
              placeholder="請輸入電話"
            />
          </div>
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <ValidationProvider name="address" rules="required">
              <div slot-scope="{ errors }">
                <input v-model="form.user.address" id="useraddress" placeholder="請輸入地址" />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "PaymentForm",
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