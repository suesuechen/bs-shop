<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立訂單</button>
      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col" width="120">購買時間</th>
            <th scope="col" width="120">購買人</th>
            <th scope="col" width="150">Email</th>
            <th scope="col">購買清單</th>
            <th scope="col" width="120">應負金額</th>
            <th scope="col" width="120">付款狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.create_at }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.email }}</td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td>
              <span v-if="item.is_paid" class="text-success">付款完成</span>
              <span v-else>未付款</span>
            </td>
            <td>
              <!-- <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false
    };
  },
  methods: {
    getList(page) {
      this.getTable(page);
    },
    getTable(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.isLoading = false;
        if (response.data.success) {
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
        }
      });
    }
  },
  created() {
    this.getTable();
  }
};
</script>