import FormBuilder from '@/app/admin/forms/edit/form-editor';
import { auth } from '@/auth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { prisma } from '@/lib/prisma';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }
  const { formId } = await params;
  const form = await prisma.form.findUnique({ where: { id: formId } });

  if (!form || form.userId !== session.user.id) {
    redirect('/admin/forms');
  }

  return (
    <div className="flex flex-col bg-background dark:bg-background">
      <div className="flex flex-row items-center w-full p-4 pb-0">
        <SidebarTrigger />
        <div className="pl-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/forms">Form</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">フォーム編集</h1>
          <FormBuilder
            session={session}
            form={{ ...form, schema: JSON.stringify(form.schema) }}
          />
        </div>
      </div>
    </div>
  );
}
