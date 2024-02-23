<template>
  <div class="container">
    <Header/>
    <h3 >
    
          <div class="marquee">
            <span class="marquee-content">
              Welcome to Capgemini Restaurant Application
            </span>
          </div>
       
    </h3>

 <h1>Dinner with us  <span class="data-words"> </span></h1>

    <div class="d-flex justify-content-center">
      <div class="card">
        <div class="nav">
          <button
            @click="activeTab = 'registration'"
            :class="[
              'nav-link',
              'btn-small',
              { active: activeTab === 'registration' },
            ]"
          >
            Registration
          </button>
          <button
            @click="activeTab = 'login'"
            :class="[
              'nav-link',
              'btn-small',
              { active: activeTab === 'login' },
            ]"
          >
            Login
          </button>
        </div>

        <div v-if="activeTab === 'registration'">
          <h2>Registration</h2>
          <form @submit.prevent="submitForm">
            <div class="form-adjust">
              <div class="ji">
                <label for="name">Name:</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="register.name"
                    autocomplete="off"
                    required
                  />
                </div>
                <div
                  class="error"
                  v-if="register.name.length > 0 && register.name.length < 5"
                >
                  Name should be 5 digits
                </div>
              </div>
              <div class="ji">
                <label for="password">Password:</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    v-model="register.password"
                    autocomplete="off"
                    @input="validPassword"
                  />
                  <span class="input-group-text">
                    <i
                      class="bi"
                      :class="{
                        'bi-eye': showPassword,
                        'bi-eye-slash': !showPassword,
                      }"
                      @click="toggleShow"
                      id="togglePassword"
                    ></i>
                  </span>
                  <div class="error" v-if="showPasswordError">
                    Password must contain capital and special character
                  </div>
                </div>
              </div>
              <div class="ji">
                <label for="age">Age:</label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="age"
                    min="18"
                    max="99"
                    v-model="register.age"
                    autocomplete="off"
                    required
                    placeholder=""
                  />
                </div>
              </div>
              <div class="ji">
                <label for="address">Address:</label>
                <div class="input-group">
                  <textarea
                    class="form-control"
                    id="address"
                    v-model="register.address"
                    autocomplete="off"
                    required
                  ></textarea>
                </div>
                <div
                  class="error"
                  v-if="
                    register.address.length > 0 && register.address.length < 5
                  "
                >
                  Address should be 5 digits
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary padding-top:20px"
              :disabled="hasErrors"
            >
              Register
            </button>
            <div v-if="showSuccess" class="success-message">
              {{ successMessage }}
            </div>
          </form>
        </div>
        <div v-else-if="activeTab === 'login'">
          <h2>Login</h2>
          <form @submit.prevent="loginForm">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="login.name"
                autocomplete="off"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="login.password"
                autocomplete="off"
                required
              />
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { provide } from "vue";
import Header from "./Header.vue";

const activeTab = ref("registration");
const register = ref({
  name: "",
  password: "",
  age: 0,
  address: "",
});
const login = ref({
  name: "",
  password: "",
});

const successMessage = ref("");
const errorMessage = ref("");
const showSuccess = ref(false);
const showError = ref(false);
const showPasswordError = ref(false);
const showPassword = ref(false);

const validPassword = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const isValid = passwordRegex.test(register.value.password);
  showPasswordError.value = !isValid;
};

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
      address: register.value.address,
    };
    store.dispatch("registerUser", newUser);
    successMessage.value = "Registration done successfully";
    showSuccess.value = true;

    clearForm();
  }
};

const clearForm = () => {
  register.value.name = "";
  register.value.password = "";
  register.value.age = 0;
  register.value.address = "";
};

const loginForm = () => {
  const userExists = store.state.users.find(
    (user: any) =>
      user.name === login.value.name && user.password === login.value.password
  );
  if (userExists) {
    provide("loginName", login.value.name);
    router.push("/menubar");
  } else {
    errorMessage.value = "Invalid name or password";
    showError.value = true;
  }
};
</script>

<style scoped>
.container {
  color: #00ffff;
  flex-direction: column;
  display: block;
}
.form-group {
  margin-bottom: 25px;
  text-align: left;
  height: 60px;
}
.row {
  justify-content: space-evenly;
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
}

.nav .nav-link.active {
  background-color: #27b2c7;
  color: #fff;
}
.btn {
  padding: 0.657rem 0.75rem;
  font-size: 18px;
  letter-spacing: 0.05em;
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
  width: 400px;
  height: 600px;
  background: transparent;
  border: none;
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
  text-align: left;
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
  text-align: left;
}
.marquee {
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  padding: 3px 0;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marqueeAnimation 20s linear infinite;
  
}

@keyframes marqueeAnimation {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.text{
  background: -webkit-linear-gradient(45deg,#09009f,#00ff95 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


h1 {
  font-family: 'Brush Script MT', cursive;
            font-size: 74px;
            color: #fff;
        }

        .data-words::before {
            content: "Family";
            animation: animate infinite 5s;
            color: orange;
            padding-left: 10px;
        }
  
        @keyframes animate {
  
            0% {
                content: "Friends";
            }
  
            50% {
                content: "Family";
            }
  
            75% {
                content: "Officemates";
            }
        }
</style>
