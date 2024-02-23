 <template>
 <div class="contain">
     <nav class="navbar">
        <div class="logo">
            <img src="../assets/logo.png" alt="logo"/>
        </div>
        <div class="nav-links">
            <nav>
            <router-link to="/" class="nav-link" :class="{'active':$route.path==='/'}">Home</router-link>
            <router-link to="/reservation" class="nav-link" :class="{'active':$route.path==='/reservation'}">Reservation</router-link>
        </nav>
        </div>
     </nav>
    <div class="content">
        <router-view/>
    </div>
 </div>
</template>

<script setup lang="ts">

// import { RouterLink } from 'vue-router'

</script>

<style scoped>
.contain{
    background-image: url("../assets/banner.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    backface-visibility: hidden;
    height: 100vh;
    max-width:none;
    
}

.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
}

.logo img{
    height: 60px;
    margin-left: 400px;
}
.nav-links{
    display: flex;
    margin-right: 500px;
}

.nav-links router-link{
    margin-right: 100px;
    justify-content: space-between;
}

.content{
   /* border-style: solid; */
   text-align: center;
}

.nav-link{
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    text-decoration: none;
    color: #f5e8e8;
    cursor: pointer;
    font-size: 20px;
}

.active{
    color: orangered;
}
</style> 

