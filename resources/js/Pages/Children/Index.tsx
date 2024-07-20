import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Index({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Children
        </h2>
      }
    >
      <Head title="Children" />

      {/* <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {children.length > 0 ? (
                <div>
                  {children.map((child) => (
                    <div key={child.id} className="mb-4">
                      <p>Name: {child.name}</p>
                      <p>Gender: {child.gender}</p>
                      <p>Date of Birth: {child.date_of_birth}</p>
                      <p>
                        Age:{" "}
                        {child.age.years > 0
                          ? `${child.age.years} years`
                          : `${child.age.months} months`}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No children</p>
              )}
            </div>
          </div>
        </div>
      </div> */}
    </AuthenticatedLayout>
  );
}
