// import { createStore } from 'vuex'
// import candidatData from '../../data.json'
// import axios from 'axios';
///////userscode
// //  interface Candidate{
// //     name:string;
// //     password:string;
// //     age:number;
// //     address:string
// // }
// // interface State{
// //     registeredCandidates:Candidate[];
// // }


// export default createStore({

//     // state:{
//     //     registeredCandidates:[],
       
//     // },
//     // mutations:{
//     //     // addUser(state:any, user:any){
//     //     //     state.users.push(user);
//     //     // },
//     //     registerCandidate(state:State,candidate:Candidate){
//     //         state.registeredCandidates.push(candidate);
//     //     },
//     //     loadRegisteredCandidates(state:State,candidates:Candidate[]){
//     //         state.registeredCandidates=candidates;
//     //     }       
//     // },
//     // actions:{
//     //     async fetchRegisteredCandidates(context) {
//     //         try{
//     //             const response=await axios.get('../../data.json');
//     //             const candidates = response.data;
//     //             context.commit('loadRegisteredCandidates',candidates);
//     //         }
//     //         catch(error){
//     //             console.log('error',error);
//     //         }
    
        
//     //     }
//     // }

//     state:{
//         users:[]
//     },
//     mutations:{
//         SET_USERS(state:any, users:any){
//             state.users=users
//         },
//         ADD_USER(state:any,user:any){
//             state.users.push(user)
//         }
//     },
//     actions:{
//         async fetchUsers(state:any){
//             try{
//                 const response= await axios.get('http://localhost:3001/users')
//                 const users=response.data
//                 state.commit('SET_USERS',users)
//             }
//             catch(error){
//                 console.log(error)
//             }
//         },
//         async registerUser(state:any,user:any){
//             try{
//                 const response= await axios.post('http://localhost:3001/users', user)
//                 const newUser=response.data;
//                 state.commit('ADD_USER',newUser)

                

//             }catch(error){
//                 console.log(error)
//             }
//         },
//     },
//     // getters:{
//     //     getUsers: state=>state.users
//     // }
    
// });

// // export interface Candidate{
// //         name:string;
// //         password:string;
// //         age:number;
// //         address:string
// //     }
// //     interface State{
// //         registeredCandidates:Candidate[];
// //     }
// // const state:State=reactive({
// //     registeredCandidates:[],
// // })

// // const registerCandidate=(candidate:Candidate)=>{
// //     state.registeredCandidates.push(candidate);
// // }

// // export default{
// //     state,
// //     registerCandidate
// // } as {
// //     state:State;
// //     registerCandidate:( candidate:Candidate)=>void;
// // }





// import { createStore } from 'vuex';
// import axios from 'axios';




// interface User {
//   name: string;
//   password: string;
//   age: number;
//   address: string;
// }



// export default createStore<State>({
//   state: {
   
//     users: [],
//   },
//   mutations: {
//     SET_CART_ITEMS(state:any, items:any) {
//         state.cartItems = items;
//       },
//       ADD_TO_CART(state:any, item:any) {
//         state.cartItems.push(item);
//       },
//       REMOVE_FROM_CART(state:any, itemId:any) {
//         const index = state.cartItems.findIndex((item:any) => item.id === itemId);
//         if (index !== -1) {
//           state.cartItems.splice(index, 1);
//         }
//       },
//     SET_USERS(state:any, users:any) {
//       state.users = users;
//     },
//     ADD_USER(state:any, user:any) {
//       state.users.push(user);
//     },
//   },
//   actions: {
//     async fetchMenuItems(context:any) {
//       try {
//         const response = await axios.get<FoodItem[]>('http://localhost:3001/menuItems');
//         const menuItems = response.data;
//         context.commit('SET_MENU_ITEMS', menuItems);
//       } catch (error) {
//         console.error('Failed to fetch menu items:', error);
//       }
//     }, fetchCartItems({ commit }:{commit:any}) {
//         axios.get('http://localhost:3001/cartItems') // Assuming you have set up the server to handle cart items
//           .then((response) => {
//             commit('SET_CART_ITEMS', response.data);
//           })
//           .catch((error) => {
//             console.error('Failed to fetch cart items:', error);
//           });
//       },
//       addToCart({ commit }:{commit:any}, item:any) {
//         axios.post('/cartItems', item) // Assuming you have set up the server to handle cart items
//           .then((response) => {
//             commit('ADD_TO_CART', response.data);
//           })
//           .catch((error) => {
//             console.error('Failed to add item to cart:', error);
//           });
//       },
//       removeFromCart({ commit }:{commit:any}, itemId:any) {
//         axios.delete(`http://localhost:3001/cartItems/${itemId}`) // Assuming you have set up the server to handle cart items
//           .then(() => {
//             commit('REMOVE_FROM_CART', itemId);
//           })
//           .catch((error) => {
//             console.error('Failed to remove item from cart:', error);
//           });
//       },
//     async fetchUsers(context:any) {
//       try {
//         const response = await axios.get<User[]>('http://localhost:3001/users');
//         const users = response.data;
//         context.commit('SET_USERS', users);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     async registerUser(context:any, user:any) {
//       try {
//         const response = await axios.post('http://localhost:3001/users', user);
//         const newUser = response.data;
//         context.commit('ADD_USER', newUser);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
// });

