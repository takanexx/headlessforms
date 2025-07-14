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
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function EditFormPage({
  params,
}: {
  params: { formId: string };
}) {
  const session = await auth();
  const { formId } = params;
  const baseUrl = 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/form/retrieve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formId }),
  });
  const form = await response.json();

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
          <FormBuilder session={session} form={form} />
        </div>
      </div>
    </div>
  );
}
