<template>
  <div class="container mt-5">
    <h2>Gmail Login</h2>
 <div class="input-group">
  <input type="text" id="email" placeholder="name" required/>
  <label for="email" class="input-group_label">...</label>

 </div>
  </div>
</template>

<script>

</script>

<style>

.input-group{
  position: relative;
}
.input-group_input{
  font: inherit;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  outline: 2px solid #fff;
  background-color: transparent;
  transition: outline-color 500ms;
}

.input-group_input:is(:focus,:valid){
  outline-color: #3c50eb;
}
.input-group_label{
  position: absolute;
  top: 0;
  left: 0;
  translate: 10px 10px;
  color: #fff;
  transition: translate 500ms;
  scale: 500ms;
}
.input-group_input:focus +
.input-group_label,
.input-group_input:valid +
.input-group_label{
  padding-inline: 5px;
  translate: 10px -14px;
  scale: 0.8;
  background-color: #00bcd9;
}
</style>
