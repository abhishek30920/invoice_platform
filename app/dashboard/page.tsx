
import { signOut } from "../utils/auth"
import { requireAuth } from "../utils/hooks"
import Layout from "./layout"


export default async function  Dashboard(){
  const session=await requireAuth()
  return(
    <>
    <h1>hello from dashboard</h1>
   
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
    </>

  )
}
