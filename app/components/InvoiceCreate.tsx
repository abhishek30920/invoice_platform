'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarHeartIcon } from "lucide-react";
import { useState } from "react";
import SubmitButton from "./SubmitButton";


export default function InvoiceCreate() {
  const [ selectedDate ,setSelectedDate]=useState(new Date())
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1 w-fit mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              Draft
            </Badge>
            <Input placeholder="Test 123" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label>Invoice No.</Label>
            <div className="flex">
              <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
              <Input className="rounded-l-none" placeholder="INV-001" />
            </div>
          </div>


          <div>
            <Label>Currency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">Ubited States Dollar -- USD</SelectItem>

                <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label>
              From
            </Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Your Address" />
            </div>
          </div>
          <div>
            <Label>
              To
            </Label>
            <div className="space-y-2">
              <Input placeholder="Customer Name" />
              <Input placeholder="Customer Email" />
              <Input placeholder="Customer Address" />

            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div>     <Label>Date</Label></div>
       
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="">

                  <CalendarHeartIcon/>

                  {selectedDate?(new Intl.DateTimeFormat("en-US",{
                    dateStyle:"long"
                  }).format(selectedDate)):(<p>Pick a Date</p>)}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar selected={selectedDate} onSelect={(date)=>setSelectedDate(date || new Date())} mode="single" fromDate={new Date()}>

                </Calendar>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Invoice Due</Label>
            <Select>
              <SelectTrigger>
                  <SelectValue placeholder="Select Due Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on reciept</SelectItem>
                <SelectItem value="1">Due in 15 days</SelectItem>
                <SelectItem value="2">Due in 30 days</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </div>
                    <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                     <p className="col-span-6">Description</p>
                     <p className="col-span-2">Quantity</p>
                     <p className="col-span-2">Rate</p>
                     <p className="col-span-2">Amount</p>
                    

                    </div>


<div className="grid grid-cols-12 gap-4 mb-4">
  <div className="col-span-6">
    <Textarea placeholder="Enter Description" />
    </div>
    <div className="col-span-2">
      <Input placeholder="0"  type="number"/>
      </div>
      <div className="col-span-2">
      <Input placeholder="0"  type="number"/>
      </div>
      <div className="col-span-2">
      <Input placeholder="0"  type="number" disabled/>
      </div>
  </div>

<div className="flex justify-end">
  <div className="w-1/3">
  <div className="flex justify-between py-2">
    <span>Subtotal</span>
    <span>$5.00</span>
    </div>
    <div className="flex justify-between py-2 border-t">
      <span>Total (USD)</span>
      <span className="font-medium underline underline-offset-2">
        $5.00
      </span>
      </div>
  </div>
</div>
<div>
  <Label>Note</Label>
  <Textarea placeholder="Enter Note" />

</div>

<div className="flex items-center justify-end mt-6">
  <div><SubmitButton text="Send Invoice to Client"/></div>
 
</div>

      </CardContent>
    </Card>
  );
}