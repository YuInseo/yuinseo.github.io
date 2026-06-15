import ViewCounter from './ViewCounter';

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-2 text-xs text-[var(--t5)]">
      <p>© 2025 yuinseo</p>
      <a href="mailto:inseo0121@gmail.com" className="mt-1 block transition-colors hover:text-[var(--t3)]">
        inseo0121@gmail.com
      </a>
      <ViewCounter />
    </footer>
  );
}
