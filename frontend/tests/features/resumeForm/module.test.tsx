import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResumeForm from '@/components/ui/features/resumeForm/module';
import userEvent from '@testing-library/user-event';
jest.mock('@/utils/resumeForm/resumeFormUtils', () => ({
  validatePDFFile: jest.fn(),
  getUniqueFileName: jest.fn(),
  uploadToS3: jest.fn(),
  generateSuggestions: jest.fn(),
}));

import {
  validatePDFFile,
  getUniqueFileName,
  uploadToS3,
  generateSuggestions,
} from '@/utils/resumeForm/resumeFormUtils';

describe('<ResumeForm />', () => {
  const setup = () => {
    const setSuggestions = jest.fn();
    const setFileUrl = jest.fn();
    const setFileError = jest.fn();
    const setSuggestionsLoading = jest.fn();
    const setIsUploading = jest.fn();

    render(
      <ResumeForm
        setSuggestions={setSuggestions}
        setFileUrl={setFileUrl}
        setFileError={setFileError}
        setSuggestionsLoading={setSuggestionsLoading}
        setIsUploading={setIsUploading}
        isUploading={false}
      />
    );

    return {
      setSuggestions,
      setFileUrl,
      setFileError,
      setSuggestionsLoading,
      setIsUploading,
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('se monta correctamente', () => {
    setup();
    expect(screen.getByLabelText(/sube tu cv/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción del puesto/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generar sugerencias/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument();
  });

  it('acepta archivos válidos, sube a S3 y guarda URL', async () => {
    const { setFileUrl, setFileError, setIsUploading } = setup();

    const file = new File(['dummy'], 'cv.pdf', { type: 'application/pdf' });

    (validatePDFFile as jest.Mock).mockReturnValue(true);
    (getUniqueFileName as jest.Mock).mockReturnValue('unique-cv.pdf');
    (uploadToS3 as jest.Mock).mockResolvedValue('https://s3.com/unique-cv.pdf');

    const input = screen.getByLabelText(/sube tu cv/i) as HTMLInputElement;
    await userEvent.upload(input, file);

    expect(setIsUploading).toHaveBeenCalledWith(true);
    expect(uploadToS3).toHaveBeenCalledWith(file, 'unique-cv.pdf');

    await waitFor(() => {
      expect(setFileUrl).toHaveBeenCalledWith('https://s3.com/unique-cv.pdf');
      expect(setIsUploading).toHaveBeenLastCalledWith(false);
    });
  });

  it('llama a generateSuggestions y actualiza estado', async () => {
    const { setSuggestions, setSuggestionsLoading } = setup();

    const file = new File(['cv'], 'cv.pdf', { type: 'application/pdf' });
    (validatePDFFile as jest.Mock).mockReturnValue(true);
    (getUniqueFileName as jest.Mock).mockReturnValue('cv.pdf');
    (uploadToS3 as jest.Mock).mockResolvedValue('https://s3.com/cv.pdf');

    (generateSuggestions as jest.Mock).mockResolvedValue({ improvement: 'OK' });

    const input = screen.getByLabelText(/sube tu cv/i) as HTMLInputElement;
    await userEvent.upload(input, file);

    const textarea = screen.getByLabelText(/descripción del puesto/i);
    await userEvent.type(textarea, 'Frontend Developer');

    const submit = screen.getByRole('button', { name: /generar sugerencias/i });
    await userEvent.click(submit);

    expect(setSuggestionsLoading).toHaveBeenCalledWith(true);
    await waitFor(() => {
      expect(generateSuggestions).toHaveBeenCalledWith(file, 'Frontend Developer');
      expect(setSuggestions).toHaveBeenCalledWith({ improvement: 'OK' });
      expect(setSuggestionsLoading).toHaveBeenCalledWith(false);
    });
  });

  it('resetea campos al hacer clic en limpiar', async () => {
    const { setFileError, setFileUrl } = setup();

    const textarea = screen.getByLabelText(/descripción del puesto/i);
    await userEvent.type(textarea, 'QA Tester');

    const limpiar = screen.getByRole('button', { name: /limpiar/i });
    await userEvent.click(limpiar);

    expect((textarea as HTMLTextAreaElement).value).toBe('');
    expect(setFileError).toHaveBeenCalledWith(null);
    expect(setFileUrl).toHaveBeenCalledWith(null);
  });

  it('deshabilita el botón de generar sugerencias sin input válido', () => {
    setup();
    const button = screen.getByRole('button', { name: /generar sugerencias/i });
    expect(button).toBeDisabled();
  });
});
