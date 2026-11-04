import { Component, input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 40 40"
      role="img"
      aria-label="GestBook"
    >
      <defs>
        <linearGradient
          id="gb-logo-gradient"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#2dd4bf" />
          <stop offset="1" stop-color="#1f5fbf" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#gb-logo-gradient)" />
      <path
        d="M10 12 C13 11 17 11.5 20 14 L20 29 C17 26.5 13 26 10 27 Z"
        fill="#fff"
        fill-opacity="0.9"
      />
      <path
        d="M30 12 C27 11 23 11.5 20 14 L20 29 C23 26.5 27 26 30 27 Z"
        fill="#fff"
      />
      <path
        d="M25 12.2 V20 L27.2 18.2 L29.4 20 V13.2 C28 12.6 26.5 12.3 25 12.2 Z"
        fill="#fbbf24"
      />
    </svg>

    @if (showName()) {
      <span class="name" [style.font-size.px]="size() * 0.55">
        Gest<strong>Book</strong>
      </span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .name {
      font-family: 'Sora', system-ui, sans-serif;
      font-weight: 500;
      letter-spacing: -0.02em;
      color: inherit;
    }

    .name strong {
      font-weight: 700;
    }
  `,
})
export class BrandLogo {
  readonly size = input(40);
  readonly showName = input(true);
}