// import { createStore } from 'vuex';

// export default createStore({
//   state: {
//     cartItems: [],
//   },
//   mutations: {
//     addToCart(state:any, item:any) {
//       state.cartItems.push(item);
//     },
//     removeFromCart(state:any, itemId: number) {
//       state.cartItems = state.cartItems.filter(item => item.id !== itemId);
//     },
//     clearCart(state:any) {
//       state.cartItems = [];
//     },
//   },
//   actions: {
//     removeFromCart({ commit }: { commit:any }, itemId: number) {
//       commit('removeFromCart', itemId);
//     },
//     clearCart({ commit }: { commit: any }) {
//       commit('clearCart');
//     },
//   },
//   getters: {
//     cartItemsCount(state:any) {
//       return state.cartItems.length;
//     },
//     cartTotalPrice(state:any) {
//       return state.cartItems.reduce((total:any, item:any) => total + (item.price * item.quantity), 0);
//     },
//   },
// });


// import { createStore } from 'vuex';
// import axios from 'axios';

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   quantity: number;
//   addToCart: boolean;
// }

// interface State {
//   starters: MenuItem[];
//   mainDishes: MenuItem[];
//   desserts: MenuItem[];
//   drinks: MenuItem[];
//   cart: {
//     starters: MenuItem[];
//     mainDishes: MenuItem[];
//     desserts: MenuItem[];
//     drinks: MenuItem[];
//   };
// }

// const store = createStore<State>({
//   state: {
//     starters: [],
//     mainDishes: [],
//     desserts: [],
//     drinks: [],
//     cart: {
//       starters: [],
//       mainDishes: [],
//       desserts: [],
//       drinks: [],
//     },
//   },
//   mutations: {
//     SET_MENU_ITEMS(state:any, payload:any) {
//       state.starters = payload.starters;
//       state.mainDishes = payload.mainDishes;
//       state.desserts = payload.desserts;
//       state.drinks = payload.drinks;
//     },
//     ADD_TO_CART(state:any, { item, slideIndex }:{item:any,slideIndex:any}) {
//       item.addToCart = true;

//       switch (slideIndex) {
//         case 0:
//           state.cart.starters.push(item);
//           break;
//         case 1:
//           state.cart.mainDishes.push(item);
//           break;
//         case 2:
//           state.cart.desserts.push(item);
//           break;
//         case 3:
//           state.cart.drinks.push(item);
//           break;
//         default:
//           break;
//       }
//     },
//   },
//   actions: {
//     async fetchData({ commit }:{commit:any}) {
//       try {
//         const responseStarters = await axios.get<MenuItem[]>('http://localhost:3001/starters');
//         const starters = responseStarters.data;

//         const responseMainDishes = await axios.get<MenuItem[]>('http://localhost:3001/main-dishes');
//         const mainDishes = responseMainDishes.data;

//         const responseDesserts = await axios.get<MenuItem[]>('http://localhost:3001/desserts');
//         const desserts = responseDesserts.data;

//         const responseDrinks = await axios.get<MenuItem[]>('http://localhost:3001/drinks');
//         const drinks = responseDrinks.data;

