"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/SubmitButton";
import { useActionState } from "react";
import { OnboardUser } from "../action";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "../utils/zodSchema";
export default function Onboarding() {
  const [lastResult,action]=useActionState(OnboardUser,undefined)
  const [form, fields]=useForm({
      lastResult,
      onValidate({formData}){
          return parseWithZod(formData,{
            schema:OnboardingSchema
          })
      },
      shouldValidate:"onBlur",
      shouldRevalidate:"onInput"
  })
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-lg p-4 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">You're Almost Finished!</CardTitle>
          <CardDescription>
            Enter your information to complete the onboarding process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
            {/* Grid layout for the form fields */}
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input  name={fields.firstName.name} key={fields.firstName.key }
                   defaultValue={fields.firstName.initialValue} id="firstName" type="text" placeholder="Enter your first name" />
                   <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                </div>
                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input name={fields.lastName.name} key={fields.lastName.key }
                   defaultValue={fields.lastName.initialValue}  id="lastName" type="text" placeholder="Enter your last name" />
                      <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
                </div>
              </div>
              {/* Address Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <Input name={fields.address.name} key={fields.address.key }
                   defaultValue={fields.address.initialValue} id="address" type="text" placeholder="Enter your address" />
                       <p className="text-red-500 text-sm">{fields.address.errors}</p>

              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <SubmitButton text="Finish Onboarding" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
