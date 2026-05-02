import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8081';

export interface EmailRecord {
  id: string;
  email: string;
  valid: boolean;
  status: string;
  reason: string;
  verifiedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export interface TranslationRecord {
  id: string;
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  translatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export const LANGUAGES = [
  { value: 'AUTO', label: '🔍 Detectar automáticamente' },
  { value: 'ESPANOL', label: '🇪🇸 Español' },
  { value: 'INGLES', label: '🇺🇸 Inglés' },
  { value: 'FRANCES', label: '🇫🇷 Francés' },
  { value: 'ALEMAN', label: '🇩🇪 Alemán' },
  { value: 'PORTUGUES', label: '🇧🇷 Portugués' },
  { value: 'ITALIANO', label: '🇮🇹 Italiano' },
  { value: 'JAPONES', label: '🇯🇵 Japonés' },
  { value: 'COREANO', label: '🇰🇷 Coreano' },
  { value: 'CHINO_SIMPLIFICADO', label: '🇨🇳 Chino Simplificado' },
  { value: 'RUSO', label: '🇷🇺 Ruso' },
  { value: 'ARABE', label: '🇸🇦 Árabe' },
];

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // ── Email API ──────────────────────────────────────────────
  verifyEmail(email: string): Observable<EmailRecord> {
    return this.http.post<EmailRecord>(`${BASE_URL}/api/email/verify`, { email });
  }

  getEmails(): Observable<EmailRecord[]> {
    return this.http.get<EmailRecord[]>(`${BASE_URL}/api/email`);
  }

  getEmailById(id: string): Observable<EmailRecord> {
    return this.http.get<EmailRecord>(`${BASE_URL}/api/email/${id}`);
  }

  updateEmail(id: string, email: string): Observable<EmailRecord> {
    return this.http.put<EmailRecord>(`${BASE_URL}/api/email/${id}`, { email });
  }

  deleteEmail(id: string): Observable<EmailRecord> {
    return this.http.delete<EmailRecord>(`${BASE_URL}/api/email/${id}`);
  }

  restoreEmail(id: string): Observable<EmailRecord> {
    return this.http.patch<EmailRecord>(`${BASE_URL}/api/email/${id}/restore`, {});
  }

  // ── Translator API ─────────────────────────────────────────
  translate(text: string, from: string, to: string): Observable<TranslationRecord> {
    const params = new HttpParams().set('text', text).set('from', from).set('to', to);
    return this.http.post<TranslationRecord>(`${BASE_URL}/api/translator/translate`, null, { params });
  }

  getTranslations(): Observable<TranslationRecord[]> {
    return this.http.get<TranslationRecord[]>(`${BASE_URL}/api/translator`);
  }

  getTranslationById(id: string): Observable<TranslationRecord> {
    return this.http.get<TranslationRecord>(`${BASE_URL}/api/translator/${id}`);
  }

  updateTranslation(id: string, text: string, from: string, to: string): Observable<TranslationRecord> {
    const params = new HttpParams().set('text', text).set('from', from).set('to', to);
    return this.http.put<TranslationRecord>(`${BASE_URL}/api/translator/${id}`, null, { params });
  }

  deleteTranslation(id: string): Observable<TranslationRecord> {
    return this.http.delete<TranslationRecord>(`${BASE_URL}/api/translator/${id}`);
  }

  restoreTranslation(id: string): Observable<TranslationRecord> {
    return this.http.patch<TranslationRecord>(`${BASE_URL}/api/translator/${id}/restore`, {});
  }
}
