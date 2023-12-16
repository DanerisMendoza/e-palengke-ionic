import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // Example of accessing a getter
    const someGetter = computed(() => store.getters.someGetter);

    return {
      someGetter,
    };
  },
};
