'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarHeartIcon } from "lucide-react";
import {  useState } from "react";
import {useActionState} from "react"
import SubmitButton from "./SubmitButton";
import { CreateInvoice } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchema";


interface iAppProps{
  firstName:string,
  lastName:string,
  address:string,
  email:string
}

export default function InvoiceCreate({address,email,firstName,lastName}:iAppProps) {
  function formatCurrency(amount:number,currency:string){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount)
  }
  const [lastResult, action] = useActionState(CreateInvoice,null);
console.log(action)
  console.log(lastResult)
  
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      console.log("Validating form data:", Object.fromEntries(formData));
      return parseWithZod(formData, { schema: invoiceSchema });
  }
  
  ,  
    
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Calculate total amount
  const [rate,setRate]=useState("")
  const [quantity,setQuantity]=useState("")
  
  const total = (Number(quantity) || 0) * (Number(rate) || 0);
console.log(total)
const [currency,setCurrency]=useState("USD")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Invoice</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        
      <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate className="space-y-8">

          <input type="hidden" name={fields.date.name} key={fields.date.name} value={selectedDate.toISOString()} />
          <input type="hidden" name={fields.total.name} key={fields.total.name} value={total} />
         
<input type="hidden" name={fields.status.name} value="PENDING" />
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm">Draft</Badge>
                <Input
                  name={fields.invoiceName.name}
                  key={fields.invoiceName.key}
                  defaultValue={fields.invoiceName.initialValue}
                  placeholder="Invoice Name"
                  className="w-full sm:w-64"
                />
              </div>
              <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="INV-001"
                />
              </div>
              <p className="text-sm text-red-500">{fields.invoiceNumber.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select name={fields.currency.name} defaultValue="USD" key={fields.currency.key} 
              onValueChange={(value)=>setCurrency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">United States Dollar -- USD</SelectItem>
                  <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.currency.errors}</p>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Select 
                name={fields.dueDate.name} 
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Due Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on receipt</SelectItem>
                  <SelectItem value="15">Due in 15 days</SelectItem>
                  <SelectItem value="30">Due in 30 days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          {/* From/To Section */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">From</Label>
              <div className="space-y-3">
                <div>
                  <Input
                    name={fields.fromName.name}
                    key={fields.fromName.key}
                    defaultValue={firstName + " " + lastName}
                    placeholder="Your Name"
                    
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.fromName.errors}</p>
                </div>
                <div>
                  <Input
                    name={fields.fromEmail.name}
                    key={fields.fromEmail.key}
                    defaultValue={email}
                    placeholder="Your Email"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.fromEmail.errors}</p>
                </div>
                <div>
                  <Input
                    name={fields.fromAddress.name}
                    key={fields.fromAddress.key}
                    defaultValue={address}
                    placeholder="Your Address"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.fromAddress.errors}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">To</Label>
              <div className="space-y-3">
                <div>
                  <Input
                    name={fields.clientName.name}
                    key={fields.clientName.key}
                    defaultValue={fields.clientName.initialValue}
                    placeholder="Customer Name"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.clientName.errors}</p>
                </div>
                <div>
                  <Input
                    name={fields.clientEmail.name}
                    key={fields.clientEmail.key}
                    defaultValue={fields.clientEmail.initialValue}
                    placeholder="Customer Email"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.clientEmail.errors}</p>
                </div>
                <div>
                  <Input
                    name={fields.clientAddress.name}
                    key={fields.clientAddress.key}
                    defaultValue={fields.clientAddress.initialValue}
                    placeholder="Customer Address"
                    className="w-full"
                  />
                  <p className="text-sm text-red-500 mt-1">{fields.clientAddress.errors}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <div>
            <Label>Invoice Date</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <CalendarHeartIcon className="mr-2 h-4 w-4" />
                  {selectedDate
                    ? new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  mode="single"
                  fromDate={new Date()}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-red-500">{fields.date.errors}</p>
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
        {/* Desktop Headers */}
        <div className="hidden sm:grid sm:grid-cols-12 gap-4 font-medium text-sm">
          <p className="col-span-6">Description</p>
          <p className="col-span-2">Quantity</p>
          <p className="col-span-2">Rate</p>
          <p className="col-span-2">Amount</p>
        </div>

        {/* Mobile + Desktop Form Fields */}
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-4">
          {/* Description */}
          <div className="sm:col-span-6">
            <Label className="sm:hidden mb-2">Description</Label>
            <Textarea
              name={fields.invoiceItemDescription.name}
              key={fields.invoiceItemDescription.key}
              defaultValue={fields.invoiceItemDescription.initialValue}
              placeholder="Enter Description"
              className="resize-none"
            />
            <p className="text-sm text-red-500 mt-1">{fields.invoiceItemDescription.errors}</p>
          </div>

          {/* Quantity */}
          <div className="sm:col-span-2">
            <Label className="sm:hidden mb-2">Quantity</Label>
            <Input
              name={fields.invoiceItemQuantity.name}
              key={fields.invoiceItemQuantity.key}
              defaultValue={fields.invoiceItemQuantity.initialValue}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              type="number"
              min="1"
            />
            <p className="text-sm text-red-500 mt-1">{fields.invoiceItemQuantity.errors}</p>
          </div>

          {/* Rate */}
          <div className="sm:col-span-2">
            <Label className="sm:hidden mb-2">Rate</Label>
            <Input
              name={fields.invoiceItemRate.name}
              key={fields.invoiceItemRate.key}
              defaultValue={fields.invoiceItemRate.initialValue}
              onChange={(e)=>setRate(e.target.value)}
              placeholder="0"
              type="number"
              min="1"
            />
            <p className="text-sm text-red-500 mt-1">{fields.invoiceItemRate.errors}</p>
          </div>

          {/* Amount */}
          <div className="sm:col-span-2">
            <Label className="sm:hidden mb-2">Amount</Label>
            <Input 
              value={formatCurrency(Number(total.toFixed(2)),currency)} 
          
              disabled 
              className="bg-muted"
            />
          </div>
        </div>
      </div>

          {/* Total Section */}
          <div className="flex justify-end">
            <div className="w-full sm:w-1/3">
              <div className="flex justify-between py-2">
                <span className="text-sm">Subtotal</span>
                <span className="font-medium">{formatCurrency(Number(total.toFixed(2)), currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="text-sm">Total ({currency})</span>
                <span className="font-medium text-lg">{formatCurrency(Number(total.toFixed(2)), currency)}</span>
              </div>
            </div>
          </div>
<div>
  <Label>Note</Label>
  <Textarea   name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}></Textarea>
</div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <SubmitButton text="Send Invoice"  />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}