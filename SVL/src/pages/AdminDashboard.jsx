import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://seekvialove.com/v1";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/admin/bookings`, {
        withCredentials: true,
      });
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error fetching bookings");
    }
  };

  // ================= FETCH REVIEWS =================
  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://seekvialove.com/v1/reviews");
      setReviews(res.data.data || []);   // ⭐ correct array
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
  };

  // ================= MARK BOOKING COMPLETED =================
  const markCompleted = async (id) => {
    console.log("Completing booking ID:", id); 
    try {
      await axios.patch(
        `${API}/admin/booking/complete/${id}`,
        {},
        { withCredentials: true }
      );

      alert("Booking marked as completed ✅");
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

  // ================= LOAD DASHBOARD =================
  const loadDashboardData = async () => {
    setLoading(true);
    await Promise.all([fetchBookings(), fetchReviews()]);
    setLoading(false);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchBookings(), fetchReviews()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={loadDashboardData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh Data
        </button>
      </div>

      {/* ================= BOOKINGS TABLE ================= */}
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      {bookings.length === 0 ? (
        <p className="mb-12">No bookings found.</p>
      ) : (
        <table className="w-full border mb-16">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">User</th>
              <th>Service</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center border-t">
                <td className="p-2">
                  {b.user?.emailId || "N/A"}
                </td>

                <td>
                  {b.service?.title || "Service"}
                </td>

                <td>
                  ₹ {b.service?.price || 0}
                </td>

                <td>
                  {b.isCompleted ? (
                    <span className="text-green-600 font-bold">Completed</span>
                  ) : (
                    <span className="text-red-600 font-bold">Pending</span>
                  )}
                </td>

                <td>
                  {!b.isCompleted && (
                    <button
                      onClick={() => markCompleted(b._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= REVIEWS TABLE ================= */}
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Name</th>
              <th>Service ID</th>
              <th>Rating</th>
              <th>Mode</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(reviews) &&
              reviews.map((r) => (
                <tr key={r._id} className="text-center border-t">
                  <td className="p-2">{r.user?.firstName || r.name}</td>

                  <td>
                    <div>Service ID: {r.service?._id}</div>
                    <div className="text-sm text-gray-500">
                      ₹ {r.service?.price}
                    </div>
                  </td>

                  <td>⭐ {r.rating}</td>
                  <td>{r.mode}</td>
                  <td className="px-2">{r.message}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;