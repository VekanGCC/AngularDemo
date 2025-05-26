import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GccProfile } from '../models/user.model';
import { Requirement } from '../models/requirement.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GccService {
  constructor(private commonService: CommonService) {}

  getRequirements(): Observable<Requirement[]> {
    return this.commonService.getRequirements();
  }

  getRequirement(id: string): Observable<Requirement> {
    return this.commonService.getRequirement(id);
  }

  createRequirement(requirement: Partial<Requirement>): Observable<Requirement> {
    return this.commonService.createRequirement(requirement);
  }

  updateRequirement(id: string, updates: Partial<Requirement>): Observable<Requirement> {
    return this.commonService.updateRequirement(id, updates);
  }

  getProfile(): Observable<GccProfile> {
    // Assuming we're getting the current user's profile
    return this.commonService.getGccProfile('2'); // Using mock ID for now
  }

  updateProfile(updates: Partial<GccProfile>): Observable<GccProfile> {
    return this.commonService.updateGccProfile('2', updates); // Using mock ID for now
  }
}