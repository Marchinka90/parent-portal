import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { PregnancyProps } from "@/types";
import { useState } from "react";

export default function Index({
  auth,
  pregnancy,
  success,
  errors
}: PregnancyProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { delete: destroy } = useForm();

  const errorMessages = errors ? Object.values(errors) : [];

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeleteModal(false);
    destroy(route("pregnancy.destroy", pregnancy.id));
  };

  const confirmDeleting = () => {
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };
  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Pregnancy
          </h2>
          {!pregnancy ? (
            <Link
              href={route("pregnancy.create")}
              className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
            >
              Add new
            </Link>
          ) : (
            ""
          )}
        </div>
      }
    >
      <Head title="Pregnancy" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          {errorMessages.length > 0 && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {errorMessages.join(', ')}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              {pregnancy ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200">
                      Active Pregnancy
                    </h2>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Date of Term
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {pregnancy.date_of_term}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Days Left: {pregnancy.daysLeft}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Babies
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Baby
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {pregnancy.babies.map((baby, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              Baby {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap capitalize">
                              {baby.gender}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex space-x-4 justify-end">
                    <Link
                      href={route("pregnancy.edit", pregnancy.id)}
                      className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                      Edit
                    </Link>
                    <DangerButton onClick={confirmDeleting}>
                      Delete
                    </DangerButton>
                  </div>
                </>
              ) : (
                <p className="text-xl text-center">No active pregnancy</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showDeleteModal} onClose={closeModal}>
        <form onSubmit={handleDelete} className="p-6 bg-red-100">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete the pregnancy?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancle</SecondaryButton>
            <DangerButton className="ms-3">Confirm</DangerButton>
          </div>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}
