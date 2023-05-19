import { Login } from "@/components/Login";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Login Page</title>
      </Head>
      <Login />
    </main>
  );
}
