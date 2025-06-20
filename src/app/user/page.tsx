"use client";
import { useState,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

const USERS_PER_PAGE = 5;

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([ 
    { id: 1, name: "Raga Kusnira", email: "raga@gmail.com", password: "123456" },
    { id: 2, name: "Adi Apriyanto", email: "adi@gmail.com", password: "abcdef" },
    { id: 3, name: "Djohara", email: "djo@gmail.com", password: "password" },
    { id: 4, name: "Rizki", email: "rzk@gmail.com", password: "test123" },
    { id: 5, name: "Khalil", email: "khl@gmail.com", password: "khalilpw" },
  ]);
  
  const [currentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  {/*User Logic*/}

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setShowDeleteModal(false);
  };

  const handleAddOrUpdateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;
    if (selectedUser) {
      setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...newUser } : user));
    } else {
      const newUserId = users.length ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newUserId, ...newUser }]);
    }
    setNewUser({ name: "", email: "", password: "" });
    setShowModal(false);
    setSelectedUser(null);
    
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser({ name: user.name, email: user.email, password: user.password });
    setShowModal(true);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery)
  );

  {/*sidebar logic*/}

  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false);
      }
    }
  
    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);


  {/*vagination*/}
  
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);


  return (
    <div className="w-full p-6">

        <button
          onClick={() => setShowSidebar(true)}
          className="text-white px-2 py-0 rounded-full size-9 bg-gray-200 mb-4"
        >
          <img src="/menu.png" className="size-5"></img>
        </button>


      <h2 className="text-black text-2xl font-bold mb-4">User Management</h2>
      
      <input
        type="text"
        placeholder="Search user..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4 text-black"
      />
      
      <button
        onClick={() => { setShowModal(true); setSelectedUser(null); setNewUser({ name: "", email: "", password: "" }); }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add User
      </button>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-600 text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Email</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>

            {paginatedUsers.map((user) => (
              <tr key={user.id} className="bg-gray-600 hover:bg-gray-400">
                <td className="border p-3">{user.id}</td>
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3 text-center">
                  <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">Edit</button>
                  <button onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }} className="bg-red-500 text-white px-3 py-1 rounded mx-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">{selectedUser ? "Edit User" : "Add New User"}</h2>
            <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="border p-2 rounded w-full mb-2 text-black" />
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border p-2 rounded w-full mb-2 text-black" />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="border p-2 rounded w-full mb-4 text-black" />
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleAddOrUpdateUser} className="bg-blue-500 text-white px-4 py-2 rounded">{selectedUser ? "Edit" : "Add"}</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-black">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={() => handleDeleteUser(selectedUser!.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto p-4 text-black">
            
            <div className="flex justify-center mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded">
                Prev
              </button>
                <button className={`px-4 py-2 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>1</button>
                <button className={`px-4 py-2 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>2</button>
                <button className={`px-4 py-2 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>3</button>
                <button className={`px-4 py-2 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>4</button>
                <button className={`px-4 py-2 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>5</button>

              <button className="px-4 py-2 bg-gray-200 rounded">
                Next
              </button>
          </div>
      </div>

     
        

        {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6 transition-transform duration-300"
        >
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6 transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4 text-black">Sidebar Menu</h2>
          <ul className="space-y-2 text-black">
            <li>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/room")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Properti
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/transaction/booking")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Transaksi
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/categories")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Kategori
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/user")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                User
              </button>
            </li>
            <li>
               <button
                onClick={() => router.push("/")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
                >
                LogOut
              </button>   
            </li>
          </ul>
        </div>
        </div>
      )}



    </div>
  );
}