import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // ✅ Main ORDER BY query
      const sortedQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribeSnapshot = onSnapshot(sortedQuery, (snapshot) => {
        const sortedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ If sorted query returns no docs → fallback query
        if (sortedOrders.length === 0) {
          const fallbackQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
          );

          onSnapshot(fallbackQuery, (fallbackSnap) => {
            let fallbackOrders = fallbackSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            // ✅ Sort manually by date (desc)
            fallbackOrders.sort((a, b) =>
              (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)
            );

            setOrders(fallbackOrders);
            setLoading(false);
          });
        } else {
          setOrders(sortedOrders);
          setLoading(false);
        }
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading orders...</p>;

  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px 20px",
                background: "#fff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.06)",
              }}
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
              <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>

              <div style={{ marginTop: "12px" }}>
                <strong>Items:</strong>
                <ul style={{ marginTop: "6px", paddingLeft: "20px" }}>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.title} (x{item.quantity}) — ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
