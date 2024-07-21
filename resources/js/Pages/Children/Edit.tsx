import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Head, useForm } from "@inertiajs/react";
import { ChildProps } from "@/types";
import { ChildrenGender, ChildrenForm } from "@/types/Child";
import { useState } from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import ButtonLink from "@/Components/ButtonLink";

export default function Create({ auth, child }: ChildProps) {
  const { data, setData, put: update, errors } = useForm<ChildrenForm>({
    name: child.name,
    gender: child.gender,	
    dateOfBirth: child.date_of_birth,
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genderOptions: ChildrenGender[] = ["boy", "girl"];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    update(route("children.update", child.id));
  };

  const handleDateChange = (e: any) => {
    if (e.value) {
      const date = new Date(Date.UTC(e.value.getFullYear(), e.value.getMonth(), e.value.getDate()));
      setData("dateOfBirth", date.toISOString().split('T')[0]);
    } else {
      setData("dateOfBirth", "");
    }
  };

  const confirmFormSubmiting = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="shadow-sm" title="Update Child Data">

          <form onSubmit={(e) => e.preventDefault()} className="p-4 sm:p-8 space-y-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-1/2 mr-5">
                  <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={data.name}
                      className="mt-1 block w-full"
                      onChange={(e) => setData("name", e.target.value)}
                    />

                    {errors.name && (
                      <Message severity="error" text={errors.name} className="mt-2" />
                    )}
                  </div>

                  <div className="mt-4">
                    <InputLabel htmlFor="gender" value="Gender"/>

                    <SelectInput
                      name="gender"
                      id="gender"
                      className="mt-1 block w-full"
                      value={data.gender}
                      onChange={(e) => setData("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map((gender, key) => (
                        <option value={gender} key={key}>
                          {gender}
                        </option>
                      ))}
                    </SelectInput>

                    {errors.gender && (
                      <Message severity="error" text={errors.gender} className="mt-2" />
                    )}
                  </div>
                </div>

                <div className="w-1/2">
                  <label htmlFor="dateOfTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Term
                  </label>
                  <Calendar
                    id="dateOfTerm"
                    value={data.dateOfBirth ? new Date(data.dateOfBirth) : null}
                    onChange={handleDateChange}
                    dateFormat="yy-mm-dd"
                    className={classNames("mt-1 block w-full", {"p-invalid": errors.dateOfBirth})}
                    inline 
                    showWeek
                  />
                  {errors.dateOfBirth && <Message severity="error" text={errors.dateOfBirth} className="mt-2" />}
                </div>
              </div>

              <div className="mt-4 text-right">
                <ButtonLink
                  href={route("children.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  <span className="p-menuitem-icon pi pi-fw pi-arrow-left mr-1"></span>
                  Back
                </ButtonLink>
                <PrimaryButton onClick={confirmFormSubmiting}>
                  <span className="p-menuitem-icon pi pi-fw pi-check mr-1"></span>
                  Create
                </PrimaryButton>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreate} className="p-6 bg-blue-50">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to update the child?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>
              <span className="p-menuitem-icon pi pi-fw pi-times mr-1"></span>
              Cancle
            </SecondaryButton>
            <PrimaryButton className="ms-3">
              <span className="p-menuitem-icon pi pi-fw pi-check mr-1"></span>
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}
