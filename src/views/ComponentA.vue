<script lang="ts">
import { provide } from 'vue';

export default {
  setup() {
    const myData = 'Hello from parent component';

    provide('myData', myData);

    // ...rest of the component's setup logic
  }
};

</script>