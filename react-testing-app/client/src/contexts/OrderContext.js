import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType];

      if (parseInt(newItemCount) === 0) {
        orderCountsMap.delete(itemName);
      } else {
        orderCountsMap.set(itemName, parseInt(newItemCount));
      }

      setOrderCounts(newOrderCounts);
    }
    const resetOrderDatas = () => {
      setOrderCounts({
        products: new Map(),
        options: new Map(),
      });
    };

    return [
      { ...orderCounts, totals, pricePerItem },
      updateItemCount,
      resetOrderDatas,
    ];
  }, [orderCounts, totals]);
  return <OrderContext.Provider value={value} {...props} />;
}
