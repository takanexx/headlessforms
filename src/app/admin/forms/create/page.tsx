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
import FormBuilder from './form-builder';

export default async function CreateFormPage() {
  const session = await auth();

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
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">フォーム作成</h1>
          <FormBuilder session={session} />
        </div>
      </div>
    </div>
  );
}
