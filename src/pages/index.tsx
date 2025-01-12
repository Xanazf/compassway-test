import { Link } from "@nextui-org/link";

import { title } from "@components/primitives";
import DefaultLayout from "@layouts/default";
import { useLogin } from "@src/hooks/login-state";

export default function IndexPage() {
  const loginUtil = useLogin();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Compassway</h1>

        {loginUtil.isLoggedIn ? (
          <h2>Hello</h2>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </section>
    </DefaultLayout>
  );
}
