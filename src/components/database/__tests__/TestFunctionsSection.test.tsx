import { render, screen, fireEvent } from '@testing-library/react';
import { TestFunctionsSection } from '../TestFunctionsSection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Mock the dependencies
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    rpc: jest.fn()
  }
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn()
}));

describe('TestFunctionsSection', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (supabase.rpc as jest.Mock).mockReset();
  });

  it('renders all database test functions', () => {
    render(<TestFunctionsSection />);
    
    expect(screen.getByText('merge_duplicate_collectors')).toBeInTheDocument();
    expect(screen.getByText('sync_collector_ids')).toBeInTheDocument();
    expect(screen.getByText('normalize_collector_name')).toBeInTheDocument();
  });

  it('handles successful test execution', async () => {
    (supabase.rpc as jest.Mock).mockResolvedValue({
      data: [{ merged_count: 2, details: 'Successfully merged' }],
      error: null
    });

    render(<TestFunctionsSection />);
    
    const testButton = screen.getAllByText('Run Test')[0];
    fireEvent.click(testButton);

    expect(supabase.rpc).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Test Successful',
      description: expect.any(String)
    });
  });

  it('handles test execution failure', async () => {
    const mockError = new Error('Test failed');
    (supabase.rpc as jest.Mock).mockRejectedValue(mockError);

    render(<TestFunctionsSection />);
    
    const testButton = screen.getAllByText('Run Test')[0];
    fireEvent.click(testButton);

    expect(supabase.rpc).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Test Failed',
      description: expect.any(String),
      variant: 'destructive'
    });
  });
});