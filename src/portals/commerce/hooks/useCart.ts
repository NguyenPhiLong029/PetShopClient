import { useContext, useState } from 'react';
import AppContext from './AppContext';

export interface CartItem {
  id: string;
  title: string;
  stock: number;
  sku: string;
  price: number;
  weight: number;
  imageUrl: string;
  quantity: number;
  options: string;
}

export interface Cart {
  totalAmount: number;
  totalQuantity: number;
  totalWeight: number;
  count: number;
  items: CartItem[];
}

interface UseCartProps {
  updateQuantity: (id: string, quantity: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = (): UseCartProps => {
  const { restore, ...contextData } = useContext(AppContext);

  const calculateCart = (cart: Cart): Cart => {
    const totalAmount = cart.items.reduce((total, item) => {
      total += item.price * item.quantity;
      return total;
    }, 0);

    const totalQuantity = cart.items.reduce((total, item) => {
      total += item.quantity;
      return total;
    }, 0);

    const totalWeight = cart.items.reduce((weight, item) => {
      weight += item.weight * item.quantity;
      return weight;
    }, 0);

    return {
      totalAmount,
      totalQuantity,
      totalWeight: Math.round(totalWeight * 1000) / 1000,
      count: cart.items.length,
      items: cart.items
    };
  };

  const setCartContext = (cart: Cart) => {
    restore({
      ...contextData,
      cart
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const cartStorage = window.localStorage.getItem('cart') as any;
    if (cartStorage) {
      const cart = JSON.parse(cartStorage) as Cart;
      const foundItem = cart.items.find((i) => i.id === id);
      if (foundItem) {
        foundItem.quantity = quantity;
        const newCart = calculateCart(cart);
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setCartContext(newCart);
      }
    }
  };

  const addItem = (item: CartItem) => {
    const cartStorage = window.localStorage.getItem('cart') as any;
    let newCart = null;
    if (cartStorage) {
      const cart = JSON.parse(cartStorage) as Cart;
      const foundItem = cart.items.find((i) => i.id === item.id);
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        cart.items = [...cart.items, item];
      }
      newCart = calculateCart(cart);
    } else {
      newCart = calculateCart({
        totalAmount: 0,
        totalQuantity: 0,
        totalWeight: 0,
        count: 0,
        items: [item]
      });
    }
    window.localStorage.setItem('cart', JSON.stringify(newCart));
    setCartContext(newCart);
  };

  const removeItem = (id: string) => {
    const cartStorage = window.localStorage.getItem('cart') as any;
    if (cartStorage) {
      const cart = JSON.parse(cartStorage) as Cart;
      const remainingItems = cart.items.filter((i) => i.id !== id);
      cart.items = remainingItems;
      const newCart = calculateCart(cart);
      window.localStorage.setItem('cart', JSON.stringify(newCart));
      setCartContext(newCart);
    }
  };

  const removeAll = () => {
    let newCart = null;
    newCart = calculateCart({
      totalAmount: 0,
      totalQuantity: 0,
      totalWeight: 0,
      count: 0,
      items: []
    });
    window.localStorage.setItem('cart', JSON.stringify(newCart));
    setCartContext(newCart);
  };

  return {
    updateQuantity,
    addItem,
    removeItem,
    removeAll
  };
};

export default useCart;
