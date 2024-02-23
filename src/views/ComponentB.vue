<script lang="ts">
import { inject, onMounted } from 'vue';

export default {
  setup() {
    const myData = inject('myData');

    onMounted(() => {
      console.log(myData); // Print the data to the console
    });

    // ...rest of the component's setup logic
  }
};
</script>