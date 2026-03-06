import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { IRawMaterialResponse } from "../../types/IRawMaterial";
import type { IProductResponse } from "../../types/IProduct";

interface SimpleBarChartProps {
  type: "rawMaterial" | "product";
  data: IRawMaterialResponse[];
  dataP: IProductResponse[];
}

export const VerticalChart = ({ type, data, dataP }: SimpleBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={type === "rawMaterial" ? data : dataP}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="#e5e7eb"
        />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          width={140}
          tick={{ fontSize: 13, fill: "#4b5563" }}
        />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
        <Bar
          dataKey={type === "rawMaterial" ? "amount" : "value"}
          fill="#1d4ed8"
          radius={[0, 4, 4, 0]}
          name={type === "rawMaterial" ? "Stock quantity" : "Total value"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
