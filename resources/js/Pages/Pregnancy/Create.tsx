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
import { PregnancyGender, PregnancyForm } from "@/types/Pregnancy";
import { useState } from "react";

export default function Create({ auth }: PageProps) {
  const { data, setData, post, errors, reset } = useForm<PregnancyForm>({
    dateOfTerm: "",
    babies: [{ gender: "" }],
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genderOptions: PregnancyGender[] = ["boy", "girl", "unknown"];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    post(route("pregnancy.store"));
  };

  const addBabyField = () => {
    setData("babies", [...data.babies, { gender: "" }]);
  };

  const removeBabyField = () => {
    data.babies.pop();
    setData("babies", [...data.babies]);
  };

  const handleBabyGenderChange = (index: number, gender: PregnancyGender) => {
    const newBabies = [...data.babies];
    newBabies[index].gender = gender;
    setData("babies", newBabies);
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
          Create New Pregnancy
        </h2>
      }
    >
      <Head title="Children" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="dateOfTerm" value="Date of Term" />

                <TextInput
                  id="dateOfTerm"
                  type="date"
                  name="dateOfTerm"
                  value={data.dateOfTerm}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("dateOfTerm", e.target.value)}
                />

                <InputError message={errors.dateOfTerm} className="mt-2" />
              </div>

              {data.babies.map((baby, index) => (
                <div key={index} className="mt-4">
                  <InputLabel
                    htmlFor={`babies.${index}.gender`}
                    value={`Baby ${index + 1} Gender`}
                  />

                  <SelectInput
                    name={`babies.${index}.gender`}
                    id={`babies.${index}.gender`}
                    className="mt-1 block w-full"
                    value={baby.gender}
                    onChange={(e) =>
                      handleBabyGenderChange(
                        index,
                        e.target.value as PregnancyGender
                      )
                    }
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map((gender, key) => (
                      <option value={gender} key={key}>
                        {gender}
                      </option>
                    ))}
                  </SelectInput>

                  <InputError
                    message={(errors as any)?.[`babies.${index}.gender`]}
                    className="mt-2"
                  />
                </div>
              ))}

              {data.babies.length > 6 ? (
                <div className="mt-4">
                  <InputError message={errors.babies} className="mt-2" />
                </div>
              ) : (
                ""
              )}

              <button
                type="button"
                onClick={addBabyField}
                className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
              >
                Add Another Baby
              </button>

              {data.babies.length > 1 ? (
                <button
                  type="button"
                  onClick={removeBabyField}
                  className="ml-2 mt-4 bg-red-500 text-white py-1 px-4 rounded"
                >
                  Remove Last Baby
                </button>
              ) : (
                ""
              )}

              <div className="mt-4 text-right">
                <Link
                  href={route("pregnancy.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <PrimaryButton onClick={confirmFormSubmiting}>Submit</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreate} className="p-6 bg-blue-50">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to create the pregnancy?
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
