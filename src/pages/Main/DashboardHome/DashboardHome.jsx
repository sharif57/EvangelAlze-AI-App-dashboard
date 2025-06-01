import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useGetTotalUsersQuery } from "../../../redux/features/userSlice";

const DashboardHome = () => {
  const { data } = useGetTotalUsersQuery();
  console.log(data?.data?.[0]?.totalUser, "total users");
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center  justify-center border-[#004E64] bg-white border rounded-2xl  px-10 py-8 w-72">
          <h3 className="text-xl font-medium text-[#6E7A8A]">Recent User</h3>
          <h3 className="text-3xl font-extralight text-gray-900 mt-2">
            {data?.data?.[0]?.recentUser}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center border-[#004E64] bg-white border rounded-2xl px-10 py-8 w-72">
          <h3 className="text-xl font-medium text-[#6E7A8A]">Total User</h3>
          <h3 className="text-3xl font-extralight text-gray-900 mt-2">{data?.data?.[0]?.totalUser}</h3>
        </div>
      </div>

      {/* Add your chart here when needed */}
      {/* <BarChartComponent /> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
