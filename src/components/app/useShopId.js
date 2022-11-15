/* eslint-disable prettier/prettier */
import { useState } from "react";

export default function useToken() {
  const getShopId = () => {
    const ShopIdString = localStorage.getItem("ShopId");
    const userShopId = ShopIdString;
    return userShopId;
  };

  const [shopId, setShopId] = useState(getShopId());
  const saveShopId = (userShopId) => {
    localStorage.setItem("shopId", userShopId);
    setShopId(userShopId);
  };
  return {
    setShopId: saveShopId,
    shopId,
  };
}
