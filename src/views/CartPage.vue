<template>
  <div class="cart-container">
    <h1>Cart</h1>
    <div class="cart-button-container">
      <router-link to="/menubar" class="btn btn-primary"
        >Back to Menu</router-link
      >
      |
      <router-link to="/" class="btn btn-primary" 
        ><fa :icon="['fas', 'home']"
      /></router-link>
    </div>
    <div v-if="totalItems === 0">
      <p>Your cart is empty.</p>
    </div>

    <div v-else>
      <div class="category-container">
        <div class="category" v-if="starters.length > 0">
          <h2>Starters</h2>
          <div class="card-deck">
            <div
              v-for="item in starters"
              :key="item.id"
              class="card mb-3 starter-card"
            >
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                  Price: <fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.price }}
                </p>
                <div class="input-group mb-3">
                  <span class="input-group-text">Qty:</span>
                  <input
                    type="number"
                    v-model="item.quantity"
                    @input="updateQuantity(item)"
                    min="0"
                  
                    class="form-control"
                    aria-label="Quantity"
                  />
                </div>
                <p class="card-text">
                  Total Price:<fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.totalPrice }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="category" v-if="mainDishes.length > 0">
          <h2>Main Dishes</h2>
          <div class="card-deck">
            <div
              v-for="item in mainDishes"
              :key="item.id"
              class="card mb-3 main-dish-card"
            >
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                  Price: <fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.price }}
                </p>
                <div class="input-group mb-3">
                  <span class="input-group-text">Qty:</span>
                  <input
                    type="number"
                    v-model="item.quantity"
                    @input="updateQuantity(item)"
                    min="0"
                    
                    class="form-control"
                    aria-label="Quantity"
                  />
                </div>
                <p class="card-text">
                  Total Price:<fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.totalPrice }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="category" v-if="desserts.length > 0">
          <h2>Desserts</h2>
          <div class="card-deck">
            <div
              v-for="item in desserts"
              :key="item.id"
              class="card mb-3 dessert-card"
            >
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                  Price: <fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.price }}
                </p>
                <div class="input-group mb-3">
                  <span class="input-group-text">Qty:</span>
                  <input
                    type="number"
                    v-model="item.quantity"
                    @input="updateQuantity(item)"
                    min="0"
                    
                    class="form-control"
                    aria-label="Quantity"
                  />
                </div>
                <p class="card-text">
                  Total Price:<fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.totalPrice }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Drinks -->
        <div class="category" v-if="drinks.length > 0">
          <h2>Drinks</h2>
          <div class="card-deck">
            <div
              v-for="item in drinks"
              :key="item.id"
              class="card mb-3 drink-card"
            >
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                  Price: <fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.price }}
                </p>
                <div class="input-group mb-3">
                  <span class="input-group-text">Qty:</span>
                  <input
                    type="number"
                    v-model="item.quantity"
                    @input="updateQuantity(item)"
                    min="0"
                   
                    class="form-control"
                    aria-label="Quantity"
                  />
                </div>
                <p class="card-text">
                  Total Price: <fa :icon="['fas', 'indian-rupee-sign']" />
                  {{ item.totalPrice }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>Total Items: {{ totalItems }} | Total Quantity: {{ totalQuantity }}</p>

      <p>
        Total Price: <fa :icon="['fas', 'indian-rupee-sign']" />
        {{ totalPrice }}
      </p>
      <button @click="submitCart" class="btn btn-primary">Submit Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import CartItem from "../types/CartItem";
import Swal from "sweetalert2";

const store = useStore();

const cartItems = computed(() => {
  const cart = store.state.cart;
  const categories = Object.keys(cart);

  return categories.map((category) => ({
    categoryLabel: category,
    items: cart[category],
  }));
});

const starters = computed(() => getItemsByCategory("starters"));
const mainDishes = computed(() => getItemsByCategory("maindishes"));
const desserts = computed(() => getItemsByCategory("desserts"));
const drinks = computed(() => getItemsByCategory("drinks"));

const getItemsByCategory = (category: string) => {
  const cart = store.state.cart;
  const categoryKey = category.toLowerCase();

  if (categoryKey in cart) {
    return cart[categoryKey];
  }

  return [];
};

const totalQuantity = computed(() => {
  let count = 0;
  for (const category of cartItems.value) {
    for (const item of category.items) {
      count += item.quantity;
    }
  }
  return count;
});
const totalItems = computed(() => {
  return store.getters.getCartItemCount;
});

const totalPrice = computed(() => {
  let total = 0;
  for (const category of cartItems.value) {
    for (const item of category.items) {
      total += item.totalPrice;
    }
  }
  return total;
});

const updateQuantity = (item: CartItem) => {
  const { id, slideLabel, quantity } = item;
  store.commit("updateCartItemQuantity", { slideLabel, itemId: id, quantity });

  const price =
    store.state.cart[slideLabel.toLowerCase()].find(
      (cartItem: CartItem) => cartItem.id === id
    )?.price || 0;
  const totalPrice = price * quantity;
  store.commit("updateCartItemTotalPrice", {
    slideLabel,
    itemId: id,
    totalPrice,
  });
};


const submitCart = () => {
  store.commit("CLEAR_CART");
  Swal.fire({
    icon: "success",
    title: "Cart successfully submitted!",
    showConfirmButton: true,
  }).then(() => {
    Swal.close();
  });
};
</script>

<style scoped>
h1,
h2,
p {
  color: aqua;
}
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 20px;
  position: relative;
}

.cart-button-container {
  position: absolute;
  top: 0;
  right: 200px;
  margin: 10px;
}

.category-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.category {
  flex: 1 1 300px;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.starter-card,
.main-dish-card,
.dessert-card,
.drink-card {
  flex: 1 1 100%;
}
.card-text {
  color: black;
}

@media (min-width: 768px) {
  .starter-card,
  .main-dish-card,
  .dessert-card,
  .drink-card {
    flex-basis: calc(50% - 20px);
  }
}

@media (min-width: 992px) {
  .starter-card,
  .main-dish-card,
  .dessert-card,
  .drink-card {
    flex-basis: calc(33.33% - 20px);
  }
}
</style>