//         commit('SET_MENU_ITEMS', { starters, mainDishes, desserts, drinks });
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     addToCart({ commit }:{commit:any}, payload:any) {
//       commit('ADD_TO_CART', payload);
//     },
//   },
// });

// export default store;


// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     cart: {
//       starters: [],
//       mainDishes: [],
//       desserts: [],
//       drinks: [],
//     },
//   },
//   mutations: {
//     addToCart(state:any, { item, slideLabel }:{ item:any, slideLabel:any }) {
//       let targetCategory;
//       if (slideLabel === 'Starters') {
//         targetCategory = 'starters';
//       } else if (slideLabel === 'Main Dishes') {
//         targetCategory = 'mainDishes';
//       } else if (slideLabel === 'Desserts') {
//         targetCategory = 'desserts';
//       } else if (slideLabel === 'Drinks') {
//         targetCategory = 'drinks';
//       }

//       if (targetCategory) {
//         state.cart[targetCategory].push(item);
//       }
//     },
//   },
//   actions: {
//     // Add any additional actions here if needed
//   },
//   getters: {
//     // Add any additional getters here if needed
//   },
// });

// export default store;


// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     cart: {
//       starters: [],
//       mainDishes: [],
//       desserts: [],
//       drinks: [],
//     },
//   },
//   mutations: {
//     addToCart(state:any, { item, slideLabel }:{ item:any, slideLabel:any }) {
//       let targetCategory;
//       if (slideLabel === 'Starters') {
//         targetCategory = 'starters';
//       } else if (slideLabel === 'Main Dishes') {
//         targetCategory = 'mainDishes';
//       } else if (slideLabel === 'Desserts') {
//         targetCategory = 'desserts';
//       } else if (slideLabel === 'Drinks') {
//         targetCategory = 'drinks';
//       }
  
//       if (targetCategory) {
//         const cartItems = state.cart[targetCategory];
//         let existingItem = null;
  
//         for (const cartItem of cartItems) {
//           if (cartItem.id === item.id) {
//             existingItem = cartItem;
//             break;
//           }
//         }
  
//         if (existingItem) {
//           // If the item already exists, update its quantity
//           existingItem.quantity += item.quantity;
//         } else {
//           // If the item doesn't exist, add it to the cart
//           state.cart[targetCategory].push(item);
//         }
//       }
//     },
//   },
  
//   actions: {
//     addToCart({ commit, state }:{ commit:any, state:any }, { item, slideLabel }:{ item:any, slideLabel:any }) {
//       const existingItem = state.cart[slideLabel].find((cartItem:any) => cartItem.id === item.id);

//       if (existingItem) {
//         // If the item already exists, update its quantity
//         const updatedQuantity = existingItem.quantity + item.quantity;
//         commit('updateCartItemQuantity', {
//           slideLabel,
//           itemId: existingItem.id,
//           quantity: updatedQuantity,
//         });
//       } else {
//         // If the item doesn't exist, add it to the cart
//         commit('addToCart', { item: { ...item }, slideLabel });
//       }
//     },
//   },
//   getters: {
//     // Add any additional getters here if needed
//   },
// });

// export default store;


// import { createStore } from 'vuex';

// interface State {
//   cart: {
//     starters: MenuItem[];
//     mainDishes: MenuItem[];
//     desserts: MenuItem[];
//     drinks: MenuItem[];
//   };
// }

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   quantity: number;
// }

// interface CartItem extends MenuItem {
//   slideLabel: string;
// }

// const state: State = {
//   cart: {
//     starters: [],
//     mainDishes: [],
//     desserts: [],
//     drinks: [],
//   },
// };

// const mutations = {
//   addToCart(state: State, { item, slideLabel }: { item: CartItem; slideLabel: string }) {
//     let targetCategory: keyof State['cart'] | undefined;

//     if (slideLabel === 'Starters') {
//       targetCategory = 'starters';
//     } else if (slideLabel === 'Main Dishes') {
//       targetCategory = 'mainDishes';
//     } else if (slideLabel === 'Desserts') {
//       targetCategory = 'desserts';
//     } else if (slideLabel === 'Drinks') {
//       targetCategory = 'drinks';
//     }

//     if (targetCategory) {
//       const cartItems = state.cart[targetCategory];
//       let existingItem: CartItem | null = null;

//       for (const cartItem of cartItems) {
//         if (cartItem.id === item.id) {
//           existingItem = cartItem;
//           break;
//         }
//       }

//       if (existingItem) {
//         // If the item already exists, update its quantity
//         existingItem.quantity += item.quantity;
//       } else {
//         // If the item doesn't exist, add it to the cart
//         state.cart[targetCategory].push(item);
//       }
//     }
//   },
// };

// const actions = {
//   addToCart({ commit, state }: any, { item, slideLabel }: { item: MenuItem; slideLabel: string }) {
//     const cartItems = state.cart[slideLabel as keyof State['cart']];

//     if (cartItems && cartItems.length > 0) {
//       const existingItem = cartItems.find((cartItem: CartItem) => cartItem.id === item.id) as CartItem | undefined;

//       if (existingItem) {
//         // If the item already exists, update its quantity
//         const updatedQuantity = existingItem.quantity + item.quantity;
//         commit('updateCartItemQuantity', {
//           slideLabel,
//           itemId: existingItem.id,
//           quantity: updatedQuantity,
//         });
//       } else {
//         // If the item doesn't exist, add it to the cart
//         commit('addToCart', { item: { ...item, quantity: item.quantity, slideLabel }, slideLabel });
//       }
//     } else {
//       // If the cart is empty, add the item to the cart
//       commit('addToCart', { item: { ...item, quantity: item.quantity, slideLabel }, slideLabel });
//     }
//   },
// };

// const store = createStore({
//   state,
//   mutations,
//   actions,
// });

// export default store;

// import { createStore } from 'vuex';

// interface State {
//   cart: {
//     [category: string]: CartItem[]; // Add index signature to allow string keys
//   };
//   totalPrice: number;
// }

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   quantity: number;
//   totalPrice: number;
// }

// interface CartItem extends MenuItem {
//   slideLabel: string;
// }

// const state: State = {
//   cart: {
//     starters: [],
//     mainDishes: [],
//     desserts: [],
//     drinks: [],
//   },
//   totalPrice: 0,
// };

// const calculateTotalPrice = (cart: State['cart']): number => {
//   let totalPrice = 0;

//   const categories = Object.keys(cart);

//   for (const category of categories) {
//     const cartItems = cart[category];

//     for (const item of cartItems) {
//       totalPrice += item.price * item.quantity;
//     }
//   }

//   return totalPrice;
// };

// const mutations = {
//   addToCart(state: State, { item, slideLabel }: { item: CartItem; slideLabel: string }) {
//     let targetCategory: keyof State['cart'] | undefined;

//     if (slideLabel === 'Starters') {
//       targetCategory = 'starters';
//     } else if (slideLabel === 'Main Dishes') {
//       targetCategory = 'mainDishes';
//     } else if (slideLabel === 'Desserts') {
//       targetCategory = 'desserts';
//     } else if (slideLabel === 'Drinks') {
//       targetCategory = 'drinks';
//     }

//     if (targetCategory) {
//       const cartItems = state.cart[targetCategory];
//       let existingItem: CartItem | undefined = undefined;

//       for (const cartItem of cartItems) {
//         if (cartItem.id === item.id) {
//           existingItem = cartItem;
//           break;
//         }
//       }

//       if (existingItem) {
//         // If the item already exists, update its quantity and total price
//         existingItem.quantity += item.quantity;
//         existingItem.totalPrice = existingItem.price * existingItem.quantity;
//       } else {
//         // If the item doesn't exist, add it to the cart
//         item.totalPrice = item.price * item.quantity;
//         state.cart[targetCategory].push(item);
//       }
//     }

//     // Update overall total price
//     state.totalPrice = calculateTotalPrice(state.cart);
//   },

//   updateCartItemQuantity(
//     state: State,
//     { slideLabel, itemId, quantity }: { slideLabel: string; itemId: number; quantity: number }
//   ) {
//     let targetCategory: keyof State['cart'] | undefined;

//     if (slideLabel === 'Starters') {
//       targetCategory = 'starters';
//     } else if (slideLabel === 'Main Dishes') {
//       targetCategory = 'mainDishes';
//     } else if (slideLabel === 'Desserts') {
//       targetCategory = 'desserts';
//     } else if (slideLabel === 'Drinks') {
//       targetCategory = 'drinks';
//     }

//     if (targetCategory) {
//       const cartItems = state.cart[targetCategory];

//       const item = cartItems.find((cartItem: CartItem) => cartItem.id === itemId);

//       if (item) {
//         item.quantity = quantity;
//         item.totalPrice = item.price * item.quantity;
//       }
//     }

//     // Update overall total price
//     state.totalPrice = calculateTotalPrice(state.cart);
//   },
// };

// const actions = {
//   addToCart({ commit, state }: any, { item, slideLabel }: { item: MenuItem; slideLabel: string }) {
//     const cartItems = state.cart[slideLabel as keyof State['cart']];

//     if (cartItems && cartItems.length > 0) {
//       const existingItem = cartItems.find((cartItem: CartItem) => cartItem.id === item.id);

//       if (existingItem) {
//         // If the item already exists, update its quantity
//         const updatedQuantity = existingItem.quantity + item.quantity;
//         commit('updateCartItemQuantity', {
//           slideLabel,
//           itemId: existingItem.id,
//           quantity: updatedQuantity,
//         });
//       } else {
//         // If the item doesn't exist, add it to the cart
//         commit('addToCart', { item: { ...item, quantity: item.quantity, slideLabel }, slideLabel });
//       }
//     } else {
//       // If the cart is empty, add the item to the cart
//       commit('addToCart', { item: { ...item, quantity: item.quantity, slideLabel }, slideLabel });
//     }
//   },
// };

// const store = createStore({
//   state,
//   mutations,
//   actions,
// });

// export default store;

// store.ts
import { createStore } from 'vuex';
import { calculateTotalPrice } from '../helpers/Totalprice';

interface State {
  cart: {
    [category: string]: CartItem[];
  };
  totalPrice: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  totalPrice: number;
}

interface CartItem extends MenuItem {
  slideLabel: string;
}

const store = createStore<State>({
  state: {
    cart: {
      starters: [],
      mainDishes: [],
      desserts: [],
      drinks: [],
    },
    totalPrice: 0,
  },
  mutations: {
    addToCart(state:any, payload: { item: CartItem; slideLabel: string }) {
      if (!payload.slideLabel) {
        return;
      }

      const targetCategory = payload.slideLabel.toLowerCase();

      const cartItems = state.cart[targetCategory] || [];
      let existingItem: CartItem | undefined = undefined;

      for (const cartItem of cartItems) {
        if (cartItem.id === payload.item.id) {
          existingItem = cartItem;
          break;
        }
      }

      if (existingItem) {
        existingItem.quantity += payload.item.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        const newItem = { ...payload.item };
        newItem.totalPrice = newItem.price * newItem.quantity;
        state.cart[targetCategory] = [...cartItems, newItem];
      }

      state.totalPrice = calculateTotalPrice(state.cart);
    },

    updateCartItemQuantity(state:any, payload: { slideLabel: string; itemId: number; quantity: number }) {
      const cartItems = state.cart[payload.slideLabel.toLowerCase()];

      const itemToUpdate = cartItems.find((item: CartItem) => item.id === payload.itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = payload.quantity;
        itemToUpdate.totalPrice = itemToUpdate.price * itemToUpdate.quantity;
      }

      state.totalPrice = calculateTotalPrice(state.cart);
    },

    updateCartItemTotalPrice(state:any, payload: { slideLabel: string; itemId: number; totalPrice: number }) {
      const cartItems = state.cart[payload.slideLabel.toLowerCase()];

      const itemToUpdate = cartItems.find((item: CartItem) => item.id === payload.itemId);
      if (itemToUpdate) {
        itemToUpdate.totalPrice = payload.totalPrice;
      }

      state.totalPrice = calculateTotalPrice(state.cart);
    },
  },
  actions: {
    addToCart({ commit, state }:{commit:any,state:any}, payload: { item: MenuItem; slideLabel: string }) {
      if (!payload.slideLabel) {
        return;
      }

      const targetCategory = payload.slideLabel.toLowerCase();

      const cartItems = state.cart[targetCategory];

      if (cartItems && cartItems.length > 0) {
        const existingItem = cartItems.find((cartItem: CartItem) => cartItem.id === payload.item.id);

        if (existingItem) {
          const updatedQuantity = existingItem.quantity + payload.item.quantity;
          commit('updateCartItemQuantity', { slideLabel: payload.slideLabel, itemId: existingItem.id, quantity: updatedQuantity });
          commit('updateCartItemTotalPrice', { slideLabel: payload.slideLabel, itemId: existingItem.id, totalPrice: existingItem.price * updatedQuantity });
        } else {
          commit('addToCart', {
            item: { ...payload.item, quantity: payload.item.quantity, slideLabel: payload.slideLabel },
            slideLabel: payload.slideLabel,
          });
        }
      } else {
        commit('addToCart', {
          item: { ...payload.item, quantity: payload.item.quantity, slideLabel: payload.slideLabel },
          slideLabel: payload.slideLabel,
        });
      }
    },
  },
  getters: {
    // Implement your getters here
  },
});

export default store;
