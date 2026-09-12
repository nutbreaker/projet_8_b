import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
 
describe('not-found', () => {
  it('should contain an <h2> with the value 404', () => {
    render(<NotFound />);
 
    const heading = screen.getByRole('heading', { level: 2 });
 
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('404');
  });

  it('should contain 2 links', () => {
    render(<NotFound />);
 
    const links = screen.queryAllByRole('link');
    
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe('Accueil');
    expect(links[1].textContent).toBe('Logements');
  });
})