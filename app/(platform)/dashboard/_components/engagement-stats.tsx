"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { SectionCard } from "@/app/(platform)/_components/shared";

const dataMap = {
  "7": [
    { day: "Apr 14", Lajkovi: 12, Komentari: -2, Poruke: 5 },
    { day: "Apr 15", Lajkovi: 15, Komentari: -3, Poruke: 6 },
    { day: "Apr 16", Lajkovi: 17, Komentari: -4, Poruke: 8 },
    { day: "Apr 17", Lajkovi: 16, Komentari: -5, Poruke: 7 },
    { day: "Apr 18", Lajkovi: 14, Komentari: -3, Poruke: 9 },
    { day: "Apr 19", Lajkovi: 18, Komentari: -1, Poruke: 10 },
    { day: "Apr 20", Lajkovi: 20, Komentari: 0, Poruke: 12 },
  ],
  "14": [
    { day: "Apr 07", Lajkovi: 8, Komentari: -4, Poruke: 4 },
    { day: "Apr 08", Lajkovi: 9, Komentari: -3, Poruke: 5 },
    { day: "Apr 09", Lajkovi: 10, Komentari: -2, Poruke: 6 },
    { day: "Apr 10", Lajkovi: 11, Komentari: -1, Poruke: 7 },
    { day: "Apr 11", Lajkovi: 12, Komentari: 0, Poruke: 8 },
  ],
};

export const EngagementStats = () => {
  const [range, setRange] = useState<"7" | "14" | string>("7");
  //@ts-ignore
  const data = dataMap?.[range || "7"];

  return (
    <SectionCard
      card_header={{
        header_card_title: "📊 Engagement statistika",
        header_card_description: `Prikaz engagement statistike za poslednjih ${range} dana.`,
        children: (
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className=" h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Poslednjih 7 dana</SelectItem>
              <SelectItem value="14">Poslednjih 14 dana</SelectItem>
            </SelectContent>
          </Select>
        ),
      }}
      card_content={{
        children: (
          <div className={`h-[350px] w-full pb-3 mt-3 mx-3`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  stroke="#ccc"
                  padding={{ left: 0, right: 0 }}
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Lajkovi"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Komentari"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Poruke"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ),
      }}
    />
  );
};
