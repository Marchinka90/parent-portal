import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import ButtonLink from "@/Components/ButtonLink";
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { PregnancyProps } from "@/types";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Index({
  auth,
  pregnancy,
  success,
  errors,
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
          {!pregnancy && (
            <Link
              href={route("pregnancy.create")}
              className="bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 inline-flex items-center px-4 py-2 borde font-semibold text-xs uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
            >
              <span className="p-menuitem-icon pi pi-fw pi-plus mr-1"></span>
              Add New
            </Link>
          )}
        </div>
      }
    >
      <Head title="Pregnancy" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-sm" title="Pregnancy">
            
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

            <div className="p-6 text-gray-900 dark:text-gray-100">
              {pregnancy ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Date of Term
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {pregnancy.date_of_term}
                    </p>
                    <Tag
                      severity="info"
                      value={`Days Left: ${pregnancy.daysLeft}`}
                      className="mt-2"
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Babies
                    </h3>
                    <DataTable value={pregnancy.babies}>
                      <Column
                        field="name"
                        header="Baby"
                        body={(data, { rowIndex }) => `Baby ${rowIndex + 1}`}
                      />
                      <Column field="gender" header="Gender" />
                    </DataTable>
                  </div>

                  <div className="mt-4 flex space-x-4 justify-end">
                    <ButtonLink href={route("pregnancy.edit", pregnancy.id)}>
                      <span className="p-menuitem-icon pi pi-fw pi-pencil mr-1"></span>
                      Edit
                    </ButtonLink>

                    <DangerButton onClick={confirmDeleting}>
                      <span className="p-menuitem-icon pi pi-fw pi-trash mr-1"></span>
                      Delete
                    </DangerButton>
                  </div>
                </>
              ) : (
                <p className="text-xl text-center">No active pregnancy</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Modal show={showDeleteModal} onClose={closeModal}>
        <form onSubmit={handleDelete} className="p-6 bg-red-100">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete pregnancy data?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={() => setShowDeleteModal(false)}>
              <span className="p-menuitem-icon pi pi-fw pi-times mr-1"></span>
              Cancel
            </SecondaryButton>

            <DangerButton className="ml-3">
              <span className="p-menuitem-icon pi pi-fw pi-check mr-1"></span>
              Confirm
            </DangerButton>
          </div>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}


