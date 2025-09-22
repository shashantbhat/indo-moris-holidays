// import { useActionData, Form } from "@remix-run/react";
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import { addUser } from "~/.server/store_user";
//
// export const action = async ({ request }: ActionFunctionArgs) => {
//     try {
//         const formData = await request.formData();
//         const name = formData.get("name");
//
//         if (!name || typeof name !== "string") {
//             return json({ error: "Name is required" }, { status: 400 });
//         }
//
//         const user = await addUser(name);
//         return json({ success: true, user: user[0] });
//     } catch (err: any) {
//         console.error(err);
//         return json({ error: "Failed to add user" }, { status: 500 });
//     }
// };
//
// export default function AddUserPage() {
//     const actionData = useActionData<typeof action>();
//
//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Add New User</h2>
//
//             <Form method="post" className="space-y-4">
//                 <div>
//                     <label className="block mb-1 font-medium">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         className="w-full border border-gray-300 rounded px-3 py-2"
//                         required
//                     />
//                 </div>
//
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Add User
//                 </button>
//             </Form>
//
//             {actionData?.error && (
//                 <p className="mt-4 text-sm text-red-500">{actionData.error}</p>
//             )}
//
//             {actionData?.success && (
//                 <p className="mt-4 text-sm text-green-600">
//                     User "{actionData.user.name}" added successfully!
//                 </p>
//             )}
//         </div>
//     );
// }