<template>
  <div class="container">
    <Header />
    <div class="col-md-12">
      <h2>Reserve a Table</h2>
      <div class="form-wrap">
        <form id="reservation" @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name" >Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="reservation.name"
                  @input="validateName"
                  required
                />
                <div
                  class="error"
                  v-if="
                    reservation.name.length > 0 && reservation.name.length < 5
                  "
                >
                  Name should be 5 digits
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="reservation.email"
                  required
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="contactno">Contact no:</label>
                <input
                  type="tel"
                  class="form-control"
                  id="contactno"
                  v-model="reservation.contactno"
                  maxlength="10"
                  pattern="[0-9]*"
                  @input="restrictNumeric"
                />
                <div
                  class="error"
                  v-if="
                    reservation.contactno.length > 0 &&
                    reservation.contactno.length < 10
                  "
                >
                  Mobile number should be 10 digits
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="date">Date:</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  placeholder="Date"
                  v-model="reservation.date"
                  required
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="time">Time:</label>
                <input
                  type="time"
                  class="form-control"
                  id="time"
                  placeholder="Date"
                  v-model="reservation.time"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="persons">No of Persons:</label>
                <select
                  class="form-control"
                  id="persons"
                  v-model="reservation.persons"
                  required
                >
                  <option value="">----Select----</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="food">Preferred food:</label>
                <select
                  class="form-control"
                  id="food"
                  v-model="reservation.food"
                  required
                >
                  <option value="">----Select----</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="occasion">Occasion:</label>
                <select
                  class="form-control"
                  id="occasion"
                  v-model="reservation.occasion"
                  required
                >
                  <option value="">----Select----</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Anniversary">Anniversary</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Reserve a table</button>
        </form>
      </div>
      <div v-if="bookingSuccess" class="alert alert-success mt-3">
        Booking success
      </div>
      <table v-if="reservationSubmitted" class="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
            <th>Contact no:</th>
            <th>Date:</th>
            <th>Time:</th>
            <th>No of Persons:</th>
            <th>Preferred food:</th>
            <th>Occasion:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reserve, index) in reservationList" :key="index">
            <td>{{ reserve.name }}</td>
            <td>{{ reserve.email }}</td>
            <td>{{ reserve.contactno }}</td>
            <td>{{ reserve.date }}</td>
            <td>{{ reserve.time }}</td>
            <td>{{ reserve.persons }}</td>
            <td>{{ reserve.food }}</td>
            <td>{{ reserve.occasion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./Header.vue";
import Reservation from "../types/Reservation";

const reservation = ref<Reservation>({
  name: "",
  email: "",
  contactno: "",
  date: "",
  time: "",
  persons: "",
  food: "",
  occasion: "",
});

const reservationList = ref<Reservation[]>([]);
const reservationSubmitted = ref(false);
const bookingSuccess = ref(false);

const isNameValid = ref(true);

const validateName = () => {
  const name = reservation.value.name;
  const alphabetsOnly = /^[a-zA-Z]+$/;

  if (!alphabetsOnly.test(name)) {
    reservation.value.name = name.replace(/[^a-zA-Z]+/g, "");
  }

  isNameValid.value = alphabetsOnly.test(reservation.value.name);
};

const restrictNumeric = () => {
  reservation.value.contactno = reservation.value.contactno.replace(/\D/g, "");
};

const validateForm = () => {
  if (
    reservation.value.name.length < 5 ||
    reservation.value.contactno.length !== 10
  ) {
    return false;
  }
  return true;
};

const submitForm = () => {
  if (!validateForm()) {
    return;
  }

  reservationSubmitted.value = true;
  bookingSuccess.value = true;

  const newSubmission: Reservation = { ...reservation.value };
  reservationList.value =
    reservationList.value.length === 1
      ? [newSubmission]
      : [...reservationList.value, newSubmission];
  reservation.value = {
    name: "",
    email: "",
    contactno: "",
    date: "",
    time: "",
    persons: "",
    food: "",
    occasion: "",
  };
};
</script>
<style scoped>
.container {
  color: #00ffff;
  flex-direction: column;
  display: block;
}

.form-control {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-block: 3px;
}
.form-wrap {
  background: transparent;
  width: 100%;
  max-width: 950px;
  padding: 20px;
  margin: 0 auto;
  position: relative;
}
.form-group {
  text-align: left;
  margin-bottom: 25px;
  color: aqua;
  height: 100px;
}
.form-group > label {
  display: block;
  font-size: 18px;
  color: aqua;
}
.form-control {
  height: 50px;
  background: #ecf0f4;
  border-color: transparent;
  padding: 0 15px;
  font-size: 16px;
}
.form-control:focus {
  border-color: #18c449c6;
}

.btn {
  padding: 0.657rem 0.75rem;
  font-size: 18px;
  letter-spacing: 0.05em;
}

.btn-primary {
  color: #fff;
  background-color: #00bcd9;
  border-color: #00bcd9;
}

.btn-primary:hover {
  color: #00bcd9;
  background-color: #ffffff;
  border-color: #00bcd9;
}

table {
  background-color: #ecf0f4;
}

td th {
  color: green;
}

.error {
  color: red;
}
.ex {
  color: red;
}


</style>
