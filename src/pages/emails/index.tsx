import { title } from "@components/primitives";
import ProtectedLayout from "@layouts/protected";

export default function EmailsPage() {
  return (
    <ProtectedLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Emails</h1>
        </div>
      </section>
    </ProtectedLayout>
  );
}
