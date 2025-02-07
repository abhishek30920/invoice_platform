'use client'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Line, ResponsiveContainer, XAxis, YAxis,LineChart } from "recharts";
import { type } from './../../components/ui/calendar';
interface iAppProps{
  data:{date:string,amount:number}[]
}






export function Graph({data}:iAppProps) {
  return (
    <ChartContainer config={{
      amount:{
        label:"Amount",
        color:"hsl(var(--primary))"
      }
    }}
    className="min-h-[300px]"

  
  ><ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <ChartTooltip content={<ChartTooltipContent indicator="line"/>}/>
      <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer></ChartContainer>
  )
}