import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DashboardProps } from "@/types";
import { Child } from "@/types/Child";

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
          <Card className="shadow-sm" >
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 text-2xl font-semibold">
                <i className="pi pi-heart p-mr-2"></i> Pregnancy
              </h3>
              <Divider />
              <p className="text-xl mt-4">
                {pregnancy ? (
                  <>
                    <Tag
                      severity="info"
                      value={`Term Date: ${pregnancy.date_of_term}`}
                      className="p-mr-2 mr-2 text-base"
                    />
                    <Tag
                      severity="warning"
                      value={`Days left: ${pregnancy.daysLeft}`}
                      className="text-base"
                    />
                  </>
                ) : (
                  <Tag severity="danger" value="No active pregnancy" className="text-base"/>
                )}
              </p>
            </div>
          </Card>

          <Card className="shadow-sm">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-semibold">
                <i className="pi pi-users p-mr-2"></i> Children
              </h3>
              <Divider />
              <p className="text-xl mt-4">
                {children.length ? (
                  <>
                    <span className="mr-2">Children: {children.length}</span>/
                    <span className="ml-2">
                      {
                        children.filter(
                          (child: Child) => child.gender === "boy"
                        ).length
                      }{" "}
                      boys and{" "}
                      {
                        children.filter(
                          (child: Child) => child.gender === "girl"
                        ).length
                      }{" "}
                      girls
                    </span>
                  </>
                ) : (
                  <Tag severity="danger" value="No children"  className="text-base"/>
                )}
              </p>
            </div>
          </Card>
        </div>

        {children.length > 0 && (
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
            <Card className="shadow-sm" title="My Children">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="text-green-500 text-xl font-semibold">
                  <i className="pi pi-users p-mr-2"></i> Children
                </h3>

                <Divider />
                <DataTable value={children} className="mt-3">
                  <Column field="id" header="ID" />
                  <Column field="name" header="Name" />
                  <Column field="gender" header="Gender" />
                  <Column field="date_of_birth" header="Date of Birth" />
                  <Column
                    field="age"
                    header="Age"
                    body={(child: Child) =>
                      child.age.years > 0
                        ? `${child.age.years} years`
                        : `${child.age.months} months`
                    }
                  />
                </DataTable>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
