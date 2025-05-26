import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StartupProfile } from '../models/user.model';
import { Requirement } from '../models/requirement.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private commonService: CommonService) {}

  getRequirements(): Observable<Requirement[]> {
    return this.commonService.getRequirements();
  }

  getStartups(): Observable<StartupProfile[]> {
    return this.commonService.getStartupProfiles();
  }

  getStartup(id: string): Observable<StartupProfile> {
    return this.commonService.getStartupProfile(id);
  }

  getProfile(): Observable<StartupProfile> {
    // Assuming we're getting the current user's profile
    return this.commonService.getStartupProfile('3'); // Using mock ID for now
  }

  updateProfile(updates: Partial<StartupProfile>): Observable<StartupProfile> {
    return this.commonService.updateStartupProfile('3', updates); // Using mock ID for now
  }
}