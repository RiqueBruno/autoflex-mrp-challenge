import { useEffect, useState } from "react";
import { RawMaterialTable } from "../components/tables/RawMaterialTable";
import { VerticalChart } from "../components/chart/VerticalChart";
import { Plus } from "lucide-react";
import {
  createRawMaterial,
  deleteRawMaterial,
  fetchRawMaterials,
  updateRawMaterial,
} from "../features/rawMaterial/rawMaterial-slice";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import Swal from "sweetalert2";
import type {
  IRawMaterialRequest,
  IRawMaterialResponse,
} from "../types/IRawMaterial";
import { BaseModal } from "../components/ui/BaseModal";
import { FormRawMaterial } from "../components/form/FormRawMaterial";

export const RawMaterials = () => {
  const [openForm, setOpenForm] = useState(false);
  const [actualMaterial, setActualMaterial] = useState<IRawMaterialResponse>({
    id: 0,
    name: "",
    amount: 0,
  });
  const { rawMaterial } = useAppSelector((state) => state.rawMaterial);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchMaterials() {
      try {
        dispatch(fetchRawMaterials());
      } catch (error) {
        console.error("Error fetching raw materials: ", error);
      }
    }

    fetchMaterials();
  }, [dispatch]);

  const saveMaterialHandler = (data: IRawMaterialRequest) => {
    try {
      dispatch(createRawMaterial(data))
        .unwrap()
        .then((result) => {
          Swal.fire({
            title: "Success!",
            text: `Raw Material "${result.name}" has been created successfully!`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
        });
      setOpenForm(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while saving the raw material. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const updateMaterialHandler = (data: IRawMaterialRequest) => {
    try {
      dispatch(updateRawMaterial({ id: actualMaterial.id, data }))
        .unwrap()
        .then((result) => {
          Swal.fire({
            title: "Success!",
            text: `Raw Material "${result.name}" has been updated successfully!`,
            icon: "success",
            confirmButtonColor: "#22c55e",
          });
        });
      setOpenForm(false);
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while saving the raw material. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const editMaterialHandler = (material: IRawMaterialResponse) => {
    setActualMaterial(material);
    setOpenForm(true);
  };

  const deleteMaterialHandler = (material: IRawMaterialResponse) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you really want to delete the raw material <strong>"${material.name}"</strong>? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRawMaterial(material.id));
        Swal.fire({
          title: "Deleted!",
          text: `Raw Material "${material.name}" has been deleted.`,
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
      }
    });
  };

  const sortedMaterials = [...rawMaterial].sort((a, b) => b.amount - a.amount);
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
          <VerticalChart
            data={sortedMaterials.slice(0, 5)}
            dataP={[]}
            type="rawMaterial"
          />
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
          <button
            onClick={() => setOpenForm(true)}
            className="bg-brand-darkBlue text-text-inverted px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Raw Material
          </button>
        </header>
        <RawMaterialTable
          rawMaterials={rawMaterial}
          onEdit={editMaterialHandler}
          onDelete={deleteMaterialHandler}
        />
        {openForm && (
          <BaseModal
            title="Add New Raw Material"
            onClose={() => setOpenForm(false)}
          >
            <FormRawMaterial
              onSubmit={saveMaterialHandler}
              onClose={setOpenForm}
            />
          </BaseModal>
        )}
        {openForm && actualMaterial.id !== 0 && (
          <BaseModal
            title="Edit Raw Material"
            onClose={() => setOpenForm(false)}
          >
            <FormRawMaterial
              onSubmit={updateMaterialHandler}
              initialData={actualMaterial}
              onClose={setOpenForm}
            />
          </BaseModal>
        )}
      </section>
    </div>
  );
};
