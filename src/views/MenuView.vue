<template>
	<div class="menu-container">
	  <h1>Menu</h1>
  
	  <div class="cart-button-container">
		<router-link to="/cartpage" class="btn btn-primary">
		  <fa :icon="['fas', 'cart-shopping']" />
		</router-link>
	  </div>
  
	  <div id="carouselExampleCaptions" class="carousel slide" data-bs-interval="false">
		<div class="button-row">
		  <slot name="carousel-buttons"></slot> <!-- Slot for carousel buttons -->
		</div>

	</div>
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in carouselSlides"
          :key="index"
          class="carousel-item"
          :class="{ active: activeSlide === index }"
        >
          <div class="carousel-caption-content">
            <div class="row">
              <div
                class="col-md-6 col-lg-4 mb-5"
                v-for="item in slide.items"
                :key="item.id"
              >
                <div class="card">
                  <img
                    :src="item.image"
                    class="card-img-top custom-image"
                    alt="Item Image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <p class="card-text">
                      Price:<fa :icon="['fas', 'indian-rupee-sign']" />
                      {{ item.price }}
                    </p>
                    <div class="quantity-container">
                      <div class="quantity-buttons">
                        <div class="input-group">
                          <button
                            class="btn btn-primary"
                            @click="decrementQuantity(item)"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            class="form-control quantity-input"
                            :id="'quantity-' + item.id"
                            v-model="item.quantity"
                          />
                          <button
                            class="btn btn-primary"
                            @click="incrementQuantity(item)"
                          >
                          +
                          </button>
                        </div>
                      </div>
                      <button
                        class="btn btn-primary"
                        @click="addToCart(item, selectedSlide)"
                        :class="{ 'button-clicked': item.addedToCart }"
                      >
                        {{ item.addedToCart ? "Added" : "Add to Cart" }}
                        <fa
                          v-if="item.addedToCart"
                          :icon="['fas', 'check']"
                          class="tick-icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import MenuItem from "../types/MenuItem";
import CarouselSlide from "../types/CarouselSlide";

export default defineComponent({
  name: "Menu",
  setup() {
    const starters = reactive<MenuItem[]>([]);
    const mainDishes = reactive<MenuItem[]>([]);
    const desserts = reactive<MenuItem[]>([]);
    const drinks = reactive<MenuItem[]>([]);

    const activeSlide = ref(0);
    const selectedSlide = ref(0);

    const carouselButtons = [
      { label: "Starters", icon: "drumstick-bite" },
      { label: "Main Dishes", icon: "bowl-food" },
      { label: "Desserts", icon: "ice-cream" },
      { label: "Drinks", icon: "wine-glass-empty" },
    ];

    const carouselSlides: CarouselSlide[] = [
      { label: "Starters", items: starters },
      { label: "MainDishes", items: mainDishes },
      { label: "Desserts", items: desserts },
      { label: "Drinks", items: drinks },
    ];

    const fetchData = async () => {
      try {
        const endpoints = ["starters", "main-dishes", "desserts", "drinks"];
        const itemLists = [starters, mainDishes, desserts, drinks];

        for (let i = 0; i < endpoints.length; i++) {
          const response = await axios.get<MenuItem[]>(
            `http://localhost:3001/${endpoints[i]}`
          );
          itemLists[i].splice(0, itemLists[i].length, ...response.data);

          itemLists[i].forEach((item) => {
            item.addedToCart = false;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const incrementQuantity = (item: MenuItem) => {
      item.quantity++;
      item.addedToCart = false;
    };

    const decrementQuantity = (item: MenuItem) => {
      if (item.quantity > 0) {
        item.quantity--;
        item.addedToCart = false;
      }
    };

    const selectSlide = (index: number) => {
      activeSlide.value = index;
      selectedSlide.value = index;
    };

    const store = useStore();

    const addToCart = (item: MenuItem, slideIndex: number) => {
      const slideLabel = carouselSlides[slideIndex].label;
      if (item.quantity > 0) {
        store.dispatch("addToCart", { item, slideLabel });
        item.addedToCart = true;
      }
    };

    onMounted(fetchData);

    return {
      starters,
      mainDishes,
      desserts,
      drinks,
      carouselButtons,
      carouselSlides,
      activeSlide,
      selectedSlide,
      incrementQuantity,
      decrementQuantity,
      selectSlide,
      addToCart,
    };
  },
});
</script>

<style scoped>
h1 {
  color: aqua;
}
.menu-container {
  position: relative;
}

.cart-button-container {
  position: absolute;
  top: 0;
  right: 200px;
  margin: 10px;
}

.btn.active {
  background-color: green;
  color: white;
}
.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-weight: bold;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 5px 0;
}

.icon {
  font-size: 24px;
}
.custom-image {
  width: 290px;
  height: 100px;
}
.carousel-item {
  margin-left: 300px;
  width: 65%;
}
.col-md-6,
.col-lg-4 {
  flex-basis: 25%;
  max-width: 25%;
}
.quantity-input {
  width: 40px;
  text-align: center;
  margin: 0 5px;
}

.quantity-input {
  width: 20px;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.custom-button-width {
  width: 310px;
  background-color: lightcyan;
  color: rgb(9, 3, 194);
}
.button-row {
  display: flex;

  margin-left: 300px;
  margin-right: 300px;
}

.carousel-inner {
  margin-top: 20px;
}
.btn-success {
  background-color: green;
  color: white;
}

.button-clicked {
  background-color: green;
  color: white;
}
</style>
