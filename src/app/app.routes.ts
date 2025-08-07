import { Routes } from '@angular/router';
import { MediaUpload } from './pages/media-upload/media-upload';
import { ResponseDetailsPage } from './pages/response-details/response-details';

export const routes: Routes = [
  { path: '', component: MediaUpload },
  { path: 'response', component: ResponseDetailsPage },
  { path: '**', redirectTo: '' }
];
