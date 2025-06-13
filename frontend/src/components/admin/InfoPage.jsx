import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InfoPage = () => {
  const [cod, setCod] = useState("");
  const [online, setOnline] = useState("");
  const [data, setData] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setCod(data.cod);
      setOnline(data.online);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const paymentData = [
    { method: "online", users: online, fill: "#03bafc" },
    { method: "cod", users: cod, fill: "#8c1251" },
  ];

  const paymentChartConfig = {
    users: {
      label: "Users",
    },
    online: {
      label: "Online",
      color: "hls(var(--chart1))",
    },
    cod: {
      label: "COD",
      color: "hls(var(--chart2))",
    },
  };

  const paymentPercentage = paymentData.map((data) => ({
    ...data,
    percentage: parseFloat(((data.users / (cod + online)) * 100).toFixed(2)),
  }));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie chart - Payment Methods</CardTitle>
          <CardDescription>Payment Breakdown</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={paymentChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={paymentData}
                dataKey={"users"}
                nameKey={"method"}
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline={"middle"}
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-muted-foreground text-xl font-bold"
                          >
                            {cod + online} Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing total users for payment methods
          </div>
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie chart - Payment Percentage</CardTitle>
          <CardDescription>Payment Breakdown</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={paymentChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={paymentPercentage}
                dataKey={"percentage"}
                nameKey={"method"}
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline={"middle"}
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-muted-foreground text-xl font-bold"
                          >
                            100%
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Dispaying percentage distribution of payment methods
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bar chart - Products Sold</CardTitle>
          <CardDescription>Units Sold for each products</CardDescription>
        </CardHeader>

        <CardContent>
          <BarChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis
              dataKey={"sold"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis />
            <Tooltip
              cursor={{ fill: "#f0f0f0" }}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, sold } = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        border: "1px solid #ddd",
                        fontSize: "12px",
                      }}
                    >
                      <strong>{name}</strong>
                      <br />
                      <span>Sold: {sold}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey={"sold"} fill="#8884d8" radius={8} />
          </BarChart>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Hover over a bar to see the product details
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoPage;
