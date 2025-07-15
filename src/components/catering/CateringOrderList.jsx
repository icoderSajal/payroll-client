

import React from 'react'

const CateringOrderList = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-4xl text-teal-100 font-bold">Catering Order List</h1>

            </div>

            <table className="min-w-full backdrop-blur-sm border border-amber-50 ">
                <thead>
                    <tr className="bg-[0000] backdrop-blur-sm text-left text-white border border-amber-50">
                        <th className="p-2 border-2 border-amber-50">Menu</th>
                        <th className="p-2 border-2 border-amber-50">Item Name</th>
                        <th className="p-2 border-2 border-amber-50">Description</th>
                        <th className="p-2 border-2 border-amber-50">Order By</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-amber-50">
                        <td className="p-2 border border-amber-50">Menu</td>
                        <td className="p-2 border border-amber-50">Item</td>
                        <td className="p-2 border border-amber-50">Description</td> <td className="p-2 border border-amber-50">Admin</td>
                    </tr>
                </tbody>
                {/* <tbody>
                    {items.map((item) => (
                        <tr key={item._id} className="border-t">
                            <td className="p-2">{item.menu_name}</td>
                            <td className="p-2">{item.item_name}</td>
                            <td className="p-2">{item.description}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => openModal(item)} className="bg-green-600 hover:bg-green-800 text-white px-4 py-1.5 rounded"
                                >Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-800 text-white px-4 py-1.5 rounded"
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody> */}
            </table>


        </div>
    )
}

export default CateringOrderList

