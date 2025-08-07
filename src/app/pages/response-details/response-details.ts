import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MediaResponse } from '../../components/media-response/media-response';

@Component({
  selector: 'app-response-details',
  standalone: true,
  imports: [CommonModule, MediaResponse, RouterModule],
  templateUrl: './response-details.html',
  styleUrl: './response-details.css'
})
export class ResponseDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  response: any = null;
  mediaType: string | null = null;
  fileName: string | null = null;

  ngOnInit() {
    // Get data from route state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    
    console.log('ResponseDetailsPage ngOnInit - navigation:', navigation);
    console.log('ResponseDetailsPage ngOnInit - state:', state);
    
    if (state) {
      this.response = state['response'];
      this.mediaType = state['mediaType'];
      this.fileName = state['fileName'];
      console.log('State data loaded:', { response: this.response, mediaType: this.mediaType, fileName: this.fileName });
    } else {
      // Try to get from window.history.state as fallback
      const historyState = window.history.state;
      console.log('Checking window.history.state:', historyState);
      
      if (historyState && historyState.response) {
        this.response = historyState.response;
        this.mediaType = historyState.mediaType;
        this.fileName = historyState.fileName;
        console.log('Data loaded from history state');
      } else {
        console.log('No state data found, redirecting to home');
        // If no state data, redirect back to upload page
        this.router.navigate(['/']);
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
