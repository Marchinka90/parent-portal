import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DefaultButton from "@/Components/DefaultButton";
import ButtonLink from "@/Components/ButtonLink";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { PregnancyProps } from "@/types";
import { PregnancyGender, PregnancyForm } from "@/types/Pregnancy";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";

export default function Create({ auth, pregnancy }: PregnancyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data, setData, put: update, errors } = useForm<PregnancyForm>({
    dateOfTerm: pregnancy.date_of_term,
    babies: pregnancy.babies,
  });

  const genderOptions: PregnancyGender[] = ["boy", "girl", "unknown"];

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    update(route("pregnancy.update", pregnancy.id));
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

  const handleDateChange = (e: any) => {
    if (e.value) {
      const date = new Date(Date.UTC(e.value.getFullYear(), e.value.getMonth(), e.value.getDate()));
      setData("dateOfTerm", date.toISOString().split('T')[0]);
    } else {
      setData("dateOfTerm", "");
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
          Pregnancy
        </h2>
      }
    >
      <Head title="Pregnancy" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Card className="shadow-sm" title="Update Pregnancy Data">
            <form onSubmit={(e) => e.preventDefault()} className="p-4 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row">
              <div className="w-1/2 mr-5">
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
                    {((errors as any)?.[`babies.${index}.gender`]) && (
                        <Message severity="error" text={(errors as any)[`babies.${index}.gender`]} className="mt-2" />
                      )}
                  </div>
                ))}

                {data.babies.length > 6 ? (
                  <div className="mt-4">
                    {(errors.babies) && (
                        <Message severity="error" text={errors.babies} className="mt-2" />
                      )}
                  </div>
                ) : (
                  ""
                )}

                <DefaultButton
                  type="button"
                  onClick={addBabyField}
                  className="mt-4 bg-blue-500 text-white py-1 px-4 rounded"
                >
                  <span className="p-menuitem-icon pi pi-fw pi-plus mr-1"></span>
                  Add Baby
                </DefaultButton>

                {data.babies.length > 1 ? (
                    <DangerButton
                      type="button"
                      onClick={removeBabyField}
                      className="ml-2 mt-3 bg-red-500 text-white py-1 px-4 rounded"
                    >
                      <span className="p-menuitem-icon pi pi-fw pi-minus mr-1"></span>
                      Remove Baby
                    </DangerButton>
                  ) : (
                    ""
                  )}
                </div>
              
                <div className="w-1/2">
                  <label htmlFor="dateOfTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date of Term
                  </label>
                  <Calendar
                    id="dateOfTerm"
                    value={data.dateOfTerm ? new Date(data.dateOfTerm) : null}
                    onChange={handleDateChange}
                    dateFormat="yy-mm-dd"
                    className={classNames("mt-1 block w-full", {"p-invalid": errors.dateOfTerm})}
                    inline 
                    showWeek
                  />
                  {errors.dateOfTerm && <Message severity="error" text={errors.dateOfTerm} className="mt-2 w-full" />}
                </div>
            </div>
            <div className="mt-4 text-right">
                <ButtonLink
                  href={route("pregnancy.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  <span className="p-menuitem-icon pi pi-fw pi-arrow-left mr-1"></span>
                  Back
                </ButtonLink>
                <PrimaryButton onClick={confirmFormSubmiting}>
                  <span className="p-menuitem-icon pi pi-fw pi-check mr-1"></span>
                  Update
                </PrimaryButton>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleUpdate} className="p-6 bg-blue-50">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to update the pregnancy?
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
