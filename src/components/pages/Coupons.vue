<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新優惠券</button>
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col" width="120">名稱</th>
            <th scope="col" width="120">優惠碼</th>
            <th scope="col" width="150">到期日</th>
            <th scope="col" width="120">折扣比</th>
            <th scope="col" width="120">是否啟用</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.due_date }}</td>
            <td>{{ item.percent }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--  Modal -->
      <div
        class="modal fade"
        id="couponModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>code</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入標題"
                      v-model="tempCoupon.title"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="due_date">due_date</label>
                      <input
                        type="text"
                        class="form-control"
                        id="due_date"
                        placeholder="due_date"
                        v-model="tempCoupon.due_date"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="code">code</label>
                      <input
                        type="code"
                        class="form-control"
                        id="code"
                        placeholder="code"
                        v-model="tempCoupon.code"
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="percent">百分比</label>
                      <input
                        type="number"
                        class="form-control"
                        id="percent"
                        placeholder="百分比"
                        v-model="tempCoupon.percent"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                        v-model="tempCoupon.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "Coupons",
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isLoading: false,
      isNew: false
    };
  },
  methods: {
    getList(page) {
      this.getTable(page);
    },
    getTable(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      const vm = this;
      if (vm.isNew) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = Object.assign({}, item);
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        console.log(response);
        vm.isLoading = false;
        if (response.data.success) {
          console.log("OK");
        } else {
          console.log("新增失敗");
        }
        vm.getTable();
        $("#couponModal").modal("hide");
      });
    }
  },
  created() {
    this.getTable();
  }
};
</script>