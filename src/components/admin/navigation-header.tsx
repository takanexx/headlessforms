import { ThemeToggleButton } from '../theme-toggle-button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full border-b bg-background dark:bg-background px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <img src="/next.svg" alt="Next.js" className="h-8 w-8" />
      </div>
      <nav className="flex items-center gap-2">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Docs
        </a>
        <ThemeToggleButton />
      </nav>
    </header>
  );
}
