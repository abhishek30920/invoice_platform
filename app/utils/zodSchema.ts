import {z} from 'zod'
export const OnboardingSchema=z.object({
  firstName:z.string().min(2,"First Name is required").max(50),
  lastName:z.string().min(2,"Last Name is required").max(50),
  address:z.string().min(2,"Address is required").max(50)

})

export const invoiceSchema=z.object({ 
  invoiceName:z.string().min(1,"Invoice Name is required"),
  total:z.number().min(1,"1$ is minimum"),
  status:z.enum(["PAID","PENDING"]),
  date:z.string().min(1,"Date is required"),
  dueDate:z.number().min(1,"Due Date is required"),
  fromName:z.string().min(1,"From Name is required"),
  fromEmail:z.string().email("Invalid Email"),
  fromAddress:z.string().min(1,"From Address is required"),
  clientName:z.string().min(1,"Client Name is required"),
  clientEmail:z.string().email("Invalid Email"),
  clientAddress:z.string().min(1,"Client Address is required"),
  currency:z.string().min(1,"Currency is required"),
  invoiceNumber:z.number().min(1,"Invoice Number is required of 1"),
  note:z.string().optional(),
  invoiceItemDescription:z.string().min(1,"Invoice Item Description is required"),
  invoiceItemQuantity:z.number().min(1,"Quantity is required"),
  invoiceItemRate:z.number().min(1,"Rate is min 1"),

})