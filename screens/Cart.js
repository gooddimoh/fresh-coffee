import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// Custom Font (FuturaBT)
import { useFonts } from "expo-font";
// UI Components
import Button from "../components/UI/Button";
// Redux
import { connect } from "react-redux";
import { getCartItems } from "../redux/selectors/cartItems";

function Cart({ cartItems, cartTotal }) {
  // Custom Font (FuturaBT)
  const [fontsLoaded] = useFonts({
    "FuturaBT-Medium": require("../assets/fonts/FuturaBT-Medium.ttf"),
    "Futura-Bold": require("../assets/fonts/Futura-Bold.ttf"),
  });

  const FuturaBT = {};
  const FuturaBTBold = {};

  if (fontsLoaded) {
    FuturaBT.fontFamily = "FuturaBT-Medium";
    FuturaBTBold.fontFamily = "Futura-Bold";
  }

  // Cart component state
  const deliveryCharges = "10.00";
  const total = (Number(cartTotal) + Number(deliveryCharges)).toFixed(2);

  // Handle empty Cart
  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[FuturaBT, { fontSize: 19, alignSelf: "center" }]}>
          Your Cart is Empty!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render Cart Items */}
      <View style={styles.cartItems}>
        {cartItems.map((item) => {
          return (
            <View style={styles.item} key={item.id}>
              <Text style={[FuturaBT, styles.title]}>{item.name}</Text>
              <View style={styles.quantity}>
                <Text
                  style={
                    (FuturaBT,
                    { fontSize: 17, textAlign: "center", color: "white" })
                  }
                >
                  {item.quantity}
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={(FuturaBT, { fontSize: 17, textAlign: "right" })}>
                  ${item.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      {/* Render Subtotal */}
      <View style={[styles.item, { marginTop: 15 }]}>
        <Text style={[FuturaBT, styles.title]}>Subtotal</Text>
        <View style={styles.price}>
          <Text style={(FuturaBT, { fontSize: 17, textAlign: "right" })}>
            ${cartTotal}
          </Text>
        </View>
      </View>
      {/* Render Delivery Charges */}
      <View style={[styles.item]}>
        <Text style={[FuturaBT, styles.title, { color: "#ABABAB" }]}>
          Delivery Charges
        </Text>
        <View style={styles.price}>
          <Text
            style={
              (FuturaBT, { fontSize: 17, textAlign: "right", color: "#ABABAB" })
            }
          >
            ${deliveryCharges}
          </Text>
        </View>
      </View>
      {/* Render Total */}
      <View style={[styles.item, styles.total]}>
        <Text style={[FuturaBTBold, styles.title]}>Total</Text>
        <View style={styles.price}>
          <Text style={[FuturaBTBold, { fontSize: 17, textAlign: "right" }]}>
            ${total}
          </Text>
        </View>
      </View>
      <Button>Checkout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
    height: "100%",
  },
  cartItems: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  item: {
    flexDirection: "row",
    marginBottom: 17,
  },
  title: {
    fontSize: 17,
    flex: 1.3,
    paddingTop: 7,
  },
  price: {
    flex: 1,
    textAlign: "right",
    paddingTop: 7,
  },
  quantity: {
    flex: 0.3,
    backgroundColor: "#B4B590",
    borderRadius: 50,
    width: 20,
    paddingVertical: 7,
  },
  total: {
    marginTop: 13,
  },
});

const mapStateToProps = (state) => {
  const { cartItems, cartTotal } = getCartItems(state);
  return {
    cartItems,
    cartTotal,
  };
};

export default connect(mapStateToProps, null)(Cart);
