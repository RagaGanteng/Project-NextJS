"use client";

import { useEffect, useState } from "react";

export default function UserManagement() {
  const [total, setTotal] = useState<number>(0)

  const count = () => {
    setTotal(total+1)
  }

  useEffect(() => {
      count()
  }, []) 

	return (
<div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
  <h1 className="text-gray-600">{total}</h1>
  <button onClick={count} className="mt-5 text-gray-100 bg-green-600 hover:bg-green-800 hover:text-gray-400 py-2 px-4 rounded-xl">
    click me!
  </button>
	  </div>
	);
  }
  