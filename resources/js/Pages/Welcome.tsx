import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card } from "primereact/card";
import { PrimeIcons } from "primereact/api";

export default function Welcome({ auth }: PageProps) {
  return (
    <>
      <Head title="Welcome" />
      <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-black min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900">ParentPortal</div>
            <nav className="flex space-x-4">
              {auth.user ? (
                <Link
                  href={route("dashboard")}
                  className="px-4 py-2 text-black hover:bg-gray-200 rounded transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={route("login")}
                    className="px-4 py-2 text-black hover:bg-gray-200 rounded transition"
                  >
                    Log in
                  </Link>
                  <Link
                    href={route("register")}
                    className="px-4 py-2 text-black hover:bg-gray-200 rounded transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Welcome to ParentPortal!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              ParentPortal is your go-to solution for managing and tracking your
              child's developmental milestones, health records, and more. Join
              our community to stay connected and informed.
            </p>
            <div className="space-x-4">
              <Link
                href={route("register")}
                className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition"
              >
                Get Started
              </Link>
              <Link
                href={route("login")}
                className="bg-slate-50 text-gray-800 px-6 py-3 rounded-md hover:bg-slate-200 transition"
              >
                Log In
              </Link>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Why Choose ParentPortal?
            </h2>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <Card className="bg-white p-6 shadow-md rounded-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                  <i className={`pi ${PrimeIcons.CHART_BAR} text-4xl text-blue-500`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Track Milestones
                </h3>
                <p className="text-gray-600">
                  Monitor and record your child's important milestones and
                  achievements.
                </p>
              </Card>

              <Card className="bg-white p-6 shadow-md rounded-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                  <i className={`pi ${PrimeIcons.HEART} text-4xl text-green-500`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Health Records
                </h3>
                <p className="text-gray-600">
                  Keep track of medical appointments, vaccinations, and health
                  records in one place.
                </p>
              </Card>

              <Card className="bg-white p-6 shadow-md rounded-lg w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                  <i className={`pi ${PrimeIcons.USERS} text-4xl text-orange-500`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Stay Connected
                </h3>
                <p className="text-gray-600">
                  Connect with other parents and access valuable resources and
                  support.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-white py-6">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} ParentPortal. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
