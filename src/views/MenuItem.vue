<!-- <template>
  <div class="menu-container">
    <h2>Starters</h2>
    <ul>
      <li v-for="item in starters" :key="item.id">
        {{ item.name }} - {{ item.price }}
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>

    <h2>Main Dishes</h2>
    <ul>
      <li v-for="item in mainDishes" :key="item.id">
        {{ item.name }} - {{ item.price }}
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>

    <h2>Desserts</h2>
    <ul>
      <li v-for="item in desserts" :key="item.id">
        {{ item.name }} - {{ item.price }}
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>

    <h2>Drinks</h2>
    <ul>
      <li v-for="item in drinks" :key="item.id">
        {{ item.name }} - {{ iProperty 'carouselButtons' does not exist on type '{ $: ComponentInternalInstance; $data: {}; $props: { key?: string | number | symbol | undefined; ref?: VNodeRef | undefined; ref_for?: boolean | undefined; ... 8 more ...; style?: unknown; }; ... 10 more ...; $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (arg...'.ts(2339)tem.price }}
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>

    <h2>Carousel</h2>
    <div class="carousel">
      <button v-for="button in carouselButtons" :key="button.id" @click="selectSlide(button.slide)">
        {{ button.name }}
      </button>
      <div class="slides">
        <div v-for="slide in carouselSlides" :key="slide.id" :class="{ active: slide.slide === activeSlide }">
          {{ slide.content }}
        </div>
      </div>
      <div>Selected Slide: {{ selectedSlide }}</div>
    </div>

    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        {{ item.name }} - Quantity: {{ item.quantity }}
        <button @click="incrementQuantity(item)">+</button>
        <button @click="decrementQuantity(item)">-</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, provide } from 'vue';
import axios from 'axios';

// Interfaces
interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CarouselButton {
  id: number;
  name: string;
  slide: string;
}

interface CarouselSlide {
  id: number;
  content: string;
  slide: string;
}
interface MenuData {
  starters: MenuItem[];
  mainDishes: MenuItem[];
  desserts: MenuItem[];
  drinks: MenuItem[];
  carouselButtons: CarouselButton[];
  carouselSlides: CarouselSlide[];
  activeSlide: string;
  selectedSlide: string;
  cart: MenuItem[];
}

