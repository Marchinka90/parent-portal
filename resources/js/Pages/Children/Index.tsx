import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChildrenProps } from "@/types";
import { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ButtonLink from "@/Components/ButtonLink";

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
              className="bg-emerald-500 text-white rounded shadow hover:bg-emerald-600 inline-flex items-center px-4 py-2 borde font-semibold text-xs uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
            >
              <span className="p-menuitem-icon pi pi-fw pi-plus mr-1"></span>
              Add New
            </Link>
        </div>
      }
    >
      <Head title="Children" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          
          <Card className="shadow-sm" title="Children">
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
              {children.length > 0 ? (
                <>
                  <div className="mb-6">
                    <DataTable value={children} className="p-datatable-gridlines">
                      <Column
                        field="#"
                        header="#"
                        body={(child, { rowIndex }) => `${rowIndex + 1}`}
                        className="w-1"
                      />
                      <Column 
                        field="name" 
                        header="Name" 
                        body={(child) => `${child.name}`}
                        className="w-2/6"
                      />
                      <Column 
                        field="gender" 
                        header="Gender" 
                        body={(child) => `${child.gender}`}
                        className="w-1/7"
                      />
                      <Column 
                        field="dateOfBirth" 
                        header="Date of Birth" 
                        body={(child) => `${child.date_of_birth}`}
                        className="w-1/6"
                      />

                      <Column 
                        field="age" 
                        header="Age" 
                        body={(child) => `${child.age.years > 0
                          ? `${child.age.years} years`
                          : `${child.age.months} months`}`}
                          className="w-1/6"
                      />
                      <Column 
                        className="w-2/5"
                        field="actions" 
                        header="Actions" 
                        body={(child)=> (
                          <div className="mt-2">
                          <ButtonLink href={route("children.edit", child.id)} className="mr-2">
                            <span className="p-menuitem-icon pi pi-fw pi-pencil mr-1"></span>
                            Edit
                          </ButtonLink>
                          <DangerButton onClick={() => confirmDeleting(child.id)}>
                            <span className="p-menuitem-icon pi pi-fw pi-trash mr-1"></span>
                            Delete
                          </DangerButton>
                          </div>
                          )
                        }
                      />
                    </DataTable>
                  </div>
                </>
              ) : (
                <p className="text-xl text-center">No Children</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <Modal show={showDeleteModal} onClose={closeModal}>
        <form onSubmit={handleDelete} className="p-6 bg-red-100">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete the child data?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>
              <span className="p-menuitem-icon pi pi-fw pi-times mr-1"></span>
              Cancle
            </SecondaryButton>
            <DangerButton className="ms-3">
              <span className="p-menuitem-icon pi pi-fw pi-check mr-1"></span>
              Confirm
            </DangerButton>
          </div>
        </form>
      </Modal>

    </AuthenticatedLayout>
  );
}
