<!-- 

<template>
    <div>
      Menu items 
      <h1>Restaurant Menu</h1>
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          {{ item.name }} - ${{ item.price }}
          <button @click="addToCart(item)">Add to Cart</button>
        </li>
      </ul>
  
      Cart items 
      <h2>Cart</h2>
<ul>
  <li v-if="cartItems.length === 1 && cartItems[0].id === 0">Cart is empty</li>
  <li v-for="item in cartItems" :key="item.id" v-else>
    {{ item.name }} - ${{ item.price }} - Quantity: {{ item.quantity }}
    <button @click="removeFromCart(item.id)">Remove from Cart</button>
  </li>
</ul>

    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios, { AxiosResponse } from 'axios';
  
  interface FoodItem {
    id: number;
    name: string;
    price: number;
  }
  

  interface CartItem extends FoodItem {
  id: number;
  quantity: number;
}
// const cartItems = ref<CartItem[]>([{ id: 0, name: '', price: 0, quantity: 0 }]);

  export default defineComponent({
    name: 'MenuFile',
    setup() {
      const menuItems = ref<FoodItem[]>([]);
      const cartItems = ref<CartItem[]>([]);
        const addToCart = (item: FoodItem): void => {
      const cartItem: CartItem = { ...item, quantity: 1 };

      // Send the cart item addition to the server
      axios
        .post('http://localhost:3001/cartItems', cartItem)
        .then(() => {
          // Update the cart items in the Vuex store
          cartItems.value.push(cartItem);
        })
        .catch((error: any) => {
          console.error('Failed to add item to cart:', error);
        });
    };
      const removeFromCart = (itemId: number): void => {
        // Send the cart item removal to the server
        axios.delete(`http://localhost:3001/cartItems/${itemId}`)
          .then(() => {
            // Update the cart items in the Vuex store
            const index = cartItems.value.findIndex((item:any) => item.id === itemId);
            if (index !== -1) {
              cartItems.value.splice(index, 1);
            }
          })
          .catch((error: any) => {
            console.error('Failed to remove item from cart:', error);
          });
      };
  
      // Fetch menu items from API
      const fetchMenuItems = () => {
        axios.get<FoodItem[]>('http://localhost:3001/menuItems')
          .then((response: AxiosResponse<FoodItem[]>) => {
            menuItems.value = response.data;
          })
          .catch((error: any) => {
            console.error('Failed to fetch menu items:', error);
          });
      };
  
      // Fetch cart items from API
      const fetchCartItems = () => {
        axios.get<CartItem[]>('http://localhost:3001/cartItems')
          .then((response: AxiosResponse<CartItem[]>) => {
            cartItems.value = response.data;
          })
          .catch((error: any) => {
            console.error('Failed to fetch cart items:', error);
          });
      };
  
      // Fetch menu and cart items when the component is mounted
      onMounted(() => {
        fetchMenuItems();
        fetchCartItems();
      });
  
      return {
        menuItems,
        cartItems,
        addToCart,
        removeFromCart,
      };
    },
  });
  </script>-->
  

   
  

