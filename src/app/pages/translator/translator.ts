import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, TranslationRecord, LANGUAGES } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-translator',
  imports: [FormsModule],
  templateUrl: './translator.html',
  styleUrl: './translator.scss'
})
export class TranslatorPage implements OnInit {
  private api = inject(ApiService);
  private toast = inject(ToastService);

  readonly languages = LANGUAGES;

  textInput = signal('');
  fromLang = signal('AUTO');
  toLang = signal('INGLES');
  loading = signal(false);
  historyLoading = signal(false);
  result = signal<TranslationRecord | null>(null);
  history = signal<TranslationRecord[]>([]);
  deletedRecords = signal<TranslationRecord[]>([]);
  editingId = signal<string | null>(null);
  editText = signal('');
  editFrom = signal('AUTO');
  editTo = signal('INGLES');
  activeTab = signal<'translate' | 'history'>('translate');
  copied = signal(false);

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.historyLoading.set(true);
    this.api.getTranslations().subscribe({
      next: (data) => {
        this.history.set(data);
        const activeIds = new Set(data.map(r => r.id));
        this.deletedRecords.update(prev => prev.filter(r => !activeIds.has(r.id)));
        this.historyLoading.set(false);
      },
      error: () => { this.toast.show('Error al cargar historial', 'error'); this.historyLoading.set(false); }
    });
  }

  translate() {
    const text = this.textInput().trim();
    if (!text || !this.toLang()) return;
    this.loading.set(true);
    this.result.set(null);
    this.api.translate(text, this.fromLang(), this.toLang()).subscribe({
      next: (data) => {
        this.result.set(data);
        this.loading.set(false);
        this.toast.show('Traducción completada', 'success');
        this.loadHistory();
      },
      error: () => { this.toast.show('Error al traducir', 'error'); this.loading.set(false); }
    });
  }

  copyResult() {
    if (!this.result()?.translatedText) return;
    navigator.clipboard.writeText(this.result()!.translatedText).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
      this.toast.show('Copiado al portapapeles', 'info');
    });
  }

  swapLanguages() {
    if (this.fromLang() === 'AUTO') return;
    const tmp = this.fromLang();
    this.fromLang.set(this.toLang());
    this.toLang.set(tmp);
  }

  startEdit(record: TranslationRecord) {
    this.editingId.set(record.id);
    this.editText.set(record.originalText);
    this.editFrom.set('AUTO');
    this.editTo.set('INGLES');
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit(id: string) {
    const text = this.editText().trim();
    if (!text) return;
    this.api.updateTranslation(id, text, this.editFrom(), this.editTo()).subscribe({
      next: () => { this.cancelEdit(); this.loadHistory(); this.toast.show('Traducción actualizada', 'success'); },
      error: () => this.toast.show('Error al actualizar', 'error')
    });
  }

  delete(id: string) {
    const record = this.history().find(r => r.id === id);
    this.api.deleteTranslation(id).subscribe({
      next: (deleted) => {
        const deletedRecord = deleted ?? { ...record!, deleted: true, deletedAt: new Date().toISOString() };
        this.deletedRecords.update(prev => [...prev.filter(r => r.id !== id), deletedRecord]);
        this.loadHistory();
        this.toast.show('Registro eliminado', 'info');
      },
      error: () => this.toast.show('Error al eliminar', 'error')
    });
  }

  restore(id: string) {
    this.api.restoreTranslation(id).subscribe({
      next: () => {
        this.deletedRecords.update(prev => prev.filter(r => r.id !== id));
        this.loadHistory();
        this.toast.show('Registro restaurado', 'success');
      },
      error: () => this.toast.show('Error al restaurar', 'error')
    });
  }

  getLangLabel(value: string): string {
    return this.languages.find(l => l.value === value)?.label ?? value;
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
  }

  get activeHistory() { return this.history(); }
  get deletedHistory() { return this.deletedRecords(); }
}
