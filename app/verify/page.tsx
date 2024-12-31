import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <Card className="w-[400px] px-8 py-6 shadow-lg bg-white rounded-lg">
        <CardHeader className="text-center">
          <Mail className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-2">
            We have sent a verification link to your email. Please click on the
            link to verify your email and activate your account.
          </CardDescription>
        </CardHeader>
        <div className="mt-6 text-center">
          <Link href="/">
          <Button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"><ArrowLeft className="size-4 mr-2"/>Back to home </Button>
             
        
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive an email? Check your spam folder
          </p>
        </div>
      </Card>
    </div>
  );
}
