import DashboardHomeTable from "../../../Components/DashboardHomeTable";

const DashboardHome = () => {
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center  justify-center border-[#004E64] bg-white border rounded-2xl  px-10 py-8 w-72">
          <h3 className="text-xl font-medium text-[#6E7A8A]">Recent User</h3>
          <h3 className="text-3xl font-extralight text-gray-900 mt-2">
            40,689
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center border-[#004E64] bg-white border rounded-2xl px-10 py-8 w-72">
          <h3 className="text-xl font-medium text-[#6E7A8A]">Total User</h3>
          <h3 className="text-3xl font-extralight text-gray-900 mt-2">500</h3>
        </div>
      </div>

      {/* Add your chart here when needed */}
      {/* <BarChartComponent /> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;

// import { useState } from "react";
// import DashboardHomeTable from "../../../Components/DashboardHomeTable";
// import HostsTable from "../../../Components/HostsTable";
// import { Link } from "react-router-dom";

// const DashboardHome = () => {
//   const [activeTable, setActiveTable] = useState("users"); // 'users' or 'hosts'

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-3/5">
//         {/* Total Users Card */}
//         <div
//           className={`flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all ${
//             activeTable === "users" ? "border border-[#E73E1E]" : ""
//           }`}
//           onClick={() => setActiveTable("users")}
//         >
//           <div className="bg-[#FAE9E6] p-4 rounded-2xl">
//             <img src="/users.png" alt="Users icon" className="w-8 h-8" />
//           </div>
//           <div>
//             <h3 className="text-lg text-gray-600">Total Users</h3>
//             <p className="text-3xl font-light">40,689</p>
//           </div>
//         </div>

//         {/* Total Host Card */}
//         <div
//           className={`flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all ${
//             activeTable === "hosts" ? "border border-[#E73E1E]" : ""
//           }`}
//           onClick={() => setActiveTable("hosts")}
//         >
//           <div className="bg-[#FAE9E6] p-4 rounded-2xl">
//             <img src="/crown-03.png" alt="Host icon" className="w-8 h-8" />
//           </div>
//           <div>
//             <h3 className="text-lg text-gray-600">Total Host</h3>
//             <p className="text-3xl font-light">500</p>
//           </div>
//         </div>

//         {/* Total Party Card */}
//         <Link
//           to={"/parties"}
//           className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm"
//         >
//           <div className="bg-[#FAE9E6] p-4 rounded-2xl">
//             <img src="/party.png" alt="Party icon" className="w-8 h-8" />
//           </div>
//           <div>
//             <h3 className="text-lg text-gray-600">Total Party</h3>
//             <p className="text-3xl font-light">145</p>
//           </div>
//         </Link>
//       </div>

//       {/* Table Section */}
//       {activeTable === "users" ? <DashboardHomeTable /> : <HostsTable />}
//     </div>
//   );
// };

// export default DashboardHome;
