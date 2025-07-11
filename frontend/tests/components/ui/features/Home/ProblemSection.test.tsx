import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemSection from '@/components/ui/features/homePage/ProblemSection';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className} data-testid="mock-motion-div">
        {children}
      </div>
    ),
    h2: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <h2 className={className} data-testid="mock-motion-h2">
        {children}
      </h2>
    ),
    p: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <p className={className} data-testid="mock-motion-p">
        {children}
      </p>
    ),
    h3: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <h3 className={className} data-testid="mock-motion-h3">
        {children}
      </h3>
    ),
    span: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className} data-testid="mock-motion-span">
        {children}
      </span>
    ),
  },
}));

jest.mock('lucide-react', () => ({
  AlertTriangle: () => <svg data-testid="icon-alert-triangle" />,
  Target: () => <svg data-testid="icon-target" />,
  FileX: () => <svg data-testid="icon-file-x" />,
}));

describe('<ProblemSection />', () => {
  // 1. Test de renderizado básico y presencia de elementos principales
  it('renders the main heading, subheading, and "Problema Común" badge', () => {
    render(<ProblemSection />);

    expect(screen.getByText('Problema Común')).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-alert-triangle').length).toBeGreaterThanOrEqual(1);

    const mainHeading = screen.getByRole('heading', { level: 2, name: /¿Por qué tu CV no está generando entrevistas?/i });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('generando entrevistas?'); // Ensure the spanned text is part of it

    expect(screen.getByText(/Muchos profesionales talentosos luchan por conseguir entrevistas debido a CVs mal optimizados/i)).toBeInTheDocument();
  });

  // 2. Test para la card "Formato Inadecuado"
  it('renders the "Formato Inadecuado" card with its icon and description', () => {
    render(<ProblemSection />);

    expect(screen.getByRole('heading', { level: 3, name: /Formato Inadecuado/i })).toBeInTheDocument();
    expect(screen.getByText(/Los sistemas ATS rechazan CVs con formatos complejos o poco legibles/i)).toBeInTheDocument();

    expect(screen.getByTestId('icon-file-x')).toBeInTheDocument();
  });

  // 3. Test para la card "Falta de Palabras Clave"
  it('renders the "Falta de Palabras Clave" card with its icon and description', () => {
    render(<ProblemSection />);

    expect(screen.getByRole('heading', { level: 3, name: /Falta de Palabras Clave/i })).toBeInTheDocument();
    expect(screen.getByText(/Sin las palabras clave correctas, tu CV nunca llegará a manos de un reclutador/i)).toBeInTheDocument();

    expect(screen.getByTestId('icon-target')).toBeInTheDocument();
  });

  // 4. Test para la card "Contenido Genérico"
  it('renders the "Contenido Genérico" card with its icon and description', () => {
    render(<ProblemSection />);

    expect(screen.getByRole('heading', { level: 3, name: /Contenido Genérico/i })).toBeInTheDocument();
    expect(screen.getByText(/CVs que no destacan logros específicos ni se adaptan al puesto deseado/i)).toBeInTheDocument();
    
    const alertIcons = screen.getAllByTestId('icon-alert-triangle');
    expect(alertIcons.length).toBeGreaterThanOrEqual(2); 
  });

  // 5. Test para verificar que se renderizan exactamente 3 tarjetas de problemas
  it('renders exactly three problem cards', () => {
    render(<ProblemSection />);

    const cardTitles = screen.getAllByRole('heading', { level: 3 });
    expect(cardTitles).toHaveLength(3);
  });
});