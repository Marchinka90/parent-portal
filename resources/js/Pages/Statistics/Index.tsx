import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { StatisticsProps } from "@/types";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";

export default function Index({
  auth,
  numberOfUsers,
  numberOfPregnancies,
  numberOfChildren,
  averageNumberOfChildrenPerParent,
  childrenDistribution,
  pregnancyDistribution,
}: StatisticsProps) {

  // Data for general statistics pie chart
  const generalStatsData = {
    labels: ["Users", "Pregnancies", "Children", "Avg. Children per Parent"],
    datasets: [
      {
        data: [
          numberOfUsers,
          numberOfPregnancies,
          numberOfChildren,
          averageNumberOfChildrenPerParent,
        ],
        backgroundColor: ["#1E88E5", "#26A69A", "#FFCA28", "#D32F2F"],
        borderColor: ["#0D47A1", "#00796B", "#F57F17", "#C62828"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 1.3,
    plugins: {
      legend: {
        labels: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: string; raw: string }) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        grid: {
          color: '#eee',
        },
        ticks: {
          color: '#333',
        },
      },
    },
  };

  // Data for age distribution chart
  const ageDistributionData = {
    labels: ["Under 1 Year", "1-6 Years", "7-18 Years"],
    datasets: [
      {
        label: "Age Distribution",
        backgroundColor: "#1E88E5",
        data: [
          childrenDistribution.underOneYear,
          childrenDistribution.oneToSixYears,
          childrenDistribution.sevenToEighteenYears,
        ],
      },
    ],
  };

  // Data for pregnancy distribution chart
  const pregnancyDistributionData = {
    labels: Object.keys(pregnancyDistribution),
    datasets: [
      {
        label: "Pregnancies Ending",
        backgroundColor: "#26A69A",
        data: Object.values(pregnancyDistribution),
      },
    ],
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Statistics
        </h2>
      }
    >
      <Head title="Statistics" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-6 w-full">
            <Card className="shadow-sm mb-6 w-full" title="General Statistics">
              <div className="relative h-128">
                <Chart type="bar" data={generalStatsData} options={options} />
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <Card className="flex-1 mb-6 md:mb-0" title="Age Distribution of Children">
              <h3 className="text-lg font-semibold mb-4">
                
              </h3>
              <div className="relative h-64">
                <Chart type="bar" data={ageDistributionData} />
              </div>
            </Card>

            <Card className="flex-1 mb-6 md:mb-0" title="Pregnancies Ending in Next 9 Months">
              
              <div className="relative h-64">
                <Chart type="line" data={pregnancyDistributionData} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
