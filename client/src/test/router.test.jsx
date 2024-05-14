import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { router } from '../router/router';
import { describe, it, expect} from 'jest';


describe('router', () => {
  it('should render the Home component for the root path', () => {
    render(<MemoryRouter initialEntries={['/']}>{router}</MemoryRouter>);

    expect(screen.getByText('LeanKata')).toBeInTheDocument();
  });

  it('should render the Challenge component for the /challenge path', () => {
    render(<MemoryRouter initialEntries={['/challenge']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo desafío')).toBeInTheDocument();
  });

  it('should render the ActualState component for the /actualstate path', () => {
    render(<MemoryRouter initialEntries={['/actualstate']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo estado actual')).toBeInTheDocument();
  });

  it('should render the Obstacle component for the /obstacle path', () => {
    render(<MemoryRouter initialEntries={['/obstacle']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo obstáculo')).toBeInTheDocument();
  });

  it('should render the Hypothesis component for the /hypothesis path', () => {
    render(<MemoryRouter initialEntries={['/hypothesis']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear una nueva hipótesis')).toBeInTheDocument();
  });

  it('should render the Experiment component for the /experiment path', () => {
    render(<MemoryRouter initialEntries={['/experiment']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo experimento')).toBeInTheDocument();
  });

  it('should render the Task component for the /task path', () => {
    render(<MemoryRouter initialEntries={['/task']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear una nueva tarea')).toBeInTheDocument();
  });

  it('should render the Result component for the /result path', () => {
    render(<MemoryRouter initialEntries={['/result']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo resultado')).toBeInTheDocument();
  });

  it('should render the Learning component for the /learning path', () => {
    render(<MemoryRouter initialEntries={['/learning']}>{router}</MemoryRouter>);

    expect(screen.getByText('Crear un nuevo aprendizaje')).toBeInTheDocument();
  });

  it('should render the EditLearning component for the /editlearning/:id path', () => {
    render(<MemoryRouter initialEntries={['/editlearning/1']}>{router}</MemoryRouter>);

    expect(screen.getByText('Editar aprendizaje')).toBeInTheDocument();
  });

  it('should render the EditResult component for the /editresult/:id path', () => {
    render(<MemoryRouter initialEntries={['/editresult/1']}>{router}</MemoryRouter>);

    expect(screen.getByText('Editar resultado')).toBeInTheDocument();
  });

  it('should render the EditObstacle component for the /editobstacle/:id path', () => {
    render(<MemoryRouter initialEntries={['/editobstacle/1']}>{router}</MemoryRouter>);

    expect(screen.getByText('Editar obstáculo')).toBeInTheDocument();
  });

  it('should render the EditTask component for the /edittask/:id path', () => {
    render(<MemoryRouter initialEntries={['/edittask/1']}>{router}</MemoryRouter>);

    expect(screen.getByText('Editar tarea')).toBeInTheDocument();
  });

  it('should render the Card component for the /card/:id path', () => {
    render(<MemoryRouter initialEntries={['/card/1']}>{router}</MemoryRouter>);

    expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('should render the NotFound component for any other path', () => {
    render(<MemoryRouter initialEntries={['/notfound']}>{router}</MemoryRouter>);

    expect(screen.getByText('Página no encontrada')).toBeInTheDocument();
  });
});
