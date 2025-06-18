export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-10 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CV Optimizer AI. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
