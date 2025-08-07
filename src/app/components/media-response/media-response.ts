import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-response.html',
  styleUrl: './media-response.css'
})
export class MediaResponse {
  @Input() response: any;
  @Input() mediaType: string | null = null;
  @Input() fileName: string | null = null;

  downloadResponse() {
    const dataStr = JSON.stringify(this.response, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `prediction-result-${this.fileName || 'response'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  copyToClipboard() {
    const responseText = JSON.stringify(this.response, null, 2);
    navigator.clipboard.writeText(responseText).then(
      () => {
        // You could add a toast notification here
        console.log('Response copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
}
