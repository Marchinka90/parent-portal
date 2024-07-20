import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { DashboardProps } from "@/types";

export default function Dashboard({
  auth,
  pregnancy,
  children,
}: DashboardProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pregnancy
              </h3>
              <p className="text-xl mt-4">
                {pregnancy ? (
                  <>
                    <span className="mr-2">
                      Term Date: {pregnancy.date_of_term}
                    </span>
                    /
                    <span className="ml-2">
                      Days left to term: {pregnancy.daysLeft}
                    </span>
                  </>
                ) : (
                  <span className="mr-2">No active pregnancy</span>
                )}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-semibold">Children</h3>
              <p className="text-xl mt-4">
                {children.length ? (
                  <>
                    <span className="mr-2">Children: {children.length}</span>/
                    <span className="ml-2">
                      { children.filter((child) => child.gender === "boy").length}{" "}
                      boys and{" "}
                      {
                        children.filter((child) => child.gender === "girl")
                          .length
                      }{" "}
                      grils
                    </span>
                  </>
                ) : (
                  <span className="mr-2">No children</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-green-500 text-xl font-semibold">
                My Children
              </h3>

              <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Gender</th>
                    <th className="px-3 py-3">Date of Birth</th>
                    <th className="px-3 py-3">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((child) => (
                    <tr key={child.id}>
                      <td className="px-3 py-2">{child.id}</td>
                      <td className="px-3 py-2">{child.name}</td>
                      <td className="px-3 py-2">{child.gender}</td>
                      <td className="px-3 py-2">{child.date_of_birth}</td>
                      <td className="px-3 py-2 text-nowrap">
                        {child.age.years > 0
                          ? `${child.age.years} years`
                          : `${child.age.months} months`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </AuthenticatedLayout>
  );
}