export default defineComponent({
  name: 'Menu',
  setup() {
    // Define your reactive data and methods here
    const menuData = reactive({
      starters: [] as MenuItem[],
      mainDishes: [] as MenuItem[],
      desserts: [] as MenuItem[],
      drinks: [] as MenuItem[],
      carouselButtons: [] as CarouselButton[],
      carouselSlides: [] as CarouselSlide[],
      activeSlide: '',
      selectedSlide: '',
      cart: [] as MenuItem[],
    });

    const fetchData = async () => {
      try {

        //   const responseStarters = await axios.get<MenuItem[]>('http://localhost:3001/starters');
		//   starters.splice(0, starters.length, ...responseStarters.data);

		//   const responseMainDishes = await axios.get<MenuItem[]>('http://localhost:3001/main-dishes');
		//   mainDishes.splice(0, mainDishes.length, ...responseMainDishes.data);
  
		//   const responseDesserts = await axios.get<MenuItem[]>('http://localhost:3001/desserts');
		//   desserts.splice(0, desserts.length, ...responseDesserts.data);
  
		//   const responseDrinks = await axios.get<MenuItem[]>('http://localhost:3001/drinks');
		//   drinks.splice(0, drinks.length, ...responseDrinks.data);
    //   [starters, mainDishes, desserts, drinks].forEach((items) => {
    //   items.forEach((item) => {
    //     item.addedToCart = false;
    //   });
    // });

        const response = await axios.get('http://localhost:3001/starters');
        // const response = await axios.get('http://localhost:3001/maindishes');
        // const response = await axios.get('http://localhost:3001/desserts');
        // const response = await axios.get('http://localhost:3001/drinks');
        menuData.starters = response.data.starters;
        menuData.mainDishes = response.data.mainDishes;
        menuData.desserts = response.data.desserts;
        menuData.drinks = response.data.drinks;
        menuData.carouselButtons = response.data.carouselButtons;
        menuData.carouselSlides = response.data.carouselSlides;
        menuData.activeSlide = response.data.activeSlide;
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    provide('menuData', menuData);

    // Define your component's methods here
    const incrementQuantity = (item: MenuItem) => {
      item.quantity++;
    };

    const decrementQuantity = (item: MenuItem) => {
      if (item.quantity > 0) {
        item.quantity--;
      }
    };

    const selectSlide = (slide: string) => {
      menuData.selectedSlide = slide;
    };

    const addToCart = (item: MenuItem) => {
      const existingItem = menuData.cart.find((cartItem:any) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        const newItem = { ...item, quantity: 1 };
        menuData.cart.push(newItem);
      }
    };

    return {
      incrementQuantity,
      decrementQuantity,
      selectSlide,
      addToCart,
    };
  },
});
</script> -->


<template>
  <div class="container">
    <!-- <Header/> -->
    <h1>Registration and Login</h1>
    <div class="d-flex justify-content-center">
      <div class="card">
        <div class="nav">
          <button
            @click="activeTab = 'registration'"
            :class="['nav-link','btn-small', { active: activeTab === 'registration' }]"  >Registration</button>
          <button
            @click="activeTab = 'login'"
            :class="['nav-link','btn-small', { active: activeTab === 'login' }]" >Login</button>
        </div>

        <div v-if="activeTab === 'registration'">
          <h2>Registration</h2>
          <form @submit.prevent="submitForm">
            <div class="form-adjust">
              <div class="ji">
                <label for="name">Name:</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="name" v-model="register.name" autocomplete="off" required/>
                </div>
                <div class="error" v-if="register.name.length > 0 && register.name.length < 5">Name should be 5 digits</div>
              </div>
              <div class="ji">
                <label for="password">Password:</label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="register.password" autocomplete="off" @input="validPassword" />
                  <span class="input-group-text">
                    <i class="bi" :class="{'bi-eye': showPassword, 'bi-eye-slash': !showPassword}" @click="toggleShow" id="togglePassword"></i>
                  </span>
                  <div class="error" v-if="showPasswordError">Password must contain capital and special character</div>
                </div>
              </div>
              <label for="age">Age:</label>
              <div class="input-group">
                <input type="number" class="form-control" id="age" min="18" max="99" v-model="register.age" autocomplete="off" required placeholder="" />
              </div>
              <div class="ji">
                <label for="address">Address:</label>
                <div class="input-group">
                  <textarea class="form-control" id="address" v-model="register.address" autocomplete="off" required></textarea>
                </div>
                <div class="error" v-if="register.address.length > 0 && register.address.length < 5">Address should be 5 digits</div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="hasErrors">
              Register
            </button>
            <div v-if="showSuccess" class="success-message">{{ successMessage }}</div>
          </form>
        </div>

        <div v-else-if="activeTab === 'login'">
          <h2>Login</h2>
          <form @submit.prevent="loginForm">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" v-model="login.name" autocomplete="off" required/>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" class="form-control" id="password" v-model="login.password" autocomplete="off" required/>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <div v-if="showError" class="error-message">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Header from './HeaderView.vue';

const activeTab = ref('registration');
const register = ref({
  name: '',
  password: '',
  age: 0,
  address: ''
});
const login = ref({
  name: '',
  password: ''
});

const successMessage = ref('');
const errorMessage = ref('');
const showSuccess = ref(false);
const showError = ref(false);

const showPasswordError = ref(false);

const validPassword = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const isValid = passwordRegex.test(register.value.password);
  showPasswordError.value = !isValid;
};

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const store = useStore();
const router = useRouter();

const hasErrors = computed(() => {
  return (
    register.value.name.length < 5 ||
    showPasswordError.value ||
    register.value.address.length < 5
  );
});

const submitForm = () => {
  if (!hasErrors.value) {
    const newUser = {
      id: Date.now(),
      name: register.value.name,
      password: register.value.password,
      age: register.value.age,
      address: register.value.address
    };
    store.dispatch('registerUser', newUser);
    successMessage.value = 'Registration done successfully';
    showSuccess.value = true;

    clearForm();
  }
};

const clearForm = () => {
  register.value.name = '';
  register.value.password = '';
  register.value.age = 0;
  register.value.address = '';
};

const loginForm = () => {
  const userExists = store.state.users.find(
    (user: any) => user.name === login.value.name && user.password === login.value.password
  );
  if (userExists) {
    router.push('/menubar');
  } else {
    errorMessage.value = 'Invalid name or password';
    showError.value = true;
  }
};
</script>

<style scoped>
.container {
  color: #00ffff;
  flex-direction: column;
  display: block;
  padding: 20px;
}

.card {
  max-width: 400px;
  margin: 0 auto;
  background: transparent;
  border: none;
}

.nav .nav-link {
  flex: 1;
  text-align: center;
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: lightgrey;
  border: 1px solid #000;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 6px;
  margin: 0 5px;
}

.form-group {
  margin-bottom: 25px;
  height: 60px;
}

.btn {
  padding: .657rem .75rem;
  font-size: 18px;
  letter-spacing: 0.050em;
  height: 50px;
}

.btn-primary {
  color: #fff;
  background-color: #00bcd9;
  border-color: #00bcd9;
}

.btn-primary:hover {
  color: #0400d9;
  background-color: #ffffff;
  border-color: #0700d9;
}

.card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.error {
  color: red;
  padding: 0;
  margin: 0;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.ji {
  position: relative;
  flex-grow: 1;
  height: 100px;
  margin: 0;
  padding-top: 5px;
}

.form-adjust {
  margin-bottom: 15px;
  color: aqua;
}

h2 {
  color: aqua;
}

label {
  color: aqua;
}

@media (max-width: 768px) {
  .card {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 10px;
  }

  .btn {
    font-size: 16px;
    height: 40px;
  }

  .ji {
    height: auto;
  }
}

</style>