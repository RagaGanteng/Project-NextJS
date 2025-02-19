'use client';
import { useState } from "react";

type Booking = {
  id: number;
  userName: string;
  email: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
};

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [formData, setFormData] = useState<Booking>({
    id: 0,
    userName: "",
    email: "",
    roomName: "",
    checkIn: "",
    checkOut: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBooking = () => {
    if (!formData.userName || !formData.email || !formData.roomName || !formData.checkIn || !formData.checkOut) return;

    setBookings([...bookings, { ...formData, id: bookings.length + 1 }]);
    setFormData({ id: 0, userName: "", email: "", roomName: "", checkIn: "", checkOut: "" });
  };

  const handleEditBooking = (booking: Booking) => {
    setFormData(booking);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setBookings(
      bookings.map((booking) =>
        booking.id === formData.id ? { ...formData, id: Number(formData.id) } : booking
      )
    );
    setFormData({ id: 0, userName: "", email: "", roomName: "", checkIn: "", checkOut: "" });
    setIsEditing(false);
  };

  const handleDeleteBooking = (id: number) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-black text-2xl font-bold mb-4">Booking Management</h2>

      <div className="w-full mb-6 flex flex-wrap gap-4">
        <input type="text" name="userName" placeholder="User Name" value={formData.userName} onChange={handleChange} className="border p-2 rounded flex-grow min-w-[200px]" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded flex-grow min-w-[200px]" />
        <input type="text" name="roomName" placeholder="Room Name" value={formData.roomName} onChange={handleChange} className="border p-2 rounded flex-grow min-w-[200px]" />
        <input type="date" name="checkIn" placeholder="Check-in Date" value={formData.checkIn} onChange={handleChange} className="border p-2 rounded flex-grow min-w-[200px]" />
        <input type="date" name="checkOut" placeholder="Check-out Date" value={formData.checkOut} onChange={handleChange} className="border p-2 rounded flex-grow min-w-[200px]" />
        {isEditing ? (
          <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        ) : (
          <button onClick={handleAddBooking} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-600 text-left text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">User Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Room Name</th>
              <th className="border p-3">Check-in</th>
              <th className="border p-3">Check-out</th>
              <th className="border p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-left text-white bg-slate-500">
                <td className="border p-3">{booking.id}</td>
                <td className="border p-3">{booking.userName}</td>
                <td className="border p-3">{booking.email}</td>
                <td className="border p-3">{booking.roomName}</td>
                <td className="border p-3">{booking.checkIn}</td>
                <td className="border p-3">{booking.checkOut}</td>
                <td className="border p-3 text-center">
                  <button onClick={() => handleEditBooking(booking)} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">Edit</button>
                  <button onClick={() => handleDeleteBooking(booking.id)} className="bg-red-500 text-white px-3 py-1 rounded mx-1">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
