import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, EmailRecord } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-email',
  imports: [FormsModule],
  templateUrl: './email.html',
  styleUrl: './email.scss'
})
export class EmailPage implements OnInit {
  private api = inject(ApiService);
  private toast = inject(ToastService);

  emailInput = signal('');
  editEmailInput = signal('');
  loading = signal(false);
  historyLoading = signal(false);
  result = signal<EmailRecord | null>(null);
  history = signal<EmailRecord[]>([]);
  deletedRecords = signal<EmailRecord[]>([]);
  editingId = signal<string | null>(null);
  activeTab = signal<'verify' | 'history'>('verify');

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.historyLoading.set(true);
    this.api.getEmails().subscribe({
      next: (data) => {
        this.history.set(data);
        // Preserve deleted records that backend no longer returns
        const activeIds = new Set(data.map(r => r.id));
        this.deletedRecords.update(prev => prev.filter(r => !activeIds.has(r.id)));
        this.historyLoading.set(false);
      },
      error: () => { this.toast.show('Error al cargar historial', 'error'); this.historyLoading.set(false); }
    });
  }

  verify() {
    const email = this.emailInput().trim();
    if (!email) return;
    this.loading.set(true);
    this.result.set(null);
    this.api.verifyEmail(email).subscribe({
      next: (data) => {
        this.result.set(data);
        this.loading.set(false);
        this.toast.show('Email verificado correctamente', 'success');
        this.loadHistory();
      },
      error: () => { this.toast.show('Error al verificar email', 'error'); this.loading.set(false); }
    });
  }

  startEdit(record: EmailRecord) {
    this.editingId.set(record.id);
    this.editEmailInput.set(record.email);
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editEmailInput.set('');
  }

  saveEdit(id: string) {
    const email = this.editEmailInput().trim();
    if (!email) return;
    this.api.updateEmail(id, email).subscribe({
      next: () => { this.cancelEdit(); this.loadHistory(); this.toast.show('Email actualizado', 'success'); },
      error: () => this.toast.show('Error al actualizar', 'error')
    });
  }

  delete(id: string) {
    const record = this.history().find(r => r.id === id);
    this.api.deleteEmail(id).subscribe({
      next: (deleted) => {
        // Move to deleted list — backend won't return it in GET /api/email anymore
        const deletedRecord = deleted ?? { ...record!, deleted: true, deletedAt: new Date().toISOString() };
        this.deletedRecords.update(prev => [...prev.filter(r => r.id !== id), deletedRecord]);
        this.loadHistory();
        this.toast.show('Email eliminado', 'info');
      },
      error: () => this.toast.show('Error al eliminar', 'error')
    });
  }

  restore(id: string) {
    this.api.restoreEmail(id).subscribe({
      next: () => {
        this.deletedRecords.update(prev => prev.filter(r => r.id !== id));
        this.loadHistory();
        this.toast.show('Email restaurado', 'success');
      },
      error: () => this.toast.show('Error al restaurar', 'error')
    });
  }

  getStatusBadge(record: EmailRecord): string {
    if (record.deleted) return 'badge-gray';
    if (record.valid) return 'badge-success';
    return 'badge-danger';
  }

  getStatusLabel(record: EmailRecord): string {
    if (record.deleted) return '🗑 Eliminado';
    if (record.valid) return '✓ Válido';
    return '✗ Inválido';
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
  }

  get activeHistory() { return this.history(); }
  get deletedHistory() { return this.deletedRecords(); }
}
