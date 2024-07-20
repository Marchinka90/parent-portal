import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChildrenProps } from "@/types";
import { useState } from "react";

export default function Index({
  auth,
  children,
  success,
  errors,
}: ChildrenProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [childId, setChildId] = useState(0);

  const { delete: destroy } = useForm();

  const errorMessages = errors ? Object.values(errors) : [];

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeleteModal(false);
    destroy(route("children.destroy", childId));
  };

  const confirmDeleting = (id: number) => {
    setChildId(id)
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
            Children
          </h2>
          <Link
            href={route("children.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Children" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}
          {errorMessages.length > 0 && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {errorMessages.join(", ")}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              {children.length > 0 ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200">
                      My Children
                    </h2>
                  </div>

                  <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                      <div className="p-6 text-gray-900 dark:text-gray-100">

                        <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr>
                              <th className="px-3 py-3">ID</th>
                              <th className="px-3 py-3">Name</th>
                              <th className="px-3 py-3">Gender</th>
                              <th className="px-3 py-3">Date of Birth</th>
                              <th className="px-3 py-3">Age</th>
                              <th className="px-3 py-3 text-right">Actions</th>
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
                                <td className="px-3 py-2">
                                  <Link
                                    href={route("children.edit", child.id)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                  >
                                    Edit
                                  </Link>
                                  <DangerButton
                                    onClick={(e) => confirmDeleting(child.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                  >
                                    Delete
                                  </DangerButton>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-xl text-center">No Children</p>
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
