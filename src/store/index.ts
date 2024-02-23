
import { createStore } from 'vuex';
import axios from 'axios';
import { calculateTotalPrice } from '../helpers/Totalprice';


interface State {
  users: any[];
  cart: {
    [category: string]: CartItem[];
  };
  totalPrice: number;
}

interface MenuList  {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  totalPrice: number;
}

interface CartItem extends MenuList {
  slideLabel: string;
}

const store = createStore<State>({
  state: {
    users: [], 
    cart: {
      starters: [],
      maindishes: [],
      desserts: [],
      drinks: [],
    },
    totalPrice: 0,
  },
  mutations: {
    SET_USERS(state: State, users: any[]) {
      state.users = users;
    },
    ADD_USER(state: State, user: any) {
      state.users.push(user);
    },
    addToCart(state: State, payload: { slideLabel: string; item: CartItem }) {
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

    updateCartItemQuantity(state: State, payload: { slideLabel: string; itemId: number; quantity: number }) {
      const cartItems = state.cart[payload.slideLabel.toLowerCase()];

      const itemToUpdate = cartItems.find((item: CartItem) => item.id === payload.itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = payload.quantity;
        itemToUpdate.totalPrice = itemToUpdate.price * itemToUpdate.quantity;

        if (itemToUpdate.quantity === 0) {
         
          state.cart[payload.slideLabel.toLowerCase()] = cartItems.filter((item: CartItem) => item.id !== payload.itemId);
        }
      }

      state.totalPrice = calculateTotalPrice(state.cart);
    },

    updateCartItemTotalPrice(state: State, payload: { slideLabel: string; itemId: number; totalPrice: number }) {
      const cartItems = state.cart[payload.slideLabel.toLowerCase()];

      const itemToUpdate = cartItems.find((item: CartItem) => item.id === payload.itemId);
      if (itemToUpdate) {
        itemToUpdate.totalPrice = payload.totalPrice;
      }

      state.totalPrice = calculateTotalPrice(state.cart);
    },
    CLEAR_CART(state: State) {
      state.cart = {
        starters: [],
        maindishes: [],
        desserts: [],
        drinks: [],
      };
      state.totalPrice = 0;
    },
  },
  actions: {
    async fetchUsers(context: any) {
      try {
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;
        context.commit('SET_USERS', users);
      } catch (error) {
        console.log(error);
      }
    },

    async registerUser(context: any, user: any) {
      try {
        const response = await axios.post('http://localhost:3001/users', user);
        const newUser = response.data;
        context.commit('ADD_USER', newUser);
      } catch (error) {
        console.log(error);
      }
    },

    addToCart({ commit, state }:{commit:any,state:any}, payload: { item: MenuList; slideLabel: string }) {
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
    
    getCartItemCount(state) {
      let itemCount = 0;
      for (const category in state.cart) {
        itemCount += state.cart[category].length;
      }
      return itemCount;
    },
  },
});

export default store;
