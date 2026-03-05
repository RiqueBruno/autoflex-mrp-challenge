import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { IRawMaterialResponse } from "../types/IRawMaterial";
import { RawMaterialTable } from "../components/tables/RawMaterialTable";
import { VerticalChart } from "../components/chart/VerticalChart";
import { Plus } from "lucide-react";

export const RawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState<IRawMaterialResponse[]>([]);
  const [fiveBestMaterials, setFiveBestMaterials] = useState<
    IRawMaterialResponse[]
  >([]);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await api.rawMaterials.getAll();
        setRawMaterials(response || []);
        const sortedMaterials = [...(response || [])].sort(
          (a, b) => b.amount - a.amount,
        );
        setFiveBestMaterials(sortedMaterials.slice(0, 5));
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    }

    fetchMaterials();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold text-text-title">Raw Materials</h1>
        <p className="text-text-muted mt-1">
          Manage the inventory and raw materials of the factory.
        </p>
      </header>
      <section aria-labelledby="dash-title">
        <h2 id="dash-title" className="sr-only">
          Stock Summary
        </h2>
        <div className="bg-surface-card border border-border-light rounded-lg shadow-sm p-6 w-full lg:w-1/2 h-72">
          <h3 className="text-sm font-semibold text-text-main mb-4 uppercase tracking-wider">
            Top 5 Raw Materials in Stock
          </h3>
          <VerticalChart data={fiveBestMaterials} />
        </div>
      </section>

      <section aria-labelledby="table-title">
        <header className="flex justify-between items-center flex-col md:flex-row mb-4">
          <h2
            id="table-title"
            className="text-xl font-semibold text-text-title"
          >
            Raw Materials List
          </h2>
          <button className="bg-brand-darkBlue text-text-inverted px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> New Raw Material
          </button>
        </header>
        <RawMaterialTable rawMaterials={rawMaterials} />
      </section>
    </div>
  );
};
