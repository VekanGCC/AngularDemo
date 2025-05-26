import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private commonService: CommonService) {}

  getUsers(): Observable<User[]> {
    return this.commonService.getUsers();
  }

  getPendingApprovals(): Observable<User[]> {
    return this.commonService.getPendingUsers();
  }

  approveUser(userId: string): Observable<User> {
    return this.commonService.approveUser(userId);
  }

  rejectUser(userId: string): Observable<User> {
    return this.commonService.rejectUser(userId);
  }

  getStats(): Observable<any> {
    return this.commonService.getStats();
  }
}