import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ChildrenGender, ChildrenForm } from "@/types/Child";
import { useState } from "react";

export default function Create({ auth }: PageProps) {
  const { data, setData, post, errors } = useForm<ChildrenForm>({
    name: "",
    gender: "",	
    dateOfBirth: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genderOptions: ChildrenGender[] = ["boy", "girl"];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    post(route("children.store"));
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
          Create New Child
        </h2>
      }
    >
      <Head title="Children" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

            <form onSubmit={(e) => e.preventDefault()} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="mt-4">
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="dateOfBirth" value="Date of birth" />

                <TextInput
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={data.dateOfBirth}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("dateOfBirth", e.target.value)}
                />

                <InputError message={errors.dateOfBirth} className="mt-2" />
              </div>
              
              <div  className="mt-4">
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

                  <InputError message={errors.gender} className="mt-2"/>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("children.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <PrimaryButton onClick={confirmFormSubmiting}>Create</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreate} className="p-6 bg-blue-50">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to create the child?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancle</SecondaryButton>
            <PrimaryButton className="ms-3">Confirm</PrimaryButton>
          </div>
        </form>
      </Modal>
    </AuthenticatedLayout>
  );
}
