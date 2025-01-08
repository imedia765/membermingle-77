import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LogsTabs } from '@/components/logs/LogsTabs';
import { LOGS_TABS } from '@/constants/logs';

describe('LogsTabs', () => {
  const mockOnTabChange = vi.fn();

  const defaultProps = {
    activeTab: LOGS_TABS.AUDIT,
    onTabChange: mockOnTabChange
  };

  beforeEach(() => {
    render(<LogsTabs {...defaultProps} />);
  });

  it('renders all tab options', () => {
    expect(screen.getByRole('tab', { name: /audit logs/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /monitoring logs/i })).toBeInTheDocument();
  });

  it('shows active tab correctly', () => {
    const auditTab = screen.getByRole('tab', { name: /audit logs/i });
    expect(auditTab).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onTabChange when clicking a tab', () => {
    const monitoringTab = screen.getByRole('tab', { name: /monitoring logs/i });
    fireEvent.click(monitoringTab);
    expect(mockOnTabChange).toHaveBeenCalledWith(LOGS_TABS.MONITORING);
  });
});