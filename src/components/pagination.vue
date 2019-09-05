<template>
  <div>
    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disable': !pagination.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getList(pagination.current_page-1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active': !pagination.current_page}"
        >
          <a class="page-link" href="#" @click.prevent="getList(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            :class="{'disable': !pagination.has_next}"
            @click.prevent="getList(pagination.current_page+1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Page",
  props: {
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getList(page) {
      console.log(123);
      this.$emit("getList", page);
    }
  }
};
</script>