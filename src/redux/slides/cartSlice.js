import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../../services/cartService';
import { message } from 'antd';

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const response = await getCart();
        if (response.success) {
            return response.data;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addToCartItem = createAsyncThunk('cart/addToCart', async ({ idProduct, quantity }, { rejectWithValue, dispatch }) => {
    try {
        const response = await addToCart(idProduct, quantity);
        if (response.success) {
            message.success("Added to cart successfully!");
            // Refresh cart after adding
            dispatch(fetchCart());
            return response.data;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ idCartItem, quantity }, { rejectWithValue, dispatch }) => {
    try {
        const response = await updateCartItem(idCartItem, quantity);
        if (response.success) {
            dispatch(fetchCart());
            return response.data;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const removeCartItemAction = createAsyncThunk('cart/removeItem', async (idCartItem, { rejectWithValue, dispatch }) => {
    try {
        const response = await removeCartItem(idCartItem);
        if (response.success) {
            message.success("Item removed from cart");
            dispatch(fetchCart());
            return idCartItem;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const clearCartAction = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await clearCart();
        if (response.success) {
            message.success("Cart cleared");
            dispatch(fetchCart());
            return;
        }
        return rejectWithValue(response.message);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isLoading: false,
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Optional: Local optimistic updates if needed, but relying on API for now is safer
        resetCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Cart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                const cartData = action.payload;
                // API returns items array. We need to sum up quantity if API doesn't provide totalQuantity
                state.items = cartData.items || [];
                state.totalAmount = cartData.totalAmount;
                // Calculate total quantity from items
                state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Add to Cart
        builder
            .addCase(addToCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCartItem.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addToCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                message.error(action.payload || "Failed to add to cart");
            });

        // Other actions mainly trigger fetchCart, so we handle their loading states if needed
        // but fetchCart will handle the data update.
    },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
