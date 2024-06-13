"use client";
import TripForm from "@/app/dashboard/components/TripForm";

/**
 * Componente y página que representa a la página del Dashboard
 * @returns 
 */
const DashboardPage: React.FC = () => {
  
  return (
    <div className="bg-gray-200/50 ph:mb-16 md:mb-0">
      <div>
        <TripForm />
      </div>
    </div>
  );
};

export default DashboardPage;
