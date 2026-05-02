import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home">
      <div class="hero">
        <div class="hero-badge">⚡ API Lab — Frontend Interactivo</div>
        <h1>Explora las APIs del backend</h1>
        <p>Interfaz didáctica para interactuar con los endpoints de verificación de email y traducción de texto.</p>
        <div class="hero-actions">
          <a routerLink="/email" class="btn btn-primary">✉️ Verificar Email</a>
          <a routerLink="/translator" class="btn btn-secondary">🌐 Traductor</a>
        </div>
      </div>

      <div class="api-cards">
        <a routerLink="/email" class="api-card card">
          <div class="api-card-icon email-icon">✉️</div>
          <div class="api-card-content">
            <h3>Email Verifier</h3>
            <p>Verifica si una dirección de correo es válida, comprueba el dominio y el buzón.</p>
            <div class="api-endpoints">
              <span class="endpoint"><span class="method post">POST</span>/api/email/verify</span>
              <span class="endpoint"><span class="method get">GET</span>/api/email</span>
              <span class="endpoint"><span class="method put">PUT</span>/api/email/:id</span>
              <span class="endpoint"><span class="method delete">DEL</span>/api/email/:id</span>
            </div>
          </div>
          <span class="api-card-arrow">→</span>
        </a>

        <a routerLink="/translator" class="api-card card">
          <div class="api-card-icon translator-icon">🌐</div>
          <div class="api-card-content">
            <h3>Traductor de Texto</h3>
            <p>Traduce texto entre 11 idiomas. Soporta detección automática del idioma origen.</p>
            <div class="api-endpoints">
              <span class="endpoint"><span class="method post">POST</span>/api/translator/translate</span>
              <span class="endpoint"><span class="method get">GET</span>/api/translator</span>
              <span class="endpoint"><span class="method put">PUT</span>/api/translator/:id</span>
              <span class="endpoint"><span class="method delete">DEL</span>/api/translator/:id</span>
            </div>
          </div>
          <span class="api-card-arrow">→</span>
        </a>
      </div>

      <div class="info-bar">
        <div class="info-item">
          <span class="info-dot green"></span>
          <span>Backend: <code>http://localhost:8081</code></span>
        </div>
        <div class="info-item">
          <span class="info-dot blue"></span>
          <a href="http://localhost:8081/swagger-ui.html" target="_blank" rel="noopener">Swagger UI ↗</a>
        </div>
        <div class="info-item">
          <span class="info-dot purple"></span>
          <a href="http://localhost:8081/v3/api-docs" target="_blank" rel="noopener">API Docs ↗</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      max-width: 860px;
      margin: 0 auto;
      padding: 48px 24px;
    }
    .hero {
      text-align: center;
      margin-bottom: 48px;
    }
    .hero-badge {
      display: inline-block;
      padding: 6px 16px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 999px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    h1 {
      font-size: 36px;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .hero p {
      font-size: 16px;
      color: var(--gray-500);
      max-width: 480px;
      margin: 0 auto 28px;
    }
    .hero-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .api-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    .api-card {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px;
      transition: all 0.2s;
      cursor: pointer;
      &:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
    }
    .api-card-icon {
      font-size: 32px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      flex-shrink: 0;
    }
    .email-icon { background: #fef3c7; }
    .translator-icon { background: var(--secondary-light); }
    .api-card-content {
      flex: 1;
      h3 { font-size: 16px; font-weight: 600; color: var(--gray-800); margin-bottom: 6px; }
      p { font-size: 13px; color: var(--gray-500); margin-bottom: 14px; line-height: 1.5; }
    }
    .api-endpoints {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .endpoint {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--gray-600);
      font-family: monospace;
    }
    .method {
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 700;
      &.post { background: #d1fae5; color: #065f46; }
      &.get { background: #dbeafe; color: #1e40af; }
      &.put { background: #fef3c7; color: #92400e; }
      &.delete { background: #fee2e2; color: #991b1b; }
    }
    .api-card-arrow {
      font-size: 20px;
      color: var(--gray-300);
      align-self: center;
    }
    .info-bar {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 14px 20px;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 13px;
      color: var(--gray-600);
      flex-wrap: wrap;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      a { color: var(--primary); &:hover { text-decoration: underline; } }
      code { background: var(--gray-100); padding: 2px 6px; border-radius: 4px; font-size: 12px; }
    }
    .info-dot {
      width: 8px; height: 8px; border-radius: 50%;
      &.green { background: var(--success); }
      &.blue { background: var(--secondary); }
      &.purple { background: var(--primary); }
    }
  `]
})
export class HomePage {}