<template>
  <h1>Menu</h1>
  <router-link to="/cart" class="btn btn-primary">Cart</router-link>
  
  <div id="carouselExampleCaptions" class="carousel slide"  data-bs-interval="false">
    <div>
      <button type="button" :data-bs-target="'#carouselExampleCaptions'" data-bs-slide-to="0" class="btn btn-lg btn-indicator text active" aria-label="Slide 1">
        <i class="bi bi-collection-fill"></i> 
        Starters
      </button>
      <button type="button" :data-bs-target="'#carouselExampleCaptions'" data-bs-slide-to="1" class=" btn btn-lg btn-indicator text" aria-label="Slide 2">
        <i class="bi bi-egg-fried"></i> Main Dishes</button>
      <button type="button" :data-bs-target="'#carouselExampleCaptions'" data-bs-slide-to="2" class="btn btn-lg btn-indicator text" aria-label="Slide 3">
        <i class="bi bi-cupcake"></i>  Desserts</button>
      <button type="button" :data-bs-target="'#carouselExampleCaptions'" data-bs-slide-to="3" class="btn btn-lg btn-indicator text" aria-label="Slide 4">
        <i class="bi bi-cup"></i>  Drinks</button>
    </div>

  <!-- <div class="carousel-inner"> -->
      <div  class="carousel-item active">
        <div class="carousel-caption-content">
        <div class="row">
        <div class="col mb-5" v-for="item in starters" :key="item.id"   >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Price: {{ item.price }}</p>
            <div class="quantity-container">
          <!-- <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"> -->
          <div class="quantity-buttons">
            <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"/>
            <button class="btn btn-primary" @click="incrementQuantity(item)">+</button>
            <button class="btn btn-primary" @click="decrementQuantity(item)">-</button>
          </div>
        </div>
          </div>
        </div>
      <div></div>
      </div>
      </div></div></div>
      <!-- </div> -->
           
      <div class="carousel-item">
    
        <div class="carousel-caption-content">
          <div class="row">
          <div class="col mb-5" v-for="item in starters" :key="item.id"   >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Price: {{ item.price }}</p>
            <div class="quantity-container">
          <!-- <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"> -->
          <div class="quantity-buttons">
            <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"/>
            <button class="btn btn-primary" @click="incrementQuantity(item)">+</button>
            <button class="btn btn-primary" @click="decrementQuantity(item)">-</button>
          </div>
        </div></div>
          </div>
        </div>
      <div>
  </div>
      </div></div></div>

      <div class="carousel-item">
    
    <div class="carousel-caption-content">
      <div class="row">
      <div class="col mb-5" v-for="item in starters" :key="item.id"   >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Price: {{ item.price }}</p>
            <div class="quantity-container">
          <!-- <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"> -->
          <div class="quantity-buttons">
            <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"/>
            <button class="btn btn-primary" @click="incrementQuantity(item)">+</button>
            <button class="btn btn-primary" @click="decrementQuantity(item)">-</button>
          </div>
        </div>
          </div></div></div>
        </div>
      <div></div>
  </div></div>

      <div class="carousel-item">
     
        <div class="carousel-caption-content">
          <div class="row">
          <div class="col mb-5" v-for="item in starters" :key="item.id"   >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text">Price: {{ item.price }}</p>
            <div class="quantity-container">
          <!-- <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"> -->
          <div class="quantity-buttons">
            <input type="number" class="form-control" :id="'quantity-' + item.id" v-model="item.quantity"/>
            <button class="btn btn-primary" @click="incrementQuantity(item)">+</button>
            <button class="btn btn-primary" @click="decrementQuantity(item)">-</button>
          </div>
        </div></div>
          </div>
        </div>
      <div>
      </div>
      </div>
    </div></div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import axios from 'axios';

interface Starters {
  id:number;
  name: string;
  price: number;
  description: string;
  quantity:number;
}

export default defineComponent({
  name: 'Menu',
  setup() {
    const starters = reactive<Starters[]>([]);

    
    const fetchData = async () => {
      try {
        const response = await axios.get<Starters[]>('http://localhost:3001/starters');
          starters.splice(0, starters.length, ...response.data);
      } catch (error) {
        console.error(error);
      }
    };

    
    const incrementQuantity = (item: Starters) => {
      item.quantity++;
      console.log("one")
    };

    const decrementQuantity = (item: Starters) => {
      if (item.quantity > 0) {
        item.quantity--;
      }
    };
 fetchData();
    // onMounted(fetchData);

    return { starters,incrementQuantity,decrementQuantity };
  },
  
});
</script>


<style scoped>


.carousel-item {
  width: 100%;
  height: 100%; /* Adjust the height as needed */
  border: 1px solid #ccc; /* Add border styling */
}

.carousel-inner {
  /* transition: none !important;  */
  /* Disable transition for manual slide */
  /* background-origin: padding-box; */
}

.text-red {
  color: red;
}

.carousel-indicators {
  position: absolute;
  top: 10px;
  left: 30%;
  transform: translateX(-50%);
}

.carousel-indicators [data-bs-target] {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  /* overflow: hidden; */
}

.carousel-indicators .text[data-bs-target] {
  width: auto;
  height: 20px;
  text-indent: 0;
}

.carousel-item .carousel-caption-content {
  position: static;
  padding-top: 120px;
  padding-bottom: 20px;
  text-align: center;
}

.custom-card{
  margin-left: 40px !important; 
  margin-right: 0px !important;
}
.btn-indicator .text{
  /* width: auto; */
    height: 70px;
    text-indent: 0;
    background-color: blue;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; */
  /* margin-right: 5px;
  font-size: 24px; */
  /* width: 100px; Adjust the width as desired */
/* height: 100px; Adjust the height as desired */
}
.btn-indicator{
  background-color: red;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.add-to-cart {
  flex-grow: 1;
  margin-right: 5px;
}

.remove-from-cart {
  flex-grow: 1;
  margin-left: 5px;
}

.row{
  margin-right: 0;
  margin-left: 0;
}
</style>  