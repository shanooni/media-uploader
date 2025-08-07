import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media-upload.html',
  styleUrl: './media-upload.css'
})

export class MediaUpload {

  private http = inject(HttpClient);
  private router = inject(Router);

  selectedFile: File | null = null;
  selectedMediaType: 'image' | 'video' | 'audio' | null = null;
  isDragOver = false;
  isUploading = false;
  

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.validateFileType();
    } 
    console.log('File selected:', this.selectedFile);
  }

  selectMediaType(type: 'image' | 'video' | 'audio') {
    this.selectedMediaType = type;
    // Clear any previously selected file when changing media type
    this.selectedFile = null;
  }

  getAcceptedTypes(): string {
    switch (this.selectedMediaType) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      default:
        return '*/*';
    }
  }

  getDropZoneIcon(): string {
    switch (this.selectedMediaType) {
      case 'image':
        return '📸';
      case 'video':
        return '🎥';
      case 'audio':
        return '🎤';
      default:
        return '📁';
    }
  }

  getFileTypeLabel(): string {
    if (!this.selectedFile) return '';
    
    const fileType = this.selectedFile.type;
    if (fileType.startsWith('image/')) {
      return 'Image File';
    } else if (fileType.startsWith('video/')) {
      return 'Video File';
    } else if (fileType.startsWith('audio/')) {
      return 'Audio File';
    }
    return 'Unknown File Type';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.validateFileType();
    }
  }

  private validateFileType() {
    if (!this.selectedFile || !this.selectedMediaType) return;

    const fileType = this.selectedFile.type;
    const isValidType = 
      (this.selectedMediaType === 'image' && fileType.startsWith('image/')) ||
      (this.selectedMediaType === 'video' && fileType.startsWith('video/')) ||
      (this.selectedMediaType === 'audio' && fileType.startsWith('audio/'));

    if (!isValidType) {
      alert(`Please select a valid ${this.selectedMediaType} file.`);
      this.selectedFile = null;
    }
  }

  onSubmit() {
    console.log('Upload triggered');
    
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }
    
    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const fileName = this.selectedFile.name;
    const mediaType = this.selectedMediaType;

    this.http.post(`${environment.apiBaseUrl}/upload`, formData).subscribe({
      next: (response) => {
        this.isUploading = false;
        console.log('Upload successful:', response);
        
        // Navigate to response page with data
        console.log('Attempting to navigate to response page with data:', {
          response,
          mediaType,
          fileName
        });
        
        this.router.navigate(['/response'], {
          state: {
            response: response,
            mediaType: mediaType,
            fileName: fileName
          }
        }).then(
          success => console.log('Navigation successful:', success),
          error => console.error('Navigation failed:', error)
        );
      },
      error: (error) => {
        this.isUploading = false;
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
      }
    });
  }
}
