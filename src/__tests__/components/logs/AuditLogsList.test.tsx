import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuditLogsList } from '@/components/logs/AuditLogsList';
import { mockAuditLogs } from '../../mocks/supabaseMock';

describe('AuditLogsList', () => {
  beforeEach(() => {
    render(<AuditLogsList />);
  });

  it('renders the audit logs section', () => {
    expect(screen.getByText('Audit Logs')).toBeInTheDocument();
  });

  it('displays audit logs from Supabase', async () => {
    await waitFor(() => {
      mockAuditLogs.forEach(log => {
        expect(screen.getByText(log.table_name)).toBeInTheDocument();
        expect(screen.getByText(log.operation)).toBeInTheDocument();
      });
    });
  });

  it('shows severity indicators correctly', async () => {
    await waitFor(() => {
      const warningLog = mockAuditLogs.find(log => log.severity === 'warning');
      const infoLog = mockAuditLogs.find(log => log.severity === 'info');
      
      if (warningLog) {
        expect(screen.getByTestId(`severity-${warningLog.id}`)).toHaveClass('bg-yellow-100');
      }
      if (infoLog) {
        expect(screen.getByTestId(`severity-${infoLog.id}`)).toHaveClass('bg-blue-100');
      }
    });
  });
});